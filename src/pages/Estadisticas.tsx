import { Header } from "@/components/Header";
import { StatisticsPanel } from "@/components/StatisticsPanel";

const Estadisticas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Estadísticas del Diario Oficial
          </h1>
          <p className="text-lg text-muted-foreground">
            Análisis y métricas de las publicaciones oficiales
          </p>
        </div>
        
        <StatisticsPanel />
      </main>
    </div>
  );
};

export default Estadisticas;