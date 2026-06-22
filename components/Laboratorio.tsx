import React, { useMemo, useState } from 'react';

type LabSection = {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
};

const Laboratorio: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>(['finalidade']);

  const sections = useMemo<LabSection[]>(
    () => [
      {
        id: 'finalidade',
        title: 'Finalidade e Diretrizes',
        subtitle: 'Escopo institucional e foco em valor publico',
        content: (
          <div className="space-y-3">
            <p className="module-section-text">
              O Laboratorio de Inovacao foi desenhado como ambiente institucional de confianca para testar
              solucoes com seguranca, foco em usuarios e alinhamento ao planejamento estrategico do INPI.
            </p>
            <ul className="module-list">
              <li className="module-list-item"><span className="module-list-icon">•</span><span>Centralidade no usuario e melhoria da experiencia dos servicos.</span></li>
              <li className="module-list-item"><span className="module-list-icon">•</span><span>Experimentacao controlada com prototipagem, testes e validacao.</span></li>
              <li className="module-list-item"><span className="module-list-icon">•</span><span>Rastreabilidade, transparencia e aprendizagem organizacional continua.</span></li>
            </ul>
          </div>
        )
      },
      {
        id: 'governanca',
        title: 'Governanca e Operacao',
        subtitle: 'Papeis complementares entre nivel estrategico e execucao',
        content: (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="module-note-box">
              <p className="module-pill">Comite de Governanca Interna</p>
              <p className="module-section-text mt-3">
                Acompanha direcao macroestrategica, priorizacao do portfolio e conexao com objetivos
                institucionais do SGI.
              </p>
            </div>
            <div className="module-note-box">
              <p className="module-pill">Gerencia Executiva do Laboratorio</p>
              <p className="module-section-text mt-3">
                Coordena triagem, maturacao, prototipagem, articulacao de parceiros, indicadores e relatorio
                anual de resultados.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'ciclo',
        title: 'Ciclo de Inovacao',
        subtitle: 'Fluxo operacional do laboratorio em sete etapas',
        content: (
          <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              'Estimulo e captacao de ideias',
              'Detalhamento das propostas',
              'Prototipagem, testes e validacao',
              'Ajustes com escuta dos usuarios',
              'Implantacao assistida',
              'Mensuracao e consolidacao de aprendizados',
              'Ampliacao de escala'
            ].map((step, index) => (
              <li key={step} className="module-card p-4">
                <p className="module-meta-text font-semibold">Etapa {index + 1}</p>
                <p className="module-section-text mt-1">{step}</p>
              </li>
            ))}
          </ol>
        )
      },
      {
        id: 'premio',
        title: 'Premio de Inovacao',
        subtitle: 'Reconhecimento anual para ideias e resultados comprovados',
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="module-note-box">
                <p className="module-pill">Subcategoria 1</p>
                <p className="module-section-text mt-3">
                  Ideias Inovadoras: propostas em fase inicial ou com menos de um ano de operacao.
                </p>
              </div>
              <div className="module-note-box">
                <p className="module-pill">Subcategoria 2</p>
                <p className="module-section-text mt-3">
                  Inovacoes com Resultados Comprovados: iniciativas maduras com evidencias de impacto.
                </p>
              </div>
            </div>
            <div className="module-surface p-4">
              <p className="module-meta-text mb-2 font-semibold">Rito anual simplificado</p>
              <p className="module-section-text">
                Incentivo a ideacao, inscricao, avaliacao tecnica, selecao de finalistas, pitch e votacao do
                corpo funcional para premiacao.
              </p>
            </div>
          </div>
        )
      },
      {
        id: 'metodos',
        title: 'Metodologias de Referencia',
        subtitle: 'Conjunto pratico para experimentacao e entrega de valor',
        content: (
          <div className="flex flex-wrap gap-2">
            {[
              'Design Thinking',
              'Design de Servicos',
              'Linguagem Simples',
              'Visual Law',
              'Dataviz',
              'UX/UI',
              'Hackathon',
              'Kanban',
              'Agile e Scrum'
            ].map((method) => (
              <span key={method} className="module-pill">{method}</span>
            ))}
          </div>
        )
      },
      {
        id: 'placeholder',
        title: 'Documentos e Downloads',
        subtitle: 'Espaco para materiais normativos e operacionais',
        content: (
          <div className="module-note-box">
            <p className="module-section-text">
              Placeholder reservado para disponibilizacao da Minuta da Politica de Relacionamento do INPI com
              Fundacoes de Apoio.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" disabled className="module-button-secondary opacity-60 cursor-not-allowed">
                Baixar Minuta (placeholder)
              </button>
              <span className="module-meta-text">Arquivo sera disponibilizado em breve.</span>
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
      <h1 className="module-title">Laboratorio</h1>

      <div className="module-intro">
        <div className="module-kicker">LABORATORIO DE INOVACAO</div>
        <p className="module-lead">
          O modulo Laboratorio organiza, de forma visual e objetiva, os principais elementos da proposta
          normativa: finalidade, governanca, ciclo operacional, premio anual e referenciais metodologicos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="module-card">
          <p className="module-meta-text">Foco</p>
          <h3 className="module-section-title mt-2">Valor Publico</h3>
          <p className="module-section-text">Inovacao aplicada para melhorar gestao, servicos e experiencia do usuario.</p>
        </article>
        <article className="module-card">
          <p className="module-meta-text">Abrangencia</p>
          <h3 className="module-section-title mt-2">Interna e Externa</h3>
          <p className="module-section-text">Projetos conectados aos macroprocessos do INPI e a desafios do ecossistema.</p>
        </article>
        <article className="module-card">
          <p className="module-meta-text">Entrega</p>
          <h3 className="module-section-title mt-2">Ciclos Continuos</h3>
          <p className="module-section-text">Ideacao, teste, ajuste, implantacao e escalabilidade com monitoramento.</p>
        </article>
      </div>

      <section className="module-card p-0 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="module-section-title !mb-0">Painel de Estrutura do Laboratorio</h2>
            <p className="module-meta-text mt-1">Use os accordions para navegar sem blocos longos de texto.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="module-button-secondary text-sm" onClick={expandAll}>Expandir tudo</button>
            <button type="button" className="module-button-secondary text-sm" onClick={collapseAll}>Recolher tudo</button>
          </div>
        </div>

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
