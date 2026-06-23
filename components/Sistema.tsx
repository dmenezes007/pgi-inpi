import React from 'react';

const sgiComponents = [
    { title: 'Laboratório de Inovação', description: 'Instituído com formato e funcionamento definidos em ato normativo específico.', icon: '🔬' },
    { title: 'Redes de Inovação', description: 'Criação ou participação em redes para impulsionar a gestão da inovação e produzir alto impacto.', icon: '🌐' },
    { title: 'Programas de Capacitação', description: 'Formação contínua em gestão da inovação, gestão de mudanças e gestão por resultados.', icon: '🎓' },
    { title: 'Eventos de Inovação', description: 'Realização de eventos para difundir práticas e conhecimentos relativos ao tema.', icon: '🎉' },
    { title: 'Times Volantes', description: 'Constituição de equipes dedicadas ao desenvolvimento e implementação de soluções inovadoras.', icon: '🚀' },
    { title: 'Prêmio de Inovação', description: 'Promoção do Prêmio de Inovação do INPI, com critérios transparentes para avaliação e priorização.', icon: '🏆' },
    { title: 'Banco de Ideias', description: 'Criação e manutenção de um banco de ideias para aproveitamento futuro.', icon: '💡' }
];

const Sistema: React.FC = () => {
    return (
        <div className="module-page">
            <h1 className="module-title">Sistema</h1>
            <div className="module-intro">
                <div className="module-kicker">Estrutura do SGI</div>
                <p className="module-lead">
                   Conheça os elementos que compõem o Sistema de Gestão da Inovação (SGI). Cada componente representa um pilar fundamental para apoiar, gerenciar e estimular as atividades de inovação na instituição.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sgiComponents.map((item, index) => (
                    <div key={index} className="group module-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100">
                        <div className="flex items-center mb-4">
                            <div className="text-4xl mr-4 transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                            <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
                        </div>
                        <p className="mt-0.5 block text-sm text-slate-500 uppercase leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sistema;