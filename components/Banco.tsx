import React from 'react';

const etapas = [
    {
        numero: '01',
        titulo: 'Submissão da Ideia',
        descricao: 'Servidores e colaboradores registram suas propostas com descrição do problema, público afetado, benefício esperado e alinhamento estratégico.',
        icon: '✏️',
    },
    {
        numero: '02',
        titulo: 'Triagem e Classificação',
        descricao: 'A gerência do Laboratório de Inovação realiza avaliação preliminar e classifica a proposta por tipologia, área temática e potencial de impacto.',
        icon: '🔍',
    },
    {
        numero: '03',
        titulo: 'Maturação',
        descricao: 'Ideias selecionadas recebem apoio metodológico para detalhamento — escopo, etapas, recursos, riscos e indicadores de desempenho.',
        icon: '🌱',
    },
    {
        numero: '04',
        titulo: 'Aproveitamento',
        descricao: 'Propostas maduras entram no funil de gestão da inovação para prototipagem, validação e eventual implantação ou ampliação de escala.',
        icon: '🚀',
    },
];

const destaques = [
    {
        titulo: 'Portfólio Institucional',
        descricao: 'Acervo estruturado de propostas inovadoras que preserva o esforço criativo do corpo funcional do INPI, evitando a perda de boas ideias por falta de registro.',
        icon: '📂',
    },
    {
        titulo: 'Participação Ampla',
        descricao: 'Qualquer servidor ou colaborador pode submeter ideias, estimulando a cultura de inovação de forma transversal e cotidiana em todas as unidades.',
        icon: '🤝',
    },
    {
        titulo: 'Alinhamento Estratégico',
        descricao: 'As propostas são avaliadas quanto ao alinhamento com os objetivos estratégicos do INPI e ao potencial de gerar valor público mensurável.',
        icon: '🎯',
    },
    {
        titulo: 'Memória Organizacional',
        descricao: 'O banco registra lições aprendidas e resultados, consolidando a memória organizacional e gerando insumos para os Anais de Inovação do INPI.',
        icon: '📖',
    },
];

const Banco: React.FC = () => {
    return (
        <div className="module-page">
            <h1 className="module-title">Banco de Ideias</h1>
            <div className="module-intro">
                <div className="module-kicker">Portfólio de Propostas Inovadoras</div>
                <p className="module-lead">
                    O Banco de Ideias é o portfólio institucional de propostas inovadoras do INPI — um espaço permanente para que servidores e colaboradores registrem, desenvolvam e vejam suas ideias transformadas em soluções reais para a instituição e para a sociedade.
                </p>
            </div>

            {/* Botão de acesso ao sistema */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 mb-8 rounded-xl border border-blue-200 bg-blue-50">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-800 mb-1">Sistema do Banco de Ideias</p>
                    <p className="text-sm text-blue-700">
                        A plataforma digital para submissão e acompanhamento de propostas inovadoras está em desenvolvimento e será disponibilizada em breve.
                    </p>
                </div>
                <button
                    disabled
                    aria-disabled="true"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white bg-blue-400 cursor-not-allowed opacity-70 whitespace-nowrap"
                    title="Sistema em breve"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Acessar o Banco de Ideias
                    <span className="ml-1 text-xs font-normal opacity-80">(em breve)</span>
                </button>
            </div>

            {/* O que é o Banco de Ideias */}
            <h2 className="module-section-title mb-6">O Que é o Banco de Ideias</h2>
            <p className="mt-0.5 block text-sm text-slate-500 uppercase leading-relaxed mb-8">
                Instituído pela Política de Gestão da Inovação do INPI (Portaria Normativa nº 57/2026), o Banco de Ideias é definido como um <strong>portfólio diversificado de propostas inovadoras</strong>, caracterizado pela interseção entre diferentes meios e finalidades, organizado de forma consistente para o aproveitamento dos esforços de inovação envidados. A gerência do Laboratório de Inovação é responsável pela sua manutenção, consolidação de indicadores e registro de lições aprendidas.
            </p>

            {/* Destaques */}
            <h2 className="module-section-title mb-6">Características Essenciais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                {destaques.map((item, index) => (
                    <div key={index} className="group module-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100">
                        <div className="flex items-center mb-3">
                            <div className="text-3xl mr-3 transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                            <h3 className="text-base font-bold text-slate-900">{item.titulo}</h3>
                        </div>
                        <p className="mt-0.5 block text-sm text-slate-500 uppercase leading-relaxed">{item.descricao}</p>
                    </div>
                ))}
            </div>

            {/* Fluxo */}
            <h2 className="module-section-title mb-6">Como Funciona</h2>
            <div className="relative flex flex-col gap-0 mb-4">
                {etapas.map((etapa, index) => (
                    <div key={index} className="flex gap-5 items-stretch">
                        {/* Linha vertical + círculo */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm shrink-0 z-10">
                                {etapa.numero}
                            </div>
                            {index < etapas.length - 1 && (
                                <div className="w-0.5 flex-1 bg-blue-200 mt-1 mb-1" />
                            )}
                        </div>
                        {/* Conteúdo */}
                        <div className={`pb-8 ${index === etapas.length - 1 ? 'pb-2' : ''}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl">{etapa.icon}</span>
                                <h3 className="font-bold text-slate-900">{etapa.titulo}</h3>
                            </div>
                            <p className="mt-0.5 block text-sm text-slate-500 uppercase leading-relaxed">{etapa.descricao}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banco;
