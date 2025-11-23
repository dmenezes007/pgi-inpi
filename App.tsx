
import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './styles/App.css';
import { MODULES } from './constants';

const CORRECT_PASSWORD = 'PGI_INPI_2025';

export interface Risk {
  description: string;
  probability: 'Baixa' | 'Média' | 'Alta';
  impact: 'Baixo' | 'Médio' | 'Alto';
  mitigation: string;
}
export interface Step {
  step: string;
  startDate: string;
  endDate: string;
  manager: string;
  executor: string;
}
export interface Project {
  id: string;
  title: string;
  scope: string;
  performanceIndicators: string[];
  impactIndicators: string[];
  steps: Step[];
  resources: string;
  risks: Risk[];
}

// FIX: Separated array initialization and sorting to allow TypeScript to correctly type-check the array literal.
const initialProjects: Project[] = [
  {
    id: 'p1.02',
    title: 'P 1.02: Terceirização da Busca de Patentes',
    scope: 'Avaliar e implantar a terceirização de busca como suporte ao exame de patentes, visando à diminuição do esforço associado à atividade de busca.',
    performanceIndicators: ['Operacionalização do modelo de terceirização de busca de patentes.'],
    impactIndicators: ['Redução do tempo de exame de patentes.', 'Aumento da produtividade dos examinadores.'],
    steps: [
      { step: 'Seleção dos profissionais credenciados', startDate: '2025-01-02', endDate: '2025-06-13', manager: 'Diego Musskopf', executor: 'Equipe DIRPA/CGRH' },
      { step: 'Elaboração do modelo de terceirização', startDate: '2025-03-01', endDate: '2025-10-31', manager: 'Diego Musskopf', executor: 'Equipe DIRPA/CGRH' }
    ],
    resources: 'R$ 680.600,70 para terceirização.',
    risks: [
      { description: 'Qualidade das buscas terceirizadas abaixo do esperado.', probability: 'Média', impact: 'Alto', mitigation: 'Processo de credenciamento rigoroso e monitoramento contínuo.' },
      { description: 'Dificuldade em encontrar profissionais qualificados.', probability: 'Alta', impact: 'Médio', mitigation: 'Ampla divulgação do processo de credenciamento.' }
    ]
  },
  {
    id: 'p1.03',
    title: 'P 1.03: BPMS - Automação do Fluxo de Patentes',
    scope: 'Implantar solução de automação de processos de patentes, por meio da adoção da disciplina de gestão por processos (BPM) e contratação de sistema automatizado (BPMS).',
    performanceIndicators: ['Percentual de implementação do sistema BPMS: 100%'],
    impactIndicators: ['Redução do tempo de processamento de patentes.', 'Aumento da eficiência operacional.'],
    steps: [
      { step: 'Implementação do Módulo para o usuário do sistema único', startDate: '2025-01-02', endDate: '2025-12-01', manager: 'Vagner Latsch', executor: 'Equipe DIRPA/CGTI' },
      { step: 'Entrada em operação do Portal de usuário', startDate: '2025-06-01', endDate: '2025-12-01', manager: 'Vagner Latsch', executor: 'Equipe DIRPA/CGTI' }
    ],
    resources: 'Recursos internos (HH) e contratação de sistema BPMS (R$ 2.315.124,32).',
    risks: [
      { description: 'Atraso na contratação da ferramenta BPMS', probability: 'Alta', impact: 'Alto', mitigation: 'Acompanhamento rigoroso do processo licitatório.' },
      { description: 'Resistência à mudança pelos usuários', probability: 'Média', impact: 'Alto', mitigation: 'Plano de comunicação e treinamento contínuo.' },
      { description: 'Incompatibilidade técnica com sistemas legados', probability: 'Baixa', impact: 'Médio', mitigation: 'Prova de conceito e testes de integração antecipados.' }
    ]
  },
  {
    id: 'p1.15',
    title: 'P 1.15: Oposição 2.0 para marcas',
    scope: 'Desenvolver formulário para apresentação de oposição simplificada, de exame mais ágil e de menor custo para o usuário.',
    performanceIndicators: ['Formulário de oposição simplificado implementado e disponibilizado.'],
    impactIndicators: ['Redução do custo e tempo para oposição de marcas.', 'Aumento da agilidade processual.'],
    steps: [
      { step: 'Criação do formulário simplificado de oposição de marcas', startDate: '2025-01-02', endDate: '2025-07-31', manager: 'José Adolfo Linhares Pinto', executor: 'Equipe DIRMA' }
    ],
    resources: 'Recursos internos (HH).',
    risks: [
      { description: 'Atraso no desenvolvimento do sistema de TI.', probability: 'Baixa', impact: 'Médio', mitigation: 'Alocação de equipe de TI dedicada.' },
      { description: 'Baixa adesão dos usuários ao novo formulário.', probability: 'Baixa', impact: 'Baixo', mitigation: 'Campanha de comunicação e treinamento.' }
    ]
  },
  {
    id: 'p1.16',
    title: 'P 1.16: Registro de Marcas com Inteligência Artificial',
    scope: 'Desenvolver sistemas de peticionamento inteligentes e simplificados que elevem a qualidade dos pedidos de registro de marca, utilizando Inteligência Artificial.',
    performanceIndicators: ['Formulário inteligente para pré-depósito disponibilizado.'],
    impactIndicators: ['Redução do número de exigências e indeferimentos.', 'Aumento da qualidade dos pedidos de registro.'],
    steps: [
      { step: 'Sistema de depósito inteligente com análise de elementos nominativos e figurativos', startDate: '2025-01-06', endDate: '2025-12-31', manager: 'Rafael Gerardo', executor: 'Equipe DIRMA/CGTI' }
    ],
    resources: 'Parceria com SEBRAE/Universidade Federal de Goiás.',
    risks: [
      { description: 'Complexidade técnica do desenvolvimento da IA.', probability: 'Média', impact: 'Alto', mitigation: 'Contratação de especialistas e parceria com universidades.' },
      // FIX: Corrected typo for 'impact'. The type requires 'Médio' (with circumflex) instead of 'Média' (with acute accent).
      { description: 'Precisão da ferramenta de busca por IA abaixo do esperado.', probability: 'Alta', impact: 'Médio', mitigation: 'Ciclos de testes e ajustes contínuos com usuários.' }
    ]
  },
  {
    id: 'p1.23',
    title: 'P 1.23: Pesquisa de Percepção da Qualidade do Exame',
    scope: 'Estabelecer e implantar um processo de pesquisa para aferição da percepção dos usuários em relação à qualidade dos exames de concessão e registro de direitos de propriedade industrial.',
    performanceIndicators: ['Pesquisa de percepção realizada e resultados apresentados.'],
    impactIndicators: ['Identificação de pontos de melhoria nos exames.', 'Aumento da satisfação do usuário.'],
    steps: [
      { step: 'Realização das pesquisas de percepção da qualidade', startDate: '2025-01-06', endDate: '2025-09-30', manager: 'Helena Santini', executor: 'Equipe CQUAL' },
      { step: 'Apresentação dos resultados das pesquisas', startDate: '2025-07-01', endDate: '2025-12-15', manager: 'Helena Santini', executor: 'Equipe CQUAL' }
    ],
    resources: 'R$ 478.326,30 para contratação de serviços terceirizados.',
    risks: [
      { description: 'Baixa taxa de resposta na pesquisa.', probability: 'Média', impact: 'Médio', mitigation: 'Estratégia de divulgação e incentivos para participação.' },
      { description: 'Atraso na contratação da empresa de pesquisa.', probability: 'Baixa', impact: 'Alto', mitigation: 'Antecipação do processo licitatório.' }
    ]
  },
  {
    id: 'p2.06',
    title: 'P 2.06: Programa de Combate à Falsificação',
    scope: 'Aperfeiçoar o Programa de Combate à Falsificação do INPI, por meio do fortalecimento e expansão do Diretório Nacional de Combate à Falsificação.',
    performanceIndicators: ['Expansão anual do Diretório Nacional de Combate à Falsificação.'],
    impactIndicators: ['Redução da pirataria e falsificação.', 'Aumento da proteção de marcas e patentes.'],
    steps: [
      { step: 'Criação de Diretório por segmento industrial específico', startDate: '2025-01-02', endDate: '2025-09-29', manager: 'Elton Ferreira Barbosa', executor: 'Equipe CGREC' },
      { step: 'Criação do Observatório de Infrações de PI para IG', startDate: '2025-01-02', endDate: '2025-10-31', manager: 'Elton Ferreira Barbosa', executor: 'Equipe CGREC' }
    ],
    resources: 'Recursos internos (HH).',
    risks: [
      { description: 'Dificuldade de integração com outros órgãos de fiscalização.', probability: 'Alta', impact: 'Alto', mitigation: 'Estabelecimento de acordos de cooperação técnica.' },
      { description: 'Falta de adesão das empresas ao diretório.', probability: 'Média', impact: 'Médio', mitigation: 'Campanhas de conscientização sobre os benefícios.' }
    ]
  },
  {
    id: 'p5.06',
    title: 'P 5.06: Novo Portal de Serviços do INPI',
    scope: 'Desenvolver um novo portal de serviços com infraestrutura de busca moderna para assegurar eficiência, segurança e acessibilidade, substituindo o sistema atual obsoleto.',
    performanceIndicators: ['Novo portal de serviços implantado para usuários externos e internos.'],
    impactIndicators: ['Melhoria na experiência do usuário.', 'Aumento da agilidade no acesso a serviços e informações.'],
    steps: [
      { step: 'Levantamento do cenário informacional relacionado aos sistemas existentes', startDate: '2025-01-02', endDate: '2025-12-31', manager: 'Celso de Souza Tchao', executor: 'Equipe CGTI' }
    ],
    resources: 'R$ 1.000.000,00 de recursos internos (HH).',
    risks: [
      { description: 'Atraso no desenvolvimento devido a complexidades técnicas.', probability: 'Alta', impact: 'Alto', mitigation: 'Metodologia ágil com entregas incrementais.' },
      { description: 'Problemas na migração de dados do sistema antigo.', probability: 'Média', impact: 'Alto', mitigation: 'Planejamento e testes exaustivos de migração.' }
    ]
  },
  {
    id: 'p7.08',
    title: 'P 7.08: Programa de Sucessão de Gestores',
    scope: 'Construir plano de sucessão de funções gerenciais e ocupações críticas a fim de garantir a gestão do conhecimento e evitar gargalos no processo de sucessão.',
    performanceIndicators: ['Plano de Sucessão implementado.'],
    impactIndicators: ['Garantia da continuidade da gestão do conhecimento.', 'Redução de riscos por vacância de cargos críticos.'],
    steps: [
      { step: 'Publicação da Portaria de Sucessão de Gestores e Ocupações Críticas', startDate: '2025-05-02', endDate: '2025-11-28', manager: 'Sandra Caseira Cerqueira', executor: 'Equipe CGRH' }
    ],
    resources: 'Recursos internos (HH).',
    risks: [
      { description: 'Resistência dos gestores em identificar e preparar sucessores.', probability: 'Alta', impact: 'Médio', mitigation: 'Sensibilização da alta gestão e criação de programa de mentoria.' },
      { description: 'Falta de candidatos com perfil adequado para sucessão.', probability: 'Baixa', impact: 'Médio', mitigation: 'Plano de desenvolvimento individual (PDI) focado em competências de liderança.' }
    ]
  },
  {
    id: 'p8.04',
    title: 'P 8.04: Digitalização do Acervo',
    scope: 'Digitalizar os documentos físicos do INPI, incluindo a identificação e correção de falhas, cadastro de informações e indexação, para permitir a busca e acesso aos documentos.',
    performanceIndicators: ['Contratação dos serviços de digitalização do acervo em papel e microfilmes.'],
    impactIndicators: ['Preservação do acervo histórico.', 'Facilitação do acesso à informação para servidores e público externo.'],
    steps: [
      { step: 'Contratação do serviço de digitalização do acervo documental em papel', startDate: '2025-01-02', endDate: '2025-11-28', manager: 'Soraya Sales dos Santos e Silva', executor: 'Equipe CGLI' }
    ],
    resources: 'R$ 500.000,00 para contratação dos serviços.',
    risks: [
      { description: 'Danos ao acervo físico durante o processo de digitalização.', probability: 'Baixa', impact: 'Alto', mitigation: 'Contratação de empresa especializada com seguro e boas práticas de manuseio.' },
      { description: 'Baixa qualidade da digitalização e do OCR.', probability: 'Média', impact: 'Alto', mitigation: 'Definição de critérios rigorosos de qualidade no edital e controle de qualidade por amostragem.' }
    ]
  },
  {
    id: 'p9.07',
    title: 'P 9.07: Programa de Excelência da Gestão (MEG/FNQ)',
    scope: 'Aprimorar e alcançar a excelência da gestão do INPI, por meio da utilização do Modelo de Excelência da Gestão® (MEG), a fim de atingir o nível bronze até 2026.',
    performanceIndicators: ['Nível do MEG/FNQ: Atingir entre 400 a 500 pontos.'],
    impactIndicators: ['Melhoria da maturidade da gestão.', 'Reconhecimento externo da qualidade da gestão.'],
    steps: [
      { step: 'Contratação de novo AAA - MEG 22', startDate: '2025-01-15', endDate: '2025-02-15', manager: 'A. Bergamaschi', executor: 'Equipe CQUAL/CGPE' },
      { step: 'Relatório de Diagnóstico e Plano de Melhorias', startDate: '2025-02-16', endDate: '2025-05-30', manager: 'A. Bergamaschi', executor: 'Equipe CQUAL/CGPE' },
      { step: 'Resultado do Prêmio Melhores em Gestão 2025', startDate: '2025-06-30', endDate: '2025-11-30', manager: 'A. Bergamaschi', executor: 'Equipe CQUAL/CGPE' }
    ],
    resources: 'Contrato para autoavaliação assistida e despesa para concorrer ao prêmio (R$ 91.470,00).',
    risks: [
      { description: 'Baixo engajamento das áreas no processo de autoavaliação.', probability: 'Alta', impact: 'Médio', mitigation: 'Plano de mobilização e comunicação interna.' },
      { description: 'Não atingir a pontuação necessária para o nível Bronze.', probability: 'Média', impact: 'Alto', mitigation: 'Acompanhamento contínuo do Plano de Melhorias.' }
    ]
  }
];
initialProjects.sort((a, b) => a.title.localeCompare(b.title));


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState(MODULES[0]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (password: string) => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAuthenticated', 'true');
    } else {
      alert('Senha incorreta');
    }
  };
  
  const addProject = (newProjectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...newProjectData,
      id: `proj_${Date.now()}`
    };
    setProjects(prevProjects => [...prevProjects, newProject].sort((a, b) => a.title.localeCompare(b.title)));
    alert('Projeto "' + newProject.title + '" submetido com sucesso!');
    setActiveModule('Aprendizado');
  };


  const handleModuleSelect = (moduleName: string) => {
    setActiveModule(moduleName);
    if (window.innerWidth < 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <button className="hamburger-menu" onClick={toggleMobileSidebar}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 intense-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <Sidebar
        modules={MODULES}
        activeModule={activeModule}
        isExpanded={isSidebarExpanded}
        isMobileOpen={isMobileSidebarOpen}
        onModuleSelect={handleModuleSelect}
        onToggle={toggleSidebar}
      />
      <div className="main-content custom-gradient-purple" onClick={() => {
        if (isMobileSidebarOpen) {
          setIsMobileSidebarOpen(false);
        }
      }}>
        <MainContent 
          activeModule={activeModule} 
          onModuleSelect={handleModuleSelect}
          projects={projects}
          addProject={addProject}
        />
      </div>
    </div>
  );
}

export default App;
