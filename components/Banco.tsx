import React, { useDeferredValue, useEffect, useMemo, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select, { SingleValue } from 'react-select';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

type IdeaStatus = 'Enviada' | 'Em análise' | 'Selecionada' | 'Em execução' | 'Implementada' | 'Arquivada';

interface SelectOption {
  value: string;
  label: string;
}

interface IdeaRow {
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
  anexos: string[];
  status: IdeaStatus;
  likes: number;
  source: 'manual' | 'example';
}

interface PlanItem {
  etapa: string;
  prazo: string;
  responsavel: string;
}

interface RiskItem {
  risco: string;
  mitigacao: string;
}

const STORAGE_KEY = 'pgi_banco_ideias_v2';
const BANCO_SOURCE = 'pgi-inpi-banco';
const REMOTE_POLL_MS = 20000;
const DEFAULT_GSHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxbjt2xeyeRdnLWyodl_pLLWnYIKzurdqKSLHeoXfskMtrW3rNHSzQw14BPxiuWqpaG/exec';
const STATUS_OPTIONS: IdeaStatus[] = ['Enviada', 'Em análise', 'Selecionada', 'Em execução', 'Implementada', 'Arquivada'];
const PLAN_SEPARATOR = '|||';
const RISK_SEPARATOR = '|||';

const EIXO_OPTIONS = [
  '1. Fortalecimento Institucional e Governança',
  '2. Transformação Digital e Inteligência Artificial',
  '3. Gestão de Pessoas e Cultura de Inovação',
  '4. Melhoria de Serviços e Experiência do Usuário',
];

const EXAMPLE_IDEAS: IdeaRow[] = [
  {
    id: 'ex-001',
    timestamp: new Date('2025-03-20T15:00:00Z').toISOString(),
    autor: 'Equipe DIRPA',
    email: 'dirpa@inpi.gov.br',
    titulo: 'BPMS - Automação do Fluxo de Patentes',
    categoria: '2. Transformação Digital e Inteligência Artificial',
    problema: 'A tramitação de pedidos de patentes ainda depende de múltiplas etapas manuais e pouca integração entre sistemas, elevando tempo de decisão e retrabalho operacional.',
    justificativa: 'A adoção de BPMS padroniza fluxos, reduz gargalos e aumenta previsibilidade das entregas.',
    escopo: 'Implantação gradual de gestão por processos e integração com módulos do macroprocesso de patentes.',
    integrantes: ['CGTI', 'DIRPA', 'CGPE'],
    etapas: ['Mapeamento AS-IS/TO-BE', 'Implantação técnica e homologação', 'Operação assistida'],
    recursos: ['Equipe de processos e TI', 'Licenças BPMS', 'Treinamento de usuários-chave'],
    riscos: ['Adoção parcial pelas áreas / Mitigar com gestão da mudança'],
    indicadores: ['Redução do prazo médio de tramitação', 'Queda de retrabalho'],
    anexos: ['PA2024_P1.3_BPMS.pdf'],
    status: 'Implementada',
    likes: 8,
    source: 'example',
  },
  {
    id: 'ex-002',
    timestamp: new Date('2025-07-21T15:10:00Z').toISOString(),
    autor: 'Equipe CGTI',
    email: 'cgti@inpi.gov.br',
    titulo: 'Novo Portal de Serviços do INPI',
    categoria: '2. Transformação Digital e Inteligência Artificial',
    problema: 'A experiência digital do usuário ainda é fragmentada, com jornadas complexas e baixa integração entre serviços institucionais.',
    justificativa: 'Projeto estratégico para transformação digital e melhoria do atendimento ao cidadão e às empresas.',
    escopo: 'Nova arquitetura de serviços digitais com foco em usabilidade e integração de sistemas.',
    integrantes: ['CGTI', 'CCOM', 'DIRPA', 'DIRMA'],
    etapas: ['Mapeamento da jornada do usuário', 'Desenvolvimento de módulos prioritários', 'Migração progressiva'],
    recursos: ['Equipe de UX e desenvolvimento', 'Infraestrutura de portal', 'Integrações via API'],
    riscos: ['Dependências entre legados / Mitigar com roadmap modular'],
    indicadores: ['Taxa de conclusão de serviços digitais', 'Nível de satisfação do usuário'],
    anexos: ['PA2025_P5.06_PortalServicos.pdf'],
    status: 'Em execução',
    likes: 5,
    source: 'example',
  },
  {
    id: 'ex-003',
    timestamp: new Date('2026-04-03T09:10:00Z').toISOString(),
    autor: 'Equipe DIRPA',
    email: 'dirpa.projetos@inpi.gov.br',
    titulo: 'Exame de Patentes com Inteligência Artificial',
    categoria: '2. Transformação Digital e Inteligência Artificial',
    problema: 'A análise técnica de patentes exige alta capacidade analítica sob pressão de prazos menores e maior previsibilidade ao usuário.',
    justificativa: 'Uso de IA como alavanca de eficiência no macroprocesso de concessão de patentes.',
    escopo: 'Consolidação de recursos de IA para apoio à busca, classificação e análise técnica.',
    integrantes: ['DIRPA', 'CGTI', 'CQUAL'],
    etapas: ['Definição de casos de uso', 'Validação em ambiente controlado', 'Escalonamento assistido'],
    recursos: ['Modelos de IA', 'Infraestrutura de processamento', 'Especialistas de negócio'],
    riscos: ['Dependência de dados consistentes / Mitigar com governança de dados'],
    indicadores: ['Redução do prazo mediano de decisão', 'Produtividade por examinador'],
    anexos: ['PA2026_P1.24_PatentesIA.pdf'],
    status: 'Selecionada',
    likes: 3,
    source: 'example',
  },
];

const normalize = (value: unknown): string => String(value ?? '').trim();
const normalizeKey = (value: unknown): string =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toUpperCase();

const toOption = (value: string): SelectOption => ({ value, label: value });

const selectStyles = {
  control: (provided: any, state: { isFocused: boolean; isDisabled: boolean }) => ({
    ...provided,
    backgroundColor: state.isDisabled ? '#e5e7eb' : '#ffffff',
    borderColor: state.isFocused ? 'var(--gov-blue)' : 'var(--gov-border)',
    color: 'var(--gov-blue-dark)',
    borderRadius: '0.5rem',
    padding: '0.1rem',
    border: '1px solid var(--gov-border)',
    boxShadow: state.isFocused ? '0 0 0 1px var(--gov-blue)' : 'none',
    '&:hover': {
      borderColor: 'var(--gov-blue)',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'var(--gov-blue-dark)',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#ffffff',
    borderColor: 'var(--gov-border)',
  }),
  option: (provided: any, state: { isFocused: boolean; isSelected: boolean }) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'var(--gov-blue)' : state.isFocused ? 'var(--gov-blue-soft)' : '#ffffff',
    color: state.isSelected ? '#ffffff' : 'var(--gov-blue-dark)',
    '&:active': {
      backgroundColor: 'var(--gov-blue)',
    },
  }),
  input: (provided: any) => ({
    ...provided,
    color: 'var(--gov-blue-dark)',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: 'var(--gov-blue)',
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: 'var(--gov-blue)',
    '&:hover': { color: 'var(--gov-blue-dark)' },
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: 'var(--gov-blue)',
    '&:hover': { color: 'var(--gov-blue-dark)' },
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
};

const getSheetEndpoint = (): string => {
  const env = (import.meta as any).env;
  const specific = env?.VITE_GSHEET_BANCO_ENDPOINT;
  if (typeof specific === 'string' && specific.trim() !== '') return specific;
  const fallback = env?.VITE_GSHEET_MAPA_ENDPOINT;
  if (typeof fallback === 'string' && fallback.trim() !== '') return fallback;
  return DEFAULT_GSHEET_ENDPOINT;
};

const getSheetReadEndpoint = (): string => {
  const env = (import.meta as any).env;
  const specificRead = env?.VITE_GSHEET_BANCO_READ_ENDPOINT;
  if (typeof specificRead === 'string' && specificRead.trim() !== '') return specificRead;
  const specificWrite = env?.VITE_GSHEET_BANCO_ENDPOINT;
  if (typeof specificWrite === 'string' && specificWrite.trim() !== '') return specificWrite;
  const mapaRead = env?.VITE_GSHEET_MAPA_READ_ENDPOINT;
  if (typeof mapaRead === 'string' && mapaRead.trim() !== '') return mapaRead;
  const mapaWrite = env?.VITE_GSHEET_MAPA_ENDPOINT;
  if (typeof mapaWrite === 'string' && mapaWrite.trim() !== '') return mapaWrite;
  return DEFAULT_GSHEET_ENDPOINT;
};

const appendQuery = (url: string, params: Record<string, string>): string => {
  try {
    const parsed = new URL(url);
    Object.entries(params).forEach(([key, value]) => parsed.searchParams.set(key, value));
    return parsed.toString();
  } catch {
    return url;
  }
};

const extractRowsFromPayload = (payload: any, source: string): Array<Record<string, unknown>> => {
  if (Array.isArray(payload)) return payload as Array<Record<string, unknown>>;
  if (Array.isArray(payload?.rows)) return payload.rows as Array<Record<string, unknown>>;
  if (Array.isArray(payload?.data)) return payload.data as Array<Record<string, unknown>>;
  if (Array.isArray(payload?.items)) return payload.items as Array<Record<string, unknown>>;
  if (payload && typeof payload === 'object' && Array.isArray(payload[source])) {
    return payload[source] as Array<Record<string, unknown>>;
  }
  return [];
};

const parseStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => normalize(item)).filter(Boolean);
  }

  const text = normalize(value);
  if (!text) return [];

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => normalize(item)).filter(Boolean);
    }
  } catch {
    // not json, continue with fallback split
  }

  return text
    .split(';')
    .map((item) => item.trim())
    .filter(Boolean);
};

