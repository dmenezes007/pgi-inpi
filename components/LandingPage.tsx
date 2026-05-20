import React, { useMemo, useState } from 'react';
import { MODULES } from '../constants';
import { Project } from '../App';

interface LandingPageProps {
  onLogin: (password: string) => boolean;
  projects: Project[];
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, projects }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const featuredProjects = useMemo(() => projects.slice(0, 6), [projects]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const ok = onLogin(password);
    if (!ok) {
      setError('Senha incorreta. Verifique a credencial institucional.');
      return;
    }

    setError('');
    setPassword('');
  };

  return (
    <div className="landing-root text-slate-900 bg-brand-light min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-accent via-brand-violet to-brand-cyan p-[2px]">
              <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center font-bold text-brand-accent">
                P
              </div>
            </div>
            <div>
              <p className="font-extrabold tracking-tight leading-none">PGI</p>
              <p className="text-xs text-slate-500 leading-none mt-1">Portal da Gestao da Inovacao - INPI</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#contexto" className="hover:text-slate-900 transition-colors">Contexto</a>
            <a href="#modulos" className="hover:text-slate-900 transition-colors">Modulos</a>
            <a href="#projetos" className="hover:text-slate-900 transition-colors">Projetos</a>
            <a href="#acesso" className="hover:text-slate-900 transition-colors">Acesso</a>
          </nav>

          <a href="#acesso" className="rounded-full px-5 py-2.5 text-sm font-semibold glass-premium hover:border-slate-300 transition-all">
            Entrar no Portal
          </a>
        </div>
      </header>

      <section id="hero" className="relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-brand-violet/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white border border-slate-200/80 px-4 py-2 rounded-full text-slate-700">
            Programa institucional
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          </div>

          <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.06] max-w-5xl">
            Portal da Gestao da Inovacao do INPI
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-violet to-brand-cyan">
              diretrizes metodologicas, governanca e execucao institucional em um unico ambiente
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-slate-600 leading-relaxed">
            O PGI consolida a proposta da CGRH e da Academia de Propriedade Intelectual,
            Inovacao e Desenvolvimento para reconhecer a inovacao como pilar estrategico da
            transformacao organizacional do INPI.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="#modulos" className="px-8 py-4 rounded-full bg-slate-950 text-white font-semibold shadow-lg shadow-slate-900/20">
              Explorar modulos
            </a>
            <a href="#acesso" className="px-8 py-4 rounded-full glass-premium font-semibold text-center">
              Acesso restrito
            </a>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-premium rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">Modulos ativos</p>
              <p className="text-3xl font-extrabold mt-2">{MODULES.length}</p>
            </div>
            <div className="glass-premium rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">Projetos estrategicos</p>
              <p className="text-3xl font-extrabold mt-2">{projects.length}</p>
            </div>
            <div className="glass-premium rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">Horizonte</p>
              <p className="text-3xl font-extrabold mt-2">2025-2026</p>
            </div>
            <div className="glass-premium rounded-2xl p-5">
              <p className="text-xs uppercase tracking-wider text-slate-500">Foco</p>
              <p className="text-lg font-bold mt-3">Valor publico e eficiencia institucional</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contexto" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-4xl">
            O PGI integra capacidades tecnicas e gerenciais para fortalecer a politica de inovacao
            na administracao publica federal.
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-slate-200 p-7 bg-slate-50/60">
              <h3 className="text-xl font-bold">Direcionamento estrategico</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Alinha iniciativas de inovacao aos objetivos do planejamento institucional,
                com priorizacao de resultados finalisticos para os servicos do INPI.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 p-7 bg-slate-50/60">
              <h3 className="text-xl font-bold">Metodologia aplicada</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Estrutura o ciclo de ideacao, desenvolvimento, implantacao, mensuracao e aprendizado,
                com orientacao para melhoria continua e gestao do conhecimento.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 p-7 bg-slate-50/60">
              <h3 className="text-xl font-bold">Governanca e transparencia</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Consolida riscos, recursos, indicadores e cronogramas para acompanhamento executivo,
                com apoio das unidades DIRPA, DIRMA, CGTI, CQUAL e CGRH.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="modulos" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-accent">Arquitetura do portal</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">Modulos que estruturam a jornada de gestao da inovacao</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((moduleName) => (
              <div key={moduleName} className="rounded-xl border border-slate-200 bg-white px-5 py-4 font-semibold text-slate-700 hover:border-brand-accent/40 transition-colors">
                {moduleName}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projetos" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-violet">Base de projetos</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">Portifolio estrategico priorizado no PGI</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <article key={project.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-cyan">{project.id}</p>
                <h3 className="mt-2 text-xl font-bold leading-tight">{project.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{project.scope}</p>
                <p className="mt-3 text-xs font-semibold tracking-wide text-slate-500 uppercase">Acompanhamento por indicadores de desempenho e impacto</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="acesso" className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-accent/20 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Acesso restrito ao ambiente interno do PGI</h2>
          <p className="mt-4 text-slate-300">
            Utilize a credencial institucional para acessar o ambiente interno com conteudos metodologicos,
            modulos tematicos e acompanhamento de projetos estrategicos.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 glass-dark rounded-3xl p-7 md:p-10 border border-white/10 text-left max-w-xl mx-auto">
            <label htmlFor="portal-password" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Senha de acesso
            </label>
            <input
              id="portal-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Digite a senha institucional"
              required
              className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/15 focus:outline-none focus:border-brand-accent"
            />
            {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}

            <button
              type="submit"
              className="mt-5 w-full rounded-xl py-3.5 font-bold bg-white text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Entrar no PGI
            </button>
          </form>

          <img
            src="https://dmenezes007.github.io/pgi-inpi/files/imgs/logo_inpi_branco_fundo_transparente.png"
            alt="Logo do INPI"
            className="h-14 mx-auto mt-10"
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
