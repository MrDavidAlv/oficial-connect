# Diario Oficial - API Documentation

## Descripción
Sistema de gestión y consulta de publicaciones del Diario Oficial. Esta aplicación permite visualizar, buscar, filtrar y consultar documentos oficiales con soporte para PDF y estadísticas detalladas.

## Stack Tecnológico
- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase
- **Base de Datos**: PostgreSQL (via Supabase)
- **Autenticación**: Supabase Auth
- **Almacenamiento**: Supabase Storage

## Configuración del Proyecto

### Variables de Entorno
El proyecto ya está configurado con Supabase. No se requieren variables de entorno adicionales.

### Instalación
```bash
npm install
npm run dev
```

---

## Endpoints de la API

### Base URL
```
https://vjhbhsuflhlanmqhitqi.supabase.co/rest/v1/
```

### Headers Requeridos
```
Authorization: Bearer [supabase_anon_key]
apikey: [supabase_anon_key]
Content-Type: application/json
```

---

## 1. Gestión de Documentos

### GET /documents
Obtiene la lista de documentos con paginación y filtros.

**Parámetros de consulta:**
- `page` (int): Número de página (default: 1)
- `limit` (int): Documentos por página (default: 5)
- `search` (string): Búsqueda en título y descripción
- `tipo_norma` (string): Filtro por tipo de norma
- `entidad_emisora` (string): Filtro por entidad emisora
- `fecha_desde` (date): Fecha inicial (YYYY-MM-DD)
- `fecha_hasta` (date): Fecha final (YYYY-MM-DD)
- `estado` (string): publicado | borrador | archivado

**Respuesta:**
```json
{
  "data": [
    {
      "id": "uuid",
      "numero_diario": "52.345",
      "titulo": "Constitución Política de Colombia 1991",
      "fecha_publicacion": "2024-01-15T00:00:00Z",
      "tamaño": "2.5 MB",
      "numero_paginas": 195,
      "año": 2024,
      "descripcion": "Constitución Política de la República...",
      "tipo_norma": "CONSTITUCIÓN",
      "entidad_emisora": "Asamblea Nacional Constituyente",
      "estado": "publicado",
      "pdf_url": "https://storage.url/path/to/file.pdf",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 570,
    "total_documents": 2847,
    "documents_per_page": 5
  }
}
```

### GET /documents/{id}
Obtiene un documento específico por ID.

**Respuesta:**
```json
{
  "id": "uuid",
  "numero_diario": "52.345",
  "titulo": "Constitución Política de Colombia 1991",
  "fecha_publicacion": "2024-01-15T00:00:00Z",
  "tamaño": "2.5 MB",
  "numero_paginas": 195,
  "año": 2024,
  "descripcion": "Constitución Política de la República...",
  "tipo_norma": "CONSTITUCIÓN",
  "entidad_emisora": "Asamblea Nacional Constituyente",
  "estado": "publicado",
  "pdf_url": "https://storage.url/path/to/file.pdf",
  "vistas": 1250,
  "descargas": 89,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### POST /documents
Crea un nuevo documento (requiere autenticación admin).

**Body:**
```json
{
  "numero_diario": "52.346",
  "titulo": "Nuevo Decreto",
  "descripcion": "Descripción del decreto...",
  "tipo_norma": "DECRETO",
  "entidad_emisora": "Ministerio de Educación",
  "numero_paginas": 45,
  "pdf_file": "base64_encoded_file"
}
```

### PUT /documents/{id}
Actualiza un documento existente (requiere autenticación admin).

### DELETE /documents/{id}
Elimina un documento (requiere autenticación admin).

---

## 2. Estadísticas

### GET /statistics/general
Obtiene estadísticas generales del sistema.

**Respuesta:**
```json
{
  "total_publicaciones": 2847,
  "publicaciones_mes_actual": 46,
  "visitas_totales": 125678,
  "promedio_diario": 1.9,
  "tendencias": {
    "publicaciones": "+12%",
    "visitas": "+23%",
    "mes_actual": "-8%",
    "promedio": "+5%"
  }
}
```

### GET /statistics/monthly
Obtiene estadísticas mensuales de publicaciones.

**Respuesta:**
```json
{
  "data": [
    { "mes": "Enero", "publicaciones": 45, "año": 2024 },
    { "mes": "Febrero", "publicaciones": 38, "año": 2024 }
  ]
}
```

### GET /statistics/by-type
Obtiene distribución de documentos por tipo de norma.

**Respuesta:**
```json
{
  "data": [
    { "tipo_norma": "DECRETO", "total": 156, "porcentaje": 28.5 },
    { "tipo_norma": "RESOLUCIÓN", "total": 134, "porcentaje": 24.4 },
    { "tipo_norma": "LEY", "total": 89, "porcentaje": 16.2 }
  ]
}
```

### GET /statistics/most-viewed
Obtiene los documentos más consultados.

**Parámetros:**
- `limit` (int): Número de documentos (default: 5)

**Respuesta:**
```json
{
  "data": [
    {
      "id": "uuid",
      "titulo": "Decreto 1234 - Sistema Nacional de Salud",
      "vistas": 1250,
      "descargas": 89,
      "fecha_publicacion": "2024-01-15T00:00:00Z"
    }
  ]
}
```

---

## 3. Filtros y Catálogos

### GET /catalogs/tipos-norma
Obtiene la lista de tipos de norma disponibles.

**Respuesta:**
```json
{
  "data": [
    "CONSTITUCIÓN",
    "LEY",
    "DECRETO",
    "RESOLUCIÓN",
    "ACUERDO",
    "CIRCULAR",
    "DIRECTIVA",
    "OTROS"
  ]
}
```

### GET /catalogs/entidades-emisoras
Obtiene la lista de entidades emisoras.

**Respuesta:**
```json
{
  "data": [
    "Presidencia de la República",
    "Ministerio de Educación Nacional",
    "Ministerio de Salud",
    "Congreso de la República",
    "Corte Constitucional",
    "Asamblea Nacional Constituyente"
  ]
}
```

### GET /catalogs/años
Obtiene los años disponibles para filtrado.

**Respuesta:**
```json
{
  "data": [2024, 2023, 2022, 2021, 2020, 2019, 2018]
}
```

---

## 4. Búsqueda y Filtrado

### GET /search
Búsqueda avanzada de documentos.

**Parámetros:**
- `q` (string): Término de búsqueda
- `fields` (array): Campos donde buscar ['titulo', 'descripcion', 'contenido']
- `tipo_norma` (string): Filtro por tipo
- `entidad_emisora` (string): Filtro por entidad
- `fecha_desde` (date): Fecha inicial
- `fecha_hasta` (date): Fecha final
- `page` (int): Página
- `limit` (int): Resultados por página

**Respuesta:**
```json
{
  "data": [
    {
      "id": "uuid",
      "titulo": "Decreto sobre educación digital",
      "relevancia": 0.95,
      "excerpt": "...fragmento del texto donde aparece la búsqueda...",
      "highlighted_fields": ["titulo", "descripcion"]
    }
  ],
  "total_results": 156,
  "search_time": 0.045,
  "pagination": {
    "current_page": 1,
    "total_pages": 32
  }
}
```

---

## 5. Descarga y Visualización

### GET /documents/{id}/download
Descarga el archivo PDF del documento.

**Headers de respuesta:**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="documento.pdf"
```

