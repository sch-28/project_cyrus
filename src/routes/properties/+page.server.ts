import { error } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';
import { Search_Query } from './search_query';

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
	/* const result = await fetch(
		`https://webapi.resales-online.com/V6/SearchProperties?p_agency_filterid=1&p1=1027300&p2=f78c58fe0bddd3d516350a5060bbe45271d7f9d2&P_output=JSON&P_all=True&P_sandbox=true`,
		{
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		}
	); */
	//const result_json = await result.json();
	//console.log(result_json);
	//

	return {  params:search_query  };
};
