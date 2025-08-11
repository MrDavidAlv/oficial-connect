import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize, 
  Search,
  Volume2,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Configurar worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documentUrl: string;
  documentTitle: string;
}

export const PDFViewer = ({ isOpen, onClose, documentUrl, documentTitle }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [searchText, setSearchText] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    toast.success("Documento cargado correctamente");
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("Error al cargar el PDF:", error);
    toast.error("Error al cargar el documento PDF");
  }, []);

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => numPages ? Math.min(numPages, prev + 1) : prev);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(3, prev + 0.2));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(0.5, prev - 0.2));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = `${documentTitle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Descarga iniciada");
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      toast.info(`Buscando: "${searchText}" (Función en desarrollo)`);
    }
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Documento ${documentTitle}, página ${pageNumber} de ${numPages}`);
      utterance.lang = 'es-ES';
      speechSynthesis.speak(utterance);
      toast.info("Iniciando lectura en voz alta");
    } else {
      toast.error("La función de texto a voz no está disponible en este navegador");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`${isFullscreen ? 'max-w-[100vw] h-[100vh] m-0' : 'max-w-6xl max-h-[90vh]'} p-0`}
      >
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center justify-between">
            <span className="text-lg font-semibold truncate mr-4">{documentTitle}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Barra de herramientas */}
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goToPrevPage} disabled={pageNumber <= 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <span className="text-sm font-medium">
              Página {pageNumber} de {numPages || '...'}
            </span>
            
            <Button variant="outline" size="sm" onClick={goToNextPage} disabled={!numPages || pageNumber >= numPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Input
                placeholder="Buscar en documento..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-48 h-8"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button variant="outline" size="sm" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-1">
              <Button variant="outline" size="sm" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-2">{Math.round(scale * 100)}%</span>
              <Button variant="outline" size="sm" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="outline" size="sm" onClick={speakText} title="Lectura en voz alta">
              <Volume2 className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm" onClick={handleDownload} title="Descargar">
              <Download className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Contenedor del PDF */}
        <div className="flex-1 overflow-auto p-4 bg-gray-100 dark:bg-gray-900">
          <div className="flex justify-center">
            <div className="bg-white shadow-lg">
              <Document
                file={documentUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                      <p>Cargando documento...</p>
                    </div>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center text-red-600">
                      <p className="text-lg font-semibold">Error al cargar el documento</p>
                      <p className="text-sm">Por favor, verifica la URL del documento</p>
                    </div>
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  loading={
                    <div className="flex items-center justify-center h-96">
                      <div className="animate-pulse bg-gray-200 h-full w-full rounded"></div>
                    </div>
                  }
                />
              </Document>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};