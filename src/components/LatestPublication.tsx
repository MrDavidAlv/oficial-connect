import { Calendar, FileText, Building, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const latestPublication = {
  numeroDiario: "52.345",
  titulo: "Decreto 1234 de 2024 - Reglamentación del Sistema Nacional de Salud",
  fechaPublicacion: "2024-01-15",
  tipoNorma: "DECRETO",
  entidadEmisora: "Ministerio de Salud y Protección Social",
  resumen: "Este decreto establece las nuevas normativas para el funcionamiento del sistema nacional de salud, incluyendo protocolos de atención, estándares de calidad y mecanismos de supervisión para garantizar el acceso universal a los servicios de salud.",
  numeroPaginas: 45,
  tamaño: "2.5 MB"
};

export const LatestPublication = () => {
  const handleViewDocument = () => {
    console.log("Ver último documento publicado");
    // Aquí iría la lógica para abrir el visor PDF
  };

  return (
    <Card className="shadow-medium bg-gradient-to-br from-primary/5 to-complementary/5 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-primary flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span>Última Publicación</span>
          </CardTitle>
          <Badge className="bg-primary text-primary-foreground">
            Nuevo
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Información principal */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Diario Oficial N° {latestPublication.numeroDiario}
            </span>
            <Badge variant="secondary">
              {latestPublication.tipoNorma}
            </Badge>
          </div>
          
          <h3 className="text-lg font-semibold text-card-foreground leading-tight">
            {latestPublication.titulo}
          </h3>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {latestPublication.resumen}
          </p>
        </div>

        {/* Metadatos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-t border-border/20">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">Fecha:</span>
            <span className="text-muted-foreground">
              {new Date(latestPublication.fechaPublicacion).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <FileText className="h-4 w-4 text-primary" />
            <span className="font-medium">Páginas:</span>
            <span className="text-muted-foreground">
              {latestPublication.numeroPaginas} ({latestPublication.tamaño})
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm sm:col-span-2">
            <Building className="h-4 w-4 text-primary" />
            <span className="font-medium">Entidad:</span>
            <span className="text-muted-foreground">
              {latestPublication.entidadEmisora}
            </span>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="pt-2">
          <Button 
            onClick={handleViewDocument}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-soft"
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver Documento Completo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};