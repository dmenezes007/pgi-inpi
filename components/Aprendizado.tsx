import React, { useState, useEffect } from 'react';
import { Project, Risk } from '../App';

interface AprendizadoProps {
    projects: Project[];
}

const RiskMatrix: React.FC<{ risks: Risk[] }> = ({ risks }) => {
    const probabilityMap = { 'Baixa': 1, 'Média': 2, 'Alta': 3 };
    const impactMap = { 'Baixo': 1, 'Médio': 2, 'Alto': 3 };
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial value

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`relative grid grid-cols-3 grid-rows-3 gap-1 rounded-lg border border-slate-200 bg-slate-50 p-4 ${isMobile ? 'h-[300px]' : 'aspect-square h-full'}`}>
            {/* Labels */}
            <div className={`absolute -left-12 top-1/2 -translate-y-1/2 text-sm text-gray-400 -rotate-90 font-semibold tracking-wider ${isMobile ? 'text-xs -left-4' : ''}`}>Impacto</div>
            <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-semibold tracking-wider ${isMobile ? 'text-xs -bottom-4' : ''}`}>Probabilidade</div>
            
            <div className={`absolute text-xs text-gray-500 ${isMobile ? 'bottom-1 left-1/2 -translate-x-1/2' : ''}`} style={isMobile ? {} : { bottom: '16.67%', left: -35, transform: 'translateY(50%)' }}>Baixo</div>
            <div className={`absolute text-xs text-gray-500 ${isMobile ? 'top-1 left-1/2 -translate-x-1/2' : ''}`} style={isMobile ? {} : { top: '16.67%', left: -30, transform: 'translateY(-50%)' }}>Alto</div>
            
            <div className={`absolute text-xs text-gray-500 ${isMobile ? 'bottom-1/2 -translate-y-1/2 left-1' : ''}`} style={isMobile ? {} : { left: '16.67%', bottom: -20, transform: 'translateX(-50%)' }}>Baixa</div>
            <div className={`absolute text-xs text-gray-500 ${isMobile ? 'bottom-1/2 -translate-y-1/2 right-1' : ''}`} style={isMobile ? {} : { left: '83.33%', bottom: -20, transform: 'translateX(-50%)' }}>Alta</div>

            {/* Background colors for 3x3 grid (top-to-bottom, left-to-right) */}
            {/* Top Row (Impacto Alto) */}
            <div className="bg-orange-500/10 rounded-sm"></div>
            <div className="bg-red-500/10 rounded-sm"></div>
            <div className="bg-red-500/10 rounded-sm"></div>
            {/* Middle Row (Impacto Médio) */}
            <div className="bg-yellow-500/10 rounded-sm"></div>
            <div className="bg-orange-500/10 rounded-sm"></div>
            <div className="bg-red-500/10 rounded-sm"></div>
            {/* Bottom Row (Impacto Baixo) */}
            <div className="bg-green-500/10 rounded-sm"></div>
            <div className="bg-yellow-500/10 rounded-sm"></div>
            <div className="bg-orange-500/10 rounded-sm"></div>

            {/* Risks */}
            {risks.map((risk, index) => {
                // Ensure risk has the properties before mapping
                if (!risk.probability || !risk.impact) return null;

                const x = probabilityMap[risk.probability];
                const y = impactMap[risk.impact];
                return (
                    <div
                        key={index}
                        className="group absolute w-4 h-4 cursor-pointer rounded-full border-2 border-white bg-blue-700 transition-transform hover:scale-150"
                        style={{
                            left: `calc(${(x - 1) * 33.33}% + 16.67% - 8px)`,
                            bottom: `calc(${(y - 1) * 33.33}% + 16.67% - 8px)`,
                            zIndex: 10,
                        }}
                    >
                                 <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-3 shadow-xl opacity-0 transition-opacity group-hover:opacity-100">
                                     <p className="text-sm font-bold text-blue-700">Risco {index + 1}</p>
                                     <p className="text-xs text-slate-600">{risk.description}</p>
                                     <p className="mt-2 text-xs text-slate-500"><span className="font-semibold">Mitigação:</span> {risk.mitigation}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};


const Aprendizado: React.FC<AprendizadoProps> = ({ projects }) => {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects.length > 0 ? projects[0].id : null);
    
    const selectedProject = projects.find(p => p.id === selectedProjectId);

    return (
        <div className="module-page h-full">
            <h1 className="module-title">
                Aprendizado
            </h1>
            <div className="module-intro">
                 <div className="module-kicker">Banco de ideias</div>
                 <p className="module-lead">
                    Explore o conhecimento gerado pelos projetos de inovação. Navegue pelo Banco de Ideias para consultar detalhes, lições aprendidas e a análise de riscos de cada iniciativa.
                </p>
            </div>


            <div className="flex-grow flex flex-col md:flex-row gap-8 min-h-0">
                <div className="w-full md:w-1/3 flex flex-col">
                    <div className="module-card flex min-h-0 flex-grow flex-col p-4">
                        <h2 className="module-section-title mb-4 flex-shrink-0">Banco de Ideias</h2>
                        <div className="space-y-2 overflow-y-auto pr-2">
                            {projects.map(p => (
                                <label key={p.id} className={`flex w-full cursor-pointer items-center rounded-md border p-3 text-left text-sm transition-all ${selectedProjectId === p.id ? 'border-blue-300 bg-blue-700 text-white font-semibold' : 'border-slate-200 text-slate-600 hover:bg-blue-50'}`}>
                                   <input type="radio" name="project-selection" value={p.id} checked={selectedProjectId === p.id} onChange={(e) => setSelectedProjectId(e.target.value)} className="hidden" />
                                   <div className={`mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${selectedProjectId === p.id ? 'border-blue-200 bg-blue-700' : 'border-slate-300 bg-white'}`}>
                                      {selectedProjectId === p.id && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                                  </div>
                                   <span>{p.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-2/3 flex flex-col">
                {selectedProject ? (
                    <div className="module-card animate-fade-in space-y-6 px-6 pb-12 pt-6">
                        <h2 className="module-section-title">{selectedProject.title}</h2>
                        <div>
                            <h3 className="module-label">Escopo</h3>
                            <p className="mt-0.5 block text-sm text-slate-500 uppercase">{selectedProject.scope}</p>
                        </div>
                         <div>
                            <h3 className="module-label">Recursos Necessários</h3>
                            <p className="mt-0.5 block text-sm text-slate-500 uppercase">{selectedProject.resources || "Não especificado."}</p>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="module-label">Indicadores de Desempenho</h3>
                                <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-slate-600">
                                    {selectedProject.performanceIndicators.length > 0 ? selectedProject.performanceIndicators.map((item, i) => <li key={i}>{item}</li>) : <li>Nenhum</li>}
                                </ul>
                            </div>
                            <div>
                                <h3 className="module-label">Indicadores de Impacto</h3>
                                <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-slate-600">
                                    {selectedProject.impactIndicators.length > 0 ? selectedProject.impactIndicators.map((item, i) => <li key={i}>{item}</li>) : <li>Nenhum</li>}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className="module-label">Riscos Associados (Matriz Impacto x Probabilidade)</h3>
                            <div className="mt-4 w-full h-full">
                                <RiskMatrix risks={selectedProject.risks} />
                            </div>
                        </div>
                   </div>
                ) : (
                    <div className="module-empty flex h-full flex-grow items-center justify-center px-6 py-16 text-center">
                        <p>Selecione um projeto à esquerda para ver seus detalhes e aprendizados.</p>
                    </div>
                )}
                </div>
            </div>
             <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
                .h-full { height: 100%; }
            `}</style>
        </div>
    );
};

export default Aprendizado;