const parsePlanItem = (value: string): PlanItem => {
  const parts = value.split(PLAN_SEPARATOR).map((item) => item.trim());
  if (parts.length >= 3) {
    return {
      etapa: parts[0],
      prazo: parts[1],
      responsavel: parts.slice(2).join(PLAN_SEPARATOR),
    };
  }

  return {
    etapa: value.trim(),
    prazo: '-',
    responsavel: '-',
  };
};

const serializePlanItem = (item: PlanItem): string =>
  `${item.etapa.trim()}${PLAN_SEPARATOR}${item.prazo.trim()}${PLAN_SEPARATOR}${item.responsavel.trim()}`;

const parseRiskItem = (value: string): RiskItem => {
  const parts = value.split(RISK_SEPARATOR).map((item) => item.trim());
  if (parts.length >= 2) {
    return {
      risco: parts[0],
      mitigacao: parts.slice(1).join(RISK_SEPARATOR),
    };
  }

  return {
    risco: value.trim(),
    mitigacao: '-',
  };
};

const serializeRiskItem = (item: RiskItem): string => `${item.risco.trim()}${RISK_SEPARATOR}${item.mitigacao.trim()}`;

const parseStatus = (value: string): IdeaStatus => {
  const found = STATUS_OPTIONS.find((item) => normalizeKey(item) === normalizeKey(value));
  return found || 'Enviada';
};

