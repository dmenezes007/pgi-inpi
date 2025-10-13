import React, { useState } from 'react';
import { Project, Step, Risk } from '../App';

interface EstimuloProps {
    addProject: (project: Omit<Project, 'id'>) => void;
}

const Estimulo: React.FC<EstimuloProps> = ({ addProject }) => {
    const [title, setTitle] = useState('');
    const [scope, setScope] = useState('');
    const [steps, setSteps] = useState<Partial<Step>[]>([{ step: '', startDate: '', endDate: '', manager: '', executor: '' }]);
    const [risks, setRisks] = useState<Partial<Risk>[]>([{ description: '', probability: 'Baixa', impact: 'Baixo', mitigation: '' }]);

    const handleAddStep = () => {
        setSteps([...steps, { step: '', startDate: '', endDate: '', manager: '', executor: '' }]);
    };
    
    const handleAddRisk = () => {
        setRisks([...risks, { description: '', probability: 'Baixa', impact: 'Baixo', mitigation: '' }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProject = {
            title,
            scope,
            steps: steps as Step[],
            risks: risks as Risk[],
            performanceIndicators: [], // Simplified for this form
            impactIndicators: [],
            resources: ''
        };
        addProject(newProject);
        // Reset form
        setTitle('');
        setScope('');
        setSteps([{ step: '', startDate: '', endDate: '', manager: '', executor: '' }]);
        setRisks([{ description: '', probability: 'Baixa', impact: 'Baixo', mitigation: '' }]);
    };
    
    const inputClass = "w-full px-3 py-2 text-white bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500";
    const labelClass = "block text-xs font-medium text-gray-400 mb-1";

    return (
        <div>
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">Estímulo</h1>
             <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-10 border border-slate-700">
                <p className="text-lg leading-relaxed text-gray-300">
                    Proponha novas ideias e estruture seus projetos de inovação. Preencha os campos abaixo para submeter uma nova ação e dar o primeiro passo para transformar o INPI.
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h2 className="text-xl font-semibold mb-4">Informações Gerais</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Título da Ação ou Projeto</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className={inputClass} required />
                        </div>
                        <div>
                            <label htmlFor="scope" className="block text-sm font-medium text-gray-300 mb-1">Escopo (em Linguagem Simples)</label>
                            <textarea id="scope" value={scope} onChange={e => setScope(e.target.value)} rows={3} className={inputClass} required />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Etapas e Prazos</h2>
                        <button type="button" onClick={handleAddStep} className="text-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded-md">+ Adicionar Etapa</button>
                    </div>
                     <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div key={index} className="p-4 border border-slate-700 rounded-md space-y-3">
                                <input type="text" placeholder={`Descrição da Etapa ${index + 1}`} value={step.step} onChange={e => { const newSteps = [...steps]; newSteps[index].step = e.target.value; setSteps(newSteps); }} className={inputClass} required />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Data de Início</label>
                                        <input type="date" value={step.startDate} onChange={e => { const newSteps = [...steps]; newSteps[index].startDate = e.target.value; setSteps(newSteps); }} className={inputClass} required />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Data de Término</label>
                                        <input type="date" value={step.endDate} onChange={e => { const newSteps = [...steps]; newSteps[index].endDate = e.target.value; setSteps(newSteps); }} className={inputClass} required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="Gerentes" value={step.manager} onChange={e => { const newSteps = [...steps]; newSteps[index].manager = e.target.value; setSteps(newSteps); }} className={inputClass} required />
                                    <input type="text" placeholder="Executores" value={step.executor} onChange={e => { const newSteps = [...steps]; newSteps[index].executor = e.target.value; setSteps(newSteps); }} className={inputClass} required />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                 <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Riscos Associados</h2>
                        <button type="button" onClick={handleAddRisk} className="text-sm bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded-md">+ Adicionar Risco</button>
                    </div>
                    <div className="space-y-4">
                        {risks.map((risk, index) => (
                            <div key={index} className="p-4 border border-slate-700 rounded-md space-y-3">
                                <input type="text" placeholder={`Descrição do Risco ${index + 1}`} value={risk.description} onChange={e => { const newRisks = [...risks]; newRisks[index].description = e.target.value; setRisks(newRisks); }} className={inputClass} required />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div>
                                        <label className={labelClass}>Probabilidade</label>
                                        <select value={risk.probability} onChange={e => { const newRisks = [...risks]; newRisks[index].probability = e.target.value as any; setRisks(newRisks); }} className={inputClass}>
                                            <option>Baixa</option>
                                            <option>Média</option>
                                            <option>Alta</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Impacto</label>
                                        <select value={risk.impact} onChange={e => { const newRisks = [...risks]; newRisks[index].impact = e.target.value as any; setRisks(newRisks); }} className={inputClass}>
                                            <option>Baixo</option>
                                            <option>Médio</option>
                                            <option>Alto</option>
                                        </select>
                                    </div>
                                </div>
                                <input type="text" placeholder="Meta de Mitigação" value={risk.mitigation} onChange={e => { const newRisks = [...risks]; newRisks[index].mitigation = e.target.value; setRisks(newRisks); }} className={inputClass} required />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all">
                        Submeter Projeto
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Estimulo;