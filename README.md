# 🎮 GameVault — DAW Semana 07

**Tienda de videojuegos SPA** desarrollada con **React + Vite** como práctica de laboratorio para la **Semana 07** del curso **Desarrollo de Aplicaciones Web**.

El proyecto implementa de forma profesional los **8 hooks principales de React** (useState, useEffect, useContext, useRef, useReducer, useCallback, useMemo y Hooks Personalizados), aplicados a funcionalidades reales de un e-commerce.

---

## 👨‍💻 Datos del estudiante

| Campo | Valor |
|---|---|
| **Nombre completo** | EDILSON ROBERTO CAMARGO ALVARADO |
| **Curso** | Desarrollo de Aplicaciones Web |
| **Semana** | 07 — React Hooks |
| **Repositorio** | [DAW-SEMANA07](https://github.com/THEDEMONS101/DAW-SEMANA07) |

---

## 🎯 Objetivo de la práctica

Desarrollar una **Single Page Application (SPA)** funcional que demuestre el dominio de los React Hooks mediante una tienda de videojuegos realista, aplicando buenas prácticas de arquitectura, optimización de render y persistencia de datos.

---

## 🚀 Tecnologías utilizadas

- ⚛️ **React 18** + **Vite**
- 🎨 **CSS puro** con variables y temas dinámicos
- 🎯 **Lucide React** para iconografía
- 🌐 **FreeToGame API** para catálogo de juegos
- 💾 **localStorage** para persistencia de sesión, carrito y preferencias
- 🛠️ **Git + GitHub** para control de versiones

---

## 📚 Hooks implementados y su justificación

| Hook | Ubicación | Justificación real en el proyecto |
|---|---|---|
| **`useState`** | Todo el proyecto | Estado local: búsqueda, filtros, modales, formularios |
| **`useEffect`** | `useFetch`, `ThemeContext`, `useDebounce`, modales | Fetch de API, sincronización con localStorage, listeners de teclado, limpieza |
| **`useContext`** | `ThemeContext`, `CartContext`, `WishlistContext`, `AuthContext` | Evitar prop drilling en más de 10 componentes |
| **`useRef`** | `SearchBar`, `AuthModal`, `UserMenu` | Focus de inputs, atajos de teclado, detección de click fuera |
| **`useReducer`** | `cartReducer`, `wishlistReducer`, `authReducer` | Estado complejo con múltiples acciones tipadas |
| **`useCallback`** | `CartContext`, `WishlistContext`, `AuthContext`, `GameGrid` | Estabilizar funciones pasadas a componentes `memo` |
| **`useMemo`** | `GameGrid` | Filtrado + ordenamiento pesado del catálogo |
| **Custom Hooks** | `useFetch`, `useDebounce`, `useLocalStorage` | Encapsular lógica reutilizable |
| **`React.memo`** | `GameCard`, `Filters` | Evitar re-renders innecesarios |
| **`Profiler`** | `ProfilerWrapper` | Medir performance en desarrollo |
| **`StrictMode`** | `main.jsx` | Detectar efectos dobles y bugs en dev |

---

## ✨ Funcionalidades de la aplicación

### 🏠 Catálogo
- Catálogo de más de 40 videojuegos obtenidos desde API pública.
- **Búsqueda en tiempo real** con debounce (300ms) para optimizar renders.
- **Filtros por género** (Shooter, MMO, MOBA, Battle Royale, Strategy, Racing, Sports).
- **Ordenamiento** por relevancia, precio (asc/desc) y título.
- Secciones dedicadas: **Catálogo**, **Ofertas** y **Novedades**.
- Badges visuales: 🔥 **-30%** en ofertas y ✨ **Nuevo** en lanzamientos.

### 🎨 Tema claro / oscuro
- Cambio de tema global mediante `useContext`.
- Persistencia en `localStorage` (mantiene la preferencia al recargar).
- Sincronización automática con el atributo `data-theme` del DOM.

### 🛒 Carrito de compras
- Añadir, eliminar y modificar cantidades de productos.
- Cálculo automático del total.
- Persistencia completa en `localStorage`.
- Panel lateral animado con cierre por click externo o tecla `Escape`.

### ❤️ Lista de deseos (Wishlist)
- Añadir o quitar juegos favoritos.
- Mover productos de la wishlist directamente al carrito.
- Panel lateral independiente con contador en el header.

### 👤 Autenticación de usuarios
- **Registro** e **Inicio de sesión** mediante modal.
- Validación de campos (email, contraseña mínima de 6 caracteres, nombre en registro).
- Sesión persistente con `localStorage`.
- **Menú de usuario** con avatar, nombre, email, "Mis pedidos" y "Cerrar sesión".

### 💳 Checkout protegido
- Solo usuarios autenticados pueden finalizar la compra.
- Si no hay sesión, se abre el modal de login automáticamente.
- **Modal de confirmación** con número de orden, resumen de artículos y total pagado.
- Carrito vaciado tras la compra.

---

## 📂 Estructura del proyecto
daw-semana07/
├── public/
├── src/
│ ├── components/
│ │ ├── Header.jsx # Navbar con tema, wishlist, carrito y sesión
│ │ ├── Hero.jsx # Sección principal del catálogo
│ │ ├── SearchBar.jsx # Buscador con useRef y Ctrl+K
│ │ ├── Filters.jsx # Filtros por género y orden (memo)
│ │ ├── GameGrid.jsx # Catálogo con useMemo + useCallback
│ │ ├── GameCard.jsx # Tarjeta de juego (memo) con badges
│ │ ├── GameModal.jsx # Modal de detalle del juego
│ │ ├── Cart.jsx # Panel lateral del carrito
│ │ ├── Wishlist.jsx # Panel lateral de favoritos
│ │ ├── AuthModal.jsx # Modal de login / registro
│ │ ├── UserMenu.jsx # Menú desplegable del usuario
│ │ ├── CheckoutModal.jsx # Confirmación de compra
│ │ ├── ProfilerWrapper.jsx # Wrapper para React Profiler
│ │ └── Footer.jsx # Pie de página
│ ├── context/
│ │ ├── ThemeContext.jsx # Tema claro/oscuro global
│ │ ├── CartContext.jsx # Estado del carrito
│ │ ├── WishlistContext.jsx # Estado de la wishlist
│ │ └── AuthContext.jsx # Autenticación de usuarios
│ ├── hooks/
│ │ ├── useFetch.js # Custom Hook para peticiones HTTP
│ │ ├── useDebounce.js # Custom Hook para debounce
│ │ └── useLocalStorage.js # Custom Hook para persistencia
│ ├── reducers/
│ │ ├── cartReducer.js # Reducer del carrito
│ │ ├── wishlistReducer.js # Reducer de la wishlist
│ │ └── authReducer.js # Reducer de autenticación
│ ├── App.jsx # Componente raíz
│ ├── main.jsx # Punto de entrada con StrictMode
│ └── index.css # Estilos globales con variables
├── index.html
├── package.json
└── vite.config.js


---

## 🛠️ Instalación y ejecución

### Prerrequisitos
- **Node.js** ≥ 20.x
- **npm** o **pnpm**
- Navegador moderno (Chrome, Firefox, Edge)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/THEDEMONS101/DAW-SEMANA07.git

# 2. Entrar al proyecto
cd DAW-SEMANA07/daw-semana07

# 3. Instalar dependencias
npm install

# 4. Instalar lucide-react (iconos)
npm install lucide-react

# 5. Levantar el servidor de desarrollo
npm run dev