# EcoTienda

EcoTienda es un ecommerce de productos de limpieza ecologicos, pensado para hogares y empresas que buscan cuidar el medio ambiente.

---

## Caracteristicas principales:

- **Catalogo de productos**: Visualiza, busca y filtra productos por nombre o categoría.
- **Carrito de compras**: Agrega, elimina y modifica cantidades de productos.
- **Autenticacion de usuarios**: Registro, login y logout con Firebase.
- **Panel de administrador**:
  - Agregar, editar y eliminar productos.
  - Editar nombres de categorías.
- **Formulario de contacto**: Envía mensajes directamente al email del administrador.
- **Paginacion**: Navega facilmente entre paginas de productos.
- **SweetAlert2**: Confirmaciones y notificaciones visuales.
- **Disenio responsivo**: Adaptado a dispositivos moviles y escritorio.
- **SEO basico**: Meta etiquetas dinamicas con react-helmet-async.

---

## Tecnologías utilizadas:

- **React 19**
- **React Router DOM 7**
- **Firebase Auth**
- **EmailJS** (para contacto)
- **SweetAlert2**
- **Vite**
- **React Icons**
- **Chakra UI** (algunos componentes)
- **CSS personalizado** (`global.css`, `FormStyles.css`)

---

## Estructura del proyecto:

```
src/
  api/                # Logica de llamadas a la API
  assets/             # Imagenes y recursos
  auth/               # Configuración de Firebase
  components/         # Navbar, Footer, ProductCard, etc.
  context/            # Contextos globales (Auth, Cart, SweetAlert)
  pages/              # Vistas principales (Home, Category, Contact, etc.)
  styles/             # Archivos CSS globales y de formularios
  App.jsx             # Rutas principales
  main.jsx            # Punto de entrada
public/
  README.md           # Este archivo, accesible desde el footer
```

---

## Instalacion y ejecucion:

1. **Instala las dependencias**

   npm install

2. **Configura Firebase**

   - Crea un proyecto en [Firebase](https://firebase.google.com/).
   - Copia tu configuración en `src/auth/firebase.js`.

3. **Configura EmailJS**

   - Crea una cuenta en [EmailJS](https://www.emailjs.com/).
   - Configura tu `service_id`, `template_id` y `public_key` en el componente `Contact.jsx`.

4. **Inicia la app**

   npm run dev

5. **Accede como administrador**
   - El email de administrador está configurado en el codigo (por defecto: `admin@gmail.com`).
   - El password de administrador está configurado en el codigo (por defecto: `123456`).

---

## Funcionalidades para el usuario

- Buscar productos por nombre o categoria.
- Filtrar por categorias.
- Agregar productos al carrito y modificar cantidades.
- Registrarse e iniciar sesion.
- Enviar mensajes de contacto al administrador.

---

## Funcionalidades para el administrador

- Agregar nuevos productos.
- Editar productos existentes.
- Eliminar productos (con confirmación SweetAlert).
- Editar nombres de categorias.
- Acceso a funciones de admin solo con email autorizado.

---

## Contacto

¿Dudas, sugerencias o pedidos especiales?  
Completa el formulario de contacto en la app o escribe a:  
**ezequiel.torres0682@gmail.com**

---

## Licencia

Este proyecto es solo para fines educativos y personales.

## TalentoTech

- Raect - 25021
- Alumno: Ezequiel Mauricio German Torres
- Instructor/a: Nicolas Riquelme
- Totor/a: Erica Sosa

---

##  Despliegue en Vercel

Puedes ver la aplicacion funcionando en Vercel aqui:  
[https://ecostore-delta.vercel.app/](https://ecostore-delta.vercel.app/)

---

¡Gracias por ver mi proyecto!
