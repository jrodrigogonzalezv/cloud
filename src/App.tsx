const features = [
  "Vite para desarrollo rapido",
  "TypeScript listo para crecer",
  "React 19 con componentes funcionales",
];

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card" aria-labelledby="hero-title">
        <p className="eyebrow">Nueva app React</p>
        <h1 id="hero-title">Construye tu proxima experiencia web</h1>
        <p className="hero-copy">
          Esta base esta lista para desarrollar componentes, agregar rutas y
          conectar APIs sin configuracion extra.
        </p>
        <div className="actions">
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            Aprender React
          </a>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            Ver Vite
          </a>
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
