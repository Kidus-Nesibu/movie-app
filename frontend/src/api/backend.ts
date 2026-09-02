import { getAccessToken, saveTokens } from "../auth/tokenStorage"; 
const BACKEND_BASE_URL = "http://172.16.157.25:8000/api";

export async function backendRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || `Backend request failed: ${response.status}`
    );
  }

  return data;
}

export async function loginUser(username: string, password: string) {

	const data = await backendRequest("/auth/login/", {
		method: "POST",
		body: JSON.stringify({
			username,
			password,
		}), 
	});

	await saveTokens(data.access, data.refresh);

	return data;
}

export async function getCurrentUser() {
	const accessToken = await getAccessToken();

	if (!accessToken) {
		throw new Error("No access token found");
	}

	return backendRequest("/auth/me/", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
}

