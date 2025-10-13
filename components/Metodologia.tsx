import React, { useState } from 'react';

// A simple, reusable accordion item component
const AccordionItem = ({ title, icon, children, isOpen, onClick }: { title: string; icon: React.ReactNode; children: React.ReactNode; isOpen: boolean; onClick: () => void; }) => (
  <div className="border-b border-slate-700 last:border-b-0">
    <h2>
      <button
        type="button"
        className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-200 hover:bg-slate-700/50 transition-colors duration-200"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="flex items-center text-lg">
            {icon}
            <span className="ml-4">{title}</span>
        </span>
        <svg className={`w-6 h-6 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
    </h2>
    <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} grid`}>
        <div className="overflow-hidden">
            <div className="p-5 border-t border-slate-700/50">
                <div className="text-gray-300 space-y-4 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    </div>
  </div>
);

// Using placeholder images as per platform limitations. These can be replaced with actual image paths.
const workshopImages = [
  "/files/imgs/Foto #01.jpeg",
  "/files/imgs/Foto #02.jpeg",
  "/files/imgs/Foto #03.jpeg",
  "/files/imgs/Foto #04.jpeg",
  "/files/imgs/Foto #05.jpeg",
  "/files/imgs/Foto #06.jpeg",
  "/files/imgs/Foto #07.jpeg",
  "/files/imgs/Foto #08.jpeg",
  "/files/imgs/Foto #09.jpeg",
  "/files/imgs/Foto #10.jpeg",
  "/files/imgs/Foto #11.jpeg",
  "/files/imgs/Foto #12.jpeg",
  "/files/imgs/Foto #13.jpeg",
  "/files/imgs/Foto #14.jpeg",
  "/files/imgs/Foto #15.jpeg",
  "/files/imgs/Foto #16.jpeg",
  "/files/imgs/Foto #17.jpeg",
  "/files/imgs/Foto #18.jpeg",
  "/files/imgs/Foto #19.jpeg",
  "/files/imgs/Foto #20.jpeg",
  "/files/imgs/Foto #21.jpeg",
  "/files/imgs/Foto #22.jpeg",
  "/files/imgs/Foto #23.jpeg",
  "/files/imgs/Foto #24.jpeg",
  "/files/imgs/Foto #25.jpeg",
  "/files/imgs/Foto #26.jpeg",
  "/files/imgs/Foto #27.jpeg",
  "/files/imgs/Foto #28.jpeg",
  "/files/imgs/Foto #29.jpeg",
  "/files/imgs/Foto #30.jpeg",
  "/files/imgs/Foto #31.jpeg",
  "/files/imgs/Foto #32.jpeg",
  "/files/imgs/Foto #33.jpeg",
  "/files/imgs/Foto #34.jpeg",
  "/files/imgs/Foto #35.jpeg",
  "/files/imgs/Foto #36.jpeg",
  "/files/imgs/Foto #37.jpeg",
  "/files/imgs/Foto #38.jpeg",
  "/files/imgs/Foto #39.jpeg",
  "/files/imgs/Foto #40.jpeg",
  "/files/imgs/Foto #41.jpeg",
  "/files/imgs/Foto #42.jpeg",
  "/files/imgs/Foto #43.jpeg",
  "/files/imgs/Foto #44.jpeg",
  "/files/imgs/Foto #45.jpeg",
  "/files/imgs/Foto #46.jpeg",
  "/files/imgs/Foto #47.jpeg",
  "/files/imgs/Foto #48.jpeg",
  "/files/imgs/Foto #49.jpeg",
  "/files/imgs/Foto #50.jpeg",
  "/files/imgs/Foto #51.jpeg",
  "/files/imgs/Foto #52.jpeg",
  "/files/imgs/Foto #53.jpeg",
  "/files/imgs/Foto #54.jpeg",
  "/files/imgs/Foto #55.jpeg",
  "/files/imgs/Foto #56.jpeg",
  "/files/imgs/Foto #57.jpeg",
  "/files/imgs/Foto #58.jpeg",
  "/files/imgs/Foto #59.jpeg",
  "/files/imgs/Foto #60.jpeg",
  "/files/imgs/Foto #61.jpeg",
  "/files/imgs/Foto #62.jpeg",
  "/files/imgs/Foto #63.jpeg",
  "/files/imgs/Foto #64.jpeg",
  "/files/imgs/Foto #65.jpeg",
  "/files/imgs/Foto #66.jpeg",
  "/files/imgs/Foto #67.jpeg",
  "/files/imgs/Foto #68.jpeg",
  "/files/imgs/Foto #69.jpeg",
  "/files/imgs/Foto #70.jpeg",
  "/files/imgs/Foto #71.jpeg",
  "/files/imgs/Foto #72.jpeg",
  "/files/imgs/Foto #73.jpeg",
  "/files/imgs/Foto #74.jpeg",
  "/files/imgs/Foto #75.jpeg",
  "/files/imgs/Foto #76.jpeg",
  "/files/imgs/Foto #77.jpeg",
  "/files/imgs/Foto #78.jpeg",
  "/files/imgs/Foto #79.jpeg",
  "/files/imgs/Foto #80.jpeg",
  "/files/imgs/Foto #81.jpeg",
  "/files/imgs/Foto #82.jpeg",
];

