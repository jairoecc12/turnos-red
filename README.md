# TurnosRed - API RESTful de Gestión de Turnos Médicos

Sistema backend desarrollado en Node.js y Express con TypeScript para centralizar la gestión de turnos y profesionales médicos en centros de atención ambulatoria.

## 🛠️ Requisitos e Instalación

- **Node.js**: v18 o superior
- **Gestor de paquetes**: npm

```bash
# Clonar repositorio
git clone [https://github.com/jairoecc12/turnos-red.git](https://github.com/jairoecc12/turnos-red.git)

# Entrar al directorio
cd turnos-red

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

---

## 📁 Estructura del Proyecto

```text
turnos-red/
├── src/
│   ├── controllers/      # Controladores de las rutas (Turnos y Médicos)
│   ├── data/             # Archivos JSON de persistencia
│   ├── middlewares/      # Validaciones Zod y Manejo Centralizado de Errores
│   ├── models/           # Interfaces de datos
│   ├── routes/           # Definición de endpoints RESTful
│   ├── schemas/          # Esquemas de validación Zod
│   ├── services/         # Lógica de negocio y filtrado
│   └── index.ts          # Punto de entrada del servidor
├── .env.example
├── package.json
├── README.md
└── turnos-red.postman_collection.json

---

⚙️ Variables de Entorno (.env.example)
Variable Descripción Valor por defecto
PORT Puerto de escucha del servidor HTTP 3000

🔌 Endpoints y Query Params
Recurso /turnos
GET /turnos - Listar turnos.
Query Params opcionales: ?especialidad=Pediatria&fecha=14/08/2026&medicoId=1
GET /turnos/:id - Obtener un turno por ID.
POST /turnos - Crear turno (validado con Zod).
PUT /turnos/:id - Actualizar turno.
DELETE /turnos/:id - Eliminar turno.

---

Recurso /medicos
GET /medicos - Listar médicos.
Query Params opcionales: ?especialidad=Odontologia&disponible=true
GET /medicos/:id - Obtener un médico por ID.
POST /medicos - Registrar médico (validado con Zod).
PUT /medicos/:id - Actualizar médico.
DELETE /medicos/:id - Dar de baja médico.

---

Tarea,Herramienta,Prompt,Respuesta generada, Ajuste manual aplicado
Diseño de Esquemas Zod,Gemini,"""Crea esquemas de Zod para validar campos de fecha DD/MM/YYYY y hora HH:MM""",Código con expresiones regulares para fecha y hora,Adaptación de tipos de datos a opcionales para medicoId
Manejo Estandarizado de Errores,Gemini,"""Escribe un middleware de errores que intercepte ZodError y devuelva código VALIDATION_ERROR con status 400""",Middleware procesando la propiedad issues de Zod,Tipado explícito de (e: any) para evitar errores estrictos de TypeScript
Filtros por Query Params,Gemini,"""Cómo aplicar filtros múltiples por query params en la capa de servicios de Express""",Funciones array .filter() encadenadas por condición,Mapeo case-insensitive para la búsqueda por especialidad

--