import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "./firebase";

const services = [
  {
    title: "Terapia individual",
    copy: "Acompanamiento para ansiedad, estres, autoestima y cambios de vida.",
  },
  {
    title: "Orientacion para parejas",
    copy: "Espacios para conversar, reparar acuerdos y mejorar la comunicacion.",
  },
  {
    title: "Atencion online",
    copy: "Sesiones por videollamada con horarios flexibles y seguimiento cercano.",
  },
];

const steps = [
  "Agenda una primera llamada",
  "Define objetivos terapeuticos",
  "Avanza con sesiones semanales",
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
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Inicio">
          <span>PS</span>
          Psic. Sofia Ramirez
        </a>
        <nav aria-label="Navegacion principal">
          <a href="#servicios">Servicios</a>
          <a href="#proceso">Proceso</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <section className="hero-section" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">Psicoterapia online y presencial</p>
          <h1 id="hero-title">Un espacio seguro para volver a ti</h1>
          <p>
            Acompanamiento psicologico para adultos que buscan manejar la
            ansiedad, ordenar emociones y construir relaciones mas sanas.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#contacto">
              Agendar consulta
            </a>
            <a className="secondary-link" href="#servicios">
              Ver servicios
            </a>
          </div>
        </div>

        <aside className="booking-card" aria-label="Informacion de consulta">
          <p className="card-label">Primera sesion</p>
          <strong>50 minutos</strong>
          <span>Online o presencial</span>
          <span>Confidencial y personalizada</span>
        </aside>
      </section>

      <section className="section-grid" id="servicios" aria-labelledby="services-title">
        <div>
          <p className="eyebrow">Servicios</p>
          <h2 id="services-title">Terapia con calidez y claridad</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <span aria-hidden="true">+</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-title">
        <div>
          <p className="eyebrow">Sobre la consulta</p>
          <h2 id="about-title">Atencion profesional centrada en tu historia</h2>
        </div>
        <p>
          La consulta combina escucha activa, herramientas practicas y objetivos
          claros para que cada proceso avance a tu ritmo. Trabajamos desde el
          respeto, la confidencialidad y una mirada humana.
        </p>
      </section>

      <section className="process-section" id="proceso" aria-labelledby="process-title">
        <p className="eyebrow">Proceso</p>
        <h2 id="process-title">Comenzar es simple</h2>
        <div className="step-grid">
          {steps.map((step, index) => (
            <article className="step-card" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="portal-section" aria-labelledby="portal-title">
        <div>
          <p className="eyebrow">Portal de pacientes</p>
          <h2 id="portal-title">Accede con tu cuenta de Google</h2>
          <p>
            Usa el acceso seguro para futuras herramientas: historial de citas,
            recursos y seguimiento entre sesiones.
          </p>
        </div>

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

      <section className="contact-section" id="contacto" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">Contacto</p>
          <h2 id="contact-title">Agenda una primera consulta</h2>
          <p>
            Escribe para coordinar disponibilidad, modalidad de atencion y el
            motivo de consulta.
          </p>
        </div>
        <div className="contact-card">
          <a href="mailto:hola@psicologiasofia.com">hola@psicologiasofia.com</a>
          <a href="tel:+56912345678">+56 9 1234 5678</a>
          <span>Av. Providencia 1234, Santiago</span>
        </div>
      </section>
    </main>
  );
}

export default App;
