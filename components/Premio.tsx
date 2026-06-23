import React, { useMemo, useState } from 'react';

type PremioSection = {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
};

const Premio: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const sections = useMemo<PremioSection[]>(
    () => [
      {
        id: 'estrutura',
        title: 'Estrutura do Prêmio de Inovação',
        subtitle: 'Objetivo, recorte e público interno',
        content: (
          <div className="space-y-3">
            <p className="module-section-text">
              O Prêmio de Inovação reconhece iniciativas que fortaleçam a modernização do INPI, incentivando
              soluções criativas com impacto institucional, melhoria contínua e valorização profissional.
            </p>
            <ul className="module-list">
              <li className="module-list-item"><span className="module-list-icon w-5 h-5 mr-3 mt-1 flex-shrink-0">•</span><span>Reconhece entregas com impacto em gestão e serviços.</span></li>
              <li className="module-list-item"><span className="module-list-icon w-5 h-5 mr-3 mt-1 flex-shrink-0">•</span><span>Estimula participação ativa de servidores e colaboradores.</span></li>
              <li className="module-list-item"><span className="module-list-icon w-5 h-5 mr-3 mt-1 flex-shrink-0">•</span><span>Fortalece o clima de inovação com visibilidade institucional.</span></li>
            </ul>
          </div>
        )
      },
      {
        id: 'subcategorias',
        title: 'Subcategorias de Participação',
        subtitle: 'Avaliação adequada à maturidade de cada iniciativa',
        content: (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <article className="module-note-box">
              <p className="module-pill">Ideias Inovadoras</p>
              <p className="module-section-text mt-3">
                Propostas que ainda não iniciaram execução ou que estejam em operação há menos de um ano,
                com ênfase no potencial transformador.
              </p>
            </article>
            <article className="module-note-box">
              <p className="module-pill">Resultados Comprovados</p>
              <p className="module-section-text mt-3">
                Iniciativas em operação há pelo menos um ano, com evidências quantitativas e qualitativas de
                desempenho e impacto.
              </p>
            </article>
          </div>
        )
      },
      {
        id: 'ciclo',
        title: 'Ciclo Anual de Seleção',
        subtitle: 'Etapas sequenciais da inscrição à premiação',
        content: (
          <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              'Incentivo à ideação e mobilização interna',
              'Inscrição por formulário padronizado',
              'Avaliação técnica pela banca examinadora',
              'Seleção de finalistas e preparação de pitch',
              'Votação do corpo funcional e premiação'
            ].map((step, index) => (
              <li key={step} className="module-card p-4">
                <p className="mt-0.5 block text-sm text-slate-500 uppercase font-semibold">Fase {index + 1}</p>
                <p className="module-section-text mt-1">{step}</p>
              </li>
            ))}
          </ol>
        )
      },
      {
        id: 'criterios',
        title: 'Critérios de Avaliação',
        subtitle: 'Referências técnicas para classificação das iniciativas',
        content: (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase bg-slate-700 text-gray-300">
                <tr>
                  <th className="px-4 py-3">Critério</th>
                  <th className="px-4 py-3">Foco da análise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Inovação aplicada', 'Grau de novidade e incorporação à rotina ou ao serviço.'],
                  ['Resultados e impactos', 'Evidências qualitativas e quantitativas alcançadas ou projetadas.'],
                  ['Escalabilidade', 'Potencial de replicação em outras áreas e contextos institucionais.'],
                  ['Eficiência no uso de recursos', 'Uso racional de recursos humanos, financeiros e tecnológicos.'],
                  ['Alinhamento estratégico', 'Contribuição para metas e prioridades do INPI.']
                ].map(([criterion, focus]) => (
                  <tr key={criterion} className="bg-slate-800 border-b border-slate-700">
                    <td className="px-4 py-3 font-semibold text-gray-200">{criterion}</td>
                    <td className="px-4 py-3">{focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      },
      {
        id: 'reconhecimento',
        title: 'Reconhecimento Institucional',
        subtitle: 'Selos, certificados e disseminação de práticas',
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <article className="module-surface p-4">
                <p className="module-pill">1º lugar</p>
                <p className="module-section-text mt-3">Selo Inovação Disruptiva.</p>
              </article>
              <article className="module-surface p-4">
                <p className="module-pill">2º lugar</p>
                <p className="module-section-text mt-3">Selo Solução Extraordinária.</p>
              </article>
              <article className="module-surface p-4">
                <p className="module-pill">3º lugar</p>
                <p className="module-section-text mt-3">Selo Solução Especial.</p>
              </article>
            </div>
            <p className="module-section-text">
              Projetos inscritos também alimentam os Anais do Prêmio de Inovação do INPI, assegurando memória
              institucional, reaproveitamento de ideias e aprendizagem contínua.
            </p>
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
      <h1 className="module-title">Prêmio</h1>

      <div className="module-intro">
        <div className="module-kicker">PRÊMIO DE INOVAÇÃO</div>
        <p className="module-lead">
          Este módulo consolida o funcionamento do Prêmio de Inovação do INPI em linguagem objetiva, com
          foco em critérios, governança do ciclo anual e mecanismos de reconhecimento institucional.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="module-card">
          <p className="mt-0.5 block text-sm text-slate-500 uppercase">Periodicidade</p>
          <h3 className="module-section-title mt-2">Ciclo Anual</h3>
          <p className="module-section-text">Fluxo contínuo de incentivo, seleção, votação e premiação.</p>
        </article>
        <article className="module-card">
          <p className="mt-0.5 block text-sm text-slate-500 uppercase">Gestão</p>
          <h3 className="module-section-title mt-2">Laboratório</h3>
          <p className="module-section-text">Coordenação executiva com apoio de banca examinadora.</p>
        </article>
        <article className="module-card">
          <p className="mt-0.5 block text-sm text-slate-500 uppercase">Resultado</p>
          <h3 className="module-section-title mt-2">Valor Público</h3>
          <p className="module-section-text">Projetos reconhecidos e reaproveitados no Banco de Ideias.</p>
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

export default Premio;
