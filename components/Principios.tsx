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
        <div className="module-page">
            <h1 className="module-title">Princípios</h1>
            <div className="module-kicker">PRINCÍPIOS ORIENTADORES</div>
            <p className="module-meta-text principios-meta-text">Associe cada palavra-chave ao respectivo princípio orientador da Política de Gestão da Inovação.</p>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="space-y-4 lg:w-3/5">
                    {principlesData.map(({ id, sentence, keyword }) => (
                        <div key={id} className="module-card flex min-h-[60px] flex-col items-center gap-4 lg:flex-row">
                            <div
                                onDrop={(e) => handleDrop(e, id)}
                                onDragOver={(e) => e.preventDefault()}
                                className={`h-10 w-full flex-shrink-0 rounded-md border-2 border-dashed transition-colors duration-300 lg:w-64 ${completed[id] ? 'border-green-500 bg-green-500/10' : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'}`}
                            >
                                {completed[id] && (
                                    <div className="flex h-full items-center justify-center text-lg text-green-600 font-serif-highlight">
                                        {keyword}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    </div>
                                )}
                            </div>
                            <p className="module-section-text text-center lg:text-left">{sentence}</p>
                        </div>
                    ))}
                </div>
                <div className="module-card self-start lg:w-2/5 flex-shrink-0">
                    <h3 className="module-section-title mb-4">Palavras-chave</h3>
                    <div className="space-y-3">
                        {shuffledKeywords.map(({ id, keyword }) => (
                            !completed[id] && (
                                <div
                                    key={id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, id)}
                                    className="cursor-grab rounded-md border border-slate-200 bg-slate-50 p-3 text-center text-lg text-blue-700 font-serif-highlight transition-all hover:border-blue-300 hover:bg-blue-50 active:cursor-grabbing"
                                >
                                    {keyword}
                                </div>
                            )
                        ))}
                         {isAllCompleted && (
                            <div className="rounded-md bg-green-500/10 p-4 text-center text-green-600">
                                <p className="font-bold">Atividade concluída.</p>
                                <p className="text-sm">Todos os princípios foram corretamente associados.</p>
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