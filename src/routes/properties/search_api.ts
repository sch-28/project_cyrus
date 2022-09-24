import { request } from './api';

export const Property_Types = {
	1: 'Apartment',
	2: 'House',
	3: 'Plot',
	4: 'Commercial'
};

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
	const parameters = [];
	parameters.push({ name: 'p_agency_filterid', value: search_query.purchase_type });
	parameters.push({ name: 'p_beds', value: search_query.min_bedrooms + "x"});
	parameters.push({ name: 'p_min', value: search_query.min_price });
	parameters.push({ name: 'p_max', value: search_query.max_price });
	parameters.push({ name: 'p_currency', value: 'EUR' });
	parameters.push({ name: 'p_location', value: search_query.location });
	parameters.push({ name: 'p_pagesize', value: 9 });
	parameters.push({ name: 'p_images', value: 1 });
	parameters.push({ name: 'p_pageno', value: search_query.page });
	parameters.push({ name: 'p_propertyTypes', value: `${search_query.property_type}-1` });
	parameters.push({ name: 'p_sortType', value: `1` });

	const result = await request<Search_Response>('SearchProperties', parameters);

	return result;
}
