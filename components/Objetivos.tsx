import React, { ReactNode } from 'react';

const objectivesData = [
    { text: 'promover a <cultura> e as práticas de <inovação> de forma permanente no INPI;' },
    { text: 'otimizar os <processos> internos do Instituto, buscando a geração e promoção de inovações que beneficiem os <serviços> oferecidos;' },
    { text: 'impulsionar a <transformação> e o <desenvolvimento> institucional, bem como fortalecer a atuação do INPI como agente indutor do <ecossistema> de inovação no Brasil;' },
    { text: 'estimular propostas <inovadoras> realizadas por servidores e colaboradores do INPI, que representem melhorias em relação a práticas já existentes ou constituam novos arranjos de ideias e conceitos na resolução de <problemas> de forma incomum e na obtenção de <resultados> de valor para o Instituto;' },
    { text: 'sistematizar o <reconhecimento> funcional pelo fomento e viabilização da <criatividade> do corpo funcional do INPI, mediante integração <colaborativa> e acomodação do fluxo de ideias, a partir da incorporação à gestão pública das iniciativas dotadas de efetivo potencial de inovação e contribuição à realização da <missão> e valores institucionais; e' },
    { text: 'contribuir para o erguimento de ambiente institucional capaz de atrair e reter <talentos>, e de estimular experiências e desafios que sobrelevem a <autoestima>, a motivação, o desenvolvimento contínuo e a cultura de colaboração, <respeito> e <confiança> no trabalho.' },
];

const RevealableText: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <span className="group relative inline-block cursor-pointer">
      <span className="absolute inset-0 bg-purple-500/30 rounded-md blur-sm opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
      <span className="relative opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-purple-400 font-serif-highlight">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
        <span className="w-full h-0.5 bg-purple-400"></span>
      </span>
    </span>
  );
};

const parseText = (text: string): ReactNode[] => {
    const parts = text.split(/(<[^>]+>)/g);
    return parts.map((part, index) => {
        if (part.startsWith('<') && part.endsWith('>')) {
            const word = part.substring(1, part.length - 1);
            return <RevealableText key={index}>{word}</RevealableText>;
        }
        return part;
    });
};

const Objetivos: React.FC = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">
                Objetivos
            </h1>
            <div className="space-y-6">
                {objectivesData.map((objective, index) => (
                    <div key={index} className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 flex items-start space-x-6">
                        <div className="flex-shrink-0 text-5xl font-serif-highlight text-purple-500/80 -mt-2">
                           {String(index + 1).padStart(2, '0')}
                        </div>
                        <p className="text-gray-300 text-lg leading-loose">
                           {parseText(objective.text)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Objetivos;