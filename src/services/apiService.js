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

export async function addClient(token, clientData) {
  try {
    const response = await fetch("http://localhost:3000/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(clientData),
    });
    const data = await response.json();
    console.log(data);
    if (data.error === "Email already exists") {
      data.error = "CPF ja existe";
      return data;
    }

    return data;
  } catch (error) {
    if (error === "Email already exists") {
      return (error = "CPF ja existe");
    }
  }
}

export async function deleteClient(clientId, token) {
  try {
    const response = await fetch(`http://localhost:3000/clients/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      // Se a resposta do servidor não for bem-sucedida, lance um erro
      throw new Error(`Erro ao excluir cliente (status ${response.status})`);
    }

    // Se a exclusão for bem-sucedida, não é necessário retornar dados
  } catch (error) {
    // Trate qualquer erro aqui
    console.error("Erro ao excluir cliente:", error);
    throw error; // Você pode optar por relançar o erro para que ele seja tratado em outro lugar, se necessário
  }
}
