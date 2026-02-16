# Configuración OAuth para Vitronepro

Esta guía te ayudará a configurar la autenticación OAuth con **Google** y **LinkedIn** para Vitronepro.

## Tabla de Contenidos

1. [Configuración de Google OAuth](#configuración-de-google-oauth)
2. [Configuración de LinkedIn OAuth](#configuración-de-linkedin-oauth)
3. [Variables de Entorno](#variables-de-entorno)
4. [Troubleshooting](#troubleshooting)

---

## Configuración de Google OAuth

### Paso 1: Crear un Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Haz clic en el selector de proyectos en la parte superior
3. Haz clic en "**Nuevo Proyecto**"
4. Ingresa un nombre para tu proyecto (ej: "Vitronepro Auth")
5. Haz clic en "**Crear**"

### Paso 2: Habilitar la API de Google+

1. En el menú lateral, ve a "**APIs y servicios**" → "**Biblioteca**"
2. Busca "**Google+ API**"
3. Haz clic en la API y luego en "**Habilitar**"

### Paso 3: Crear Credenciales OAuth 2.0

1. En el menú lateral, ve a "**APIs y servicios**" → "**Credenciales**"
2. Haz clic en "**Crear credenciales**" → "**ID de cliente de OAuth**"
3. Si es tu primera vez, deberás configurar la **pantalla de consentimiento**:
   - Selecciona "**Externo**" (o "Interno" si es para uso en tu organización)
   - Completa los campos obligatorios:
     - Nombre de la aplicación: `Vitronepro`
     - Correo electrónico de asistencia: tu email
     - Dominios autorizados: deja vacío por ahora
   - En "**Scopes**", agrega: `/auth/userinfo.email` y `/auth/userinfo.profile`
   - Guarda y continúa

4. Vuelve a "**Credenciales**" → "**Crear credenciales**" → "**ID de cliente de OAuth**"
5. Selecciona "**Aplicación web**"
6. Configura los siguientes campos:

   **Nombre:** `Vitronepro Backend`

   **Orígenes autorizados de JavaScript:**
   ```
   http://localhost:3000
   http://localhost:5173
   ```

   **URIs de redireccionamiento autorizados:**
   ```
   http://localhost:3000/auth/google/callback
   ```

7. Haz clic en "**Crear**"
8. **¡Guarda tus credenciales!**
   - **Client ID**: Lo necesitarás para `GOOGLE_CLIENT_ID`
   - **Client Secret**: Lo necesitarás para `GOOGLE_CLIENT_SECRET`

### Paso 4: Configurar Variables de Entorno

Copia las credenciales en tu archivo `.env`:

```env
GOOGLE_CLIENT_ID=tu-client-id-aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret-aqui
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

---

## Configuración de LinkedIn OAuth

### Paso 1: Crear una Aplicación en LinkedIn Developers

1. Ve a [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Haz clic en "**My Apps**" en el menú superior
3. Haz clic en "**Create app**"
4. Completa los campos obligatorios:
   - **App name**: `Vitronepro`
   - **LinkedIn Page**: Selecciona o crea una página de LinkedIn (requerido)
   - **Privacy policy URL**: Tu URL de política de privacidad (puedes usar una temporal como `http://localhost:3000/privacy`)
   - **App logo**: Sube un logo (opcional pero recomendado)
5. Acepta los términos y haz clic en "**Create app**"

### Paso 2: Configurar Permisos

1. En tu aplicación recién creada, ve a la pestaña "**Products**"
2. Solicita acceso a:
   - **Sign In with LinkedIn** (obligatorio)
   - Haz clic en "**Request access**"
3. Espera la aprobación (normalmente es instantánea)

### Paso 3: Configurar OAuth 2.0 Settings

1. Ve a la pestaña "**Auth**"
2. En la sección "**OAuth 2.0 settings**", encontrarás:
   - **Client ID**: Cópialo para usar en `LINKEDIN_CLIENT_ID`
   - **Client Secret**: Haz clic en "Show" y cópialo para `LINKEDIN_CLIENT_SECRET`

3. En "**Authorized redirect URLs for your app**", agrega:
   ```
   http://localhost:3000/auth/linkedin/callback
   ```
4. Haz clic en "**Update**" para guardar

### Paso 4: Configurar Variables de Entorno

Copia las credenciales en tu archivo `.env`:

```env
LINKEDIN_CLIENT_ID=tu-linkedin-client-id-aqui
LINKEDIN_CLIENT_SECRET=tu-linkedin-client-secret-aqui
LINKEDIN_CALLBACK_URL=http://localhost:3000/auth/linkedin/callback
```

---

## Variables de Entorno

Tu archivo `.env` debe contener las siguientes variables OAuth:

```env
# OAuth - Google
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# OAuth - LinkedIn
LINKEDIN_CLIENT_ID=tu-linkedin-client-id
LINKEDIN_CLIENT_SECRET=tu-linkedin-client-secret
LINKEDIN_CALLBACK_URL=http://localhost:3000/auth/linkedin/callback

# Frontend URL para OAuth redirects
FRONTEND_URL=http://localhost:5173
```

**Notas importantes:**
- Reemplaza `http://localhost:3000` con tu URL de backend
- Reemplaza `http://localhost:5173` con tu URL de frontend
- En producción, usa **HTTPS** para todas las URLs

---

## Troubleshooting

### Error: "redirect_uri_mismatch" (Google)

**Causa:** La URL de callback no coincide con las configuradas en Google Cloud Console.

**Solución:**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/) → Credenciales
2. Haz clic en tu OAuth 2.0 Client ID
3. Verifica que `http://localhost:3000/auth/google/callback` esté en "**URIs de redireccionamiento autorizados**"
4. Asegúrate de que `GOOGLE_CALLBACK_URL` en `.env` sea **exactamente igual**
5. Reinicia tu servidor backend después de cambiar `.env`

### Error: "redirect_uri does not match" (LinkedIn)

**Causa:** Similar a Google, la URL de callback no coincide.

**Solución:**
1. Ve a [LinkedIn Developers](https://www.linkedin.com/developers/) → My Apps → Tu App → Auth
2. Verifica que `http://localhost:3000/auth/linkedin/callback` esté en "**Authorized redirect URLs**"
3. Asegúrate de que `LINKEDIN_CALLBACK_URL` en `.env` sea **exactamente igual**
4. Reinicia tu servidor backend

### Error: "Invalid Client" (Google o LinkedIn)

**Causa:** Client ID o Client Secret incorrectos o con espacios extra.

**Solución:**
1. Verifica que `GOOGLE_CLIENT_ID` / `LINKEDIN_CLIENT_ID` no tengan espacios al inicio o final
2. Verifica que `GOOGLE_CLIENT_SECRET` / `LINKEDIN_CLIENT_SECRET` estén correctos
3. Regenera las credenciales si es necesario:
   - **Google:** Console → Credenciales → OAuth 2.0 Client IDs → Reset secret
   - **LinkedIn:** My Apps → Tu App → Auth → Regenerate client secret

### Error: "Access Denied" después de autorizar (LinkedIn)

**Causa:** Permisos insuficientes o producto "Sign In with LinkedIn" no aprobado.

**Solución:**
1. Ve a tu app en LinkedIn Developers → Products
2. Verifica que "**Sign In with LinkedIn**" esté aprobado (icono de check verde)
3. Si está pendiente, espera la aprobación (normalmente instantánea)
4. Verifica que los scopes en `linkedin.strategy.ts` sean: `['r_emailaddress', 'r_liteprofile']`

### El usuario no se redirige después de login OAuth

**Causa:** `FRONTEND_URL` no está configurado o es incorrecto.

**Solución:**
1. Agrega `FRONTEND_URL=http://localhost:5173` a tu `.env`
2. Reemplaza el puerto si tu frontend usa otro
3. Reinicia el backend

### Error: "Cannot read properties of undefined (reading 'value')"

**Causa:** El proveedor OAuth no está retornando email o perfil.

**Solución para Google:**
1. Verifica que los scopes en `google.strategy.ts` incluyan `['email', 'profile']`
2. En Google Cloud Console, verifica que la API de Google+ esté habilitada

**Solución para LinkedIn:**
1. Verifica que tu app tenga acceso al producto "Sign In with LinkedIn"
2. Verifica los scopes: `['r_emailaddress', 'r_liteprofile']`

### La base de datos lanza error al guardar usuario OAuth

**Causa:** Campos OAuth no existen en la base de datos.

**Solución:**
1. Verifica que `src/users/user.entity.ts` tenga los campos OAuth:
   ```typescript
   password: string | null;  // debe ser nullable
   authProvider: 'local' | 'google' | 'linkedin' | null;
   oauthId: string | null;
   avatarUrl: string | null;
   ```
2. Si tienes `synchronize: false`, crea y ejecuta una migración:
   ```bash
   npm run migration:generate -- -n AddOAuthFields
   npm run migration:run
   ```

---

## Configuración para Producción

Cuando despliegues a producción:

### Google OAuth

1. Ve a Google Cloud Console → Credenciales → Tu OAuth Client
2. Agrega tus URLs de producción:
   - **Orígenes autorizados**: `https://api.tudominio.com`
   - **URIs de redireccionamiento**: `https://api.tudominio.com/auth/google/callback`
3. Actualiza `.env` de producción:
   ```env
   GOOGLE_CALLBACK_URL=https://api.tudominio.com/auth/google/callback
   FRONTEND_URL=https://tudominio.com
   ```

### LinkedIn OAuth

1. Ve a LinkedIn Developers → Tu App → Auth
2. Agrega tu URL de producción: `https://api.tudominio.com/auth/linkedin/callback`
3. Actualiza `.env` de producción:
   ```env
   LINKEDIN_CALLBACK_URL=https://api.tudominio.com/auth/linkedin/callback
   FRONTEND_URL=https://tudominio.com
   ```

### Seguridad en Producción

- ✅ Usa **HTTPS** para todas las URLs
- ✅ Guarda las credenciales OAuth en un gestor de secretos (AWS Secrets Manager, Vault, etc.)
- ✅ Rota los Client Secrets periódicamente
- ✅ Deshabilita `synchronize: true` en TypeORM
- ✅ Configura CORS correctamente para permitir solo tu frontend

---

## Testing Local

Para probar que OAuth funciona correctamente:

1. Inicia el backend:
   ```bash
   npm run start:dev
   ```

2. Abre tu navegador y ve a:
   - **Google:** `http://localhost:3000/auth/google`
   - **LinkedIn:** `http://localhost:3000/auth/linkedin`

3. Autoriza la aplicación

4. Si todo está bien, serás redirigido a:
   ```
   http://localhost:5173/auth/callback?token=JWT_TOKEN_AQUI
   ```

5. Verifica que el token funcione:
   ```bash
   curl http://localhost:3000/auth/profile \
     -H "Authorization: Bearer TU_TOKEN_AQUI"
   ```

---

## Recursos Adicionales

- [Google OAuth 2.0 Docs](https://developers.google.com/identity/protocols/oauth2)
- [LinkedIn OAuth 2.0 Docs](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authentication)
- [Passport.js Google Strategy](http://www.passportjs.org/packages/passport-google-oauth20/)
- [Passport.js LinkedIn Strategy](http://www.passportjs.org/packages/passport-linkedin-oauth2/)

---

## Soporte

Si tienes problemas con la configuración OAuth, verifica:

1. ✅ Todas las variables de entorno están en `.env`
2. ✅ Las URLs de callback coinciden exactamente (sin espacios, sin barras extra)
3. ✅ Los productos/APIs están habilitados en las consolas de Google/LinkedIn
4. ✅ El backend está corriendo en el puerto correcto
5. ✅ Los logs del backend para ver errores específicos

Para más ayuda, consulta los documentos de arquitectura en el repositorio.
