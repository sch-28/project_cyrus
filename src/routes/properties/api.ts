import { API_KEY, API_IDENTIFIER } from '$env/static/private';

interface Success_Response {
	transaction: {
		status: 'success';
		errordescription: undefined;
	};
	status: true;
}

interface Error_Response {
	transaction: {
		status: 'error';
		errordescription: string;
	};
	status: false;
}

export type Response = Success_Response | Error_Response;

export async function request<T extends Response>(
	destination: string,
	parameters: { name: string; value: string|number }[]
) {
	const request_options = {
		method: 'GET'
	};

	let request_url = `https://webapi.resales-online.com/V6/${destination}?p1=${API_IDENTIFIER}&p2=${API_KEY}&P_output=JSON&`;

	for (let entry of parameters) {
		request_url += `${entry.name}=${entry.value}&`;
	}

	const result = await fetch(request_url, request_options);
	const result_json = (await result.json()) as T;

	if (result_json.transaction && result_json.transaction.status === 'success') {
		result_json.status = true;
	} else result_json.status = false;

	return result_json;
}
