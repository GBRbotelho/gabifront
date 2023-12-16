const ROTA = import.meta.env.VITE_ROTA;
import { verifyToken } from "./authService";

export async function fetchClients() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${ROTA}/clients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar clientes");
    }

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
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
    const response = await fetch(`${ROTA}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar usuarios");
    }

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
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
    const response = await fetch(`${ROTA}/services`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar serviços");
    }

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Erro na solicitação de serviços: " + error.message);
  }
}

export async function addClient(token, clientData) {
  try {
    const response = await fetch(`${ROTA}/clients`, {
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

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
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
    const response = await fetch(`${ROTA}/users`, {
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

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function addService(token, serviceData) {
  try {
    const response = await fetch(`${ROTA}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(serviceData),
    });
    const data = await response.json();

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
    }

    return data;
  } catch (error) {
    if (error) {
      return error;
    }
  }
}

export async function deleteClient(clientId, token) {
  try {
    const response = await fetch(`${ROTA}/clients/${clientId}`, {
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

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
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
    const response = await fetch(`${ROTA}/services/${serviceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      // Se a resposta do servidor não for bem-sucedida, lance um erro
      throw new Error(`Erro ao excluir Serviço (status ${response.status})`);
    }

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
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
    const response = await fetch(`${ROTA}/users/${userId}`, {
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

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
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
    const response = await fetch(`${ROTA}/${subroute}/${userId}`, {
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

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
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
    const response = await fetch(`${ROTA}/${subroute}/${userId}`, {
      method: "PUT", // Use o método PUT para atualizar dados
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(dataToUpdate), // Envie os dados a serem atualizados no corpo da solicitação
    });

    if (response.status === 401) {
      const data = await response.json();
      return data;
    }

    if (!response.ok) {
      // Se a resposta do servidor não for bem-sucedida, lance um erro
      throw new Error(`Erro: (status ${response.status})`);
    }

    if (response.status === 450) {
      localStorage.removeItem("token");
      verifyToken();
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
    const response = await fetch(`${ROTA}/${subroute}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(dataPost),
    });

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
    }

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
    const response = await fetch(`${ROTA}/${subroute}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir(status ${response.status})`);
    }

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
    }
  } catch (error) {
    // Trate qualquer erro aqui
    console.error("Erro ao excluir:", error);
    throw error;
  }
}

export async function useGetAll(subroute, token) {
  try {
    const response = await fetch(`${ROTA}/${subroute}`, {
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

    if (response.status === 450) {
      const data = await response.json();
      localStorage.removeItem("token");
      verifyToken();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Trate qualquer erro aqui
    console.error("Erro:", error);
    throw error; // Você pode optar por relançar o erro para que ele seja tratado em outro lugar, se necessário
  }
}
