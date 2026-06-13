# Sistema de Gestión de Maniquíes

## Descripción

Aplicación web para la gestión de maniquíes y sus componentes.

Permite administrar:

- Maniquíes
- Cabezas
- Torsos
- Brazos
- Piernas
- Materiales
- Colores
- Modelos de piezas
- Modelos de extremidades

Además, permite ensamblar maniquíes utilizando piezas disponibles y evita utilizar una misma pieza en más de un maniquí.

---

## Tecnologías utilizadas

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express

### Base de datos

- MySQL / MariaDB

---

## Funcionalidades

### Gestión de piezas

- Alta de piezas
- Modificación de piezas
- Eliminación de piezas
- Visualización de piezas

### Gestión de modelos

- Alta de modelos
- Modificación de modelos
- Eliminación de modelos

### Gestión de materiales y colores

- Alta de materiales
- Eliminación de materiales
- Alta de colores
- Eliminación de colores

### Ensamblado de maniquíes

- Selección de cabeza
- Selección de torso
- Selección de brazos
- Selección de piernas
- Creación de maniquí completo

### Validaciones

- No permite eliminar piezas utilizadas por un maniquí.
- No permite ensamblar maniquíes incompletos.
- Filtrado por color.
- Filtrado por material.

---

## Instalación

### Clonar repositorio

```bash
git clone https://github.com/luzlomba/integracion-maniquies.git
```

### Backend

```bash
cd backend-maniquies

npm install

npm run dev
```

### Frontend

```bash
cd front-maniquies

npm install

npm run dev
```

---

## Base de datos

Crear la base:

```sql
CREATE DATABASE fabrica_maniquies;
```

Importar el script SQL incluido en el proyecto.

---

## Estructura general

backend-maniquies/
front-maniquies/
