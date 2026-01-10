import Header from "../components/Header";
import ItemCard from "../components/ItemCard";
import "./ExplorerPage.css";

export default function MyItemsPage() {
  return (
    <>
      <Header />

      <div className="explorer">
        <h2>Meus Itens</h2>
        <p>Gerencie os itens que você reportou</p>

        <div className="grid">
          <ItemCard
            status="Perdido"
            date="18/12/2025"
            title="Conjunto de Chaves"
            desc="Chaves com chaveiro preto."
            category="Chaves"
            location="Bloco A"
            name="Enzo"
            email="enzo@email.com"
          />

          <ItemCard
            status="Encontrado"
            date="21/12/2025"
            title="Relógio Prateado"
            desc="Relógio prateado com pulseira metálica."
            category="Relógio"
            location="Shopping"
            name="Enzo"
            email="enzo@email.com"
          />
        </div>
      </div>
    </>
  );
}
