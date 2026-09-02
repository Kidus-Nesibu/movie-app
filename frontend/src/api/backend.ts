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
  return backendRequest("/auth/login/", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });
}