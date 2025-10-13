import React from 'react';

const tipologias = [
  {
    title: 'Inovação Pública',
    description: 'Inovação pautada por valores, premissas e comportamentos complementares, orientada por abordagens experimentais, ágeis e iterativas, tanto para a melhor compreensão dos problemas públicos a serem resolvidos quanto para o desenho de soluções a serem testadas como possíveis alternativas para a sua resolução.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    )
  },
  {
    title: 'Inovação Interna',
    description: 'Concepção e implementação de novas metodologias de trabalho, processos, sistemas e práticas de gestão que resultem na otimização do ambiente organizacional, de modo a fortalecer a cultura de inovação, aprimorar a eficiência operacional, promover o desenvolvimento contínuo dos servidores e colaboradores e modernizar a estrutura administrativa do INPI para responder com agilidade os desafios estratégicos.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    )
  },
  {
    title: 'Inovação Externa',
    description: 'Desenvolvimento e oferta de novos produtos, serviços e processos com o aprimoramento da experiência dos usuários e entrega de maior valor à sociedade, sendo impulsionada pela busca de soluções criativas e tecnológicas para atender às demandas do público externo, simplificar o acesso aos serviços prestados pelo INPI e fortalecer o papel do Instituto como agente central nos ecossistemas nacional e regionais de propriedade intelectual e inovação.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5 0V6.375c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125-1.125h-4.5A1.125 1.125 0 0113.5 10.5z" />
        </svg>
    )
  },
  {
    title: 'Inovação Aberta',
    description: 'Modelo que utiliza conhecimento e recursos internos e externos para desenvolver soluções inovadoras, colaborando com parceiros como startups, universidades, empresas e instituições públicas.',
     icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
    )
  }
];

const FlippingCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <div className="group h-72 w-full [perspective:1000px]">
    <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      {/* Front */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-800 p-6 rounded-xl border border-slate-700 [backface-visibility:hidden]">
        {icon}
        <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">{title}</h3>
      </div>
      {/* Back */}
      <div className="absolute inset-0 bg-slate-700 p-6 rounded-xl border border-purple-500 [transform:rotateY(180deg)] [backface-visibility:hidden]">
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h4 className="text-xl font-semibold text-purple-400 mb-2">{title}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

const Tipologia: React.FC = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">
                Tipologia
            </h1>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-10 border border-slate-700">
                <p className="text-lg leading-relaxed text-gray-300">
                    A abordagem da gestão da inovação no INPI considerou diferentes<span className="text-purple-400 font-serif-highlight">tipos de inovação</span>, dentre aqueles entendidos como mais aderentes ao contexto institucional.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tipologias.map((tipo) => (
                    <FlippingCard key={tipo.title} title={tipo.title} description={tipo.description} icon={tipo.icon} />
                ))}
            </div>
        </div>
    );
};

export default Tipologia;