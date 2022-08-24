import type { PageServerLoad } from './$types';
import { api_location_request, type Location_Response } from './location_api';
import { api_search_request, Search_Query, type Search_Response } from './search_api';

/**
 *  Function that is called on the *server* before sending the HTML to the user
 */
export const load: PageServerLoad = async (load_event) => {
	// get filter parameters from url
	let params = load_event.url.searchParams;

	// create default filter query
	const search_query = new Search_Query();

	// if valid params exist -> override default query values
	for (let param_pair of params) {
		// extract params names and their values
		const param = param_pair[0] as keyof typeof search_query;
		const value = param_pair[1];

		// checks whether the param is valid
		if (param in search_query) {
			search_query[param] = value as never;
		} else {
			// invalid parameter, do nothing
		}
	}
	// create two api requests: search properties and give all valid locations for the given agency_filterID
	let promises: [Promise<Search_Response>, Promise<Location_Response>];
	promises = [api_search_request(search_query), api_location_request(search_query.purchase_type)];

	const results = await Promise.all(promises);

	return { params: search_query, results: results };
};
