import { request } from './api';

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
	const parameters = [];
	parameters.push({ name: 'p_agency_filterid', value: purchase_type });

	const result = await request<Location_Response>('SearchLocations', parameters);

	// converts single location to an array
	if (result.LocationData && !Array.isArray(result.LocationData.ProvinceArea.Locations.Location)) {
		result.LocationData.ProvinceArea.Locations.Location = [
			result.LocationData.ProvinceArea.Locations.Location
		];
	}

	return result;
}
