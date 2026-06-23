import React, { useState, useMemo } from 'react';

const mainDefinitions = [
    {
        id: 'i',
        text: 'a introdução de <span class="text-purple-400 font-serif-highlight">novidade ou aperfeiçoamento</span> no ambiente produtivo e social que resulte em <span class="text-purple-400 font-serif-highlight">novos produtos, serviços ou processos</span> ou que compreenda a agregação de novas funcionalidades ou características a produto, serviço ou processo já existente que possa resultar em melhorias e em efetivo <span class="text-purple-400 font-serif-highlight">ganho de qualidade ou desempenho</span>, nos termos da Lei nº 10.973, de 2 de dezembro de 2004;'
    },
    {
        id: 'ii',
        text: 'a disposição das competências institucionais para estimular a <span class="text-purple-400 font-serif-highlight">proposição sistemática de ideias</span>, criando uma cultura que favoreça a <span class="text-purple-400 font-serif-highlight">geração de valor</span>, o <span class="text-purple-400 font-serif-highlight">aprendizado organizacional</span> e a modernização de métodos e técnicas de desenvolvimento dos serviços prestados pelo INPI, de forma <span class="text-purple-400 font-serif-highlight">coletiva e em parceria</span>; e'
    },
    {
        id: 'iii',
        text: 'a <span class="text-purple-400 font-serif-highlight">superação da melhoria contínua</span> aplicada aos processos constituídos, mediante a <span class="text-purple-400 font-serif-highlight">abertura ao risco e à incerteza</span>, a médio e longo prazo, com a preparação do ambiente institucional ao futuro e o direcionamento das ações ao <span class="text-purple-400 font-serif-highlight">impacto estratégico</span>.'
    }
];

const otherDefinitions = [
  {
    term: 'Banco de Ideias',
    concept: 'Portfólio diversificado de propostas inovadoras, com a interseção entre diferentes meios e finalidades, organizado de forma consistente para o aproveitamento dos esforços de inovação já envidados.'
  },
  {
    term: 'Colaborador',
    concept: 'Pessoa física, que presta serviços ao INPI, mediante contrato firmado com empresa interposta.'
  },
  {
    term: 'Cultura de Inovação',
    concept: 'Conjunto de atitudes, crenças e valores reforçados institucionalmente e incorporadas pelos servidores, colaboradores, equipes e gestores, de forma transversal, coesa e cotidiana, estimulando a criatividade e favorecendo a prospecção de ideias e o desenvolvimento de melhorias, perpassando necessariamente o incentivo à colaboração, à experimentação e à assunção de riscos.'
  },
  {
    term: 'Ecossistema de Inovação',
    concept: 'Conjunto de atores, como empresas, governo, universidades, instituições de pesquisa e investidores, e suas interações em um determinado ambiente, que promovem atividades de forma colaborativa para fomentar a inovação, o empreendedorismo e o desenvolvimento tecnológico, econômico e social.'
  },
  {
    term: 'Laboratórios de Inovação',
    concept: 'Espaços de confiança para a implementação de abordagens experimentais em um contexto controlado e com segurança, abertos à participação e à colaboração da sociedade para o desenvolvimento de ideias, de ferramentas e de métodos inovadores para a gestão pública, a prestação de serviços públicos e a participação do cidadão para o exercício de controle sobre a administração pública.'
  },
  {
    term: 'Prototipagem',
    concept: 'Criação de modelo preliminar, representação ou simulação de uma ideia, produto ou serviço, com o objetivo de testar, validar e refinar conceitos antes da sua implementação definitiva.'
  },
  {
    term: 'Servidor',
    concept: 'Pessoa física com vínculo funcional com o INPI, legalmente investida em cargo público, ainda que em inatividade.'
  }
];

const DefinitionCard = ({ term, concept }: { term: string; concept: string }) => (
    <div className="module-card transition-shadow hover:shadow-blue-100">
        <h3 className="module-section-title">{term}</h3>
        <p className="module-section-text">{concept}</p>
    </div>
);


const Definicoes: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDefinitions = useMemo(() => {
        if (!searchTerm) {
            return otherDefinitions;
        }
        const lowercasedFilter = searchTerm.toLowerCase();
        return otherDefinitions.filter(item =>
            item.term.toLowerCase().includes(lowercasedFilter) ||
            item.concept.toLowerCase().includes(lowercasedFilter)
        );
    }, [searchTerm]);

    return (
        <div className="module-page">
            <h1 className="module-title">
                Definições
            </h1>

            <div className="module-intro">
                <div className="module-kicker">CONCEITOS E DEFINIÇÕES</div>
                <p className="module-lead">Conceitos estruturantes para o entendimento da Política de Gestão da Inovação.</p>
            </div>

             <div className="mb-12">
                <h2 className="module-section-title mb-6">Inovação é</h2>
                <div className="space-y-6">
                    {mainDefinitions.map((def, index) => (
                         <div key={def.id} className="module-card flex items-start space-x-4">
                            <span className="text-xl font-bold text-blue-700">{['I', 'II', 'III'][index]}.</span>
                            <p className="module-section-text" dangerouslySetInnerHTML={{ __html: def.text }} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar outros termos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="module-form-control block w-full pl-10 pr-3"
                    />
                </div>
            </div>

            <div className="space-y-6">
                {filteredDefinitions.length > 0 ? (
                    filteredDefinitions.map(def => (
                        <DefinitionCard key={def.term} term={def.term} concept={def.concept} />
                    ))
                ) : (
                    <div className="module-empty">
                        <p>Nenhum termo encontrado para a busca "<span className="font-semibold text-slate-900">{searchTerm}</span>".</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Definicoes;