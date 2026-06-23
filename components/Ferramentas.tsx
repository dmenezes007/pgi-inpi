import React, { useMemo, useState } from 'react';

type ToolGroup = {
  id: string;
  title: string;
  subtitle: string;
  practices: string[];
  application: string;
};

const Ferramentas: React.FC = () => {
  const [openGroups, setOpenGroups] = useState<string[]>(['design']);

  const groups = useMemo<ToolGroup[]>(
    () => [
      {
        id: 'design',
        title: 'Design e Experiência',
        subtitle: 'Abordagens centradas em usuário, clareza e serviço',
        practices: [
          'Design Thinking',
          'Design de Serviços',
          'Design Jurídico (Legal Design)',
          'Direito Visual (Visual Law)',
          'UX Design',
          'UI Design'
        ],
        application:
          'Indicadas para diagnóstico de problemas, prototipagem e simplificação da experiência de uso em serviços internos e externos.'
      },
      {
        id: 'dados',
        title: 'Dados e Comunicação',
        subtitle: 'Compreensão pública, leitura de cenário e evidências',
        practices: [
          'Linguagem Simples',
          'Design de Dados',
          'Visualização de Dados (Dataviz)'
        ],
        application:
          'Úteis para transformar dados em evidências acionáveis e comunicar decisões de forma transparente e acessível.'
      },
      {
        id: 'agil',
        title: 'Execução Ágil e Colaboração',
        subtitle: 'Ritmo de entrega, aprendizagem rápida e cocriação',
        practices: ['Hackathon', 'Kanban', 'Agile e Scrum'],
        application:
          'Apoiam ciclos curtos de experimentação, coordenação entre áreas e adaptação contínua durante a implementação.'
      },
      {
        id: 'transformacao',
        title: 'Transformação de Serviços Públicos',
        subtitle: 'Escala digital e inovação institucional',
        practices: ['Serviços Digitais (e-Services)', 'Governo Transformacional (t-Gov)'],
        application:
          'Orientam iniciativas de transformação digital com foco em transparência, prestação de contas e ampliação de valor público.'
      }
    ],
    []
  );

  const groupIds = groups.map((group) => group.id);

  const toggleGroup = (groupId: string) => {
    setOpenGroups((current) =>
      current.includes(groupId) ? current.filter((id) => id !== groupId) : [...current, groupId]
    );
  };

  const expandAll = () => setOpenGroups(groupIds);
  const collapseAll = () => setOpenGroups([]);

  return (
    <div className="module-page">
      <h1 className="module-title">Ferramentas</h1>

      <div className="module-intro">
        <div className="module-kicker">METODOLOGIAS E PRÁTICAS</div>
        <p className="module-lead">
          Metodologias, práticas e abordagens de inovação em trilhas temáticas, facilitando consulta rápida e
          aplicação prática no contexto do INPI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="module-card">
          <p className="module-meta-text">Base</p>
          <h3 className="module-section-title mt-2">Anexo Normativo</h3>
          <p className="module-section-text">Conjunto de referências para apoiar o SGI de ponta a ponta.</p>
        </article>
        <article className="module-card">
          <p className="module-meta-text">Uso</p>
          <h3 className="module-section-title mt-2">Aplicação Modular</h3>
          <p className="module-section-text">Seleção de ferramentas conforme desafio, maturidade e impacto esperado.</p>
        </article>
        <article className="module-card">
          <p className="module-meta-text">Resultado</p>
          <h3 className="module-section-title mt-2">Decisão Melhor</h3>
          <p className="module-section-text">Mais evidências, mais colaboração e maior efetividade na implementação.</p>
        </article>
      </div>

      <section className="module-card p-0 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="module-section-title !mb-0">Painel de Ferramentas</h2>
            <p className="module-meta-text mt-1">Explore cada trilha metodológica por meio dos acordeões.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="module-button-secondary text-sm" onClick={expandAll}>Expandir tudo</button>
            <button type="button" className="module-button-secondary text-sm" onClick={collapseAll}>Recolher tudo</button>
          </div>
        </div>

        <div>
          {groups.map((group) => {
            const isOpen = openGroups.includes(group.id);

            return (
              <article key={group.id} className="border-b border-slate-200 last:border-b-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-blue-50/70 transition-colors"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isOpen}
                >
                  <span>
                    <span className="block text-base font-semibold text-slate-900">{group.title}</span>
                    <span className="mt-0.5 block text-sm text-slate-500">{group.subtitle}</span>
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

                {isOpen && (
                  <div className="px-5 pb-5">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {group.practices.map((practice) => (
                          <span key={practice} className="module-pill">{practice}</span>
                        ))}
                      </div>
                      <p className="module-section-text">{group.application}</p>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Ferramentas;
