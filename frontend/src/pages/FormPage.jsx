import { useNavigate } from "react-router-dom";

export default function FormPage() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    alert("Item reportado com sucesso!");
    navigate("/explorer");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8">

        {/* VOLTAR */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:underline mb-4"
        >
          ← Voltar
        </button>

        <h1 className="text-xl font-semibold mb-1">Reportar Item</h1>
        <p className="text-sm text-gray-600 mb-6">
          Preencha as informações abaixo para reportar um item perdido ou encontrado
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TIPO */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Tipo do Item*
            </label>
            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="tipo" defaultChecked />
                Perdi este item
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="tipo" />
                Encontrei este item
              </label>
            </div>
          </div>

          {/* TITULO */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Título do Item*
            </label>
            <input
              type="text"
              placeholder="Ex: Carteira de Couro Preta"
              className="w-full p-3 border rounded-xl"
              required
            />
          </div>

          {/* DESCRIÇÃO */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Descrição Detalhada*
            </label>
            <textarea
              placeholder="Forneça o máximo de detalhes possível para ajudar a identificar o item..."
              className="w-full p-3 border rounded-xl h-28 resize-none"
              required
            />
          </div>

          {/* CATEGORIA */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Categoria*
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-xl"
              required
            />
          </div>

          {/* LOCAL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Localização*
            </label>
            <input
              type="text"
              placeholder="Onde o item foi perdido/encontrado?"
              className="w-full p-3 border rounded-xl"
              required
            />
          </div>

          {/* DATA */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Data*
            </label>
            <input
              type="date"
              className="w-full p-3 border rounded-xl"
              required
            />
          </div>

          {/* AÇÕES */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-xl border"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Reportar Item
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