const toIdeaRow = (item: Record<string, unknown>, index: number): IdeaRow | null => {
  const id = normalize(item.id || item.ID) || `remote-${index + 1}`;
  const titulo = normalize(item.titulo || item.Titulo || item.title || item.Title);
  if (!titulo) return null;

  return {
    id,
    timestamp: normalize(item.timestamp || item.Timestamp) || new Date().toISOString(),
    autor: normalize(item.autor || item.Autor),
    email: normalize(item.email || item.Email),
    titulo,
    categoria: normalize(item.categoria || item.Categoria),
    problema: normalize(item.problema || item.Problema || item.descricao || item.Descricao),
    justificativa: normalize(item.justificativa || item.Justificativa),
    escopo: normalize(item.escopo || item.Escopo),
    integrantes: parseStringArray(item.integrantes || item.Integrantes),
    etapas: parseStringArray(item.etapas || item.Etapas),
    recursos: parseStringArray(item.recursos || item.Recursos),
    riscos: parseStringArray(item.riscos || item.Riscos),
    indicadores: parseStringArray(item.indicadores || item.Indicadores),
    anexos: parseStringArray(item.anexos || item.Anexos),
    status: parseStatus(normalize(item.status || item.Status || 'Enviada')),
    likes: Number(item.likes || item.Likes || 0),
    source: normalize(item.source || item.Source) === 'example' ? 'example' : 'manual',
  };
};

const fetchRowsFromSheet = async (): Promise<IdeaRow[]> => {
  const endpoint = getSheetReadEndpoint();
  if (!endpoint) return [];

  try {
    const readUrl = appendQuery(endpoint, { source: BANCO_SOURCE });
    const resp = await fetch(readUrl, { method: 'GET' });
    if (!resp.ok) return [];

    const payload = await resp.json();
    const rows = extractRowsFromPayload(payload, BANCO_SOURCE)
      .map((item, index) => toIdeaRow(item, index))
      .filter((row): row is IdeaRow => !!row);

    return rows;
  } catch {
    return [];
  }
};

const statusBadgeClass = (status: IdeaStatus): string => {
  if (status === 'Em análise') return 'border-blue-200 bg-blue-50 text-blue-700';
  if (status === 'Selecionada') return 'border-amber-200 bg-amber-50 text-amber-700';
  if (status === 'Em execução') return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (status === 'Implementada') return 'border-green-200 bg-green-50 text-green-700';
  if (status === 'Arquivada') return 'border-rose-200 bg-rose-50 text-rose-700';
  return 'border-slate-200 bg-slate-100 text-slate-700';
};

const formatDate = (raw: string): string => {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
};

