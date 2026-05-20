import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MODULES } from '../constants';
import { Project } from '../App';
import ModuleIcon from './ModuleIcon';

interface ModuleMeta {
  desc: string;
  accentBar: string;
  iconBg: string;
  titleColor: string;
}

const MODULE_META: Record<string, ModuleMeta> = {
  'Início':         { desc: 'Apresentação do portal e orientação de navegação para todos os perfis de acesso.',                      accentBar: 'from-blue-500',    iconBg: 'group-hover:bg-blue-500',    titleColor: 'group-hover:text-blue-600'    },
  'Metodologia':    { desc: 'Ciclo estruturado com etapas claras de ideação, desenvolvimento e entrega de soluções.',               accentBar: 'from-violet-500',  iconBg: 'group-hover:bg-violet-500',  titleColor: 'group-hover:text-violet-600'  },
  'Definições':     { desc: 'Conceitos fundamentais que embasam a política de gestão da inovação no INPI.',                         accentBar: 'from-cyan-500',    iconBg: 'group-hover:bg-cyan-500',    titleColor: 'group-hover:text-cyan-600'    },
  'Tipologia':      { desc: 'Classificação dos tipos de inovação reconhecidos na abordagem institucional.',                         accentBar: 'from-pink-500',    iconBg: 'group-hover:bg-pink-500',    titleColor: 'group-hover:text-pink-500'    },
  'Objetivos':      { desc: 'Metas e propósitos que orientam o programa de gestão da inovação institucional.',                      accentBar: 'from-amber-500',   iconBg: 'group-hover:bg-amber-500',   titleColor: 'group-hover:text-amber-600'   },
  'Princípios':     { desc: 'Valores e diretrizes que guiam as decisões e práticas inovadoras da instituição.',                     accentBar: 'from-emerald-500', iconBg: 'group-hover:bg-emerald-500', titleColor: 'group-hover:text-emerald-600' },
  'Estímulo':       { desc: 'Mecanismos e ações para fomentar a cultura de inovação entre os servidores do INPI.',                  accentBar: 'from-blue-500',    iconBg: 'group-hover:bg-blue-500',    titleColor: 'group-hover:text-blue-600'    },
  'Desenvolvimento':{ desc: 'Processo de amadurecimento e estruturação das iniciativas inovadoras priorizadas.',                    accentBar: 'from-violet-500',  iconBg: 'group-hover:bg-violet-500',  titleColor: 'group-hover:text-violet-600'  },
  'Implantação':    { desc: 'Execução e entrega das soluções desenvolvidas no contexto institucional do INPI.',                     accentBar: 'from-cyan-500',    iconBg: 'group-hover:bg-cyan-500',    titleColor: 'group-hover:text-cyan-600'    },
  'Mensuração':     { desc: 'Indicadores e métricas para aferir o desempenho e impacto dos projetos de inovação.',                 accentBar: 'from-pink-500',    iconBg: 'group-hover:bg-pink-500',    titleColor: 'group-hover:text-pink-500'    },
  'Aprendizado':    { desc: 'Gestão do conhecimento e incorporação de lições aprendidas para ciclos futuros.',                      accentBar: 'from-amber-500',   iconBg: 'group-hover:bg-amber-500',   titleColor: 'group-hover:text-amber-600'   },
  'Sistema':        { desc: 'Infraestrutura e processos que sustentam a operação do programa de inovação.',                         accentBar: 'from-emerald-500', iconBg: 'group-hover:bg-emerald-500', titleColor: 'group-hover:text-emerald-600' },
  'Governança':     { desc: 'Estrutura decisória, papéis e responsabilidades na condução da inovação institucional.',               accentBar: 'from-blue-500',    iconBg: 'group-hover:bg-blue-500',    titleColor: 'group-hover:text-blue-600'    },
  'Estratégias':    { desc: 'Diretrizes gerenciais para a atuação e o desenvolvimento de competências em inovação.',                accentBar: 'from-violet-500',  iconBg: 'group-hover:bg-violet-500',  titleColor: 'group-hover:text-violet-600'  },
  'Documentação':   { desc: 'Minutas, registros e referências institucionais do Design Sprint e do programa PGI.',                  accentBar: 'from-cyan-500',    iconBg: 'group-hover:bg-cyan-500',    titleColor: 'group-hover:text-cyan-600'    },
};

