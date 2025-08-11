import { Header } from "@/components/Header";
import { FilterPanel } from "@/components/FilterPanel";
import { DocumentExplorer } from "@/components/DocumentExplorer";
import { LatestPublication } from "@/components/LatestPublication";
import { StatisticsPanel } from "@/components/StatisticsPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Sección principal con filtros y explorador */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Diario Oficial Digital
              </h1>
              <p className="text-lg text-muted-foreground">
                Consulta y descarga las publicaciones oficiales de la República
              </p>
            </div>
            
            <FilterPanel />
            <DocumentExplorer />
          </div>
          
          <div className="xl:col-span-1 space-y-6">
            <LatestPublication />
          </div>
        </div>

        {/* Panel de estadísticas */}
        <section>
          <StatisticsPanel />
        </section>
      </main>
    </div>
  );
};

export default Index;
