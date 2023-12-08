export function useForm(value, validacao) {
  if (validacao === "cpf") {
    const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;

    // Certifique-se de que value não seja undefined ou null
    const cleanedValue = value ? value.replace(/\D/g, "") : "";

    // Aplica o regex para formatar o CPF apenas se cleanedValue não for vazio
    const formattedValue = cleanedValue
      ? cleanedValue.replace(cpfRegex, "$1.$2.$3-$4")
      : "";

    return formattedValue;
  }

  if (validacao === "telefone") {
    const telefoneRegex = /^(\d{2})(\d{5})(\d{4})$/;

    // Certifique-se de que value não seja undefined ou null
    const cleanedValue = value ? value.replace(/\D/g, "") : "";

    // Aplica o regex para formatar o telefone apenas se cleanedValue não for vazio
    const formattedValue = cleanedValue
      ? cleanedValue.replace(telefoneRegex, "($1) $2-$3")
      : "";

    return formattedValue;
  }

  if (validacao === "letras") {
    // Certifique-se de que value não seja undefined ou null
    const cleanedValue = value ? value.replace(/[^a-zA-Z\s]/g, "") : "";

    return cleanedValue;
  }

  return value;
}
