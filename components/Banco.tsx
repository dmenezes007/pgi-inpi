import React, { useEffect, useMemo, useState } from 'react';

type IdeaStatus = 'Enviada' | 'Em análise' | 'Selecionada' | 'Em execução' | 'Implementada' | 'Arquivada';

interface Idea {
    id: string;
    timestamp: string;
    autor: string;
    email: string;
    titulo: string;
    categoria: string;
    problema: string;
    justificativa: string;
    escopo: string;
    status: IdeaStatus;
    likes: number;
}

interface IdeaPayload {
    id: string;
    timestamp: string;
    autor: string;
    email: string;
    titulo: string;
    categoria: string;
    problema: string;
    justificativa: string;
    escopo: string;
    integrantes: string[];
    etapas: string[];
    recursos: string[];
    riscos: string[];
    indicadores: string[];
    status: IdeaStatus;
    likes: number;
    lifecycle: Array<{
        status: IdeaStatus;
        timestamp: string;
        justificativa: string;
        actor: string;
    }>;
}

const STORAGE_KEY = 'pgi_banco_ideias_v1';
const REMOTE_POLL_MS = 20000;
const STATUS_OPTIONS: IdeaStatus[] = ['Enviada', 'Em análise', 'Selecionada', 'Em execução', 'Implementada', 'Arquivada'];

const normalize = (value: string): string => value.trim().toLowerCase();

const defaultApiBase = (): string => {
    const env = (import.meta as any).env;
    const explicit = env?.VITE_SGI_API_BASE;
    if (typeof explicit === 'string' && explicit.trim() !== '') return explicit.trim().replace(/\/$/, '');
    return 'http://fileserver:8010/api';
};

const toIdea = (item: any): Idea | null => {
    if (!item || typeof item !== 'object') return null;

    const id = String(item.id || '').trim();
    const titulo = String(item.titulo || '').trim();
    if (!id || !titulo) return null;

    const statusText = String(item.status || 'Enviada').trim();
    const status = STATUS_OPTIONS.find((opt) => normalize(opt) === normalize(statusText)) || 'Enviada';

    return {
        id,
        timestamp: String(item.timestamp || new Date().toISOString()),
        autor: String(item.autor || '').trim(),
        email: String(item.email || '').trim(),
        titulo,
        categoria: String(item.categoria || '').trim(),
        problema: String(item.problema || '').trim(),
        justificativa: String(item.justificativa || '').trim(),
        escopo: String(item.escopo || '').trim(),
        status,
        likes: Number(item.likes || 0),
    };
};

const fetchIdeasFromApi = async (apiBase: string): Promise<Idea[]> => {
    const response = await fetch(`${apiBase}/ideas`, { method: 'GET' });
    if (!response.ok) throw new Error(`Falha ao consultar API (${response.status})`);

    const payload = await response.json();
    const ideasRaw = Array.isArray(payload?.ideas) ? payload.ideas : [];
    return ideasRaw.map((item: any) => toIdea(item)).filter((row: Idea | null): row is Idea => !!row);
};

const statusClass = (status: IdeaStatus): string => {
    if (status === 'Em análise') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (status === 'Selecionada') return 'bg-amber-50 text-amber-700 border-amber-200';
    if (status === 'Em execução') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Implementada') return 'bg-green-50 text-green-700 border-green-200';
    if (status === 'Arquivada') return 'bg-rose-50 text-rose-700 border-rose-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
};

const formatDate = (raw: string): string => {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return '-';
    return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
};

