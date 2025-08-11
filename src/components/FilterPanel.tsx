import { useState } from "react";
import { Search, RotateCcw, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterState {
  numeroDiario: string;
  numeroRecibo: string;
  numeroNorma: string;
  tipoEdicion: string;
  tipoNorma: string;
  entidadEmisora: string;
  fechaDesde: string;
  fechaHasta: string;
}

const tiposEdicion = [
  "Ordinaria",
  "Extraordinaria", 
  "Especial",
  "Oficio Tributario"
];

const tiposNorma = [
  "ACTA", "ACUERDO", "AUTO", "CONCEPTO", "CONTRATO", "CONVENIO",
  "CONVOCATORIA", "DECRETO", "DIRECTIVA", "DISPOSICIÓN", "ESTATUTO",
  "FALLO", "INSTRUCCIÓN", "LEY", "ORDENANZA", "ORDEN", "PLAN",
  "PLIEGO", "PROVIDENCIA", "PROYECTO", "REGLAMENTO", "RESOLUCIÓN",
  "RESOLUCIÓN EJECUTIVA", "SENTENCIA"
];

const entidades = [
  "Presidencia de la República",
  "Ministerio del Interior",
  "Ministerio de Hacienda",
  "Ministerio de Justicia",
  "Ministerio de Defensa",
  "Ministerio de Educación",
  "Ministerio de Salud",
  "Ministerio de Trabajo",
  "Ministerio de Agricultura",
  "Ministerio de Comercio",
  "Ministerio de Ambiente",
  "Ministerio de Transporte",
  "Ministerio de Tecnologías",
  "Ministerio de Cultura",
  "Ministerio de Vivienda",
  "Ministerio de Minas"
];

export const FilterPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    numeroDiario: "",
    numeroRecibo: "",
    numeroNorma: "",
    tipoEdicion: "",
    tipoNorma: "",
    entidadEmisora: "",
    fechaDesde: "",
    fechaHasta: ""
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    console.log("Búsqueda con filtros:", filters);
    // Aquí iría la lógica de búsqueda
  };

  const handleClear = () => {
    setFilters({
      numeroDiario: "",
      numeroRecibo: "",
      numeroNorma: "",
      tipoEdicion: "",
      tipoNorma: "",
      entidadEmisora: "",
      fechaDesde: "",
      fechaHasta: ""
    });
  };

  return (
    <Card className="mb-6 shadow-soft">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/5 transition-colors pb-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-primary" />
                <span>Filtros Avanzados</span>
              </div>
              <Button variant="ghost" size="sm" className="h-auto p-0">
                {isOpen ? "Ocultar" : "Mostrar"}
              </Button>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Número de Diario */}
              <div className="space-y-2">
                <Label htmlFor="numeroDiario">Número de Diario</Label>
                <Input
                  id="numeroDiario"
                  placeholder="Ej: 52345"
                  value={filters.numeroDiario}
                  onChange={(e) => handleFilterChange('numeroDiario', e.target.value)}
                />
              </div>

              {/* Número de Recibo */}
              <div className="space-y-2">
                <Label htmlFor="numeroRecibo">Número de Recibo</Label>
                <Input
                  id="numeroRecibo"
                  placeholder="Ej: R-2024-001"
                  value={filters.numeroRecibo}
                  onChange={(e) => handleFilterChange('numeroRecibo', e.target.value)}
                />
              </div>

              {/* Número de Norma */}
              <div className="space-y-2">
                <Label htmlFor="numeroNorma">Número de Norma</Label>
                <Input
                  id="numeroNorma"
                  placeholder="Ej: 1234"
                  value={filters.numeroNorma}
                  onChange={(e) => handleFilterChange('numeroNorma', e.target.value)}
                />
              </div>

              {/* Tipo de Edición */}
              <div className="space-y-2">
                <Label htmlFor="tipoEdicion">Tipo de Edición</Label>
                <Select value={filters.tipoEdicion} onValueChange={(value) => handleFilterChange('tipoEdicion', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposEdicion.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo de Norma */}
              <div className="space-y-2">
                <Label htmlFor="tipoNorma">Tipo de Norma</Label>
                <Select value={filters.tipoNorma} onValueChange={(value) => handleFilterChange('tipoNorma', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar norma" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposNorma.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Entidad Emisora */}
              <div className="space-y-2">
                <Label htmlFor="entidadEmisora">Entidad Emisora</Label>
                <Select value={filters.entidadEmisora} onValueChange={(value) => handleFilterChange('entidadEmisora', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar entidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {entidades.map((entidad) => (
                      <SelectItem key={entidad} value={entidad}>
                        {entidad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fecha Desde */}
              <div className="space-y-2">
                <Label htmlFor="fechaDesde">Fecha Desde</Label>
                <Input
                  id="fechaDesde"
                  type="date"
                  value={filters.fechaDesde}
                  onChange={(e) => handleFilterChange('fechaDesde', e.target.value)}
                />
              </div>

              {/* Fecha Hasta */}
              <div className="space-y-2">
                <Label htmlFor="fechaHasta">Fecha Hasta</Label>
                <Input
                  id="fechaHasta"
                  type="date"
                  value={filters.fechaHasta}
                  onChange={(e) => handleFilterChange('fechaHasta', e.target.value)}
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleSearch}
                className="flex-1 sm:flex-initial bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClear}
                className="flex-1 sm:flex-initial"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Limpiar
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};