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
        <div className="module-page">
            <h1 className="module-title">Implantação</h1>
            <div className="module-intro">
                <div className="module-kicker">Execucao e entrega</div>
                <p className="module-lead">
                    Visualize o cronograma de execução dos projetos de inovação. Selecione uma ação para acompanhar sua linha do tempo, desde o início até a entrega final.
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
                 <div className="module-card animate-fade-in">
                    <h2 className="module-section-title">Linha do Tempo de Implantação</h2>
                    <div className="relative ml-4 border-l-2 border-blue-200">
                        {selectedProject.steps.map((step, index) => (
                            <div key={index} className="mb-10 ml-8">
                                <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 ring-8 ring-white">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path></svg>
                                </span>
                                <h3 className="mb-1 flex items-center text-lg font-semibold text-slate-900">{step.step}</h3>
                                <time className="module-meta-text mb-2 block leading-none">
                                    {new Date(step.startDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} - {new Date(step.endDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                                </time>
                                <p className="module-section-text">Gerentes: {step.manager} | Executores: {step.executor}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                 <div className="module-empty">
                    <p>Selecione um projeto para visualizar sua linha do tempo de implantação.</p>
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