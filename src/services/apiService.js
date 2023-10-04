export async function fetchClients() {
  try {
    const response = await fetch("http://localhost:3000/api/clients", {
      method: "GET",
      headers: {
        // Adicione quaisquer cabeçalhos de autenticação ou outros cabeçalhos necessários aqui
        "Content-Type": "application/json",
        // Exemplo de cabeçalho de autenticação (se aplicável)
        // "Authorization": "Bearer seu-token-de-autenticacao",
      },
    });

    if (!response.ok) {
      // Lida com erros de resposta da API, se necessário
      throw new Error("Erro ao buscar clientes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Lida com erros de rede ou outros erros
    throw new Error("Erro na solicitação de clientes: " + error.message);
  }
}
