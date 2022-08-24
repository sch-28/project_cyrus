import { VITE_API_KEY, VITE_API_IDENTIFIER } from '$env/static/private';

export interface Success_Location_Response {
	status: true;
	transaction: {
		status: 'success';
		errordescription: undefined;
	};
	QueryInfo: {
		ApiID: number;
		LocationCount: number;
	};
	LocationData: {
		Country: string;
		ProvinceArea: {
			Locations: {
				Location: string[];
			};
			ProvinceAreaName: string;
		};
	};
}
export interface Error_Location_Response {
	status: false;
	transaction: {
		status: 'error';
		errordescription: string;
	};
	QueryInfo: undefined;
	LocationData: undefined;
}

export type Location_Response = Success_Location_Response | Error_Location_Response;

export async function api_location_request(purchase_type: number) {
	const request_options = {
		method: 'GET'
	};

	const request_url = `https://webapi.resales-online.com/V6/SearchLocations?p_agency_filterid=${purchase_type}&p1=${VITE_API_IDENTIFIER}&p2=${VITE_API_KEY}`;

	const result = await fetch(request_url, request_options);
	const result_json = (await result.json()) as Location_Response;

	if (result_json.transaction && result_json.transaction.status === 'success') {
		result_json.status = true;
		if (!Array.isArray(result_json.LocationData!.ProvinceArea.Locations.Location)) {
			result_json.LocationData!.ProvinceArea.Locations.Location = [
				result_json.LocationData!.ProvinceArea.Locations.Location
			];
		}
	} else result_json.status = false;

	return result_json;
}
