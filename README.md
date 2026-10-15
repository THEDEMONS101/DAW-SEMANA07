# 🎮 GameVault — DAW Semana 07

**SPA + Dashboard de Gestión con Estado Complejo** desarrollada con **React + Vite** para la práctica de laboratorio de la **Semana 07** del curso **Desarrollo de Aplicaciones Web**.

El proyecto implementa de forma profesional los **8 hooks principales de React** aplicados a funcionalidades reales de un e-commerce y un gestor de tareas con estado complejo.

---

## 👨‍💻 Datos del estudiante

| Campo | Valor |
|---|---|
| **Nombre completo** | EDILSON ROBERTO CAMARGO ALVARADO |
| **Curso** | Desarrollo de Aplicaciones Web |
| **Semana** | 07 — React Hooks |
| **Repositorio** | [DAW-SEMANA07](https://github.com/THEDEMONS101/DAW-SEMANA07) |

---

## 🎯 Objetivo

Desarrollar una **SPA completa** que demuestre el dominio de los React Hooks mediante:
1. Una tienda de videojuegos (Parte 1).
2. Un **Dashboard de Gestión con estado complejo** (Parte 2).
3. Validación con **React Profiler** y **ESLint**.

---

## 🚀 Tecnologías

- ⚛️ **React 18** + **Vite**
- 🎨 **CSS puro** con variables y temas
- 🎯 **Lucide React** para iconos
- 🌐 **FreeToGame API** para el catálogo
- 💾 **localStorage** para persistencia
- 🛠️ **Git + GitHub**

---

## 📚 Justificación técnica de cada hook

| Hook | ¿Dónde? | ¿Por qué NO `useState` simple? |
|---|---|---|
| **`useState`** | Formularios, búsqueda, modales | Estado simple y local |
| **`useReducer`** | Carrito, wishlist, auth, tareas | Hay **múltiples acciones** sobre listas (add/remove/filter/sort). Con `useState` habría múltiples setters y la lógica quedaría dispersa. |
| **`useContext`** | Tema, carrito, wishlist, auth, tareas | El estado se consume en **más de 10 componentes**. Con `useState` habría **prop drilling masivo**. |
| **`useEffect`** | Fetch, localStorage, listeners | Necesitamos sincronizar con **sistemas externos** (API, storage, DOM) y **limpiar** al desmontar. |
| **`useMemo`** | `GameGrid`, `Dashboard` | Filtrado + ordenamiento sobre listas grandes. Recalcular en cada render es costoso. |
| **`useCallback`** | Contextos, `GameGrid`, `Dashboard` | Los handlers se pasan a componentes `memo`. Sin estabilizar, se rompe la memoización. |
| **`useRef`** | `SearchBar`, `Dashboard`, `UserMenu` | El foco o los valores mutables **no deben disparar re-render**. `useState` no es adecuado. |
| **Custom Hooks** | `useFetch`, `useDebounce`, `useLocalStorage` | Lógica reutilizable en múltiples componentes. Evita duplicación de código. |

---

## 🔄 Diagrama de flujo del estado

```mermaid
flowchart TD
    A[Usuario interactúa] --> B{¿Qué acción?}
    B -->|Añadir juego| C[CartContext dispatch ADD]
    B -->|Cambiar tema| D[ThemeContext toggle]
    B -->|Login/Registro| E[AuthContext dispatch]
    B -->|Buscar juego| F[useState searchTerm]
    B -->|Añadir tarea| G[TasksContext dispatch ADD]
    B -->|Filtrar tarea| H[TasksContext dispatch FILTER]
    
    C --> I[cartReducer]
    E --> J[authReducer]
    G --> K[tasksReducer]
    H --> K
    
    F --> L[useDebounce]
    L --> M[useMemo filteredGames]
    
    I --> N[useEffect → localStorage]
    J --> N
    K --> N
    D --> N
    
    N --> O[Re-render componentes suscritos]
    M --> O
    
    O --> P[React Profiler mide commits]