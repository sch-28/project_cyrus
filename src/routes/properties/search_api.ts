import { VITE_API_KEY, VITE_API_IDENTIFIER } from '$env/static/private';

export class Search_Query {
	purchase_type: number;
	location: string;
	min_price: number;
	max_price: number;
	min_bedrooms: number;
	property_type: number;
	page: number;

	constructor() {
		this.purchase_type = 1;
		this.location = '';
		this.min_price = 0;
		this.max_price = 0;
		this.min_bedrooms = 0;
		this.property_type = 0;
		this.page = 1;
	}
}
export interface PropertyType {
	NameType: string;
	Type: string;
	TypeId: string;
	Subtype1: string;
	SubtypeId1: string;
}

export interface Status {
	system: string;
	en: string;
}

export interface Property {
	Reference: string;
	AgencyRef: string;
	Country: string;
	Province: string;
	Area: string;
	Location: string;
	SubLocation: string;
	PropertyType: PropertyType;
	Status: Status;
	Bedrooms: string;
	Bathrooms: string;
	Currency: string;
	Price: string;
	OriginalPrice: number;
	Dimensions: string;
	Built: number;
	Terrace: number;
	GardenPlot: number;
	CO2Rated: string;
	EnergyRated: string;
	OwnProperty: string;
	Pool: number;
	Parking: number;
	Garden: number;
	Description: string;
	/* Pictures: {
		Count: number;
		Picture: {
			Id: number;
			PictureCaption: string;
			PictureURL: string;
		}[];
	}; */
	/** short term rent */
	RentalPrice1: number;
	/** long term rent */
	RentalPrice2: number;
	MainImage: string;
	PropertyFeatures: any;
}

export interface QueryInfo {
	ApiId: string;
	QueryId: string;
	SearchType: string;
	PropertyCount: number;
	CurrentPage: number;
	PropertiesPerPage: number;
}

export interface Success_Response {
	status: true;
	transaction: {
		status: 'success';
		errordescription: undefined;
	};
	QueryInfo: QueryInfo;
	Property: Property[];
}
export interface Error_Response {
	status: false;
	transaction: {
		status: 'error';
		errordescription: string;
	};
	QueryInfo: undefined;
	Property: undefined;
}

export type Search_Response = Success_Response | Error_Response;

export async function api_search_request(search_query: Search_Query) {
	const request_options = {
		method: 'GET'
	};

	const request_url = `https://webapi.resales-online.com/V6/SearchProperties?p_agency_filterid=${search_query.purchase_type}&p1=${VITE_API_IDENTIFIER}&p2=${VITE_API_KEY}&p_beds=${search_query.min_bedrooms}x&p_min=${search_query.min_price}&p_max=${search_query.max_price}&p_location=${search_query.location}&p_Currency=EUR&P_output=JSON&p_images=1&p_PageSize=9&p_pageNo=${search_query.page}`;

	const result = await fetch(request_url, request_options);
	const result_json = (await result.json()) as Search_Response;

	if (result_json.transaction && result_json.transaction.status === 'success')
		result_json.status = true;
	else result_json.status = false;

	return result_json;
}
