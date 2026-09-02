import {
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "../auth/tokenStorage";

const BACKEND_BASE_URL = "http://172.16.157.25:8000/api";

export async function backendRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  let accessToken = await getAccessToken();

  let response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      ...(accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {}),
    },
  });

  if (response.status === 401 && accessToken) {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      await clearTokens();
      throw new Error("Session expired");
    }

    const refreshResponse = await fetch(
      `${BACKEND_BASE_URL}/auth/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    if (!refreshResponse.ok) {
      await clearTokens();
      throw new Error("Session expired");
    }

    const refreshData = await refreshResponse.json();

    await saveTokens(
      refreshData.access,
      refreshToken
    );

    accessToken = refreshData.access;

    response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || `Backend request failed: ${response.status}`
    );
  }

  return data;
}

export async function loginUser(
  username: string,
  password: string
) {
  const data = await backendRequest("/auth/login/", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
  });

  await saveTokens(
    data.access,
    data.refresh
  );

  return data;
}

export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  return backendRequest("/auth/register/", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
}

export async function getCurrentUser() {
  return backendRequest("/auth/me/", {
    method: "GET",
  });
}
