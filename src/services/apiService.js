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

export async function fetchUsers() {
  try {
    const token = await localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar usuarios");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Erro na solicitação de usuarios: " + error.message);
  }
}

export async function fetchServices() {
  try {
    const token = await localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/services", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar serviços");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Erro na solicitação de serviços: " + error.message);
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

export async function addUsers(token, userData) {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      return data;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function addService(token, serviceData) {
  try {
    const response = await fetch("http://localhost:3000/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(serviceData),
    });
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    if (error) {
      return error;
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

export async function deleteService(serviceId, token) {
  try {
    const response = await fetch(
      `http://localhost:3000/services/${serviceId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (!response.ok) {
      // Se a resposta do servidor não for bem-sucedida, lance um erro
      throw new Error(`Erro ao excluir Serviço (status ${response.status})`);
    }

    // Se a exclusão for bem-sucedida, não é necessário retornar dados
  } catch (error) {
    // Trate qualquer erro aqui
    console.error("Erro ao excluir Serviço:", error);
    throw error; // Você pode optar por relançar o erro para que ele seja tratado em outro lugar, se necessário
  }
}

export async function deleteUser(userId, token) {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      // Se a resposta do servidor não for bem-sucedida, lance um erro
      throw new Error(`Erro ao excluir Usuario (status ${response.status})`);
    }

    // Se a exclusão for bem-sucedida, não é necessário retornar dados
  } catch (error) {
    // Trate qualquer erro aqui
    console.error("Erro ao excluir Usuario:", error);
    throw error; // Você pode optar por relançar o erro para que ele seja tratado em outro lugar, se necessário
  }
}

export async function useGetId(userId, subroute, token) {
  try {
    const response = await fetch(
      `http://localhost:3000/${subroute}/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

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

export async function useUpdateData(userId, subroute, dataToUpdate, token) {
  try {
    const response = await fetch(
      `http://localhost:3000/${subroute}/${userId}`,
      {
        method: "PUT", // Use o método PUT para atualizar dados
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(dataToUpdate), // Envie os dados a serem atualizados no corpo da solicitação
      }
    );

    if (!response.ok) {
      // Se a resposta do servidor não for bem-sucedida, lance um erro
      throw new Error(`Erro: (status ${response.status})`);
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    // Trate qualquer erro aqui
    console.error("Erro:", error);
    throw error; // Você pode optar por relançar o erro para que ele seja tratado em outro lugar, se necessário
  }
}

export async function usePostData(token, subroute, dataPost) {
  try {
    const response = await fetch(`http://localhost:3000/${subroute}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(dataPost),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    if (error) {
      return error;
    }
  }
}

export async function useDeleteData(userId, subroute, token) {
  try {
    const response = await fetch(
      `http://localhost:3000/${subroute}/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro ao excluir(status ${response.status})`);
    }
  } catch (error) {
    // Trate qualquer erro aqui
    console.error("Erro ao excluir:", error);
    throw error;
  }
}

export async function useGetAll(subroute, token) {
  try {
    const response = await fetch(`http://localhost:3000/${subroute}`, {
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
