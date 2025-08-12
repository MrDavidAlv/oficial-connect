import { useState } from "react";
import { Eye, Download, Share2, Calendar, FileText, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { PDFViewer } from "@/components/PDFViewer";
import { toast } from "sonner";

interface Document {
  id: string;
  numeroDiario: string;
  titulo: string;
  fechaPublicacion: string;
  tamaño: string;
  numeroPaginas: number;
  año: number;
  descripcion: string;
  tipoNorma: string;
  entidadEmisora: string;
  estado: "publicado" | "borrador" | "archivado";
  pdfUrl: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    numeroDiario: "52.345",
    titulo: "Constitución Política de Colombia 1991",
    fechaPublicacion: "2024-01-15",
    tamaño: "2.5 MB",
    numeroPaginas: 195,
    año: 2024,
    descripcion: "Constitución Política de la República de Colombia promulgada en 1991, documento fundamental del Estado colombiano.",
    tipoNorma: "CONSTITUCIÓN",
    entidadEmisora: "Asamblea Nacional Constituyente",
    estado: "publicado",
    pdfUrl: "https://pdba.georgetown.edu/Constitutions/Colombia/colombia91.pdf"
  },
  {
    id: "2",
    numeroDiario: "52.344",
    titulo: "Lineamientos Generales de Política para el Sector de las Tecnologías de la Información",
    fechaPublicacion: "2024-01-14",
    tamaño: "1.8 MB",
    numeroPaginas: 89,
    año: 2024,
    descripcion: "Documento que establece los lineamientos generales de política para el desarrollo del sector de las tecnologías de la información y las comunicaciones.",
    tipoNorma: "LINEAMIENTOS",
    entidadEmisora: "Ministerio de Educación Nacional",
    estado: "publicado",
    pdfUrl: "https://www.mineducacion.gov.co/1621/articles-85906_archivo_pdf.pdf"
  },
  {
    id: "3",
    numeroDiario: "52.343",
    titulo: "Código Penal de Colombia",
    fechaPublicacion: "2024-01-13",
    tamaño: "3.2 MB",
    numeroPaginas: 234,
    año: 2024,
    descripcion: "Código Penal de la República de Colombia - Ley 599 de 2000, que establece las normas rectoras del derecho penal colombiano.",
    tipoNorma: "CÓDIGO",
    entidadEmisora: "Congreso de la República",
    estado: "publicado",
    pdfUrl: "https://www.oas.org/dil/esp/codigo_penal_colombia.pdf"
  }
];

export const DocumentExplorer = () => {
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;
  
  // Calcular documentos para la página actual
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = mockDocuments.slice(indexOfFirstDocument, indexOfLastDocument);
  const totalPages = Math.ceil(mockDocuments.length / documentsPerPage);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "publicado":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "borrador":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "archivado":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleView = (doc: Document) => {
    setSelectedDocument(doc);
    setIsPDFViewerOpen(true);
  };

  const handleDownload = (doc: Document) => {
    const link = document.createElement('a');
    link.href = doc.pdfUrl;
    link.download = `${doc.titulo}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Descarga iniciada");
  };

  const handleShare = (doc: Document) => {
    if (navigator.share) {
      navigator.share({
        title: doc.titulo,
        text: doc.descripcion,
        url: doc.pdfUrl,
      });
    } else {
      navigator.clipboard.writeText(doc.pdfUrl);
      toast.success("URL copiada al portapapeles");
    }
  };

  if (viewMode === "cards") {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Documentos Encontrados</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("table")}
            >
              Vista Tabla
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setViewMode("cards")}
            >
              Vista Tarjetas
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentDocuments.map((doc) => (
            <Card key={doc.id} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <Badge className={getStatusColor(doc.estado)}>
                    {doc.estado}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Diario N° {doc.numeroDiario}
                  </span>
                </div>

                <h4 className="font-semibold text-card-foreground mb-2 line-clamp-2">
                  {doc.titulo}
                </h4>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {doc.descripcion}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{new Date(doc.fechaPublicacion).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>{doc.numeroPaginas} páginas</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-primary" />
                    <span className="truncate">{doc.entidadEmisora}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {doc.tamaño}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleView(doc)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleShare(doc)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Paginación */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {/* Visor PDF */}
        {selectedDocument && (
          <PDFViewer
            isOpen={isPDFViewerOpen}
            onClose={() => setIsPDFViewerOpen(false)}
            documentUrl={selectedDocument.pdfUrl}
            documentTitle={selectedDocument.titulo}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Documentos Encontrados</h3>
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => setViewMode("table")}
          >
            Vista Tabla
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("cards")}
          >
            Vista Tarjetas
          </Button>
        </div>
      </div>

      <Card className="shadow-soft">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Entidad</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Páginas</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentDocuments.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-muted/5">
                  <TableCell>
                    <div>
                      <div className="font-medium text-card-foreground line-clamp-1">
                        {doc.titulo}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Diario N° {doc.numeroDiario} • {doc.tamaño}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{doc.tipoNorma}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <div className="truncate" title={doc.entidadEmisora}>
                      {doc.entidadEmisora}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(doc.fechaPublicacion).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{doc.numeroPaginas}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(doc.estado)}>
                      {doc.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleView(doc)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDownload(doc)}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleShare(doc)}
                        className="h-8 w-8 p-0"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginación */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Visor PDF */}
      {selectedDocument && (
        <PDFViewer
          isOpen={isPDFViewerOpen}
          onClose={() => setIsPDFViewerOpen(false)}
          documentUrl={selectedDocument.pdfUrl}
          documentTitle={selectedDocument.titulo}
        />
      )}
    </div>
  );
};