const Banco: React.FC = () => {
    const [apiBase, setApiBase] = useState(defaultApiBase());
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [statusDrafts, setStatusDrafts] = useState<Record<string, IdeaStatus>>({});
    const [justificativas, setJustificativas] = useState<Record<string, string>>({});

    const [autor, setAutor] = useState('');
    const [email, setEmail] = useState('');
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [problema, setProblema] = useState('');
    const [justificativa, setJustificativa] = useState('');
    const [escopo, setEscopo] = useState('');

    const saveLocal = (next: Idea[]) => {
        setIdeas(next);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    };

    const refreshIdeas = async (targetApiBase: string): Promise<Idea[]> => {
        const remoteRows = await fetchIdeasFromApi(targetApiBase);
        saveLocal(remoteRows);
        setIsConnected(true);
        return remoteRows;
    };

    useEffect(() => {
        const hydrate = async () => {
            setIsLoading(true);
            setSaveMessage('');
            setErrorMessage('');

            try {
                await refreshIdeas(apiBase);
            } catch {
                setIsConnected(false);
                const localRaw = localStorage.getItem(STORAGE_KEY);
                if (localRaw) {
                    try {
                        const localRows = JSON.parse(localRaw) as Idea[];
                        const sanitized = localRows
                            .map((item) => toIdea(item))
                            .filter((item): item is Idea => !!item);
                        setIdeas(sanitized);
                    } catch {
                        setIdeas([]);
                    }
                } else {
                    setIdeas([]);
                }
            } finally {
                setIsLoading(false);
            }
        };

        hydrate();
    }, [apiBase]);

    useEffect(() => {
        let active = true;

        const sync = async () => {
            try {
                const remoteRows = await fetchIdeasFromApi(apiBase);
                if (!active) return;

                setIsConnected(true);
                setIdeas((prev) => {
                    if (JSON.stringify(prev) === JSON.stringify(remoteRows)) return prev;
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteRows));
                    return remoteRows;
                });
            } catch {
                if (active) setIsConnected(false);
            }
        };

        const timerId = window.setInterval(sync, REMOTE_POLL_MS);
        return () => {
            active = false;
            window.clearInterval(timerId);
        };
    }, [apiBase]);

    const totalIdeias = ideas.length;
    const totalImplementadas = ideas.filter((item) => item.status === 'Implementada').length;
    const totalAnalise = ideas.filter((item) => item.status === 'Em análise').length;

    const sortedIdeas = useMemo(() => {
        return [...ideas].sort((a, b) => {
            const aTime = new Date(a.timestamp).getTime();
            const bTime = new Date(b.timestamp).getTime();
            return bTime - aTime;
        });
    }, [ideas]);

    const submitIdea = async () => {
        setSaveMessage('');
        setErrorMessage('');

        if (!autor.trim() || !titulo.trim() || !categoria.trim() || !problema.trim() || !justificativa.trim() || !escopo.trim()) {
            setErrorMessage('Preencha todos os campos obrigatórios para submeter a ideia.');
            return;
        }

        const now = new Date().toISOString();
        const newIdea: IdeaPayload = {
            id: `pgi-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            timestamp: now,
            autor: autor.trim(),
            email: email.trim(),
            titulo: titulo.trim(),
            categoria: categoria.trim(),
            problema: problema.trim(),
            justificativa: justificativa.trim(),
            escopo: escopo.trim(),
            integrantes: [],
            etapas: [],
            recursos: [],
            riscos: [],
            indicadores: [],
            status: 'Enviada',
            likes: 0,
            lifecycle: [
                {
                    status: 'Enviada',
                    timestamp: now,
                    justificativa: 'Registro inicial.',
                    actor: 'Sistema PGI',
                },
            ],
        };

        setIsSaving(true);

        try {
            const response = await fetch(`${apiBase}/ideas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newIdea),
            });

            if (!response.ok) {
                throw new Error(`Falha no endpoint (${response.status})`);
            }

            await refreshIdeas(apiBase);
            setSaveMessage('Ideia registrada com sucesso e persistida no backend.');
            setAutor('');
            setEmail('');
            setTitulo('');
            setCategoria('');
            setProblema('');
            setJustificativa('');
            setEscopo('');
        } catch {
            setErrorMessage('Falha ao registrar na API. Verifique o endpoint e tente novamente.');
        } finally {
            setIsSaving(false);
        }
    };

    const likeIdea = async (id: string) => {
        setSaveMessage('');
        setErrorMessage('');

        try {
            const response = await fetch(`${apiBase}/ideas/${id}/like`, { method: 'POST' });
            if (!response.ok) {
                throw new Error(`Falha no endpoint (${response.status})`);
            }

            await refreshIdeas(apiBase);
            setSaveMessage('Curtida registrada com sucesso.');
        } catch {
            setErrorMessage('Não foi possível registrar a curtida na API.');
        }
    };

    const updateStatus = async (id: string) => {
        const status = statusDrafts[id];
        const note = (justificativas[id] || '').trim();

        setSaveMessage('');
        setErrorMessage('');

        if (!status) {
            setErrorMessage('Selecione um novo status antes de alterar o registro.');
            return;
        }

        if (!note) {
            setErrorMessage('Informe a justificativa da alteração de status.');
            return;
        }

        try {
            const response = await fetch(`${apiBase}/ideas/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status,
                    justificativa: note,
                    actor: 'Laboratório de Inovação - PGI',
                }),
            });

            if (!response.ok) {
                throw new Error(`Falha no endpoint (${response.status})`);
            }

            await refreshIdeas(apiBase);
            setSaveMessage('Status atualizado com sucesso e persistido no backend.');
            setJustificativas((prev) => ({ ...prev, [id]: '' }));
        } catch {
            setErrorMessage('Não foi possível atualizar o status na API.');
        }
    };

    return (
        <div className="module-page space-y-6">
            <h1 className="module-title">Banco de Ideias</h1>

            <div className="module-intro">
                <div className="module-kicker">PORTFÓLIO TRANSACIONAL DE INOVAÇÃO</div>
                <p className="module-lead">
                    Este módulo foi remodelado para operar de forma transacional e com persistência, permitindo registrar ideias,
                    acompanhar ciclo de vida e manter sincronização contínua com backend institucional.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="module-card">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Ideias registradas</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{totalIdeias}</p>
                </div>
                <div className="module-card">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Em análise</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{totalAnalise}</p>
                </div>
                <div className="module-card">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Implementadas</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">{totalImplementadas}</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-800">Conexão com API SGI</p>
                    <p className="text-xs text-blue-700 mt-1 break-all">Endpoint atual: {apiBase}</p>
                </div>
                <div className={`text-xs font-semibold px-2 py-1 rounded border ${isConnected ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-amber-300 bg-amber-50 text-amber-700'}`}>
                    {isConnected ? 'Conectado' : 'Sem conexão remota'}
                </div>
            </div>

            <div className="module-card">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end mb-4">
                    <div className="flex-1 min-w-0">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Endpoint da API</label>
                        <input
                            value={apiBase}
                            onChange={(e) => setApiBase(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                            placeholder="http://fileserver:8010/api"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => setApiBase((current) => current.trim().replace(/\/$/, ''))}
                        className="px-4 py-2 rounded-lg border border-blue-300 text-blue-700 font-semibold hover:bg-blue-50"
                    >
                        Aplicar endpoint
                    </button>
                </div>

                <h2 className="module-section-title">Submissão de Nova Ideia</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Autor *</label>
                        <input value={autor} onChange={(e) => setAutor(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Título da ideia *</label>
                        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Categoria / Eixo *</label>
                        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" placeholder="Ex.: Eixo 1" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Problema *</label>
                        <textarea value={problema} onChange={(e) => setProblema(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm min-h-24" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Justificativa *</label>
                        <textarea value={justificativa} onChange={(e) => setJustificativa(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm min-h-24" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Escopo *</label>
                        <textarea value={escopo} onChange={(e) => setEscopo(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm min-h-24" />
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        onClick={submitIdea}
                        disabled={isSaving}
                        className="px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
                    >
                        {isSaving ? 'Salvando...' : 'Submeter ideia'}
                    </button>
                </div>
            </div>

            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
            {saveMessage && <p className="text-sm text-emerald-700">{saveMessage}</p>}

            {isLoading && (
                <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-4 text-blue-800">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-200 border-t-blue-700 animate-spin" aria-hidden="true" />
                    <p className="text-sm font-medium">Carregando dados persistidos do Banco de Ideias...</p>
                </div>
            )}

            <div className="module-card overflow-x-auto">
                <h2 className="module-section-title">Ideias Registradas</h2>

                <table className="w-full text-sm min-w-[880px]">
                    <thead>
                        <tr className="border-b border-slate-200 text-slate-700">
                            <th className="text-left py-2 pr-3">Título</th>
                            <th className="text-left py-2 pr-3">Autor</th>
                            <th className="text-left py-2 pr-3">Categoria</th>
                            <th className="text-left py-2 pr-3">Status</th>
                            <th className="text-left py-2 pr-3">Curtidas</th>
                            <th className="text-left py-2 pr-3">Atualização</th>
                            <th className="text-left py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedIdeas.map((idea) => {
                            const statusDraft = statusDrafts[idea.id] || idea.status;
                            return (
                                <tr key={idea.id} className="border-b border-slate-100 align-top">
                                    <td className="py-3 pr-3">
                                        <p className="font-semibold text-slate-900">{idea.titulo}</p>
                                        <p className="text-xs text-slate-500 mt-1">{idea.id}</p>
                                    </td>
                                    <td className="py-3 pr-3 text-slate-700">{idea.autor || '-'}</td>
                                    <td className="py-3 pr-3 text-slate-700">{idea.categoria || '-'}</td>
                                    <td className="py-3 pr-3">
                                        <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${statusClass(idea.status)}`}>
                                            {idea.status}
                                        </span>
                                    </td>
                                    <td className="py-3 pr-3 text-slate-700">{idea.likes}</td>
                                    <td className="py-3 pr-3 text-slate-700">{formatDate(idea.timestamp)}</td>
                                    <td className="py-3">
                                        <div className="space-y-2">
                                            <button
                                                type="button"
                                                onClick={() => likeIdea(idea.id)}
                                                className="px-3 py-1 rounded-md text-xs font-semibold text-blue-700 border border-blue-200 hover:bg-blue-50"
                                            >
                                                Curtir
                                            </button>

                                            <select
                                                value={statusDraft}
                                                onChange={(e) => setStatusDrafts((prev) => ({ ...prev, [idea.id]: e.target.value as IdeaStatus }))}
                                                className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs"
                                            >
                                                {STATUS_OPTIONS.map((status) => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>

                                            <textarea
                                                value={justificativas[idea.id] || ''}
                                                onChange={(e) => setJustificativas((prev) => ({ ...prev, [idea.id]: e.target.value }))}
                                                placeholder="Justificativa da mudança de status"
                                                className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs min-h-16"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => updateStatus(idea.id)}
                                                className="px-3 py-1 rounded-md text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700"
                                            >
                                                Atualizar status
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                        {sortedIdeas.length === 0 && !isLoading && (
                            <tr>
                                <td colSpan={7} className="py-6 text-center text-slate-500">
                                    Nenhuma ideia registrada.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Banco;
