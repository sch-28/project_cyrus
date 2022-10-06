import { request } from '../../../properties/api';

export interface Property_Detail{
	MainImage: any;
	RentalPrice2: number;
	RentalPrice1: number;

	Reference: string;
	AgencyRef: string;
	Status: {
		system: string;
		en: string;
		es: string;
	};
	Country: string;
	Province: string;
	Area: string;
	Location: string;
	SubLocation: string;
	PropertyType: {
		NameType: string;
		Type: string;
		TypeId: string;
		Subtype1: string;
		SubtypeId1: string;
	};
	Decree218: string;
	Bedrooms: string;
	Bathrooms: string;
	Currency: string;
	Price: number;
	OriginalPrice: number;
	Community_Fees_Year: string;
	Basura_Tax_Year: string;
	IBI_Fees_Year: string;
	Dimensions: string;
	Built: number;
	Terrace: number;
	GardenPlot: number;
	EnergyRating: {
		CO2Rated: string;
		CO2Value: string;
		EnergyRated: string;
		EnergyValue: string;
		Image: string;
	};
	GpsX: string;
	GpsY: string;
	OwnProperty: string;
	Pool: number;
	Parking: number;
	Garden: number;
	CompletionDate: string;
	BuiltYear: string;
	Description: string;
	PropertyFeatures: {
		Category: [
			{
				Type: string;
				Value: string[];
			},
			{
				Type: string;
				Value: string[];
			},
			{
				Type: string;
				Value: string[];
			},
			{
				Type: string;
				Value: string[];
			}
		];
	};
	Pictures: {
		Count: number;
		Picture: {
			Id: number;
			PictureURL: string;
		}[];
	};
};

interface Success_Detail_Response {
	status: true;
	transaction: {
		status: 'success';
		errordescription: undefined;
	};
	QueryInfo: {
		ApiID: string;
		QueryId: string;
	};
	Property: Property_Detail
		
}
interface Error_Detail_Response {
	status: false;
	transaction: {
		status: 'error';
		errordescription: string;
	};
	QueryInfo: undefined;
	Property: undefined;
}

export type Detail_Response = Success_Detail_Response | Error_Detail_Response;

export async function api_detail_request(filter:string, ref: string) {
	const parameters = [];
	if (filter == '4') filter = "1";
	parameters.push({ name: 'p_refid', value: ref });
	parameters.push({ name: 'p_agency_filterid', value: filter });

	const result = await request<Detail_Response>('PropertyDetails', parameters);

	return result;
}
