# Histórico de Ajustes — Portal da Gestão da Inovação (pgi-inpi)

Registro cronológico completo das alterações realizadas no repositório `dmenezes007/pgi-inpi` durante o presente thread de trabalho.

---

## 1. Clonagem do repositório

**Ação:** Clonagem local do repositório GitHub.  
**Diretório de destino:** `E:\Projetos\gestao-da-inovacao\pgi-inpi`  
**Repositório:** https://github.com/dmenezes007/pgi-inpi.git

---

## 2. Cor do texto da tabela de metodologia

**Arquivo:** `styles/App.css`  
**Commit:** `1c3acf6` — *Ajusta cor da tabela de metodologia e descendentes*

**Alteração:** Aplicação de `color: var(--gov-blue) !important` ao elemento `.methodology-table` e a todos os seus descendentes via seletor `*`.

```css
.methodology-table,
.methodology-table * {
  color: var(--gov-blue) !important;
}
```

---

## 3. Cor da classe `.app-container .text-gray-200`

**Arquivo:** `styles/App.css`  
**Commit:** `9aafa05` — *Define text-gray-200 com gov-blue no app-container*

**Alteração:** O seletor `.app-container .text-gray-200` foi retirado do bloco genérico que aplicava `color: var(--gov-surface)` e passou a ter regra própria com `color: var(--gov-blue) !important`.

---

## 4. Remoção do menu hambúrguer em dispositivos móveis

**Arquivos:** `App.tsx`, `components/Sidebar.tsx`, `styles/App.css`  
**Commit:** `34887c9` — *Remove hamburger menu on mobile*

**Alterações:**
- Removido o estado `isMobileSidebarOpen` e a função `toggleMobileSidebar` do `App.tsx`.
- Removidos o botão hambúrguer e o backdrop de sobreposição do JSX.
- Removida a prop `isMobileOpen` do componente `Sidebar`.
- No CSS, a sidebar mobile deixou de ser ocultada por `transform: translateX(-100%)` e passou a ser empilhada acima do conteúdo (`flex-direction: column`), com largura total e `height: auto`.

---

## 5. Sidebar retraída no mobile com conteúdo visível

**Arquivos:** `App.tsx`, `styles/App.css`  
**Commits:** `edb5b0a` — *Ajusta menu lateral no mobile*; `ecf249c` — *Separa o overflow da sidebar e do conteudo*

**Alterações:**
- Layout mobile alterado para `flex-direction: row`, mantendo a sidebar ao lado do conteúdo.
- Sidebar mobile fixada em `width: 4.25rem` e `flex: 0 0 4.25rem` (modo retraído com apenas ícones).
- Logo, rodapé e rótulos dos itens ocultados no mobile; ícones centralizados.
- Botão de colapso/expandir ocultado no mobile e visível apenas no desktop (`@media (min-width: 769px)`).
- Resquício de função `toggleMobileSidebar` removido do `App.tsx`.

---

## 6. Centralização do título no módulo Princípios

**Arquivo:** `components/Principios.tsx`  
**Commit:** `98f48bc` — *Centraliza titulo do modulo Principios*

**Alteração:** Adicionada a classe `text-center` ao elemento `h3.module-section-title.mb-4` ("Palavras-chave") no componente `Principios`.

---

## 7. Linha animada na borda inferior do cabeçalho

**Arquivo:** `styles/App.css`  
**Commits:** `cac003d`, `dbcdfc3`, `d116f40`, `0492e4e`, `166553e`, `6e68265`, `7cd0ee7` (série de refinamentos progressivos)

**Alteração:** Substituição da borda estática `border-bottom: 1px solid rgba(19, 81, 180, 0.08)` por uma linha animada com efeito de brilho, implementada via dois pseudo-elementos:

- `::before` — traço fino de `1px`, com gradiente fixo interno nas três cores institucionais, que atravessa o cabeçalho da esquerda para a direita.
- `::after` — halo difuso (`blur`) que acompanha sincronizado o deslocamento do traço, adicionando profundidade luminosa.

