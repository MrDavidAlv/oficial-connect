import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Users, Calendar } from "lucide-react";

const publicationsByMonth = [
  { mes: "Ene", publicaciones: 45 },
  { mes: "Feb", publicaciones: 38 },
  { mes: "Mar", publicaciones: 52 },
  { mes: "Abr", publicaciones: 41 },
  { mes: "May", publicaciones: 47 },
  { mes: "Jun", publicaciones: 55 },
  { mes: "Jul", publicaciones: 49 },
  { mes: "Ago", publicaciones: 43 },
  { mes: "Sep", publicaciones: 51 },
  { mes: "Oct", publicaciones: 48 },
  { mes: "Nov", publicaciones: 46 },
  { mes: "Dic", publicaciones: 38 }
];

const documentsByType = [
  { name: "DECRETO", value: 156, color: "hsl(var(--primary))" },
  { name: "RESOLUCIÓN", value: 134, color: "hsl(var(--complementary))" },
  { name: "LEY", value: 89, color: "hsl(var(--secondary))" },
  { name: "ACUERDO", value: 67, color: "hsl(var(--accent))" },
  { name: "OTROS", value: 98, color: "hsl(var(--muted-foreground))" }
];

const mostViewed = [
  { titulo: "Decreto 1234 - Sistema Nacional de Salud", vistas: 1250 },
  { titulo: "Ley 89 - Protección de Datos Personales", vistas: 980 },
  { titulo: "Resolución 567 - Educación Digital", vistas: 756 },
  { titulo: "Acuerdo 890 - Política Pública Ambiental", vistas: 642 },
  { titulo: "Decreto 2345 - Modernización Tributaria", vistas: 589 }
];

const totalStats = [
  {
    title: "Total Publicaciones",
    value: "2,847",
    icon: FileText,
    trend: "+12%",
    color: "text-primary"
  },
  {
    title: "Este Mes",
    value: "46",
    icon: Calendar,
    trend: "-8%",
    color: "text-complementary"
  },
  {
    title: "Visitas Totales",
    value: "125,678",
    icon: Users,
    trend: "+23%",
    color: "text-secondary"
  },
  {
    title: "Promedio Diario",
    value: "1.9",
    icon: TrendingUp,
    trend: "+5%",
    color: "text-accent-foreground"
  }
];

export const StatisticsPanel = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-card-foreground">
        Panel de Estadísticas
      </h2>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {totalStats.map((stat, index) => (
          <Card key={index} className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {stat.value}
                  </p>
                  <p className={`text-sm ${stat.trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend} vs mes anterior
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-muted/20`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Publicaciones por mes */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-primary" />
              <span>Publicaciones por Mes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={publicationsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="mes" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="publicaciones" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribución por tipo de norma */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-primary" />
              <span>Distribución por Tipo de Norma</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={documentsByType}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  fontSize={12}
                >
                  {documentsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Documentos más consultados */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Documentos Más Consultados</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mostViewed.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground line-clamp-1">
                      {doc.titulo}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">
                    {doc.vistas.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    vistas
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};