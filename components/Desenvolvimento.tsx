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
        <div>
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">Desenvolvimento</h1>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-10 border border-slate-700">
                <p className="text-lg leading-relaxed text-gray-300">
                    Acompanhe o planejamento detalhado dos projetos de inovação. Selecione uma iniciativa para visualizar seu escopo, recursos e o direcionamento para a fase de prototipagem.
                </p>
            </div>

            <div className="mb-8">
                <select id="project-select" onChange={handleSelectProject} defaultValue="" className="w-full px-3 py-2 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500">
                    <option value="" disabled>Selecione a Ação ou Projeto</option>
                    {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                </select>
            </div>

            {selectedProject ? (
                <div className="space-y-8 animate-fade-in">
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-2xl font-bold text-purple-400 mb-3">Escopo do Projeto</h2>
                        <p className="text-gray-300 leading-relaxed">{selectedProject.scope}</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-2xl font-bold text-purple-400 mb-4">Recursos Exigidos</h2>
                        <p className="text-gray-300">{selectedProject.resources || "Não especificado."}</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-2xl font-bold text-purple-400 mb-4">Direcionamento para Prototipagem</h2>
                         <p className="text-gray-300">As propostas de inovação deverão ser direcionadas ao <span className="font-semibold text-white">Laboratório de Inovação do INPI</span> para prototipagem, testagem e validação.</p>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-slate-800 rounded-lg border-2 border-dashed border-slate-700">
                    <p className="text-gray-400">Selecione um projeto para visualizar os detalhes de desenvolvimento.</p>
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