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
        <div className={`relative grid grid-cols-3 grid-rows-3 gap-1 p-4 bg-slate-900/50 rounded-lg border border-slate-700 ${isMobile ? 'aspect-auto' : 'aspect-square'}`}>
            {/* Labels */}
            <div className={`absolute -left-12 top-1/2 -translate-y-1/2 text-sm text-gray-400 -rotate-90 font-semibold tracking-wider ${isMobile ? 'text-xs -left-6' : ''}`}>Impacto</div>
            <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-semibold tracking-wider ${isMobile ? 'text-xs -bottom-6' : ''}`}>Probabilidade</div>
            
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
                        className="group absolute w-4 h-4 rounded-full bg-purple-500 border-2 border-slate-900 cursor-pointer transition-transform hover:scale-150"
                        style={{
                            left: `calc(${(x - 1) * 33.33}% + 16.67% - 8px)`,
                            bottom: `calc(${(y - 1) * 33.33}% + 16.67% - 8px)`,
                            zIndex: 10,
                        }}
                    >
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 border border-slate-600">
                            <p className="font-bold text-sm text-purple-400">Risco {index + 1}</p>
                            <p className="text-xs text-gray-300">{risk.description}</p>
                            <p className="text-xs mt-2 text-gray-400"><span className="font-semibold">Mitigação:</span> {risk.mitigation}</p>
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
        <div className="h-full flex flex-col">
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">
                Aprendizado
            </h1>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-10 border border-slate-700">
                 <p className="text-lg leading-relaxed text-gray-300">
                    Explore o conhecimento gerado pelos projetos de inovação. Navegue pelo Banco de Ideias para consultar detalhes, lições aprendidas e a análise de riscos de cada iniciativa.
                </p>
            </div>


            <div className="flex-grow flex flex-col md:flex-row gap-8 min-h-0">
                <div className="w-full md:w-1/3 flex flex-col">
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex-grow flex flex-col min-h-0">
                        <h2 className="text-xl font-semibold mb-4 text-gray-200 flex-shrink-0">Banco de Ideias</h2>
                        <div className="space-y-2 overflow-y-auto pr-2">
                            {projects.map(p => (
                                <label key={p.id} className={`w-full text-left p-3 rounded-md transition-all text-sm flex items-center cursor-pointer ${selectedProjectId === p.id ? 'bg-purple-600 text-white font-semibold border-purple-400' : 'text-gray-300 hover:bg-slate-700 border-slate-800'} border`}>
                                   <input type="radio" name="project-selection" value={p.id} checked={selectedProjectId === p.id} onChange={(e) => setSelectedProjectId(e.target.value)} className="hidden" />
                                   <div className={`w-5 h-5 rounded-full border-2  flex items-center justify-center mr-3 flex-shrink-0 ${selectedProjectId === p.id ? 'border-purple-300 bg-purple-600' : 'border-slate-500 bg-slate-700'}`}>
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
                    <div className="bg-slate-800 px-6 pt-6 pb-12 rounded-lg border border-slate-700 animate-fade-in space-y-6">
                        <h2 className="text-2xl font-bold text-purple-400">{selectedProject.title}</h2>
                        <div>
                            <h3 className="font-semibold text-gray-300">Escopo</h3>
                            <p className="text-gray-400 text-sm">{selectedProject.scope}</p>
                        </div>
                         <div>
                            <h3 className="font-semibold text-gray-300">Recursos Necessários</h3>
                            <p className="text-gray-400 text-sm">{selectedProject.resources || "Não especificado."}</p>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-300">Indicadores de Desempenho</h3>
                                <ul className="list-disc list-inside text-gray-400 text-sm mt-1 space-y-1">
                                    {selectedProject.performanceIndicators.length > 0 ? selectedProject.performanceIndicators.map((item, i) => <li key={i}>{item}</li>) : <li>Nenhum</li>}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-300">Indicadores de Impacto</h3>
                                <ul className="list-disc list-inside text-gray-400 text-sm mt-1 space-y-1">
                                    {selectedProject.impactIndicators.length > 0 ? selectedProject.impactIndicators.map((item, i) => <li key={i}>{item}</li>) : <li>Nenhum</li>}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-300">Riscos Associados (Matriz Impacto x Probabilidade)</h3>
                            <div className="mt-4 w-full h-full">
                                <RiskMatrix risks={selectedProject.risks} />
                            </div>
                        </div>
                   </div>
                ) : (
                    <div className="flex-grow flex items-center justify-center h-full text-center py-16 px-6 bg-slate-800 rounded-lg border-2 border-dashed border-slate-700">
                        <p className="text-gray-400">Selecione um projeto à esquerda para ver seus detalhes e aprendizados.</p>
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