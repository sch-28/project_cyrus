import { VITE_API_KEY, VITE_API_IDENTIFIER } from '$env/static/private';

export class Search_Query {
	purchase_type: 'buy' | 'rent' | 'dev';
	location: string;
	min_price: number;
	max_price: number;
	min_bedrooms: number;
	property_type: number;

	constructor() {
		this.purchase_type = 'buy';
		this.location = '';
		this.min_price = 0;
		this.max_price = 0;
		this.min_bedrooms = 0;
		this.property_type = 0;
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
	transaction: {
		status: 'success';
		errordescription: undefined;
	};
	QueryInfo: QueryInfo;
	Property: Property[];
}
export interface Error_Response {
	transaction: {
		status: 'error';
		errordescription: string;
	};
	QueryInfo: undefined;
	Property: undefined;
}

export type Response = Success_Response | Error_Response;

export async function api_request(search_query: Search_Query) {
	console.log(VITE_API_KEY);
	const request_options = {
		method: 'GET'
	};

	let purchase_type = 0;

	switch (search_query.purchase_type) {
		case 'buy':
			purchase_type = 1;
			break;
		case 'rent':
			purchase_type = 2;
			break;
	}

	const request_url = `https://webapi.resales-online.com/V6/SearchProperties?p_agency_filterid=${purchase_type}&p1=${VITE_API_IDENTIFIER}&p2=${VITE_API_KEY}&p_beds=${search_query.min_bedrooms}x&p_min=${search_query.min_price}&p_max=${search_query.max_price}&p_location=${search_query.location}&P_output=JSON&P_all=True`;

	const result = await fetch(request_url, request_options);
	const result_json = (await result.json()) as Response;

	return result_json;
}
