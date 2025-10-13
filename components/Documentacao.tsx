import React from 'react';

const Documentacao: React.FC = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">
                Documentação
            </h1>
            <div className="bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700 space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                    Agradecemos a todos que participaram do <span className="font-semibold text-white">Design Sprint Institucional</span> e contribuíram para a formulação da proposta da Política de Gestão da Inovação do INPI. Como resultado, compartilhamos abaixo as minutas dos documentos elaborados para apreciação e coleta de novas contribuições.
                </p>

                <div className="space-y-4 pt-4">
                     <h2 className="text-xl font-semibold text-gray-200">Minutas para Apreciação</h2>
                     <a href="#" onClick={e => e.preventDefault()} className="flex items-center p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-purple-500 hover:bg-slate-700 transition-all group">
                        <svg className="w-6 h-6 mr-4 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span className="text-gray-300 group-hover:text-white">Minuta: Política de Gestão da Inovação do INPI</span>
                    </a>
                     <a href="#" onClick={e => e.preventDefault()} className="flex items-center p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-purple-500 hover:bg-slate-700 transition-all group">
                        <svg className="w-6 h-6 mr-4 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span className="text-gray-300 group-hover:text-white">Minuta: Política de Inovação da Academia do INPI</span>
                    </a>
                     <a href="#" onClick={e => e.preventDefault()} className="flex items-center p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-purple-500 hover:bg-slate-700 transition-all group">
                        <svg className="w-6 h-6 mr-4 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span className="text-gray-300 group-hover:text-white">Minuta: Política de Relacionamento da Academia do INPI com Fundações de Apoio</span>
                    </a>
                </div>

                <div className="border-t border-slate-700 pt-6 space-y-3 text-sm">
                     <p className="text-gray-400">Materiais de referência, apresentações e registros fotográficos da metaoficina estão disponíveis em: <a href="https://inpidrive.inpi.gov.br/index.php/s/8O5OUlrufgmof3d" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Link para o Drive</a>.</p>
                      <p className="text-gray-400">Um agradecimento especial aos condutores do Pólen/Fiocruz. Acompanhe a colab em: <a href="https://www.instagram.com/p/DOydE7sjYcF/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Post no Instagram</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default Documentacao;
