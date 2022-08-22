import { error } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';
import { api_request, Search_Query } from './api';

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

	const result = await api_request(search_query);

	return { params: search_query, results: result };
};
