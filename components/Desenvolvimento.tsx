import React, { useState } from 'react';
import { Project } from '../App';

interface DesenvolvimentoProps {
    projects: Project[];
}

const Desenvolvimento: React.FC<DesenvolvimentoProps> = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleSelectProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const project = projects.find(p => p.id === e.target.value) || null;
        setSelectedProject(project);
    };

    return (
        <div className="module-page">
            <h1 className="module-title">Desenvolvimento</h1>
            <div className="module-intro">
                <div className="module-kicker">Etapa de maturacao</div>
                <p className="module-lead">
                    Acompanhe o planejamento detalhado dos projetos de inovação. Selecione uma iniciativa para visualizar seu escopo, recursos e o direcionamento para a fase de prototipagem.
                </p>
            </div>

            <div className="module-select-stack">
                <select id="project-select" onChange={handleSelectProject} defaultValue="" className="module-form-control">
                    <option value="" disabled>Selecione a Ação ou Projeto</option>
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                </select>
            </div>

            {selectedProject ? (
                <div className="space-y-8 animate-fade-in">
                    <div className="module-card">
                        <h2 className="module-section-title">Escopo do Projeto</h2>
                        <p className="module-section-text">{selectedProject.scope}</p>
                    </div>
                    <div className="module-card">
                        <h2 className="module-section-title">Recursos Exigidos</h2>
                        <p className="module-section-text">{selectedProject.resources || "Não especificado."}</p>
                    </div>
                    <div className="module-card">
                        <h2 className="module-section-title">Direcionamento para Prototipagem</h2>
                         <p className="module-section-text">As propostas de inovação deverão ser direcionadas ao <span className="module-highlight">Laboratório de Inovação do INPI</span> para prototipagem, testagem e validação.</p>
                    </div>
                </div>
            ) : (
                <div className="module-empty">
                    <p>Selecione um projeto para visualizar os detalhes de desenvolvimento.</p>
                </div>
            )}
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default Desenvolvimento;