const makeId = (): string => `banco-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const ListMarker: React.FC = () => (
  <svg className="module-list-icon w-5 h-5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="10" cy="10" r="9" fill="#E8F0FF" stroke="#1351B4" strokeWidth="1.5"></circle>
    <path d="M6.8 10.1l2.1 2.1 4.3-4.4" stroke="#1351B4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const Banco: React.FC = () => {
  const DETAIL_PAGE_SIZE = 6;

  const [rows, setRows] = useState<IdeaRow[]>([]);
  const [queryTitulo, setQueryTitulo] = useState('');
  const [queryAutor, setQueryAutor] = useState('');
  const [queryCategoria, setQueryCategoria] = useState('');
  const [queryStatus, setQueryStatus] = useState<'Todos' | IdeaStatus>('Todos');
  const [expandedIdeas, setExpandedIdeas] = useState<Record<string, boolean>>({});
  const [detailVisibleRows, setDetailVisibleRows] = useState<Record<string, number>>({});
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [autor, setAutor] = useState('');
  const [email, setEmail] = useState('');
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [integrantes, setIntegrantes] = useState<string[]>(['']);
  const [problema, setProblema] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [escopo, setEscopo] = useState('');
  const [planoExecucao, setPlanoExecucao] = useState<PlanItem[]>([{ etapa: '', prazo: '', responsavel: '' }]);
  const [recursos, setRecursos] = useState<string[]>(['']);
  const [riscosMitigacoes, setRiscosMitigacoes] = useState<RiskItem[]>([{ risco: '', mitigacao: '' }]);
  const [indicadores, setIndicadores] = useState<string[]>(['']);
  const [likeFxByIdea, setLikeFxByIdea] = useState<Record<string, number>>({});

  const [statusDrafts, setStatusDrafts] = useState<Record<string, IdeaStatus>>({});
  const [justificativasStatus, setJustificativasStatus] = useState<Record<string, string>>({});

  const deferredQueryTitulo = useDeferredValue(queryTitulo);
  const deferredQueryAutor = useDeferredValue(queryAutor);

  const saveLocal = (next: IdeaRow[]) => {
    setRows(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const hydrateInitial = (remoteRows: IdeaRow[]): IdeaRow[] => {
    if (remoteRows.length > 0) {
      const merged = [...remoteRows];
      saveLocal(merged);
      return merged;
    }

    const localRaw = localStorage.getItem(STORAGE_KEY);
    if (localRaw) {
      try {
        const localRows = JSON.parse(localRaw) as Array<Record<string, unknown>>;
        const sanitized = localRows
          .map((item, index) => toIdeaRow(item, index))
          .filter((row): row is IdeaRow => !!row);
        if (sanitized.length > 0) {
          setRows(sanitized);
          return sanitized;
        }
      } catch {
        // fallback to examples
      }
    }

    saveLocal(EXAMPLE_IDEAS);
    return EXAMPLE_IDEAS;
  };

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setSaveMessage('');
      setErrorMessage('');

      try {
        const remoteRows = await fetchRowsFromSheet();
        hydrateInitial(remoteRows);
      } catch {
        hydrateInitial([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const endpoint = getSheetReadEndpoint();
    if (!endpoint) return;

    let active = true;

    const sync = async () => {
      const remoteRows = await fetchRowsFromSheet();
      if (!active || remoteRows.length === 0) return;

      setRows((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(remoteRows)) return prev;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteRows));
        return remoteRows;
      });
    };

    const timerId = window.setInterval(sync, REMOTE_POLL_MS);
    return () => {
      active = false;
      window.clearInterval(timerId);
    };
  }, []);

  const saveToSheet = async (nextRows: IdeaRow[], successMessage: string) => {
    const endpoint = getSheetEndpoint();
    setIsSaving(true);
    setErrorMessage('');

    try {
      saveLocal(nextRows);

      if (!endpoint) {
        setSaveMessage('Dados salvos localmente. Defina VITE_GSHEET_BANCO_ENDPOINT para envio à planilha.');
        return;
      }

      const payload = {
        source: BANCO_SOURCE,
        timestamp: new Date().toISOString(),
        rows: nextRows,
      };

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        throw new Error(`Falha no endpoint (${resp.status})`);
      }

      const remoteRows = await fetchRowsFromSheet();
      if (remoteRows.length > 0) {
        saveLocal(remoteRows);
      }

      setSaveMessage(successMessage);
    } catch {
      setSaveMessage('Falha ao salvar na planilha neste momento. Os dados foram preservados localmente. Verifique o endpoint e tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const validateRequiredForm = (): string | null => {
    if (!autor.trim()) return 'Preencha o campo Nome Completo do Proponente.';
    if (!email.trim()) return 'Preencha o campo E-mail Institucional.';
    if (!titulo.trim()) return 'Preencha o campo Título da Proposta.';
    if (!categoria.trim()) return 'Selecione o Eixo Estratégico Principal.';
    if (integrantes.some((item) => !item.trim())) return 'Preencha todos os campos de Outros Integrantes.';
    if (!problema.trim()) return 'Preencha o campo Descrição do Problema.';
    if (!justificativa.trim()) return 'Preencha o campo Justificativa.';
    if (!escopo.trim()) return 'Preencha o campo Escopo.';
    if (planoExecucao.some((item) => !item.etapa.trim() || !item.prazo.trim() || !item.responsavel.trim())) return 'Preencha Etapa, Prazo e Responsável em cada linha do plano.';
    if (recursos.some((item) => !item.trim())) return 'Preencha todos os campos de Recursos Estimados.';
    if (riscosMitigacoes.some((item) => !item.risco.trim() || !item.mitigacao.trim())) return 'Preencha Risco e Medidas de Mitigação em cada linha.';
    if (indicadores.some((item) => !item.trim())) return 'Preencha todos os campos de Indicadores de Impacto.';
    return null;
  };

  const resetForm = () => {
    setAutor('');
    setEmail('');
    setTitulo('');
    setCategoria('');
    setIntegrantes(['']);
    setProblema('');
    setJustificativa('');
    setEscopo('');
    setPlanoExecucao([{ etapa: '', prazo: '', responsavel: '' }]);
    setRecursos(['']);
    setRiscosMitigacoes([{ risco: '', mitigacao: '' }]);
    setIndicadores(['']);
  };

  const submitIdea = async () => {
    setSaveMessage('');
    setErrorMessage('');

    const validationError = validateRequiredForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const newRow: IdeaRow = {
      id: makeId(),
      timestamp: new Date().toISOString(),
      autor: autor.trim(),
      email: email.trim(),
      titulo: titulo.trim(),
      categoria: categoria.trim(),
      problema: problema.trim(),
      justificativa: justificativa.trim(),
      escopo: escopo.trim(),
      integrantes: integrantes.map((item) => item.trim()).filter(Boolean),
      etapas: planoExecucao.map((item) => serializePlanItem(item)).filter(Boolean),
      recursos: recursos.map((item) => item.trim()).filter(Boolean),
      riscos: riscosMitigacoes.map((item) => serializeRiskItem(item)).filter(Boolean),
      indicadores: indicadores.map((item) => item.trim()).filter(Boolean),
      anexos: [],
      status: 'Enviada',
      likes: 0,
      source: 'manual',
    };

    await saveToSheet([newRow, ...rows], 'Ideia registrada e persistida na planilha com sucesso.');
    resetForm();
  };

  const updateIdeaStatus = async (id: string) => {
    setSaveMessage('');
    setErrorMessage('');

    const selectedStatus = statusDrafts[id];
    const justification = normalize(justificativasStatus[id]);

    if (!selectedStatus) {
      setErrorMessage('Selecione um status antes de alterar o registro.');
      return;
    }

    if (!justification) {
      setErrorMessage('Informe a justificativa obrigatória para alteração de status.');
      return;
    }

    const nextRows = rows.map((row) => {
      if (row.id !== id) return row;
      return {
        ...row,
        status: selectedStatus,
      };
    });

    await saveToSheet(nextRows, 'Status atualizado com sucesso na planilha.');
    setJustificativasStatus((prev) => ({ ...prev, [id]: '' }));
  };

  const likeIdea = async (id: string) => {
    setLikeFxByIdea((prev) => ({ ...prev, [id]: Date.now() }));
    window.setTimeout(() => {
      setLikeFxByIdea((prev) => {
        if (!prev[id]) return prev;
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 700);

    const nextRows = rows.map((row) => {
      if (row.id !== id) return row;
      return {
        ...row,
        likes: row.likes + 1,
      };
    });

    await saveToSheet(nextRows, 'Curtida registrada com sucesso na planilha.');
  };

  const downloadCsv = () => {
    const exportRows = filtered.map((row) => ({
      Titulo_da_Proposta: row.titulo,
      Proponente: row.autor,
      E_mail_Institucional: row.email,
      Eixo_Estrategico_Principal: row.categoria,
      Status: row.status,
      Curtidas: row.likes,
      Atualizacao: formatDate(row.timestamp),
    }));

    const csv = Papa.unparse(exportRows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'banco-ideias.csv';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const downloadXlsx = () => {
    const exportRows = filtered.map((row) => ({
      Titulo_da_Proposta: row.titulo,
      Proponente: row.autor,
      E_mail_Institucional: row.email,
      Eixo_Estrategico_Principal: row.categoria,
      Status: row.status,
      Curtidas: row.likes,
      Atualizacao: formatDate(row.timestamp),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'BancoIdeias');
    XLSX.writeFile(workbook, 'banco-ideias.xlsx');
  };

  const tituloOptions = useMemo(() => {
    const unique = Array.from(new Set(rows.map((row) => row.titulo).filter(Boolean)));
    return unique.sort((a, b) => a.localeCompare(b, 'pt-BR')).map(toOption);
  }, [rows]);

  const autorOptions = useMemo(() => {
    const unique = Array.from(new Set(rows.map((row) => row.autor).filter(Boolean)));
    return unique.sort((a, b) => a.localeCompare(b, 'pt-BR')).map(toOption);
  }, [rows]);

  const categoriaOptions = useMemo(() => EIXO_OPTIONS.map(toOption), []);
  const statusOptions = useMemo(() => STATUS_OPTIONS.map(toOption), []);

  const filtered = useMemo(() => {
    const titleKey = normalizeKey(deferredQueryTitulo);
    const authorKey = normalizeKey(deferredQueryAutor);
    const categoryKey = normalizeKey(queryCategoria);

    return rows.filter((row) => {
      const byTitle = !titleKey || normalizeKey(row.titulo).includes(titleKey);
      const byAuthor = !authorKey || normalizeKey(row.autor).includes(authorKey);
      const byCategory = !categoryKey || normalizeKey(row.categoria).includes(categoryKey);
      const byStatus = queryStatus === 'Todos' || row.status === queryStatus;
      return byTitle && byAuthor && byCategory && byStatus;
    });
  }, [rows, deferredQueryTitulo, deferredQueryAutor, queryCategoria, queryStatus]);

  useEffect(() => {
    setPage(1);
  }, [filtered.length, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const toggleExpand = (ideaId: string) => {
    setExpandedIdeas((prev) => {
      const nextExpanded = !prev[ideaId];
      if (nextExpanded) {
        setDetailVisibleRows((countPrev) => ({
          ...countPrev,
          [ideaId]: countPrev[ideaId] || DETAIL_PAGE_SIZE,
        }));
      }
      return { ...prev, [ideaId]: nextExpanded };
    });
  };

  const updateDynamicField = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter((prev) => prev.map((item, idx) => (idx === index ? value : item)));
  };

  const addDynamicField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, '']);
  };

  const removeDynamicField = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== index) : prev));
  };

  return (
    <div className="module-page">
      <h1 className="module-title">Banco de Ideias</h1>

      <div className="module-intro">
        <div className="module-kicker">PORTFÓLIO TRANSACIONAL DE IDEIAS</div>
        <p className="module-lead">
          Ambiente para registro, análise e acompanhamento de propostas inovadoras do INPI, com persistência em planilha e atualização periódica no mesmo padrão transacional dos módulos Mapa e Detentores.
        </p>
      </div>

      <div className="space-y-6 mt-6">

      <div className="module-card overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <h2 className="module-section-title">Ideias Registradas</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={downloadCsv}
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-blue-700 border border-blue-200 hover:bg-blue-50"
            >
              Download CSV
            </button>
            <button
              type="button"
              onClick={downloadXlsx}
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-blue-700 border border-blue-200 hover:bg-blue-50"
            >
              Download XLSX
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
          <CreatableSelect
            instanceId="banco-titulo"
            classNamePrefix="tecnica-select"
            value={queryTitulo ? toOption(queryTitulo) : null}
            onChange={(option) => setQueryTitulo(option?.value || '')}
            onInputChange={(input, meta) => {
              if (meta.action === 'input-change') setQueryTitulo(input);
            }}
            options={tituloOptions}
            styles={selectStyles}
            placeholder="Busque por título"
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            formatCreateLabel={(input) => `Buscar por: ${input}`}
          />

          <CreatableSelect
            instanceId="banco-autor"
            classNamePrefix="tecnica-select"
            value={queryAutor ? toOption(queryAutor) : null}
            onChange={(option) => setQueryAutor(option?.value || '')}
            onInputChange={(input, meta) => {
              if (meta.action === 'input-change') setQueryAutor(input);
            }}
            options={autorOptions}
            styles={selectStyles}
            placeholder="Busque por autor"
            isClearable
            isSearchable
            menuPortalTarget={document.body}
            formatCreateLabel={(input) => `Buscar por: ${input}`}
          />

          <Select
            instanceId="banco-categoria"
            classNamePrefix="tecnica-select"
            value={queryCategoria ? toOption(queryCategoria) : null}
            onChange={(option: SingleValue<SelectOption>) => setQueryCategoria(option?.value || '')}
            options={categoriaOptions}
            styles={selectStyles}
            placeholder="Filtrar por eixo"
            isClearable
            isSearchable
            menuPortalTarget={document.body}
          />

          <Select
            instanceId="banco-status"
            classNamePrefix="tecnica-select"
            value={queryStatus === 'Todos' ? null : toOption(queryStatus)}
            onChange={(option: SingleValue<SelectOption>) => setQueryStatus((option?.value as IdeaStatus) || 'Todos')}
            options={statusOptions}
            styles={selectStyles}
            placeholder="Filtrar por status"
            isClearable
            isSearchable
            menuPortalTarget={document.body}
          />
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left px-4 py-3">Título da Proposta</th>
              <th className="text-left px-4 py-3">Proponente</th>
              <th className="text-left px-4 py-3">E-mail Institucional</th>
              <th className="text-left px-4 py-3">Eixo Estratégico Principal</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Curtidas</th>
              <th className="text-left px-4 py-3">Atualização</th>
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((row) => {
              const expanded = !!expandedIdeas[row.id];
              const visibleCount = detailVisibleRows[row.id] || DETAIL_PAGE_SIZE;
              const visibleEtapas = row.etapas.slice(0, visibleCount);
              const hasMoreEtapas = row.etapas.length > visibleCount;
              return (
                <React.Fragment key={row.id}>
                  <tr onClick={() => toggleExpand(row.id)} className="group border-t border-slate-100 cursor-pointer hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      <span className="inline-flex w-full items-center justify-between gap-3 rounded-xl border border-blue-200 bg-white px-3 py-2 text-sm font-semibold text-blue-900 shadow-sm transition-colors duration-200 group-hover:border-blue-400 group-hover:bg-blue-50">
                        <span className="truncate">{row.titulo}</span>
                        <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-100/70 text-blue-700 transition-colors duration-200 group-hover:border-blue-400 group-hover:bg-blue-200/70 group-hover:text-blue-900" aria-hidden="true">
                          {expanded ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8v8" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l7-7" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 16H8V8" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-7 7" />
                            </svg>
                          )}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{row.autor || '-'}</td>
                    <td className="px-4 py-3 text-slate-700">{row.email || '-'}</td>
                    <td className="px-4 py-3 text-slate-700">{row.categoria || '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${statusBadgeClass(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{row.likes}</td>
                    <td className="px-4 py-3 text-slate-700">{formatDate(row.timestamp)}</td>
                  </tr>

                  {expanded && (
                    <tr className="border-t border-slate-100 bg-slate-50/50">
                      <td colSpan={7} className="px-4 py-4">
                        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4 space-y-4">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-1">AUTOR</p>
                              <p className="text-sm text-slate-700">{row.autor || '-'}</p>
                            </div>
                            <div>
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-1">CONTATO</p>
                              <p className="text-sm text-slate-700">{row.email || '-'}</p>
                            </div>
                            <div>
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-1">Origem</p>
                              <p className="text-sm text-slate-700">{row.source === 'example' ? 'Exemplo' : 'Registro operacional'}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                            <div className="rounded-lg border border-slate-200 p-3">
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-1">Problema</p>
                              <p className="text-sm text-slate-700 leading-relaxed">{row.problema || '-'}</p>
                            </div>
                            <div className="rounded-lg border border-slate-200 p-3">
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-1">Justificativa</p>
                              <p className="text-sm text-slate-700 leading-relaxed">{row.justificativa || '-'}</p>
                            </div>
                            <div className="rounded-lg border border-slate-200 p-3">
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-1">Escopo</p>
                              <p className="text-sm text-slate-700 leading-relaxed">{row.escopo || '-'}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-2">Integrantes</p>
                              <ul className="text-sm text-slate-700 space-y-1">
                                {row.integrantes.length > 0 ? (
                                  row.integrantes.map((item, idx) => (
                                    <li key={`${row.id}-integrante-${idx}`} className="flex items-start">
                                      <ListMarker />
                                      <span>{item}</span>
                                    </li>
                                  ))
                                ) : (
                                  <li className="flex items-start">
                                    <ListMarker />
                                    <span>-</span>
                                  </li>
                                )}
                              </ul>
                            </div>
                            <div className="lg:col-span-2">
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-2">Etapas, prazos e responsáveis</p>
                              <div className="space-y-2">
                                {visibleEtapas.length > 0 ? (
                                  visibleEtapas.map((item, idx) => {
                                    const parsed = parsePlanItem(item);
                                    return (
                                      <div key={`${row.id}-etapa-${idx}`} className="grid grid-cols-1 md:grid-cols-3 gap-2 rounded border border-slate-200 p-2 text-sm text-slate-700">
                                        <p><span className="font-semibold">Etapa:</span> {parsed.etapa || '-'}</p>
                                        <p><span className="font-semibold">Prazo:</span> {parsed.prazo || '-'}</p>
                                        <p><span className="font-semibold">Responsável:</span> {parsed.responsavel || '-'}</p>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <p className="text-sm text-slate-700">-</p>
                                )}
                              </div>
                              <div className="mt-2 flex gap-2">
                                {hasMoreEtapas && (
                                  <button
                                    type="button"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      setDetailVisibleRows((prev) => ({
                                        ...prev,
                                        [row.id]: Math.min(row.etapas.length, (prev[row.id] || DETAIL_PAGE_SIZE) + DETAIL_PAGE_SIZE),
                                      }));
                                    }}
                                    className="px-2 py-1 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs"
                                  >
                                    Ver mais etapas
                                  </button>
                                )}
                                {visibleCount > DETAIL_PAGE_SIZE && (
                                  <button
                                    type="button"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      setDetailVisibleRows((prev) => ({
                                        ...prev,
                                        [row.id]: DETAIL_PAGE_SIZE,
                                      }));
                                    }}
                                    className="px-2 py-1 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 text-xs"
                                  >
                                    Reduzir
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-2">Recursos Estimados</p>
                              <ul className="text-sm text-slate-700 space-y-1">
                                {row.recursos.length > 0 ? (
                                  row.recursos.map((item, idx) => (
                                    <li key={`${row.id}-recurso-${idx}`} className="flex items-start">
                                      <ListMarker />
                                      <span>{item}</span>
                                    </li>
                                  ))
                                ) : (
                                  <li className="flex items-start">
                                    <ListMarker />
                                    <span>-</span>
                                  </li>
                                )}
                              </ul>
                            </div>
                            <div className="lg:col-span-2">
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-2">Riscos e Medidas de Mitigação</p>
                              <div className="space-y-2">
                                {row.riscos.length > 0 ? (
                                  row.riscos.map((item, idx) => {
                                    const parsed = parseRiskItem(item);
                                    return (
                                      <div key={`${row.id}-risco-${idx}`} className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded border border-slate-200 p-2 text-sm text-slate-700">
                                        <p><span className="font-semibold">Risco:</span> {parsed.risco || '-'}</p>
                                        <p><span className="font-semibold">Medida de Mitigação:</span> {parsed.mitigacao || '-'}</p>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <p className="text-sm text-slate-700">-</p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-2">Indicadores de Impacto</p>
                              <ul className="text-sm text-slate-700 space-y-1">
                                {row.indicadores.length > 0 ? (
                                  row.indicadores.map((item, idx) => (
                                    <li key={`${row.id}-indicador-${idx}`} className="flex items-start">
                                      <ListMarker />
                                      <span>{item}</span>
                                    </li>
                                  ))
                                ) : (
                                  <li className="flex items-start">
                                    <ListMarker />
                                    <span>-</span>
                                  </li>
                                )}
                              </ul>
                            </div>
                            <div>
                              <p className="text-xs uppercase font-semibold text-slate-500 mb-2">Anexos</p>
                              <ul className="text-sm text-slate-700 space-y-1">
                                <li className="flex items-start">
                                  <ListMarker />
                                  <span>—</span>
                                </li>
                              </ul>
                            </div>
                            <div className="space-y-2">
                              <p className="rounded-md border border-purple-200 bg-purple-50 px-2 py-1 text-xs font-medium text-purple-800">
                                Campo restrito ao Laboratório de Inovação do INPI.
                              </p>
                              <Select
                                instanceId={`banco-status-${row.id}`}
                                classNamePrefix="tecnica-select"
                                value={toOption(statusDrafts[row.id] || row.status)}
                                onChange={(option: SingleValue<SelectOption>) => {
                                  const selected = STATUS_OPTIONS.find((item) => item === option?.value);
                                  if (selected) {
                                    setStatusDrafts((prev) => ({ ...prev, [row.id]: selected }));
                                  }
                                }}
                                options={statusOptions}
                                styles={selectStyles}
                                menuPortalTarget={document.body}
                                isSearchable
                              />

                              <textarea
                                value={justificativasStatus[row.id] || ''}
                                onChange={(event) => setJustificativasStatus((prev) => ({ ...prev, [row.id]: event.target.value }))}
                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm min-h-[84px]"
                                placeholder="Justificativa obrigatória para alterar status"
                              />

                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    updateIdeaStatus(row.id);
                                  }}
                                  className="px-3 py-1 rounded-md text-xs font-semibold text-white bg-green-600 hover:bg-green-700"
                                >
                                  Alterar status
                                </button>
                                <button
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    likeIdea(row.id);
                                  }}
                                  className="relative px-3 py-1 rounded-md text-xs font-semibold text-blue-700 border border-blue-200 hover:bg-blue-50"
                                >
                                  Curtir
                                  {likeFxByIdea[row.id] && (
                                    <span className="pointer-events-none absolute inset-0">
                                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-amber-400 animate-ping">✦</span>
                                      <span className="absolute top-1 right-2 text-amber-500 animate-pulse">✧</span>
                                      <span className="absolute top-1 left-2 text-yellow-400 animate-pulse">✦</span>
                                    </span>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}

            {pagedRows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-slate-500">
                  Sem registros para os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Itens por página:</span>
            <select
              value={pageSize}
              onChange={(event) => setPageSize(Number.parseInt(event.target.value, 10))}
              className="px-2 py-1 rounded border border-slate-300 bg-white text-slate-700"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>{`Página ${page} de ${totalPages}`}</span>
            <button onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={page <= 1} className="px-3 py-1 rounded border border-slate-300 disabled:opacity-50">
              Anterior
            </button>
            <button onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))} disabled={page >= totalPages} className="px-3 py-1 rounded border border-slate-300 disabled:opacity-50">
              Próxima
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="module-card">
          <p className="text-xs uppercase tracking-wide text-slate-500">Ideias registradas</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{rows.length}</p>
        </div>
        <div className="module-card">
          <p className="text-xs uppercase tracking-wide text-slate-500">Em análise</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{rows.filter((item) => item.status === 'Em análise').length}</p>
        </div>
        <div className="module-card">
          <p className="text-xs uppercase tracking-wide text-slate-500">Implementadas</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{rows.filter((item) => item.status === 'Implementada').length}</p>
        </div>
      </div>

      <div className="module-card">
        <h2 className="module-section-title">Submissão de Nova Ideia</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Proponente</label>
            <input value={autor} onChange={(event) => setAutor(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail Institucional</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Título da Proposta</label>
            <input maxLength={100} value={titulo} onChange={(event) => setTitulo(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
            <p className="text-xs text-slate-500 mt-1">{`${titulo.length} / 100`}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Eixo Estratégico Principal</label>
            <Select
              instanceId="banco-form-categoria"
              classNamePrefix="tecnica-select"
              value={categoria ? toOption(categoria) : null}
              onChange={(option: SingleValue<SelectOption>) => setCategoria(option?.value || '')}
              options={categoriaOptions}
              styles={selectStyles}
              placeholder="Selecione o eixo"
              isClearable
              isSearchable
              menuPortalTarget={document.body}
            />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <label className="block text-sm font-medium text-slate-700">Outros Integrantes</label>
          {integrantes.map((item, index) => (
            <div key={`integrante-${index}`} className="flex gap-2">
              <input
                value={item}
                onChange={(event) => updateDynamicField(setIntegrantes, index, event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                placeholder="Nome do integrante"
              />
              <button type="button" onClick={() => removeDynamicField(setIntegrantes, index)} className="px-3 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-100">
                -
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addDynamicField(setIntegrantes)} className="px-3 py-2 rounded border border-blue-300 text-blue-700 hover:bg-blue-50 text-sm font-semibold">
            Adicionar integrante
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Descrição do Problema</label>
            <textarea maxLength={1000} value={problema} onChange={(event) => setProblema(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm min-h-24" />
            <p className="text-xs text-slate-500 mt-1">{`${problema.length} / 1000`}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Justificativa</label>
            <textarea maxLength={1000} value={justificativa} onChange={(event) => setJustificativa(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm min-h-24" />
            <p className="text-xs text-slate-500 mt-1">{`${justificativa.length} / 1000`}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Escopo</label>
            <textarea maxLength={1000} value={escopo} onChange={(event) => setEscopo(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm min-h-24" />
            <p className="text-xs text-slate-500 mt-1">{`${escopo.length} / 1000`}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3 lg:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Etapas, Prazos e Responsáveis</label>
            {planoExecucao.map((item, index) => (
              <div key={`plano-${index}`} className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1.2fr_auto] gap-2 items-start">
                <input
                  value={item.etapa}
                  onChange={(event) =>
                    setPlanoExecucao((prev) => prev.map((line, idx) => (idx === index ? { ...line, etapa: event.target.value } : line)))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  placeholder="Etapa"
                />
                <input
                  value={item.prazo}
                  onChange={(event) =>
                    setPlanoExecucao((prev) => prev.map((line, idx) => (idx === index ? { ...line, prazo: event.target.value } : line)))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  placeholder="Prazo"
                />
                <input
                  value={item.responsavel}
                  onChange={(event) =>
                    setPlanoExecucao((prev) => prev.map((line, idx) => (idx === index ? { ...line, responsavel: event.target.value } : line)))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  placeholder="Responsável"
                />
                <button
                  type="button"
                  onClick={() => setPlanoExecucao((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== index) : prev))}
                  className="px-3 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setPlanoExecucao((prev) => [...prev, { etapa: '', prazo: '', responsavel: '' }])}
              className="px-3 py-2 rounded border border-blue-300 text-blue-700 hover:bg-blue-50 text-sm font-semibold"
            >
              Adicionar linha do plano
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Recursos Estimados</label>
            {recursos.map((item, index) => (
              <div key={`recurso-${index}`} className="flex gap-2">
                <input value={item} onChange={(event) => updateDynamicField(setRecursos, index, event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                <button type="button" onClick={() => removeDynamicField(setRecursos, index)} className="px-3 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-100">-</button>
              </div>
            ))}
            <button type="button" onClick={() => addDynamicField(setRecursos)} className="px-3 py-2 rounded border border-blue-300 text-blue-700 hover:bg-blue-50 text-sm font-semibold">Adicionar recurso</button>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Riscos e Medidas de Mitigação</label>
            {riscosMitigacoes.map((item, index) => (
              <div key={`risco-${index}`} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-start">
                <input
                  value={item.risco}
                  onChange={(event) =>
                    setRiscosMitigacoes((prev) => prev.map((line, idx) => (idx === index ? { ...line, risco: event.target.value } : line)))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  placeholder="Risco"
                />
                <input
                  value={item.mitigacao}
                  onChange={(event) =>
                    setRiscosMitigacoes((prev) => prev.map((line, idx) => (idx === index ? { ...line, mitigacao: event.target.value } : line)))
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                  placeholder="Medidas de Mitigação"
                />
                <button
                  type="button"
                  onClick={() => setRiscosMitigacoes((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== index) : prev))}
                  className="px-3 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setRiscosMitigacoes((prev) => [...prev, { risco: '', mitigacao: '' }])}
              className="px-3 py-2 rounded border border-blue-300 text-blue-700 hover:bg-blue-50 text-sm font-semibold"
            >
              Adicionar risco/mitigação
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Indicadores de Impacto</label>
            {indicadores.map((item, index) => (
              <div key={`indicador-${index}`} className="flex gap-2">
                <input value={item} onChange={(event) => updateDynamicField(setIndicadores, index, event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
                <button type="button" onClick={() => removeDynamicField(setIndicadores, index)} className="px-3 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-100">-</button>
              </div>
            ))}
            <button type="button" onClick={() => addDynamicField(setIndicadores)} className="px-3 py-2 rounded border border-blue-300 text-blue-700 hover:bg-blue-50 text-sm font-semibold">Adicionar indicador</button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={submitIdea}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
          >
            {isSaving ? 'Salvando...' : 'Submeter proposta'}
          </button>
        </div>
      </div>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      {saveMessage && <p className="text-sm text-slate-600">{saveMessage}</p>}

      {isLoading && (
        <div className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-4 text-blue-800">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-200 border-t-blue-700 animate-spin" aria-hidden="true" />
          <p className="text-sm font-medium">Carregando o Banco de Ideias com sincronização de planilha. Este processo pode levar alguns segundos.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Banco;
