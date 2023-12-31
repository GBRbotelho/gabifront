const ROTA = import.meta.env.VITE_ROTA;

export async function login(email, password) {
  console.log(ROTA);
  const response = await fetch(`${ROTA}/users/login`, {
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
  console.log("Passou por aqui");
  localStorage.removeItem("token");
  window.location.href = "/";
}

export async function verifyToken() {
  const authToken = localStorage.getItem("token");

  if (authToken) {
    const response = await fetch(`${ROTA}/users/refresh-token`, {
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
        return data; // Token renovado com sucesso
      }
    }

    // Se a solicitação não retornar um novo token válido ou não retornar 200 OK
    if (response.status === 401) {
      const data = await response.json();
      if (data.error) {
        localStorage.removeItem("token");
        return data;
      }
    }
  } else {
    return null;
  }
}

export async function useGetUserData(token) {
  try {
    const response = await fetch(`${ROTA}/users/data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      // Se a resposta do servidor não for bem-sucedida, lance um erro
      throw new Error(`Erro: (status ${response.status})`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Trate qualquer erro aqui
    console.error("Erro:", error);
    throw error; // Você pode optar por relançar o erro para que ele seja tratado em outro lugar, se necessário
  }
}
