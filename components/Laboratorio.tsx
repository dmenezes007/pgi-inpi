import React, { useMemo, useState } from 'react';

type LabSection = {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
};

const Laboratorio: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const sections = useMemo<LabSection[]>(
    () => [
      {
        id: 'finalidade',
        title: 'Finalidade e Diretrizes',
        subtitle: 'Escopo institucional e foco em valor público',
        content: (
          <div className="space-y-3">
            <p className="module-section-text">
              O Laboratório de Inovação foi desenhado como ambiente institucional de confiança para testar
              soluções com segurança, foco em usuários e alinhamento ao planejamento estratégico do INPI.
            </p>
            <ul className="module-list">
              <li className="module-list-item"><span className="module-list-icon">•</span><span>Centralidade no usuário e melhoria da experiência dos serviços.</span></li>
              <li className="module-list-item"><span className="module-list-icon">•</span><span>Experimentação controlada com prototipagem, testes e validação.</span></li>
              <li className="module-list-item"><span className="module-list-icon">•</span><span>Rastreabilidade, transparência e aprendizagem organizacional contínua.</span></li>
            </ul>
          </div>
        )
      },
      {
        id: 'governanca',
        title: 'Governança e Operação',
        subtitle: 'Papéis complementares entre nível estratégico e execução',
        content: (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="module-note-box">
              <p className="module-pill">Comitê de Governança Interna</p>
              <p className="module-section-text mt-3">
                Acompanha direção macroestratégica, priorização do portfólio e conexão com objetivos
                institucionais do SGI.
              </p>
            </div>
            <div className="module-note-box">
              <p className="module-pill">Gerência Executiva do Laboratório</p>
              <p className="module-section-text mt-3">
                Coordena triagem, maturação, prototipagem, articulação de parceiros, indicadores e relatório
                anual de resultados.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'ciclo',
        title: 'Ciclo de Inovação',
        subtitle: 'Fluxo operacional do laboratório em sete etapas',
        content: (
          <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              'Estímulo e captação de ideias',
              'Detalhamento das propostas',
              'Prototipagem, testes e validação',
              'Ajustes com escuta dos usuários',
              'Implantação assistida',
              'Mensuração e consolidação de aprendizados',
              'Ampliação de escala'
            ].map((step, index) => (
              <li key={step} className="module-card p-4">
                <p className="mt-0.5 block text-sm text-slate-500 uppercase font-semibold">Etapa {index + 1}</p>
                <p className="module-section-text mt-1">{step}</p>
              </li>
            ))}
          </ol>
        )
      },
      {
        id: 'placeholder',
        title: 'Documentos e Downloads',
        subtitle: 'Espaço para materiais normativos e operacionais',
        content: (
          <div className="module-note-box">
            <p className="module-section-text">
              Placeholder reservado para disponibilização da Minuta da Política de Relacionamento do INPI com
              Fundações de Apoio.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" disabled className="module-button-secondary opacity-60 cursor-not-allowed">
                Baixar Minuta (placeholder)
              </button>
              <span className="mt-0.5 block text-sm text-slate-500 uppercase">Arquivo será disponibilizado em breve.</span>
            </div>
          </div>
        )
      }
    ],
    []
  );

  const sectionIds = sections.map((section) => section.id);

  const toggleSection = (sectionId: string) => {
    setOpenSections((current) =>
      current.includes(sectionId) ? current.filter((id) => id !== sectionId) : [...current, sectionId]
    );
  };

  const expandAll = () => setOpenSections(sectionIds);
  const collapseAll = () => setOpenSections([]);

  return (
    <div className="module-page">
      <h1 className="module-title">Laboratório</h1>

      <div className="module-intro">
        <div className="module-kicker">LABORATÓRIO DE INOVAÇÃO</div>
        <p className="module-lead">
          O módulo Laboratório organiza, de forma visual e objetiva, os principais elementos da proposta
          normativa relacionados à finalidade, governança e operação do ambiente experimental do INPI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="module-card">
          <p className="mt-0.5 block text-sm text-slate-500 uppercase">Foco</p>
          <h3 className="module-section-title mt-2">Valor Público</h3>
          <p className="module-section-text">Inovação aplicada para melhorar gestão, serviços e experiência do usuário.</p>
        </article>
        <article className="module-card">
          <p className="mt-0.5 block text-sm text-slate-500 uppercase">Abrangência</p>
          <h3 className="module-section-title mt-2">Interna e Externa</h3>
          <p className="module-section-text">Projetos conectados aos macroprocessos do INPI e a desafios do ecossistema.</p>
        </article>
        <article className="module-card">
          <p className="mt-0.5 block text-sm text-slate-500 uppercase">Entrega</p>
          <h3 className="module-section-title mt-2">Ciclos Contínuos</h3>
          <p className="module-section-text">Ideação, teste, ajuste, implantação e escalabilidade com monitoramento.</p>
        </article>
      </div>

      <section className="module-card p-0 overflow-hidden">
        <div>
          {sections.map((section) => {
            const isOpen = openSections.includes(section.id);

            return (
              <article key={section.id} className="border-b border-slate-200 last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-blue-50/70 transition-colors"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={isOpen}
                >
                  <span>
                    <span className="block text-base font-semibold text-slate-900">{section.title}</span>
                    <span className="mt-0.5 block text-sm text-slate-500">{section.subtitle}</span>
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-blue-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && <div className="px-5 pb-5">{section.content}</div>}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Laboratorio;
