import { useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  X,
  Home,
  RotateCw,
  Maximize2,
  Minimize2
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
  const [rotation, setRotation] = useState(0);
  const [pageInput, setPageInput] = useState("1");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setPageInput("1");
    toast.success("Documento cargado correctamente");
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error("Error al cargar el PDF:", error);
    toast.error("Error al cargar el documento PDF");
  }, []);

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      const newPage = pageNumber - 1;
      setPageNumber(newPage);
      setPageInput(newPage.toString());
    }
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      const newPage = pageNumber + 1;
      setPageNumber(newPage);
      setPageInput(newPage.toString());
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = () => {
    const page = parseInt(pageInput);
    if (page && page >= 1 && numPages && page <= numPages) {
      setPageNumber(page);
    } else {
      setPageInput(pageNumber.toString());
      toast.error("Número de página inválido");
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(3, prev + 0.25));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(0.5, prev - 0.25));
  };

  const resetZoom = () => {
    setScale(1.2);
  };

  const rotateDocument = () => {
    setRotation(prev => (prev + 90) % 360);
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

  // Bloquear el scroll del body cuando el viewer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Manejar teclas de navegación
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevPage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextPage();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pageNumber, numPages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header principal */}
      <div className="flex items-center justify-between p-4 bg-gradient-primary shadow-lg border-b border-border/20">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-primary-foreground hover:bg-card/20"
          >
            <Home className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div className="h-6 w-px bg-primary-foreground/20" />
          <h1 className="text-lg font-semibold text-primary-foreground truncate max-w-md">
            {documentTitle}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleFullscreen}
            className="text-primary-foreground hover:bg-card/20"
            title={isFullscreen ? "Modo ventana" : "Pantalla completa"}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDownload}
            className="text-primary-foreground hover:bg-card/20"
            title="Descargar"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-primary-foreground hover:bg-card/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Barra de herramientas mejorada */}
      <div className="flex items-center justify-between p-3 bg-card border-b border-border shadow-sm">
        {/* Navegación de páginas */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToPrevPage} 
            disabled={pageNumber <= 1}
            className="h-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Página</span>
            <Input
              value={pageInput}
              onChange={handlePageInputChange}
              onBlur={handlePageInputSubmit}
              onKeyPress={(e) => e.key === 'Enter' && handlePageInputSubmit()}
              className="w-16 h-9 text-center"
            />
            <span className="text-sm text-muted-foreground">de {numPages || '...'}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToNextPage} 
            disabled={!numPages || pageNumber >= numPages}
            className="h-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Controles de visualización */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={zoomOut}
              className="h-8 w-8 p-0"
              title="Alejar"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetZoom}
              className="h-8 px-3 text-xs font-medium"
              title="Restablecer zoom"
            >
              {Math.round(scale * 100)}%
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={zoomIn}
              className="h-8 w-8 p-0"
              title="Acercar"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={rotateDocument}
            className="h-9"
            title="Rotar documento"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Contenedor del PDF mejorado */}
      <div className="flex-1 overflow-auto bg-muted/30">
        <div className="flex justify-center p-6">
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden border border-border/20">
            <Document
              file={documentUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center h-96 w-full bg-white">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                    </div>
                    <p className="text-lg font-medium text-foreground">Cargando documento...</p>
                    <p className="text-sm text-muted-foreground mt-1">Por favor espere</p>
                  </div>
                </div>
              }
              error={
                <div className="flex items-center justify-center h-96 w-full bg-white">
                  <div className="text-center max-w-md mx-auto p-6">
                    <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Error al cargar el documento</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      No se pudo cargar el archivo PDF. Verifique la conexión a internet y la URL del documento.
                    </p>
                    <Button onClick={() => window.location.reload()} variant="outline" size="sm">
                      Intentar de nuevo
                    </Button>
                  </div>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                loading={
                  <div className="flex items-center justify-center h-96 w-full bg-muted/50">
                    <div className="animate-pulse bg-muted h-full w-full rounded"></div>
                  </div>
                }
                width={isFullscreen ? window.innerWidth - 48 : Math.min(window.innerWidth - 48, 900)}
                className="transition-all duration-300 ease-in-out"
              />
            </Document>
          </div>
        </div>
      </div>

      {/* Footer con información */}
      <div className="flex items-center justify-between p-3 bg-card border-t border-border text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Documento: {documentTitle}</span>
          <span>•</span>
          <span>Zoom: {Math.round(scale * 100)}%</span>
          {rotation > 0 && (
            <>
              <span>•</span>
              <span>Rotación: {rotation}°</span>
            </>
          )}
        </div>
        <div className="hidden sm:block text-xs">
          Use ← → para navegar • Esc para salir
        </div>
      </div>
    </div>
  );
};