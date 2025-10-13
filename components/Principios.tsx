import React, { useState, useEffect } from 'react';

const principlesData = [
  { id: 'p1', keyword: 'geração de ideias', sentence: 'incentivar a proposição sistemática de ideias e soluções inovadoras dentro do INPI' },
  { id: 'p2', keyword: 'ambiente favorável', sentence: 'criar um espaço que estimule a experimentação controlada, o aprendizado contínuo e a tolerância ao erro' },
  { id: 'p3', keyword: 'liderança atuante', sentence: 'garantir que a liderança atue ativamente no fomento da inovação e a inclua nas estratégias do Instituto' },
  { id: 'p4', keyword: 'desenvolvimento de competências', sentence: 'definir e aprimorar as habilidades e conhecimentos voltados para a inovação em todos os níveis do Instituto' },
  { id: 'p5', keyword: 'colaboração', sentence: 'incentivar o trabalho em rede de inovação para a coordenação de esforços, cocriação, criatividade, experimentação e o compartilhamento de boas práticas' },
  { id: 'p6', keyword: 'tolerância ao erro', sentence: 'aceitar as iniciativas de inovação mal sucedidas, compreendendo o erro como parte do processo de experimentação e aprendizado, a partir do gerenciamento dos riscos de forma controlada' },
  { id: 'p7', keyword: 'desenvolvimento humano', sentence: 'promover novas habilidades de servidores e colaboradores do INPI que lhes permitam adquirir conhecimentos necessários às novas competências para solução de problemas complexos, pensamento crítico e flexibilidade cognitiva' }
];

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const Principios: React.FC = () => {
    const [completed, setCompleted] = useState<Record<string, boolean>>({});
    const [shuffledKeywords, setShuffledKeywords] = useState<{ id: string; keyword: string }[]>([]);

    useEffect(() => {
        setShuffledKeywords(shuffleArray(principlesData.map(({ id, keyword }) => ({ id, keyword }))));
    }, []);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, sentenceId: string) => {
        e.preventDefault();
        const keywordId = e.dataTransfer.getData('keywordId');
        if (keywordId === sentenceId) {
            setCompleted(prev => ({ ...prev, [sentenceId]: true }));
        } else {
            const dropzone = e.currentTarget;
            dropzone.classList.add('animate-shake');
            setTimeout(() => dropzone.classList.remove('animate-shake'), 500);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, keywordId: string) => {
        e.dataTransfer.setData('keywordId', keywordId);
    };

    const isAllCompleted = Object.keys(completed).length === principlesData.length;

    return (
        <div>
            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">Princípios</h1>
            <p className="text-gray-400 mb-8">Arraste a palavra-chave para completar o princípio correspondente.</p>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow space-y-4">
                    {principlesData.map(({ id, sentence, keyword }) => (
                        <div key={id} className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700 min-h-[60px]">
                            <div
                                onDrop={(e) => handleDrop(e, id)}
                                onDragOver={(e) => e.preventDefault()}
                                className={`w-64 h-10 flex-shrink-0 rounded-md border-2 border-dashed transition-colors duration-300 ${completed[id] ? 'border-green-500 bg-green-500/10' : 'border-slate-600 hover:border-purple-500 hover:bg-slate-700/50'}`}
                            >
                                {completed[id] && (
                                    <div className="flex items-center justify-center h-full text-green-400 font-serif-highlight text-lg">
                                        {keyword}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-300">{sentence}</p>
                        </div>
                    ))}
                </div>
                <div className="lg:w-64 flex-shrink-0 bg-slate-800/50 p-4 rounded-lg border border-slate-700 self-start">
                    <h3 className="text-lg font-semibold mb-4 text-gray-200">Palavras-chave</h3>
                    <div className="space-y-3">
                        {shuffledKeywords.map(({ id, keyword }) => (
                            !completed[id] && (
                                <div
                                    key={id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, id)}
                                    className="p-3 bg-slate-700 rounded-md cursor-grab active:cursor-grabbing text-center text-purple-200 font-serif-highlight text-lg transition-all hover:bg-purple-600 hover:text-white"
                                >
                                    {keyword}
                                </div>
                            )
                        ))}
                         {isAllCompleted && (
                            <div className="text-center text-green-400 p-4 bg-green-500/10 rounded-md">
                                <p className="font-bold">Parabéns!</p>
                                <p className="text-sm">Você completou todos os princípios.</p>
                            </div>
                         )}
                    </div>
                </div>
            </div>
             <style>{`
                @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 20%, 40%, 60%, 80% { transform: translateX(5px); } }
                .animate-shake { animation: shake 0.5s ease-in-out; border-color: #ef4444; }
            `}</style>
        </div>
    );
};

export default Principios;