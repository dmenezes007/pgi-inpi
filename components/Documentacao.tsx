import React from 'react';
import DocIcon from './DocIcon';

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
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">Minutas para Apreciação</h2>
                    <a href="https://dmenezes007.github.io/pgi-inpi/files/docs/Minuta%20da%20Pol%C3%ADtica%20de%20Gest%C3%A3o%20da%20Inova%C3%A7%C3%A3o%20do%20INPI.docx" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-purple-500 hover:bg-slate-700 transition-all group">
                        <DocIcon />
                        <span className="text-gray-300 group-hover:text-white">Minuta: Política de Gestão da Inovação do INPI</span>
                    </a>
                    <a href="https://dmenezes007.github.io/pgi-inpi/files/docs/Minuta%20da%20Pol%C3%ADtica%20de%20Inova%C3%A7%C3%A3o%20da%20Academia%20do%20INPI.docx" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-purple-500 hover:bg-slate-700 transition-all group">
                        <DocIcon />
                        <span className="text-gray-300 group-hover:text-white">Minuta: Política de Inovação da Academia do INPI</span>
                    </a>
                    <a href="https://dmenezes007.github.io/pgi-inpi/files/docs/Minuta%20da%20Pol%C3%ADtica%20de%20Relacionamento%20da%20Academia%20do%20INPI%20com%20Funda%C3%A7%C3%B5es%20de%20Apoio.docx" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-purple-500 hover:bg-slate-700 transition-all group">
                        <DocIcon />
                        <span className="text-gray-300 group-hover:text-white">Minuta: Política de Relacionamento da Academia do INPI com Fundações de Apoio</span>
                    </a>
                </div>

                <div className="border-t border-slate-700 pt-6 space-y-4">
                    <p className="text-gray-400 text-base">
                        Materiais de referência, apresentações e registros fotográficos da metaoficina estão disponíveis em: <a href="https://inpidrive.inpi.gov.br/index.php/s/8O5OUlrufgmof3d" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Link para o Drive</a>.
                    </p>
                    <p className="text-gray-400 text-base">
                        Um agradecimento especial aos condutores do Pólen/Fiocruz. Acompanhe a colab em: <a href="https://www.instagram.com/p/DOydE7sjYcF/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Post no Instagram</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Documentacao;
