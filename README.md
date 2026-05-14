# React Cloud App

Web para una consulta psicologica creada con React, Vite, TypeScript y Firebase
Authentication para el portal de pacientes.

## Firebase

1. Crea un proyecto en Firebase.
2. Activa Authentication > Sign-in method > Google.
3. Copia `.env.example` a `.env.local`.
4. Completa las variables `VITE_FIREBASE_*` con la configuracion web de tu
   proyecto.

## Scripts

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: compila TypeScript y genera la version de produccion.
- `npm run preview`: sirve localmente la build generada.