// Generate some pseudo-random but consistent rotations for the mural effect
const rotations = [
  'rotate(-2deg)', 'rotate(3deg)', 'rotate(1deg)', 'rotate(-2.5deg)', 'rotate(2deg)',
  'rotate(1.5deg)', 'rotate(-1deg)', 'rotate(-3deg)', 'rotate(2.5deg)', 'rotate(-0.5deg)',
  'rotate(3.5deg)', 'rotate(-1.5deg)', 'rotate(2.2deg)', 'rotate(-2.8deg)', 'rotate(1.8deg)',
  'rotate(-0.8deg)', 'rotate(2.6deg)', 'rotate(-3.2deg)', 'rotate(0.5deg)', 'rotate(1.2deg)',
  'rotate(-2.2deg)', 'rotate(2.9deg)', 'rotate(-1.2deg)', 'rotate(3.1deg)', 'rotate(-0.3deg)',
  'rotate(1.7deg)', 'rotate(-2.6deg)', 'rotate(2.1deg)', 'rotate(-1.8deg)', 'rotate(3.3deg)',
  'rotate(-0.1deg)', 'rotate(2.4deg)', 'rotate(-2.9deg)', 'rotate(1.4deg)', 'rotate(-1.3deg)',
  'rotate(2.8deg)', 'rotate(-2.1deg)', 'rotate(0.9deg)', 'rotate(-3.4deg)', 'rotate(2.7deg)',
];