interface LandingPageProps {
  onLogin: (password: string) => boolean;
  projects: Project[];
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, projects }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'ideas' | 'ai'>('analytics');
  const [currentSlide, setCurrentSlide] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const featuredProjects = useMemo(() => projects.slice(0, 6), [projects]);
  const ctaClass =
    'inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold bg-slate-950 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-900 transition-colors';

  const SPRINT_PHOTOS = Array.from({ length: 24 }, (_, i) =>
    `https://dmenezes007.github.io/pgi-inpi/files/imgs/Foto%20%23${String(i + 1).padStart(2, '0')}.jpeg`
  );
  const PHOTOS_PER_SLIDE = 4;
  const photoSlides = Array.from(
    { length: Math.ceil(SPRINT_PHOTOS.length / PHOTOS_PER_SLIDE) },
    (_, i) => SPRINT_PHOTOS.slice(i * PHOTOS_PER_SLIDE, (i + 1) * PHOTOS_PER_SLIDE)
  );

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (activeTab !== 'ideas' || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const parent = canvas.parentElement;
    if (!parent) {
      return;
    }

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    const nodes = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 3 + 1,
    }));

    let animationId = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${1 - dist / 80})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = '#3B82F6';
        ctx.fill();
      });

      animationId = window.requestAnimationFrame(animate);
    };

    animate();
    return () => window.cancelAnimationFrame(animationId);
  }, [activeTab]);

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
    <div className="landing-root text-slate-900 bg-brand-light min-h-screen overflow-x-hidden relative">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-brand-accent/20 to-brand-cyan/10 rounded-full ambient-glow" />
      <div className="absolute top-[700px] right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-brand-violet/15 to-pink-500/5 rounded-full ambient-glow" />
      <div className="absolute top-[2200px] left-10 w-[700px] h-[700px] bg-brand-cyan/10 rounded-full ambient-glow" />
      <div className="absolute top-[3600px] right-10 w-[600px] h-[600px] bg-brand-accent/10 rounded-full ambient-glow" />

      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerScrolled ? 'glass-premium py-4 shadow-md border-b border-slate-200/80' : 'py-5 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#hero" className="flex items-center">
            <img
              src="https://dmenezes007.github.io/pgi-inpi/files/imgs/logo_inpi_branco_fundo_transparente.png"
              alt="INPI"
              className="h-10 w-auto"
              style={{ filter: 'brightness(0)' }}
            />
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#contexto" className="hover:text-slate-900 transition-colors">Contexto</a>
            <a href="#modulos" className="hover:text-slate-900 transition-colors">Módulos</a>
            <a href="#projetos" className="hover:text-slate-900 transition-colors">Projetos</a>
            <a href="#diferenciais" className="hover:text-slate-900 transition-colors">Diferenciais</a>
            <a href="#acesso" className="hover:text-slate-900 transition-colors">Acesso</a>
          </nav>

          <div className="hidden md:block">
            <a href="#acesso" className="rounded-full px-5 py-2.5 text-sm font-semibold glass-premium hover:border-slate-300 transition-all">Entrar no Portal</a>
          </div>

          <button className="md:hidden p-2 rounded-lg text-slate-800" onClick={() => setMobileOpen((v) => !v)} aria-label="Abrir menu">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        <div className={`${mobileOpen ? 'flex' : 'hidden'} md:hidden absolute top-full left-0 w-full glass-premium border-b border-slate-200/80 p-6 flex-col gap-4`}>
          <a href="#contexto" className="text-lg font-medium py-2 text-slate-800" onClick={() => setMobileOpen(false)}>Contexto</a>
          <a href="#modulos" className="text-lg font-medium py-2 text-slate-800" onClick={() => setMobileOpen(false)}>Módulos</a>
          <a href="#projetos" className="text-lg font-medium py-2 text-slate-800" onClick={() => setMobileOpen(false)}>Projetos</a>
          <a href="#diferenciais" className="text-lg font-medium py-2 text-slate-800" onClick={() => setMobileOpen(false)}>Diferenciais</a>
          <a href="#acesso" className="bg-slate-950 text-white text-center py-3 rounded-xl font-semibold" onClick={() => setMobileOpen(false)}>Acessar aplicação completa</a>
        </div>
      </header>

      <section id="hero" className="relative pt-36 pb-20 md:pt-48 md:pb-28 grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs font-semibold text-slate-800">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
              </span>
              Programa Institucional · INPI
            </div>
          </div>

          <div className="text-center max-w-5xl mx-auto mb-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.06] mb-6">
              Orquestre a inovação institucional com método, dados e propósito público.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-violet to-brand-cyan">
                Do planejamento à entrega — governança, portfólio e valor público.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
              O PGI consolida a proposta da CGRH e da Academia de Propriedade Intelectual,
              Inovação e Desenvolvimento para reconhecer a inovação como pilar estratégico da
              transformação organizacional do INPI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href="#acesso" className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-950 text-white font-semibold shadow-xl shadow-slate-950/10 hover:shadow-slate-950/20 text-center flex items-center justify-center gap-3 group">
              Acessar aplicação completa
            </a>
            <a href="#modulos" className="w-full sm:w-auto px-8 py-4 rounded-full glass-premium font-semibold text-center">
              Explorar módulos
            </a>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="glass-premium rounded-2xl p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-slate-500">Módulos ativos</p>
              <p className="text-3xl font-extrabold mt-2">{MODULES.length}</p>
            </div>
            <div className="glass-premium rounded-2xl p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-slate-500">Projetos estratégicos</p>
              <p className="text-3xl font-extrabold mt-2">{projects.length}</p>
            </div>
            <div className="glass-premium rounded-2xl p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-slate-500">Horizonte</p>
              <p className="text-3xl font-extrabold mt-2">2025-2026</p>
            </div>
            <div className="glass-premium rounded-2xl p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-slate-500">Foco</p>
              <p className="text-lg font-bold mt-3">Valor público e eficiência institucional</p>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto animate-float">
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-brand-accent/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-cyan/20 rounded-full blur-3xl opacity-50" />

            <div className="glass-premium rounded-2xl border border-slate-200/80 shadow-2xl overflow-hidden hover:shadow-brand-accent/10 transition-all duration-500">
              <div className="border-b border-slate-200/80 px-6 py-4 bg-white/90 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs text-slate-400 ml-4 font-mono font-medium">pgi-inpi_v1.0</span>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg gap-1 text-xs font-semibold text-slate-600">
                  <button className={`px-3 py-1.5 rounded-md ${activeTab === 'analytics' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`} onClick={() => setActiveTab('analytics')}>Analytics</button>
                  <button className={`px-3 py-1.5 rounded-md ${activeTab === 'ideas' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`} onClick={() => setActiveTab('ideas')}>Mapa de Ideias</button>
                  <button className={`px-3 py-1.5 rounded-md ${activeTab === 'ai' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`} onClick={() => setActiveTab('ai')}>Copiloto IA</button>
                </div>
              </div>

              <div className="p-4 md:p-8 bg-slate-50/50 min-h-[360px]">
                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Projetos monitorados</p>
                        <p className="text-3xl font-bold text-slate-900 tracking-tight mt-3">{projects.length}</p>
                      </div>
                      <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Módulos estruturantes</p>
                        <p className="text-3xl font-bold text-slate-900 tracking-tight mt-3">{MODULES.length}</p>
                      </div>
                      <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Engajamento interno</p>
                        <p className="text-3xl font-bold text-slate-900 tracking-tight mt-3">87%</p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-800 mb-4">Taxa de evolução do pipeline institucional</h3>
                      <div className="h-44 flex items-end justify-between gap-2 pt-4 border-b border-slate-100">
                        <div className="w-full bg-slate-100 rounded-t-lg h-16 relative"><div className="absolute bottom-0 left-0 w-full bg-brand-accent/80 h-[45%]" /></div>
                        <div className="w-full bg-slate-100 rounded-t-lg h-28 relative"><div className="absolute bottom-0 left-0 w-full bg-brand-accent/80 h-[60%]" /></div>
                        <div className="w-full bg-slate-100 rounded-t-lg h-36 relative"><div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-accent to-brand-violet h-[75%]" /></div>
                        <div className="w-full bg-slate-100 rounded-t-lg h-44 relative"><div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-brand-accent via-brand-violet to-brand-cyan h-[92%]" /></div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ideas' && (
                  <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-4">Estrutura conectada de iniciativas</h3>
                    <div className="relative w-full h-64 bg-slate-950 rounded-xl overflow-hidden">
                      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                    </div>
                  </div>
                )}

                {activeTab === 'ai' && (
                  <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-slate-800">Copiloto de governança e priorização</h3>
                    <p className="text-sm text-slate-600">Sugestão: consolidar iniciativas com escopo convergente entre unidades para reduzir sobreposição e ampliar impacto institucional.</p>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800">Aprovar recomendação</button>
                      <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200">Revisar conexões</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contexto" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-4xl">
            O PGI integra capacidades técnicas e gerenciais para fortalecer a política de inovação na administração pública federal.
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-slate-200 p-7 bg-slate-50/60 shadow-sm hover:shadow-lg transition-all"><h3 className="text-xl font-bold">Direcionamento estratégico</h3><p className="mt-3 text-slate-600">Alinha iniciativas ao planejamento institucional e aos serviços do INPI.</p></article>
            <article className="rounded-2xl border border-slate-200 p-7 bg-slate-50/60 shadow-sm hover:shadow-lg transition-all"><h3 className="text-xl font-bold">Metodologia aplicada</h3><p className="mt-3 text-slate-600">Estrutura ideação, desenvolvimento, implantação, mensuração e aprendizado contínuo.</p></article>
            <article className="rounded-2xl border border-slate-200 p-7 bg-slate-50/60 shadow-sm hover:shadow-lg transition-all"><h3 className="text-xl font-bold">Governança e transparência</h3><p className="mt-3 text-slate-600">Consolida riscos, recursos, indicadores e cronogramas para decisões executivas.</p></article>
          </div>
          <div className="mt-10 text-center"><a href="#acesso" className={ctaClass}>Acessar aplicação completa</a></div>
        </div>
      </section>

      <section id="modulos" className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-accent">Arquitetura do portal</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">Módulos que estruturam a jornada de gestão da inovação</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((moduleName) => {
              const meta = MODULE_META[moduleName] ?? { desc: '', accentBar: 'from-blue-500', iconBg: 'group-hover:bg-blue-500', titleColor: 'group-hover:text-blue-600' };
              return (
                <div key={moduleName} className="group relative p-7 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-all duration-300 hover:shadow-xl hover:shadow-slate-100">
                  {/* colored top accent bar */}
                  <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${meta.accentBar} to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  {/* icon */}
                  <div className={`w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 mb-5 ${meta.iconBg} group-hover:text-white transition-all duration-300`}>
                    <ModuleIcon moduleName={moduleName} className="h-5 w-5" />
                  </div>
                  {/* title */}
                  <h3 className={`text-base font-bold text-slate-900 mb-2 ${meta.titleColor} transition-colors duration-200`}>{moduleName}</h3>
                  {/* description */}
                  <p className="text-sm text-slate-500 leading-relaxed">{meta.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center"><a href="#acesso" className={ctaClass}>Acessar aplicação completa</a></div>
        </div>
      </section>

      <section id="projetos" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-violet">Base inicial de projetos</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight">Modelo de Portfólio de Projetos de Inovação (PA 2025)</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <article key={project.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm hover:shadow-lg transition-all">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-cyan">{project.id}</p>
                <h3 className="mt-2 text-xl font-bold leading-tight">{project.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{project.scope}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center"><a href="#acesso" className={ctaClass}>Acessar aplicação completa</a></div>
        </div>
      </section>

      <section id="diferenciais" className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-violet mb-3">Diferenciais técnicos</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">O que torna o PGI singular.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-premium p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all"><h3 className="text-lg font-bold mb-2">Governança orientada a dados</h3><p className="text-sm text-slate-500">Indicadores e evidências para priorização, execução e avaliação contínua.</p></div>
            <div className="glass-premium p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all"><h3 className="text-lg font-bold mb-2">Integração institucional</h3><p className="text-sm text-slate-500">Conecta áreas técnicas e gerenciais em um fluxo único de gestão da inovação.</p></div>
            <div className="glass-premium p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all"><h3 className="text-lg font-bold mb-2">Escalabilidade e rastreabilidade</h3><p className="text-sm text-slate-500">Padroniza processos para ampliar resultados e transparência na administração pública.</p></div>
          </div>
          <div className="mt-10 text-center"><a href="#acesso" className={ctaClass}>Acessar aplicação completa</a></div>
        </div>
      </section>

      <section id="depoimentos" className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-wider text-brand-accent mb-3">Percepção de valor</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">Oficina de Design Sprint institucional.</h2>
              <p className="mt-3 text-sm text-slate-500 font-light">Registro fotográfico das sessões de co-criação realizadas no âmbito do PGI/INPI.</p>
            </div>
            <div className="flex gap-2">
              <button
                className="w-12 h-12 rounded-full border border-slate-200 hover:bg-slate-50 text-2xl leading-none"
                onClick={() => setCurrentSlide((v) => (v - 1 + photoSlides.length) % photoSlides.length)}
                aria-label="Slide anterior"
              >‹</button>
              <button
                className="w-12 h-12 rounded-full border border-slate-200 hover:bg-slate-50 text-2xl leading-none"
                onClick={() => setCurrentSlide((v) => (v + 1) % photoSlides.length)}
                aria-label="Próximo slide"
              >›</button>
            </div>
          </div>

          <div className="relative overflow-hidden w-full rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {photoSlides.map((group, slideIdx) => (
                <div key={slideIdx} className="min-w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                  {group.map((src, imgIdx) => (
                    <div key={imgIdx} className="aspect-square overflow-hidden rounded-xl border border-slate-100 shadow-sm bg-slate-100">
                      <img
                        src={src}
                        alt={`Design Sprint INPI — foto ${slideIdx * 4 + imgIdx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {photoSlides.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i === currentSlide ? 'bg-slate-900' : 'bg-slate-300'}`}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-10 text-center"><a href="#acesso" className={ctaClass}>Acessar aplicação completa</a></div>
        </div>
      </section>

      <section id="acesso" className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-accent/20 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Acesso restrito ao ambiente interno do PGI</h2>
          <p className="mt-4 text-slate-300">
            Utilize a credencial institucional para acessar o ambiente interno com conteúdos metodológicos,
            módulos temáticos e acompanhamento de projetos estratégicos.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 glass-dark rounded-3xl p-7 md:p-10 border border-white/10 text-left max-w-xl mx-auto space-y-4">
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

      <footer className="py-16 bg-slate-950 text-white border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-10">
          <div className="md:col-span-5 space-y-4">
            <p className="font-bold text-xl">PGI INPI</p>
            <p className="text-sm text-slate-400 max-w-md">Portal institucional para orquestração estratégica da inovação com governança, metodologia e monitoramento de resultados.</p>
          </div>
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Navegação</h4>
            <a href="#modulos" className="block text-sm text-slate-400 hover:text-white">Módulos</a>
            <a href="#projetos" className="block text-sm text-slate-400 hover:text-white">Projetos</a>
            <a href="#acesso" className="block text-sm text-slate-400 hover:text-white">Acesso</a>
          </div>
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Atualizações</h4>
            <p className="text-sm text-slate-400">Envie mensagem para a equipe responsável:</p>
            <a
              href="mailto:projetos-pr@inpi.gov.br"
              className="inline-block text-sm text-brand-accent hover:text-blue-400 transition-colors"
            >
              projetos-pr@inpi.gov.br
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-xs text-slate-500">© 2026 INPI. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
};

export default LandingPage;
