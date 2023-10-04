export async function login(email, password) {
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}

// Função para fazer logout
export function logout() {
  // Lógica de logout, como limpar os tokens de autenticação
}

export async function verifyToken() {
  const authToken = localStorage.getItem("token");

  if (authToken) {
    const response = await fetch("http://localhost:3000/users/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: authToken }), // Envie o token atual para renovação
    });

    if (response.status === 200) {
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token); // Atualize o token no localStorage
        return true; // Token renovado com sucesso
      }
    }

    // Se a solicitação não retornar um novo token válido ou não retornar 200 OK
    if (response.status === 500) {
      const data = await response.json();
      if (data.error) {
        localStorage.removeItem("token");
        return data.error;
      }
    }

    return console.log("Quebro");
  } else {
    return null;
  }
}
