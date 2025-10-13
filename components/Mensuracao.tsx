import React, { useState } from 'react';
import { Project } from '../App';

interface MensuracaoProps {
    projects: Project[];
}

const IndicatorCard = ({ title, indicators, icon }: { title: string; indicators: string[]; icon: React.ReactNode }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-600/30 text-purple-400 rounded-lg mr-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
        </div>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
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
        <div>
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">Mensuração</h1>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-10 border border-slate-700">
                <p className="text-lg leading-relaxed text-gray-300">
                    Analise o sucesso e o impacto das inovações implementadas. Selecione um projeto para visualizar seus indicadores de desempenho e impacto, e entenda como os resultados são monitorados.
                </p>
            </div>
            <div className="mb-8">
                <select id="project-select" onChange={handleSelectProject} defaultValue="" className="w-full max-w-lg px-3 py-2 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500">
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
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-xl font-bold text-purple-400 mb-3">Monitoramento e Reporte</h2>
                         <p className="text-gray-300">Relatórios de inovações de nível estratégico serão reportados à <span className="font-semibold text-white">Coordenação-Geral de Planejamento e Gestão Estratégica</span>, e as de nível setorial, às respectivas áreas de governança.</p>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-slate-800 rounded-lg border-2 border-dashed border-slate-700">
                    <p className="text-gray-400">Selecione um projeto para visualizar seus indicadores.</p>
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