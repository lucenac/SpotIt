import { useState } from "react";
import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import "./ExplorerPage.css";

export default function ExplorerPage() {
  const [tab, setTab] = useState("Todos");
  const [search, setSearch] = useState("");

  const items = [
    {
      status: "Perdido",
      date: "23/12/2025",
      title: "Conjunto de Chaves",
      desc: "Chaves com chaveiro preto.",
      category: "Chaves",
      location: "Biblioteca",
      name: "João",
      email: "joao@email.com",
    },
    {
      status: "Encontrado",
      date: "24/12/2025",
      title: "Mochila Azul",
      desc: "Mochila azul com cadernos.",
      category: "Mochila",
      location: "Bloco B",
      name: "Maria",
      email: "maria@email.com",
    },
    {
      status: "Perdido",
      date: "22/12/2025",
      title: "Relógio Prateado",
      desc: "Relógio prateado com pulseira metálica.",
      category: "Relógio",
      location: "Shopping",
      name: "Pedro",
      email: "pedro@email.com",
    },
    {
      status: "Perdido",
      date: "21/12/2025",
      title: "Carteira de Couro",
      desc: "Carteira marrom de couro.",
      category: "Carteira",
      location: "Centro",
      name: "Lucas",
      email: "lucas@email.com",
    },
    {
      status: "Perdido",
      date: "20/12/2025",
      title: "Cachorro Golden Retriever",
      desc: "Golden amigável, atende por Max.",
      category: "Animal",
      location: "Parque",
      name: "Ana",
      email: "ana@email.com",
    },
    {
      status: "Encontrado",
      date: "19/12/2025",
      title: "iPhone 14 Pro",
      desc: "iPhone com capa azul.",
      category: "Eletrônico",
      location: "Cafeteria",
      name: "Rafael",
      email: "rafa@email.com",
    },
  ];

  const filteredItems = items.filter((item) => {
    const matchesTab =
      tab === "Todos" || item.status === tab;

    const text =
      `${item.title} ${item.desc} ${item.location}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <>
      <Header />

      <div className="explorer">
        <h2>Explorar Itens</h2>

        <input
          className="search"
          placeholder="Buscar por título, descrição ou localização..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="tabs">
          <span
            className={tab === "Todos" ? "active" : ""}
            onClick={() => setTab("Todos")}
          >
            Todos
          </span>

          <span
            className={tab === "Perdido" ? "active" : ""}
            onClick={() => setTab("Perdido")}
          >
            Perdidos
          </span>

          <span
            className={tab === "Encontrado" ? "active" : ""}
            onClick={() => setTab("Encontrado")}
          >
            Encontrados
          </span>
        </div>

        <div className="grid">
          {filteredItems.map((item, index) => (
            <ItemCard key={index} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}
