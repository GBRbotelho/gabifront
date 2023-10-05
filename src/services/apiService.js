export async function fetchClients() {
  try {
    const token = await localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/clients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar clientes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Erro na solicitação de clientes: " + error.message);
  }
}
