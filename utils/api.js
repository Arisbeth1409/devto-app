const API_URL = "https://backend-challenge-h27z.onrender.com";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/users/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return data.data.token;
}
