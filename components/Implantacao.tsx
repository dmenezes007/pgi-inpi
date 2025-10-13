import React, { useState } from 'react';
import { Project } from '../App';

interface ImplantacaoProps {
    projects: Project[];
}

const Implantacao: React.FC<ImplantacaoProps> = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleSelectProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const project = projects.find(p => p.id === e.target.value) || null;
        setSelectedProject(project);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">Implantação</h1>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-10 border border-slate-700">
                <p className="text-lg leading-relaxed text-gray-300">
                    Visualize o cronograma de execução dos projetos de inovação. Selecione uma ação para acompanhar sua linha do tempo, desde o início até a entrega final.
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
                 <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 animate-fade-in">
                    <h2 className="text-2xl font-bold text-purple-400 mb-6">Linha do Tempo de Implantação</h2>
                    <div className="relative border-l-2 border-purple-500/30 ml-4">
                        {selectedProject.steps.map((step, index) => (
                            <div key={index} className="mb-10 ml-8">
                                <span className="absolute flex items-center justify-center w-8 h-8 bg-purple-600 rounded-full -left-4 ring-8 ring-slate-800">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path></svg>
                                </span>
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-100">{step.step}</h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
                                    {new Date(step.startDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} - {new Date(step.endDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                </time>
                                <p className="text-base font-normal text-gray-300">Gerentes: {step.manager} | Executores: {step.executor}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                 <div className="text-center py-16 px-6 bg-slate-800 rounded-lg border-2 border-dashed border-slate-700">
                    <p className="text-gray-400">Selecione um projeto para visualizar sua linha do tempo de implantação.</p>
                </div>
            )}
             <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default Implantacao;