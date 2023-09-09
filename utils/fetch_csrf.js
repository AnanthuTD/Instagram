export async function fetchCSRF() {
	try {
		const response = await axios.get("api/csrf_token/", {
			withCredentials: true,
		});

		const { csrfToken } = response.data;
		return csrfToken;
	} catch (error) {
		console.error("Error during Axios request:", error);
		// Handle the error here or throw it further if needed
	}
}
