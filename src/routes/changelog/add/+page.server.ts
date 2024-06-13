import { redirect } from "@sveltejs/kit";
import { access_token as accessToken } from "$env/static/private";

export const load = ({ cookies }) => {
	if (cookies.get("access_token") !== accessToken) {
		throw redirect(307, "/");
	}

	return {
		cookie: cookies.get("access_token")
	};
};
