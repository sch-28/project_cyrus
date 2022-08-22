import type { PageServerLoad } from './$types';
import { api_location_request, type Location_Response } from './location_api';
import {  api_search_request, Search_Query, type Search_Response } from './search_api';

export const load: PageServerLoad = async (load_event) => {
	let params = load_event.url.searchParams;

	const search_query = new Search_Query();

	for (let param_pair of params) {
		const param = param_pair[0] as keyof typeof search_query;
		const value = param_pair[1];

		// checks whether the param is valid
		if (param in search_query) {
			search_query[param] = value as never;
		} else {
			// invalid parameter
			console.log('invalid param');
		}
	}
	let promises:[Promise<Search_Response>, Promise<Location_Response>];
	promises = [api_search_request(search_query),api_location_request(search_query.purchase_type)]	

	const results = await Promise.all(promises)

	return { params: search_query, results: results };
};