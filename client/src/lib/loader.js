import apiRequest from "./apiRequest";
import { Await, defer, useLoaderData } from "react-router-dom";
export const singlePageLoader = async ({ request, params }) => {
	const res = await apiRequest.get("/posts/" + params.id);
	return res.data;
};

export const listPageLoader = async ({ request, params }) => {
	// const query = request.url.split("?")[1];
	// // console.log(request);
	// // console.log(query);
	// const res = await apiRequest.get("/posts/?" + query);
	// return res.data;
	/**
	 * using defer method
	 */
	const query = request.url.split("?")[1];

	const postPromise = apiRequest.get("/posts/?" + query);
	return defer({
		postResponse: postPromise,
	});
};
