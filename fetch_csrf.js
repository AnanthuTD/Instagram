export async function fetchData() {
    const response = await fetch("api/csrf_token/", {
        method: "GET",
        credentials: "include",
    });

    const { csrfToken } = await response.json();
    return csrfToken;
}
