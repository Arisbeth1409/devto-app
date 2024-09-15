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
  return data.data;
}

export async function getUser(id) {
  const response = await fetch(`${API_URL}/users/${id}`);
  const data = await response.json();
  return data.data.user;
}

export async function getAllPost() {
  const response = await fetch(`${API_URL}/posts`);
  const data = await response.json();
  return data.data.posts;
}

export async function getPost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  const data = await response.json();
  return data.data.post;
}

export async function userRegister(
  name,
  userName,
  password,
  email,
  profilePic
) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, userName, password, email, profilePic }),
  });

  const data = response.json();
  return { data };
}