### POST /documents/{id}/track-view
Registra una visualización del documento.

**Body:**
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "user_agent": "Mozilla/5.0...",
  "ip_address": "192.168.1.1"
}
```

### POST /documents/{id}/track-download
Registra una descarga del documento.

---

## 6. Autenticación (Opcional)

### POST /auth/signup
Registro de usuario para funciones administrativas.

### POST /auth/signin
Inicio de sesión.

### POST /auth/signout
Cierre de sesión.

### GET /auth/user
Obtiene información del usuario actual.

---

## 7. Administración (Requiere Auth)

### GET /admin/documents/pending
Obtiene documentos pendientes de aprobación.

### PUT /admin/documents/{id}/approve
Aprueba un documento para publicación.

### PUT /admin/documents/{id}/reject
Rechaza un documento.

### GET /admin/statistics/dashboard
Obtiene estadísticas para el dashboard administrativo.

---

## Estructura de Base de Datos

### Tabla: documents
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_diario VARCHAR(20) NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  tipo_norma VARCHAR(50) NOT NULL,
  entidad_emisora TEXT NOT NULL,
  fecha_publicacion DATE NOT NULL,
  numero_paginas INTEGER,
  tamaño VARCHAR(20),
  pdf_url TEXT,
  estado VARCHAR(20) DEFAULT 'borrador',
  vistas INTEGER DEFAULT 0,
  descargas INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tabla: document_views
```sql
CREATE TABLE document_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET
);
```

### Tabla: document_downloads
```sql
CREATE TABLE document_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET
);
```

---

## Códigos de Estado HTTP

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity
- `500` - Internal Server Error

---

## Ejemplos de Uso

### Buscar documentos por tipo y fecha
```bash
curl "https://vjhbhsuflhlanmqhitqi.supabase.co/rest/v1/documents?tipo_norma=eq.DECRETO&fecha_publicacion=gte.2024-01-01" \
  -H "Authorization: Bearer [anon_key]" \
  -H "apikey: [anon_key]"
```

### Obtener estadísticas mensuales
```bash
curl "https://vjhbhsuflhlanmqhitqi.supabase.co/rest/v1/statistics/monthly" \
  -H "Authorization: Bearer [anon_key]" \
  -H "apikey: [anon_key]"
```

---

## Deployment

### Supabase
La aplicación está configurada para usar Supabase como backend. Asegúrate de:

1. Configurar las tablas en Supabase
2. Establecer las políticas RLS apropiadas
3. Configurar el storage bucket para PDFs
4. Configurar las funciones edge si es necesario

### Frontend
```bash
npm run build
npm run preview
```

---

## Contacto y Soporte

Para soporte técnico o consultas sobre la API, contacta al equipo de desarrollo.

**Versión de API**: 1.0  
**Última actualización**: Enero 2025