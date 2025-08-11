import { Header } from "@/components/Header";
import { FilterPanel } from "@/components/FilterPanel";
import { DocumentExplorer } from "@/components/DocumentExplorer";

const Publicaciones = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Todas las Publicaciones
          </h1>
          <p className="text-lg text-muted-foreground">
            Explora y busca en todo el archivo del Diario Oficial
          </p>
        </div>
        
        <FilterPanel />
        <DocumentExplorer />
      </main>
    </div>
  );
};

export default Publicaciones;