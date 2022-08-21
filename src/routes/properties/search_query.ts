export class Search_Query {
	purchase_type: 'buy' | 'rent' | 'dev';
	location: string;
	min_price: number;
	max_price: number;
	min_bedrooms: number;
    property_type: number;


	constructor(){
		this.purchase_type = "buy";
		this.location = "";
		this.min_price = 0;
		this.max_price = 0;
		this.min_bedrooms = 0;
		this.property_type = 0;
	}
};