const Metodologia: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>('sprint');
    const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

    const handleAccordionToggle = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const openLightbox = (index: number) => {
        setLightbox({ isOpen: true, index });
    };

    const closeLightbox = () => {
        setLightbox({ isOpen: false, index: 0 });
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLightbox(prev => ({ ...prev, index: (prev.index + 1) % workshopImages.length }));
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLightbox(prev => ({ ...prev, index: (prev.index - 1 + workshopImages.length) % workshopImages.length }));
    };


    return (
        <div>
            <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">
                Metodologia
            </h1>
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-10 border border-slate-700">
                <p className="text-lg leading-relaxed text-gray-300">
                    A concepção da minuta da <span className="text-purple-400 font-serif-highlight">Política de Gestão da Inovação</span> do INPI foi estruturada a partir de uma metodologia ágil e colaborativa, combinando referenciais estratégicos de gestão com padrões internacionais. O processo foi desenhado para ser participativo, eficiente e alinhado aos objetivos institucionais de transformação.
                </p>
            </div>

            <div id="accordion-flush" className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                <AccordionItem
                    title="Design Sprint Institucional: Foco e Agilidade"
                    isOpen={openAccordion === 'sprint'}
                    onClick={() => handleAccordionToggle('sprint')}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    }
                >
                    <p>
                        Utilizamos o método de <span className="text-purple-400 font-serif-highlight">Design Sprint</span>, adaptado ao contexto institucional, para condensar as fases de diagnóstico, ideação, prototipagem e teste em um ciclo curto de três dias. Esta abordagem permitiu a <span className="text-purple-400 font-serif-highlight">construção colaborativa</span> da política, favorecendo decisões rápidas e reduzindo os riscos de implementação.
                    </p>
                     <p className="mt-4">
                        O processo contou com a participação ativa de <span className="font-bold text-purple-400 text-xl">16</span> participantes, a contribuição de <span className="font-bold text-purple-400 text-xl">7</span> especialistas e o envolvimento direto de <span className="font-bold text-purple-400 text-xl">3</span> decisores, garantindo uma visão plural e alinhada estrategicamente.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-4">Agenda da Metaoficina</h3>
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg border border-slate-700">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-300 uppercase bg-slate-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Dia</th>
                                    <th scope="col" className="px-6 py-3">Data</th>
                                    <th scope="col" className="px-6 py-3">Foco Principal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/40">
                                    <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">Dia 1</td>
                                    <td className="px-6 py-4">15/09/2025</td>
                                    <td className="px-6 py-4">Entender e Esboçar: Mapeamento da jornada, escuta com especialistas e esboço de soluções.</td>
                                </tr>
                                <tr className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/40">
                                    <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">Dia 2</td>
                                    <td className="px-6 py-4">16/09/2025</td>
                                    <td className="px-6 py-4">Decidir e Prototipar: Votação de soluções, storyboard e construção do protótipo da política.</td>
                                </tr>
                                <tr className="bg-slate-800 hover:bg-slate-700/40">
                                    <td className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">Dia 3</td>
                                    <td className="px-6 py-4">17/09/2025</td>
                                    <td className="px-6 py-4">Testar e Aprender: Testes com usuários-chave, análise de resultados e definição dos próximos passos.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </AccordionItem>

                 <AccordionItem
                    title="Registros da Metaoficina"
                    isOpen={openAccordion === 'registros'}
                    onClick={() => handleAccordionToggle('registros')}
                    icon={
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    }
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8 p-4">
                        {workshopImages.map((src, index) => (
                            <div key={index} className="relative aspect-[4/3] cursor-pointer group" onClick={() => openLightbox(index)}>
                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-300 rounded-full shadow-lg z-10 border-2 border-slate-600 group-hover:bg-yellow-400">
                                    <div className="absolute inset-[3px] bg-slate-800 rounded-full"></div>
                                </div>
                                <img
                                    src={src}
                                    alt={`Registro da Metaoficina ${index + 1}`}
                                    className="w-full h-full object-cover p-1.5 bg-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                                    style={{ transform: rotations[index % rotations.length] }}
                                />
                            </div>
                        ))}
                    </div>
                </AccordionItem>
                
                <AccordionItem
                    title="Referencial Estratégico: Modelo de Excelência da Gestão®"
                    isOpen={openAccordion === 'meg'}
                    onClick={() => handleAccordionToggle('meg')}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                    }
                >
                   <p>
                        O <span className="text-purple-400 font-serif-highlight">Modelo de Excelência da Gestão® (MEG)</span> da Fundação Nacional da Qualidade (FNQ) serviu como principal referencial para alinhar a política às melhores práticas de gestão. O fundamento <span className="text-purple-400 font-serif-highlight">"Inovação"</span> foi central, orientando a estruturação de processos que abrangem desde a <span className="text-purple-400 font-serif-highlight">Gestão do Conhecimento</span> até a <span className="text-purple-400 font-serif-highlight">Gestão da Inovação</span> em todas as suas fases: estímulo, desenvolvimento, implantação e medição dos resultados.
                    </p>
                </AccordionItem>

                <AccordionItem
                    title="Padrão Internacional: ISO 56002"
                    isOpen={openAccordion === 'iso'}
                    onClick={() => handleAccordionToggle('iso')}
                    icon={
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
                        </svg>
                    }
                >
                    <p>
                       Para garantir o alinhamento com as melhores práticas globais, a norma <span className="text-purple-400 font-serif-highlight">ISO 56002 - Gestão da Inovação</span> foi adotada como guia. Ela fornece diretrizes para o desenvolvimento, implementação e manutenção de um <span className="text-purple-400 font-serif-highlight">Sistema de Gestão da Inovação</span> eficaz. A incorporação dos seus princípios assegura que a política do INPI seja robusta, sistemática e comparável a padrões internacionais de excelência.
                    </p>
                </AccordionItem>
            </div>
             {lightbox.isOpen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
                    <button onClick={closeLightbox} className="absolute top-4 right-4 text-white text-5xl opacity-80 hover:opacity-100 z-50">&times;</button>
                    
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 bg-white/10 hover:bg-white/20 rounded-full z-50">
                       <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    
                    <div className="relative max-w-full max-h-full" onClick={e => e.stopPropagation()}>
                        <img 
                            src={workshopImages[lightbox.index]} 
                            alt={`Registro da Metaoficina ${lightbox.index + 1}`}
                            className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl rounded-lg"
                        />
                    </div>
                    
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 bg-white/10 hover:bg-white/20 rounded-full z-50">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Metodologia;