import { useState } from "react";
import { Moon, Sun, Plus, Minus, Contrast, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  const increaseFontSize = () => {
    if (fontSize < 24) {
      const newSize = fontSize + 2;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      const newSize = fontSize - 2;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
    }
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  return (
    <header className="w-full bg-gradient-primary shadow-medium border-b border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e identidad */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center shadow-soft">
              <span className="text-2xl font-bold text-primary">DO</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">
                Diario Oficial
              </h1>
              <p className="text-sm text-primary-foreground/80">
                República Digital
              </p>
            </div>
          </div>

          {/* Navegación principal */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-primary-foreground hover:text-primary-foreground/80 transition-colors ${
                location.pathname === '/' ? 'font-semibold border-b-2 border-primary-foreground/50' : ''
              }`}
            >
              Inicio
            </Link>
            <Link 
              to="/publicaciones" 
              className={`text-primary-foreground hover:text-primary-foreground/80 transition-colors ${
                location.pathname === '/publicaciones' ? 'font-semibold border-b-2 border-primary-foreground/50' : ''
              }`}
            >
              Publicaciones
            </Link>
            <Link 
              to="/estadisticas" 
              className={`text-primary-foreground hover:text-primary-foreground/80 transition-colors ${
                location.pathname === '/estadisticas' ? 'font-semibold border-b-2 border-primary-foreground/50' : ''
              }`}
            >
              Estadísticas
            </Link>
            <Link 
              to="/ayuda" 
              className={`text-primary-foreground hover:text-primary-foreground/80 transition-colors ${
                location.pathname === '/ayuda' ? 'font-semibold border-b-2 border-primary-foreground/50' : ''
              }`}
            >
              Ayuda
            </Link>
          </nav>

          {/* Herramientas de accesibilidad */}
          <div className="flex items-center space-x-2">
            {/* Ajustar tamaño de fuente */}
            <div className="hidden sm:flex items-center space-x-1 bg-card/10 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={decreaseFontSize}
                className="h-8 w-8 p-0 text-primary-foreground hover:bg-card/20"
                aria-label="Disminuir tamaño de fuente"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-sm text-primary-foreground px-2">A</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={increaseFontSize}
                className="h-8 w-8 p-0 text-primary-foreground hover:bg-card/20"
                aria-label="Aumentar tamaño de fuente"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Alto contraste */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleHighContrast}
              className={`h-8 w-8 p-0 text-primary-foreground hover:bg-card/20 ${
                highContrast ? 'bg-card/20' : ''
              }`}
              aria-label="Toggle alto contraste"
            >
              <Contrast className="h-4 w-4" />
            </Button>

            {/* Modo oscuro/claro */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-8 w-8 p-0 text-primary-foreground hover:bg-card/20"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Menú móvil */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-8 w-8 p-0 text-primary-foreground hover:bg-card/20"
              aria-label="Menú"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};