import React, { useState, useEffect } from "react";
import { useGetId, useUpdateData } from "../../services/apiService";
import { useParams } from "react-router-dom";
import { useLoading } from "../../utils/LoadingContext";
import { useFlashMessage } from "../../utils/FlashMessageContext";

function RegistrationForm({ closeModal }) {
  const [isEditable, setIsEditable] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({});
  const [tempRegistrationForm, setTempRegistrationForm] = useState({});
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const showMessage = useFlashMessage();

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const toggleCancel = () => {
    if (!isEditable) {
      setTempRegistrationForm({ ...registrationForm });
    } else {
      setRegistrationForm(tempRegistrationForm);
    }
    setIsEditable(!isEditable);
  };

  const toggleSave = async () => {
    showLoading();
    const token = localStorage.getItem("token");
    const update = await useUpdateData(
      id,
      "registrationform",
      registrationForm,
      token
    );

    setRegistrationForm(update);
    setTempRegistrationForm(update);
    setIsEditable(!isEditable);
    hideLoading();
    showMessage("Operação bem-sucedida!", "success");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistrationForm({
      ...registrationForm,
      [name]: value,
    });
  };

  useEffect(() => {
    async function fetchGetDataClient() {
      try {
        showLoading();
        const token = localStorage.getItem("token");
        const data = await useGetId(id, "registrationform", token); // Passe o token na chamada

        setRegistrationForm(data);
        setTempRegistrationForm(data);
        hideLoading();
      } catch (error) {
        hideLoading();
        console.error("Erro ao buscar clientes:", error);
      }
    }

    fetchGetDataClient();
  }, []);

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-4 md:p-8 z-10 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-2xl font-semibold">Ficha Cadastral</h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl text-gray-500 font-semibold">
                Estilo de vida
              </h2>
            </div>

            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
              <div className="md:col-span-2">
                <label htmlFor="status">Estado Civil</label>
                <input
                  type="text"
                  name="status"
                  id="status"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.status || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="occupation">Profissão</label>
                <input
                  name="occupation"
                  id="occupation"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.occupation || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="physicalActivity">Atividade Fisica</label>
                <input
                  name="physicalActivity"
                  id="physicalActivity"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.physicalActivity || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="weigth">Peso</label>
                <input
                  type="number"
                  name="weigth"
                  id="weigth"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.weigth || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="habits">Habitos alimentares/social</label>
                <input
                  type="text"
                  name="habits"
                  id="habits"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.habits || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="medications">Medicamentos contínuos</label>
                <input
                  type="text"
                  name="medications"
                  id="medications"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.medications || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="problems">Problemas de saúde</label>
                <input
                  type="text"
                  name="problems"
                  id="problems"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.problems || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="flex items-center mb-4 mt-6">
              <h2 className="text-2xl text-gray-500 font-semibold">
                Expectativas
              </h2>
            </div>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
              <div className="md:col-span-4">
                <label htmlFor="help">Como posso te ajudar</label>
                <textarea
                  type="text"
                  name="help"
                  id="help"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.help || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="flex items-center mb-4 mt-6">
              <h2 className="text-2xl text-gray-500 font-semibold">
                Referências Sintomatológicas
              </h2>
            </div>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
              <div className="md:col-span-2">
                <label htmlFor="intensity">Intensidade</label>
                <select
                  type="text"
                  name="intensity"
                  id="intensity"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.intensity || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  <option value="" hidden></option>
                  <option value="Alta">Alta</option>
                  <option value="Moderada">Moderada</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="timer">Tempo de inicio dos sintomas</label>
                <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                  <input
                    name="timer"
                    id="timer"
                    className={`h-10 border mt-1 rounded px-4 w-full bg-${
                      !isEditable ? "gray-100" : "white"
                    }`}
                    value={registrationForm.timer || ""}
                    onChange={handleChange}
                    disabled={!isEditable}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description">Descrição do desconforto</label>
                <input
                  name="description"
                  id="description"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.description || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="cycle">Ciclo 24h</label>
                <input
                  type="text"
                  name="cycle"
                  id="cycle"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.cycle || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="condition">Estado</label>
                <select
                  type="text"
                  name="condition"
                  id="condition"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.condition || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  <option value="" hidden></option>
                  <option value="Contínua">Contínua</option>
                  <option value="Intermitente">Intermitente</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="worsening">O que piora</label>
                <input
                  type="text"
                  name="worsening"
                  id="worsening"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.worsening || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="improvement">O que melhora</label>
                <input
                  type="text"
                  name="improvement"
                  id="improvement"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.improvement || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="episodes">Quantos episódios</label>
                <input
                  type="text"
                  name="episodes"
                  id="episodes"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.episodes || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="lastDate">
                  Se travou, qual foi a ultima vez
                </label>
                <input
                  type="date"
                  name="lastDate"
                  id="lastDate"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.lastDate || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="respiratoryPain">
                  Dor ao respirar, tossir ou espirrar
                </label>
                <select
                  type="text"
                  name="respiratoryPain"
                  id="respiratoryPain"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.respiratoryPain || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  <option value="" hidden></option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="vertigoSymptoms">
                  Vertigem, zumbido ou nausea
                </label>
                <select
                  type="text"
                  name="vertigoSymptoms"
                  id="vertigoSymptoms"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.vertigoSymptoms || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  <option value="" hidden></option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="strengthLoss">Perda de força</label>
                <select
                  type="text"
                  name="strengthLoss"
                  id="strengthLoss"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.strengthLoss || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  <option value="" hidden></option>
                  <option value="Sim">Pernas</option>
                  <option value="Não">Braços</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="urinarySystem">
                  Sistema urinario e fecal funcionando
                </label>
                <input
                  type="text"
                  name="urinarySystem"
                  id="urinarySystem"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.urinarySystem || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="landmark">Sofreu algum evento marcante</label>
                <input
                  type="text"
                  name="landmark"
                  id="landmark"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.landmark || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="procedures">Tem cirurgias</label>
                <input
                  type="text"
                  name="procedures"
                  id="procedures"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.procedures || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="sleepQuality">Qualidade de sono</label>
                <select
                  type="text"
                  name="sleepQuality"
                  id="sleepQuality"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.sleepQuality || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  <option value="" hidden></option>
                  <option value="Bom">Bom</option>
                  <option value="Médio">Médio</option>
                  <option value="Ruim">Ruim</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="anxietyStress">Ansiedade ou estresse</label>
                <select
                  type="text"
                  name="anxietyStress"
                  id="anxietyStress"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.anxietyStress || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  <option value="" hidden></option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="activityPause">
                  Deixou de fazer atividades
                </label>
                <input
                  type="text"
                  name="activityPause"
                  id="activityPause"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.activityPause || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="posture">Postura</label>
                <input
                  type="text"
                  name="posture"
                  id="posture"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.posture || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="assessmentConclusion">
                  Conclusão da avaliação
                </label>
                <input
                  type="text"
                  name="assessmentConclusion"
                  id="assessmentConclusion"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.assessmentConclusion || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="painLocation">Onde sente dor</label>
                <select
                  type="text"
                  name="painLocation"
                  id="painLocation"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.painLocation || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                >
                  <option value="" hidden></option>
                  <option value="Costas parte inferior">
                    Costas parte inferior
                  </option>
                  <option value="Costas parte superior">
                    Costas parte superior
                  </option>
                  <option value="Costas meio escapulas">
                    Costas meio escapulas
                  </option>
                  <option value="Pescoço parte superior">
                    Pescoço parte superior
                  </option>
                  <option value="Pescoço laterais">Pescoço laterais</option>
                  <option value="Ombro">Ombro</option>
                  <option value="Pés">Pés</option>
                  <option value="Coxa">Coxa</option>
                  <option value="Panturrilha">Panturrilha</option>
                  <option value="Posterior de coxa">Posterior de coxa</option>
                  <option value="Mãos">Mãos</option>
                  <option value="Braços">Braços</option>
                  <option value="Cabeça">Cabeça</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              {registrationForm.painLocation === "Outro" && (
                <div className="md:col-span-2">
                  <label htmlFor="otherLocation">
                    Outra localização da dor
                  </label>
                  <input
                    type="text"
                    name="otherLocation"
                    id="otherLocation"
                    className={`h-10 border mt-1 rounded px-4 w-full bg-${
                      !isEditable ? "gray-100" : "white"
                    }`}
                    value={registrationForm.otherLocation || ""}
                    onChange={handleChange}
                    disabled={!isEditable}
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <label htmlFor="treatments">Tratamentos anteriores</label>
                <input
                  type="text"
                  name="treatments"
                  id="treatments"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.treatments || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="flex items-center mb-4 mt-6">
              <h2 className="text-2xl text-gray-500 font-semibold">
                Plano definido
              </h2>
            </div>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
              <div className="md:col-span-2">
                <label htmlFor="sessionsNumber">Numero de sessões</label>
                <input
                  type="number"
                  name="sessionsNumber"
                  id="sessionsNumber"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.sessionsNumber || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="method">Técnica</label>
                <input
                  type="text"
                  name="method"
                  id="method"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.method || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="price">Preço</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className={`h-10 border mt-1 rounded px-4 w-full bg-${
                    !isEditable ? "gray-100" : "white"
                  }`}
                  value={registrationForm.price || ""}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Concluído
            </button>

            <div className="">
              <div className="">
                {isEditable ? (
                  <div className="flex gap-4">
                    <button
                      className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={toggleCancel}
                    >
                      <i className="ri-close-fill"></i>Cancel
                    </button>
                    <button
                      className=" bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={toggleSave}
                    >
                      <i className="ri-save-line"></i>Save
                    </button>
                  </div>
                ) : (
                  <button
                    className=" bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    onClick={toggleEdit}
                  >
                    <i className="ri-pencil-fill"> </i>Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
