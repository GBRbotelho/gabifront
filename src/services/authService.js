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

// Função para verificar o status de login
export function verificarStatusDeLogin() {
  // Lógica para verificar se o usuário está autenticado
}
