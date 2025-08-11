import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle } from "lucide-react";

const Ayuda = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Centro de Ayuda
          </h1>
          <p className="text-lg text-muted-foreground">
            Encuentra respuestas a tus preguntas y obtén soporte técnico
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Preguntas Frecuentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>¿Cómo buscar un documento específico?</AccordionTrigger>
                    <AccordionContent>
                      Puedes usar el panel de filtros avanzados para buscar por número de diario, 
                      tipo de norma, entidad emisora o rango de fechas. También puedes usar palabras 
                      clave en el título o descripción del documento.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>¿Cómo descargar un documento?</AccordionTrigger>
                    <AccordionContent>
                      Haz clic en el botón de descarga (ícono de flecha hacia abajo) en la lista de 
                      documentos. El archivo PDF se descargará automáticamente a tu dispositivo.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>¿Puedo usar herramientas de accesibilidad?</AccordionTrigger>
                    <AccordionContent>
                      Sí, el sitio incluye herramientas de accesibilidad como ajuste de tamaño de fuente, 
                      modo alto contraste, modo oscuro/claro y compatibilidad con lectores de pantalla.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>¿Con qué frecuencia se actualiza el contenido?</AccordionTrigger>
                    <AccordionContent>
                      El Diario Oficial se actualiza diariamente con las nuevas publicaciones oficiales. 
                      Las estadísticas se actualizan en tiempo real conforme se agregan nuevos documentos.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>¿Qué formatos de archivo están disponibles?</AccordionTrigger>
                    <AccordionContent>
                      Todos los documentos están disponibles en formato PDF, que garantiza la 
                      integridad y autenticidad de las publicaciones oficiales.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Contacto y Soporte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">soporte@diariooficial.gov.co</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-sm text-muted-foreground">+57 (1) 234-5678</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Chat en línea</p>
                    <p className="text-sm text-muted-foreground">Lun-Vie 8:00-18:00</p>
                  </div>
                </div>
                
                <Button className="w-full mt-4">
                  Contactar Soporte
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Tutoriales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-left h-auto p-3">
                    <div>
                      <p className="font-medium">Cómo usar los filtros</p>
                      <p className="text-sm text-muted-foreground">Guía paso a paso</p>
                    </div>
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start text-left h-auto p-3">
                    <div>
                      <p className="font-medium">Visor de documentos</p>
                      <p className="text-sm text-muted-foreground">Funciones avanzadas</p>
                    </div>
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start text-left h-auto p-3">
                    <div>
                      <p className="font-medium">Herramientas de accesibilidad</p>
                      <p className="text-sm text-muted-foreground">Configuración personalizada</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ayuda;