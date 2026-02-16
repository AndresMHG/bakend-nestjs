# Ejemplos de Uso - Sistema de Login

## Usando cURL

### 1. Registrar un nuevo usuario

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "password": "Password123!"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "Password123!"
  }'
```

Esto retornará un token. Guarda el token para usarlo en las siguientes peticiones.

### 3. Obtener el perfil (Protegido)

```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

Reemplaza `YOUR_JWT_TOKEN_HERE` con el token que recibiste del login.

---

## Usando Postman

### 1. Registrar usuario

1. Abre **Postman**
2. Crea una nueva solicitud **POST**
3. URL: `http://localhost:3000/auth/register`
4. Tab **Body** → Selecciona **raw** → **JSON**
5. Pega el siguiente JSON:

```json
{
  "email": "maria@example.com",
  "firstName": "María",
  "lastName": "González",
  "password": "SecurePass123!"
}
```

6. Click en **Send**
7. Verás el token en la respuesta

### 2. Login

1. Nueva solicitud **POST**
2. URL: `http://localhost:3000/auth/login`
3. Body (JSON):

```json
{
  "email": "maria@example.com",
  "password": "SecurePass123!"
}
```

4. Click en **Send**
5. Copia el `access_token` de la respuesta

### 3. Obtener Perfil (Protegido)

1. Nueva solicitud **GET**
2. URL: `http://localhost:3000/auth/profile`
3. Tab **Headers**
4. Agrega una nueva cabecera:
   - **Key**: `Authorization`
   - **Value**: `Bearer PEGA_TU_TOKEN_AQUI`
5. Click en **Send**

---

## Usando JavaScript/Fetch

### Registrarse

```javascript
async function register() {
  const response = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'usuario@example.com',
      firstName: 'Carlos',
      lastName: 'López',
      password: 'MyPassword123!',
    }),
  });
  const data = await response.json();
  console.log(data);
  return data.access_token;
}
```

### Login

```javascript
async function login() {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'usuario@example.com',
      password: 'MyPassword123!',
    }),
  });
  const data = await response.json();
  localStorage.setItem('token', data.access_token);
  console.log(data);
  return data.access_token;
}
```

### Obtener Perfil (Protegido)

```javascript
async function getProfile(token) {
  const response = await fetch('http://localhost:3000/auth/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

// Uso:
const token = await login();
const profile = await getProfile(token);
```

### Usando Axios

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

// Registrar
async function register(email, firstName, lastName, password) {
  const { data } = await axios.post(`${API_URL}/register`, {
    email,
    firstName,
    lastName,
    password,
  });
  return data;
}

// Login
async function login(email, password) {
  const { data } = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  localStorage.setItem('token', data.access_token);
  return data;
}

