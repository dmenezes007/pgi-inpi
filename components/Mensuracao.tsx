import React, { useState } from 'react';
import { Project } from '../App';

interface MensuracaoProps {
    projects: Project[];
}

const IndicatorCard = ({ title, indicators, icon }: { title: string; indicators: string[]; icon: React.ReactNode }) => (
    <div className="module-card">
        <div className="flex items-center mb-4">
            <div className="mr-4 rounded-lg bg-blue-50 p-2 text-blue-700">{icon}</div>
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        </div>
        <ul className="space-y-2 list-disc list-inside text-slate-600">
            {indicators && indicators.length > 0 ? indicators.map((ind, i) => <li key={i}>{ind}</li>) : <li>Nenhum indicador definido.</li>}
        </ul>
    </div>
);

const Mensuracao: React.FC<MensuracaoProps> = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleSelectProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const project = projects.find(p => p.id === e.target.value) || null;
        setSelectedProject(project);
    };

    return (
        <div className="module-page">
            <h1 className="module-title">Mensuração</h1>
            <div className="module-intro">
                <div className="module-kicker">Indicadores e evidencias</div>
                <p className="module-lead">
                    Analise o sucesso e o impacto das inovações implementadas. Selecione um projeto para visualizar seus indicadores de desempenho e impacto, e entenda como os resultados são monitorados.
                </p>
            </div>
            <div className="module-select-stack">
                <select id="project-select" onChange={handleSelectProject} defaultValue="" className="module-form-control max-w-lg">
                    <option value="" disabled>Selecione a Ação ou Projeto</option>
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                </select>
            </div>

            {selectedProject ? (
                 <div className="space-y-8 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <IndicatorCard 
                            title="Indicadores de Desempenho"
                            indicators={selectedProject.performanceIndicators}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                        />
                        <IndicatorCard 
                            title="Indicadores de Impacto"
                            indicators={selectedProject.impactIndicators}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
                        />
                    </div>
                    <div className="module-card">
                        <h2 className="module-section-title">Monitoramento e Reporte</h2>
                         <p className="module-section-text">Relatórios de inovações de nível estratégico serão reportados à <span className="module-highlight">Coordenação-Geral de Planejamento e Gestão Estratégica</span>, e as de nível setorial, às respectivas áreas de governança.</p>
                    </div>
                </div>
            ) : (
                <div className="module-empty">
                    <p>Selecione um projeto para visualizar seus indicadores.</p>
                </div>
            )}
             <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default Mensuracao;