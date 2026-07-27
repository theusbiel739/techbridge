import { JourneyEntry } from "../features/journey/JourneyEntry";

export function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Ir para o conteúdo principal
      </a>

      <header className="app-header">
        <a
          className="brand"
          href="#journey"
          aria-label="TechBridge Journey — início"
        >
          <span className="brand-mark" aria-hidden="true">
            TB
          </span>
          <span>
            <strong>TechBridge</strong>
            <small>Journey MVP</small>
          </span>
        </a>

        <nav className="header-actions" aria-label="Navegação principal">
          <a href="#journey">Jornada</a>
          <a href="#bridge">Travessia</a>
          <a href="#mentor">Mentor</a>
        </nav>
      </header>

      <main id="main-content">
        <section id="journey" aria-labelledby="hero-title">
          <JourneyEntry />
        </section>

        <section className="foundation-panel" aria-labelledby="foundation-title">
          <div>
            <p className="section-kicker">MVP de portfólio</p>
            <h2 id="foundation-title">Uma travessia prática e local</h2>
          </div>
          <p>
            Complete missões, acompanhe seu progresso e monte um currículo
            guiado. Os dados ficam somente neste navegador; o mentor usa
            respostas fixas e não representa uma IA real.
          </p>
        </section>

        <section
          className="project-evolution"
          aria-labelledby="project-evolution-title"
        >
          <header className="project-evolution-heading">
            <p className="section-kicker">Evolução do TechBridge</p>
            <h2 id="project-evolution-title">Da aula para a missão</h2>
            <p>
              A v2 mantém os temas da primeira versão e transforma explicações
              em passos que o usuário pode praticar.
            </p>
          </header>

          <div className="project-evolution-grid">
            <article>
              <p className="evolution-topic">E-mail</p>
              <h3>Do conteúdo à prática</h3>
              <p>De conteúdo explicativo para uma missão prática.</p>
            </article>

            <article>
              <p className="evolution-topic">Currículo</p>
              <h3>Da orientação à construção</h3>
              <p>De orientação para um currículo guiado com prévia.</p>
            </article>

            <article>
              <p className="evolution-topic">Questionários</p>
              <h3>Do teste à travessia</h3>
              <p>
                De teste básico para diagnóstico e travessia com progresso.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
