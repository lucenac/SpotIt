export default function ItemCard({
  status,
  date,
  title,
  desc,
  category,
  location,
  name,
  email,
}) {
  const isLost = status === "Perdido";

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            isLost
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {status}
        </span>
        <span className="text-xs text-gray-500">{date}</span>
      </div>

      <h3 className="font-semibold text-lg">{title}</h3>

      <p className="text-sm text-gray-600">{desc}</p>

      <div className="text-sm text-gray-700">
        <strong>Categoria:</strong> {category}
      </div>

      <div className="text-sm text-gray-700">
        <strong>Local:</strong> {location}
      </div>

      <hr />

      <div className="text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-blue-600">{email}</p>
      </div>

      <button className="mt-2 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">
        Entrar em contato
      </button>
    </div>
  );
}
