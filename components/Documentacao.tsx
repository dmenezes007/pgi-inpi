import React from 'react';
import DocIcon from './DocIcon';

const Documentacao: React.FC = () => {
    return (
        <div className="module-page">
            <h1 className="module-title">
                Documentação
            </h1>
            <div className="module-intro">
                <div className="module-kicker">REPOSITÓRIO INSTITUCIONAL</div>
                <p className="module-lead">
                    Registro institucional dos documentos de referência ou de suporte ao desenvolvimento do processo de gestão da inovação no âmbito institucional.
                </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-lg shadow-blue-100/50 space-y-8">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Estrutura do Processo de Gestão da Inovação</h2>
                                <p className="mt-1 block text-sm text-slate-500 doc-subtext">Representação da árvore de processo para orientação dos instrumentos e módulos operacionais.</p>
                            </div>
                            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700">Processo de Nível 3 ativo</span>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-xl border border-blue-100 bg-white p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Tipo de Processo</p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">Gestão</p>
                            </div>
                            <div className="rounded-xl border border-blue-100 bg-white p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Macroprocesso</p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">Desenvolvimento e Transformação Organizacional</p>
                            </div>
                            <div className="rounded-xl border border-blue-100 bg-white p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Processo de Nível 2</p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">Gestão da Inovação e do Conhecimento</p>
                            </div>
                            <div className="rounded-xl border border-blue-100 bg-white p-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Processo de Nível 3</p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">Gestão da Inovação</p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-800">Objetivo do Processo de Nível 3</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-700">
                                Fomentar e gerenciar a inovação institucional de forma sistemática, coordenando o ciclo de identificação,
                                desenvolvimento, implantação e medição de novas soluções, visando a modernização de processos, a melhoria
                                dos serviços prestados e o fortalecimento da cultura intraempreendedora no INPI.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">Processos de Nível 4</h3>
                            <div className="grid gap-3 md:grid-cols-2">
                                <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <h4 className="text-sm font-semibold text-blue-800">4.1 Estímulo à Inovação</h4>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-700"><span className="font-semibold">Objetivo:</span> promover cultura de intraempreendedorismo e captar ideias, dores e oportunidades de aprimoramento ou concepção de processos, produtos e serviços, alimentando o funil de inovação institucional com critérios de priorização.</p>
                                </article>
                                <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <h4 className="text-sm font-semibold text-blue-800">4.2 Desenvolvimento da Inovação</h4>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-700"><span className="font-semibold">Objetivo:</span> converter ideias priorizadas em pilotos, protótipos ou soluções viáveis, com definição de requisitos, riscos, recursos, cronograma e responsáveis.</p>
                                </article>
                                <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <h4 className="text-sm font-semibold text-blue-800">4.3 Implantação da Inovação</h4>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-700"><span className="font-semibold">Objetivo:</span> executar, escalar e integrar soluções validadas aos processos rotineiros do INPI, com gestão da mudança, capacitação e governança de adoção.</p>
                                </article>
                                <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <h4 className="text-sm font-semibold text-blue-800">4.4 Medição da Inovação</h4>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-700"><span className="font-semibold">Objetivo:</span> monitorar desempenho e impacto das iniciativas, avaliar retorno institucional e econômico, e retroalimentar novos ciclos com aprendizagem baseada em evidências.</p>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <a href="https://dmenezes007.github.io/pgi-inpi/files/docs/Minuta%20da%20Pol%C3%ADtica%20de%20Gest%C3%A3o%20da%20Inova%C3%A7%C3%A3o%20do%20INPI.docx" target="_blank" rel="noopener noreferrer" className="group flex items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
                        <DocIcon />
                        <div>
                            <span className="block text-sm font-semibold text-slate-900 group-hover:text-blue-700">Minuta: Política de Gestão da Inovação do INPI</span>
                            <span className="mt-1 block text-sm text-slate-500">Documento base para diretrizes, princípios e governança da inovação.</span>
                        </div>
                    </a>
                    <a href="https://dmenezes007.github.io/pgi-inpi/files/docs/Minuta%20da%20Pol%C3%ADtica%20de%20Inova%C3%A7%C3%A3o%20da%20Academia%20do%20INPI.docx" target="_blank" rel="noopener noreferrer" className="group flex items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
                        <DocIcon />
                        <div>
                            <span className="block text-sm font-semibold text-slate-900 group-hover:text-blue-700">Minuta: Política de Inovação da Academia do INPI</span>
                            <span className="mt-1 block text-sm text-slate-500">Diretrizes para articulação acadêmica, capacitação e inovação aplicada.</span>
                        </div>
                    </a>
                    <a href="https://dmenezes007.github.io/pgi-inpi/files/docs/Minuta%20da%20Pol%C3%ADtica%20de%20Relacionamento%20da%20Academia%20do%20INPI%20com%20Funda%C3%A7%C3%B5es%20de%20Apoio.docx" target="_blank" rel="noopener noreferrer" className="group flex items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
                        <DocIcon />
                        <div>
                            <span className="block text-sm font-semibold text-slate-900 group-hover:text-blue-700">Minuta: Política de Relacionamento da Academia do INPI com Fundações de Apoio</span>
                            <span className="mt-1 block text-sm text-slate-500">Regras de relacionamento institucional e apoio à execução das iniciativas.</span>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Documentacao;