**Especificações finais da animação:**
- Ciclo total: **30 segundos** (`animation-duration: 30s`).
- Largura da barra: `clamp(18rem, 36vw, 30rem)` para o traço; `clamp(22rem, 44vw, 36rem)` para o halo.
- Fade-in na entrada, plena visibilidade no centro e fade-out na saída.
- Após o desaparecimento, a barra permanece oculta pelos **10 segundos** restantes do ciclo.
- Percurso completo da barra: da esquerda para a direita, atravessando todo o cabeçalho.

**Cores usadas:**
| Variável | Valor |
|---|---|
| `--accent-pink` | `#d82282` |
| `--accent-cyan` | `#24a9db` |
| `--accent-gold` | `#eec71e` |

---

## 8. Migração de documentos para `files/docs`

**Commit:** `ad05daf` — *Adiciona documentos de referencia em files/docs*

**Arquivos adicionados ao controle de versão:**
- `files/docs/guia-motodologico.md`
- `files/docs/laboratorio-de-inovacao-e-premio-de-inovacao.md`
- `files/docs/politica-gestao-da-inovacao.md`
- `files/docs/relacionamento-fundacoes-de-apoio.md`

---

## 9. Sidebar fixa no viewport (sem mover com o scroll)

**Arquivo:** `styles/App.css`  
**Commit:** `ecf249c` — *Separa o overflow da sidebar e do conteudo*

**Alterações:**
- `.app-container`: passou a ter `height: 100vh` e `overflow-y: hidden`, impedindo que a rolagem afete a posição relativa da sidebar.
- `.sidebar`: passou a usar `position: sticky; top: 0; height: 100vh` com `align-self: flex-start`, permanecendo fixada verticalmente no viewport enquanto o conteúdo rola de forma independente.
- `.main-content`: passou a ter `height: 100vh; overflow-y: auto; overflow-x: hidden`, tornando-se o contêiner de rolagem do conteúdo principal.
- Equivalente aplicado ao `@media (max-width: 768px)` para manter o mesmo comportamento no mobile.

---

## 10. Liberação do scroll interno da sessão do módulo

**Arquivo:** `styles/App.css`  
**Commit:** `e6d818c` — *Libera scroll da sessao do modulo*

**Alteração:** `.gov-content-surface` passou a ter `display: flex; flex-direction: column`, garantindo que o `<main>` interno (`flex-grow: 1`) preencha o espaço disponível e torne a rolagem efetiva sem alterar o layout geral.

---

## 11. Barras de rolagem estilizadas com degradê

**Arquivo:** `styles/App.css`  
**Commit:** `198d2dc` — *Estiliza barras de rolagem com degradê*

**Alterações:**
- `::-webkit-scrollbar`: largura aumentada para `10px`, com dimensão horizontal também definida.
- `::-webkit-scrollbar-track`: fundo com gradiente sutil azul institucional.
- `::-webkit-scrollbar-thumb`: degradê vertical nas três cores (`--accent-pink` → `--accent-cyan` → `--accent-gold`), com `border-radius: 999px` e borda interna translúcida para efeito "pill".
- `::-webkit-scrollbar-thumb:hover` e `:active`: opacidade plena e brilho reforçado.
- `scrollbar-width: thin` e `scrollbar-color` adicionados para suporte ao Firefox nos contêineres `.main-content` e `.sidebar-nav`.

---

## Resumo dos arquivos alterados

| Arquivo | Tipos de alteração |
|---|---|
| `App.tsx` | Remoção do estado e funções de menu mobile; limpeza de JSX |
| `components/Sidebar.tsx` | Remoção da prop `isMobileOpen`; simplificação das classes do botão de colapso |
| `components/Principios.tsx` | Centralização do título "Palavras-chave" |
| `styles/App.css` | Cor de texto, animação de cabeçalho, responsividade mobile, overflow/scroll, barras de rolagem |
| `files/docs/*.md` | Adição de quatro documentos de referência ao controle de versão |

---

*Documento gerado em 23/06/2026.*
