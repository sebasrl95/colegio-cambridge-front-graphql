# 📚 Colegio Cambridge - Plataforma de Gestión

Este proyecto es una aplicación web para administrar la información del **Colegio Cambridge**.  
Consta de un **API en GRAPHQL** y un **frontend en React 19**.  

El sistema permite gestionar:
- 🏫 **Salones**
- 🏢 **Oficinas**
- 🌐 **Áreas**
- 👩‍🏫 **Empleados**
- 📊 **Reportes**

---

## 🚀 Tecnologías usadas

- **Frontend**: [React 19](https://react.dev/) con TSX  
- **Estilos**: [TailwindCSS](https://tailwindcss.com/)  
- **Cliente HTTP**: [GraphQL](https://graphql.org/)  
- **Ruteo**: [React Router DOM](https://reactrouter.com/)  
- **Backend (API)**: NestJS / Graphql  

---

## ⚙️ Instalación del frontend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/colegio-cambridge-frontend-graphql.git
   cd colegio-cambridge-frontend-graphql
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Inicia el frontend:
   ```bash
   npm run dev
   ```

4. Asegúrate de que el **API** esté corriendo en:
   ```
   http://localhost:4000/graphql
   ```

---

## ⚙️ Instalación del backend (API)

Repositorio del API: https://github.com/sebasrl95/colegio-cambridge-api-graphql

Pasos generales:
```bash
git clone https://github.com/sebasrl95/colegio-cambridge-api-graphql.git
cd colegio-cambridge-api-graphql
npm install
npm run start:dev
```

---


## ✨ Funcionalidades principales

- **Home**
  - Bienvenida al sistema con acceso rápido a todos los módulos.

- **CRUD Salones**
  - Crear, listar, editar y eliminar salones.
  - Cada salón se asocia a un **Área**.
  - Botón de **Cancelar** en el formulario.

- **CRUD Oficinas**
  - Crear, listar, editar y eliminar oficinas.

- **CRUD Áreas**
  - Crear, listar, editar y eliminar áreas.

- **CRUD Empleados**
  - Campos: `nombre`, `documento`, `área`, `oficina`, `tipoEmpleado`, `tipoProfesor` (si aplica).
  - Soporte para empleados **administrativos** y **profesores**.
  - Precarga de área y oficina en modo edición.
  - Botón de **Cancelar** en el formulario.

- **Estados de carga y error**
  - Componente `<Loader />` con spinner de Bootstrap.
  - Componente `<ErrorMessage />` para mostrar fallas de conexión.

- **Módulo de Reportes**
  - Reporte de **Áreas y Empleados**.
  - Reporte de **Áreas y Salones**.
  - Reporte de **Áreas y Oficinas**.
  - Reportes organizados en **pestañas (Tabs de Bootstrap)**.

---

## 🖼️ Capturas

### Pantalla principal (Home)
![Pantalla de inicio](./public/assets/images/colegio-cambridge-home.png)

---

## 📌 Requisitos previos

- Node.js **v20+**
- npm **v10+**
- API corriendo en `localhost:4000`

---

## 📜 Licencia

Proyecto con fines educativos - Ingeniería Informática.