// Obtener Perfil
async function getProfile() {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
```

---

## Respuestas Esperadas

### Registro Exitoso (201 Created)

```json
{
  "message": "Usuario registrado exitosamente",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MGI4N2M2MC1mOTk5LTQzMGUtYjJmOS0wOWI2NTM3ZjFjMGYiLCJlbWFpbCI6Impkb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2NzM2MTk5MjcsImV4cCI6MTY3MzcwNjMyN30.x...",
  "user": {
    "id": "70b87c60-f999-430e-b2f9-09b6537f1c0f",
    "email": "jdoe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Login Exitoso (200 OK)

```json
{
  "message": "Login exitoso",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MGI4N2M2MC1mOTk5LTQzMGUtYjJmOS0wOWI2NTM3ZjFjMGYiLCJlbWFpbCI6Impkb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2NzM2MTk5NjAsImV4cCI6MTY3MzcwNjM2MH0.x...",
  "user": {
    "id": "70b87c60-f999-430e-b2f9-09b6537f1c0f",
    "email": "jdoe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Perfil Exitoso (200 OK)

```json
{
  "message": "Perfil del usuario",
  "user": {
    "id": "70b87c60-f999-430e-b2f9-09b6537f1c0f",
    "email": "jdoe@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Error - Email ya registrado (400 Bad Request)

```json
{
  "message": "El email ya está registrado",
  "error": "Bad Request",
  "statusCode": 400
}
```

### Error - Credenciales incorrectas (401 Unauthorized)

```json
{
  "message": "Email o contraseña incorrectos",
  "error": "Unauthorized",
  "statusCode": 401
}
```

### Error - Token inválido (401 Unauthorized)

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

---

## Notas Importantes

1. **Token JWT**: Válido por 24 horas desde su creación
2. **Contraseñas**: Siempre se envían en POST, nunca en GET
3. **HTTPS**: En producción, siempre usa HTTPS (no HTTP)
4. **Token almacenamiento**: En el navegador usa localStorage, sessionStorage o cookies
5. **CORS**: Si tu frontend está en otro dominio, configura CORS en NestJS

---

## OAuth Authentication (Google y LinkedIn)

El sistema soporta autenticación OAuth con Google y LinkedIn. Los usuarios pueden iniciar sesión con sus cuentas existentes sin necesidad de crear una contraseña.

### Configuración

Antes de usar OAuth, asegúrate de:
1. Haber configurado las credenciales de Google/LinkedIn (ver [OAUTH_SETUP.md](./OAUTH_SETUP.md))
2. Tener las variables de entorno configuradas en `.env`

### Login con Google

#### Frontend - Botón de Login

```html
<!-- Botón HTML simple -->
<button onclick="window.location.href='http://localhost:3000/auth/google'">
  <img src="google-icon.svg" alt="Google" />
  Continuar con Google
</button>

<!-- O como enlace -->
<a href="http://localhost:3000/auth/google" class="btn-google">
  🔵 Continuar con Google
</a>
```

#### Flujo de Autenticación

1. **Usuario hace clic** → Redirige a `http://localhost:3000/auth/google`
2. **Backend redirige** a la página de login de Google
3. **Usuario se autentica** con su cuenta de Google y autoriza la app
4. **Google redirige** de vuelta a `/auth/google/callback?code=...`
5. **Backend genera JWT** token
6. **Backend redirige** al frontend: `http://localhost:5173/auth/callback?token=JWT_TOKEN`
7. **Frontend extrae** el token y lo almacena

#### Frontend - Página Callback

Crea una ruta `/auth/callback` en tu frontend para recibir el token:

```javascript
// Ejemplo con JavaScript vanilla
function handleOAuthCallback() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const error = params.get('error');

  if (error) {
    console.error('Error OAuth:', error);
    alert('Error al iniciar sesión: ' + error);
    window.location.href = '/login';
    return;
  }

  if (token) {
    // Guardar token
    localStorage.setItem('token', token);

    // Opcional: Obtener perfil del usuario
    fetch('http://localhost:3000/auth/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(userData => {
        console.log('Usuario autenticado:', userData);
        // Redirigir al dashboard
        window.location.href = '/dashboard';
      })
      .catch(err => {
        console.error('Error al obtener perfil:', err);
      });
  }
}

// Llamar cuando la página cargue
window.addEventListener('DOMContentLoaded', handleOAuthCallback);
```

#### Ejemplo con React

```jsx
// components/OAuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (error) {
      alert('Error al iniciar sesión: ' + error);
      navigate('/login');
      return;
    }

    if (token) {
      localStorage.setItem('token', token);

      // Opcional: Obtener perfil del usuario
      fetch('http://localhost:3000/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(userData => {
          console.log('Usuario:', userData);
          navigate('/dashboard');
        })
        .catch(err => {
          console.error('Error:', err);
          navigate('/login');
        });
    }
  }, [navigate]);

  return (
    <div className="loading">
      <p>Completando inicio de sesión...</p>
    </div>
  );
}

export default OAuthCallback;
```

```jsx
// App.jsx - Configurar ruta
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OAuthCallback from './components/OAuthCallback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/callback" element={<OAuthCallback />} />
        {/* ... otras rutas */}
      </Routes>
    </BrowserRouter>
  );
}
```

### Login con LinkedIn

El flujo es idéntico a Google, solo cambia la URL:

```html
<!-- Botón HTML -->
<button onclick="window.location.href='http://localhost:3000/auth/linkedin'">
  <img src="linkedin-icon.svg" alt="LinkedIn" />
  Continuar con LinkedIn
</button>

<!-- O como enlace -->
<a href="http://localhost:3000/auth/linkedin" class="btn-linkedin">
  🔷 Continuar con LinkedIn
</a>
```

El callback y manejo del token es exactamente igual que Google.

### Respuesta del Perfil con OAuth

Cuando obtienes el perfil de un usuario autenticado con OAuth:

```json
{
  "message": "Perfil del usuario",
  "user": {
    "id": "uuid-generado",
    "email": "usuario@gmail.com",
    "firstName": "John",
    "lastName": "Doe",
    "authProvider": "google",
    "avatarUrl": "https://lh3.googleusercontent.com/..."
  }
}
```

**Nota:** Los usuarios OAuth tienen `authProvider` como `"google"` o `"linkedin"` y pueden incluir un `avatarUrl`.

### Ejemplo Completo - Página de Login con OAuth

```html
<!DOCTYPE html>
<html>
<head>
  <title>Login - Vitronepro</title>
  <style>
    .login-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .oauth-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 20px;
    }
    .btn-oauth {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      text-decoration: none;
      color: #333;
      transition: background 0.2s;
    }
    .btn-oauth:hover {
      background: #f5f5f5;
    }
    .divider {
      text-align: center;
      margin: 20px 0;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>

    <!-- OAuth Buttons -->
    <div class="oauth-buttons">
      <a href="http://localhost:3000/auth/google" class="btn-oauth">
        🔵 Continuar con Google
      </a>
      <a href="http://localhost:3000/auth/linkedin" class="btn-oauth">
        🔷 Continuar con LinkedIn
      </a>
    </div>

    <div class="divider">O</div>

    <!-- Email/Password Form -->
    <form id="loginForm">
      <div>
        <label>Email:</label>
        <input type="email" id="email" required>
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" id="password" required>
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  </div>

  <script>
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.access_token);
          window.location.href = '/dashboard';
        } else {
          alert(data.message || 'Error al iniciar sesión');
        }
      } catch (err) {
        alert('Error de conexión');
      }
    });
  </script>
</body>
</html>
```

### Vinculación Automática de Cuentas

El sistema vincula automáticamente cuentas por email:

**Escenario 1: Usuario nuevo con OAuth**
- Usuario hace clic en "Continuar con Google"
- Si el email no existe en la base de datos → Se crea cuenta nueva con `authProvider: 'google'`
- Usuario puede iniciar sesión solo con Google

**Escenario 2: Usuario existente (email/password) usa OAuth**
- Usuario registrado con email/password: `usuario@gmail.com`
- Usuario hace clic en "Continuar con Google" con el mismo email
- Sistema vincula automáticamente la cuenta
- `authProvider` cambia de `'local'` a `'google'`
- Usuario ahora debe usar **solo Google** para iniciar sesión

**Escenario 3: Usuario OAuth intenta login con password**
- Usuario con `authProvider: 'google'` intenta `POST /auth/login`
- Sistema responde con error 401:
  ```json
  {
    "message": "Esta cuenta usa autenticación de google. Por favor inicia sesión con google.",
    "error": "Unauthorized",
    "statusCode": 401
  }
  ```

### Testing OAuth Localmente

#### Método 1: Navegador directo

1. Inicia el backend: `npm run start:dev`
2. Abre en navegador: `http://localhost:3000/auth/google`
3. Autoriza con tu cuenta de Google
4. Deberías ser redirigido a: `http://localhost:5173/auth/callback?token=...`

#### Método 2: Desde consola del navegador

```javascript
// Simular click en botón OAuth
window.location.href = 'http://localhost:3000/auth/google';

// Después de callback, verificar token
const token = new URLSearchParams(window.location.search).get('token');
console.log('Token:', token);

// Probar token
fetch('http://localhost:3000/auth/profile', {
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(r => r.json())
  .then(data => console.log('Usuario:', data));
```

#### Método 3: Usando cURL (solo callback)

```bash
# No puedes iniciar OAuth desde cURL, pero puedes probar el token generado:
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer TOKEN_OBTENIDO_DE_OAUTH"
```

### Errores Comunes OAuth

#### Error: "redirect_uri_mismatch"

**Causa:** La URL de callback no coincide con la configurada en Google/LinkedIn.

**Solución:**
- Verifica que `GOOGLE_CALLBACK_URL` / `LINKEDIN_CALLBACK_URL` en `.env` coincida exactamente con la URL configurada en la consola de desarrolladores
- Reinicia el servidor después de cambiar `.env`

#### Error: "Esta cuenta usa autenticación de google"

**Causa:** Usuario intenta login con email/password pero su cuenta está vinculada a OAuth.

**Solución:**
- Usa el botón "Continuar con Google" en lugar del formulario de login
- Esto es el comportamiento esperado para proteger la cuenta

#### Error: No se redirige después de OAuth

**Causa:** `FRONTEND_URL` no está configurado o es incorrecto.

**Solución:**
- Agrega `FRONTEND_URL=http://localhost:5173` a tu `.env`
- Verifica que el puerto coincida con tu frontend
- Reinicia el backend

### Consideraciones de Seguridad OAuth

1. **Tokens JWT**: Los tokens OAuth usan el mismo sistema JWT que email/password (válidos 24 horas)
2. **HTTPS en producción**: Siempre usa HTTPS para OAuth en producción
3. **Vinculación automática**: Solo ocurre con emails verificados por Google/LinkedIn
4. **No password**: Usuarios OAuth tienen `password: null` en la base de datos
5. **Avatar URL**: Se almacena la foto de perfil del proveedor OAuth

### Recursos Adicionales

- [Guía de Configuración OAuth](./OAUTH_SETUP.md) - Cómo obtener credenciales de Google/LinkedIn
- [Documentación de Sistema de Login](./SISTEMA_LOGIN.md) - Arquitectura general del sistema de autenticación
