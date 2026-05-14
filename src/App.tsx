import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "./firebase";

const features = [
  "Login con Google via Firebase Auth",
  "Sesion persistente en el navegador",
  "Base lista para proteger rutas",
];

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
  }, []);

  const handleGoogleLogin = async () => {
    if (!auth) {
      setErrorMessage("Configura Firebase en .env.local para iniciar sesion.");
      return;
    }

    setErrorMessage("");

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo iniciar sesion con Google.";
      setErrorMessage(message);
    }
  };

  const handleLogout = async () => {
    if (!auth) {
      return;
    }

    setErrorMessage("");
    await signOut(auth);
  };

  return (
    <main className="app-shell">
      <section className="hero-card" aria-labelledby="hero-title">
        <p className="eyebrow">Firebase Auth</p>
        <h1 id="hero-title">Login con Google en React</h1>
        <p className="hero-copy">
          Inicia sesion con una cuenta de Google usando Firebase Authentication
          y conserva el estado del usuario en la app.
        </p>

        <div className="auth-panel" aria-live="polite">
          {!isFirebaseConfigured ? (
            <p className="config-warning">
              Falta configurar Firebase. Copia `.env.example` a `.env.local` y
              completa los valores de tu proyecto.
            </p>
          ) : null}

          {isLoading ? (
            <p className="status-text">Revisando sesion...</p>
          ) : user ? (
            <div className="user-card">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
              ) : (
                <span className="avatar-fallback" aria-hidden="true">
                  {user.displayName?.charAt(0) ?? user.email?.charAt(0) ?? "G"}
                </span>
              )}
              <div>
                <p className="status-text">Sesion iniciada</p>
                <strong>{user.displayName ?? "Usuario de Google"}</strong>
                <small>{user.email}</small>
              </div>
            </div>
          ) : (
            <button
              className="google-button"
              type="button"
              onClick={handleGoogleLogin}
              disabled={!isFirebaseConfigured}
            >
              <span aria-hidden="true">G</span>
              Continuar con Google
            </button>
          )}

          {user ? (
            <button className="secondary-button" type="button" onClick={handleLogout}>
              Cerrar sesion
            </button>
          ) : null}

          {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
        </div>
      </section>

      <section className="feature-grid" aria-label="Tecnologias incluidas">
        {features.map((feature) => (
          <article className="feature-card" key={feature}>
            <span aria-hidden="true">✓</span>
            <p>{feature}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
