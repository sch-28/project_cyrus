import type { PageServerLoad } from './$types';
import { api_detail_request } from './detail_api';

/**
 *  Function that is called on the *server* before sending the HTML to the user
 */
export const load: PageServerLoad = async (load_event) => {
	const ref = load_event.params.ref;
	const filter = load_event.params.filter;

	const results = await api_detail_request(filter,ref);


	return { results: results, ref: load_event.params.ref};
};
