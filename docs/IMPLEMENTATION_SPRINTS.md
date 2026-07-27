# TechBridge 2.0 - Implementation Sprints

## Regra de Execucao

Primeiro provar a experiencia principal com uma jornada completa. Depois expandir para novas jornadas, backend, banco e IA real.

Fonte de visao: [PRODUCT_VISION.md](PRODUCT_VISION.md).
Fonte de escopo: [MVP_SCOPE.md](MVP_SCOPE.md).
Fonte de experiencia visual e motion: [EXPERIENCE_VISION.md](EXPERIENCE_VISION.md).

## Sprint 0 - Documentacao

Status: concluida e ajustada na Sprint 0.1.

Objetivo:

Consolidar a visao TechBridge Journey antes de iniciar React.

Entregas:

- roadmap;
- escopo do MVP;
- product vision;
- UX concept;
- implementation sprints;
- README atualizado.

Nao entra:

- React;
- Vite;
- TypeScript;
- alteracao de telas existentes;
- backend;
- banco;
- IA real.

## Sprint 1 - Base Tecnica + Visual Inicial

Objetivo:

Criar a base moderna da aplicacao.

Entregas planejadas:

- setup Vite + React + TypeScript;
- scripts de desenvolvimento e build;
- estrutura de pastas;
- dados locais iniciais;
- design tokens;
- layout base;
- primeira tela visual inspirada na ponte.

Criterio de aceite:

- app roda localmente;
- estrutura comporta jornada, missoes, dashboard, mentor e curriculo;
- v1 estatica continua preservada.

## Sprint 2 - Entrada + Diagnostico

Objetivo:

Criar a entrada da jornada Primeira Oportunidade.

Entregas planejadas:

- tela inicial com "Qual ponte voce quer atravessar hoje?";
- objetivo "Quero conquistar meu primeiro emprego";
- diagnostico de 3 perguntas;
- resultado inicial da jornada;
- salvamento em `localStorage`.

Criterio de aceite:

- usuario entra, responde 3 perguntas e chega ao dashboard.

## Sprint 3 - Dashboard/Travessia

Objetivo:

Transformar progresso em mapa visual da ponte.

Entregas planejadas:

- dashboard da jornada;
- ponte com 5 marcos;
- estados de missao;
- missao atual destacada;
- progresso local;
- conquistas iniciais;
- acesso ao mentor lateral.

Criterio de aceite:

- usuario entende onde esta, qual e a proxima missao e quanto avancou.

## Sprint 4 - Missoes

Objetivo:

Implementar a jornada Primeira Oportunidade.

Entregas planejadas:

- tela de missao;
- missoes da jornada;
- desafios interativos;
- feedback;
- conclusao de missao;
- atualizacao da ponte.

Criterio de aceite:

- usuario conclui pelo menos uma missao e ve progresso atualizado.

## Sprint 5 - Mentor Lateral

Objetivo:

Adicionar apoio lateral simulado, sem IA real.

Entregas planejadas:

- painel lateral abre/fecha;
- botoes de ajuda;
- respostas fixas por missao;
- exemplos predefinidos;
- tom leve e humano.

Criterio de aceite:

- usuario clica em botoes do mentor e recebe respostas fixas coerentes com a missao atual.

## Sprint 6 - Ferramentas Praticas

Objetivo:

Implementar o Curriculo Guiado como unica ferramenta pratica do MVP.

Entregas planejadas:

- formulario em etapas;
- previa ao vivo;
- texto copiavel;
- persistencia local do rascunho;
- conclusao conectada a jornada.

Criterio de aceite:

- usuario cria um curriculo basico e copia o resultado.

## Sprint 7 - Polimento + Deploy

Status: concluida quanto ao polimento e a preparacao. Deploy publico pendente de confirmacao.

Objetivo:

Preparar o MVP para portfolio.

Entregas planejadas:

- responsividade;
- acessibilidade;
- microcopy final;
- animacoes leves;
- estados de apoio, sucesso e erro;
- README final para portfolio;
- configuracao documentada para deploy;
- evidencias de validacao.

Criterio de aceite:

- fluxo principal demonstravel em poucos minutos;
- build de producao gerado em `journey/dist`;
- deploy publico realizado somente depois de confirmacao.

## Sprint 7.5 - Experience Vision

Status: concluida como etapa documental.

Objetivo:

Definir a identidade visual e a linguagem de movimento do TechBridge Journey antes da implementacao visual pesada.

Entregas:

- conceito central da travessia;
- modos Imersao e Vista Geral;
- linguagem visual baseada em ponte, conexao, circuito, energia e progresso;
- regras de motion e acessibilidade;
- cobertura da linguagem de movimento no restante do produto;
- regra de produto para diferenciar orientacao de enfeite.

Fonte:

- [EXPERIENCE_VISION.md](EXPERIENCE_VISION.md).

Criterio de aceite:

- a Sprint 8 possui uma referencia documental clara para orientar identidade visual e motion;
- nenhuma animacao ou alteracao visual pesada e implementada nesta etapa.

## Sprint 8 - Identidade Visual + Motion

Status: planejada.

Objetivo:

Criar uma linguagem visual propria para o TechBridge Journey, baseada em travessia, ponte, conexao, circuito e progresso.

Diretriz:

Toda implementacao deve seguir [EXPERIENCE_VISION.md](EXPERIENCE_VISION.md), incluindo as regras de conforto, acessibilidade, significado e cobertura de motion em todo o produto.

Entregas planejadas:

- consolidacao da identidade visual ilustrada;
- modos Imersao e Vista Geral da ponte;
- motion orientado a progresso, contexto e conquista;
- linguagem de conexao e energia aplicada aos demais fluxos da interface;
- suporte a `prefers-reduced-motion`.

Criterio de aceite:

- a ponte e o restante da interface compartilham a mesma linguagem visual;
- as animacoes ajudam o usuario a entender progresso, contexto ou conquista;
- movimentos decorativos, continuos ou desconfortaveis ficam fora do produto.

### Sprint 8.1 - Fundacao Visual

Status: concluida.

Entregas:

- tokens de cor, superficie, borda, sombra, foco e energia;
- linguagem visual compartilhada entre ponte, cards, mentor e curriculo;
- integracao visual da secao "Da aula para a missao";
- responsividade e `prefers-reduced-motion` preservados.

### Sprint 8.1.5 - Interacoes Praticas das Missoes

Status: concluida.

Objetivo:

Substituir a confirmacao generica das missoes por microinteracoes praticas, locais e proporcionais ao MVP.

Entregas:

- validacao local e temporaria de um endereco de e-mail;
- selecao e conferencia local de arquivo, sem upload ou leitura;
- construcao visual da previa do Curriculo Guiado;
- metodo fixo e transparente de revisao XYZ conectado ao rascunho;
- microinteracao acessivel para a travessia final;
- progresso da jornada preservado sem persistir e-mail de pratica ou arquivo.

### Sprint 8.1.6 - UX Pratica, Revelacao da Jornada e Revisao Local

Status: concluida.

Objetivo:

Tornar a pratica central nas missoes, revelar a rota somente depois do
diagnostico e dar ao mentor uma funcao util de revisao local do curriculo.

Entregas:

- atividade pratica em secao principal, depois do objetivo, explicacao e exemplo;
- teaser da ponte sem nomes de missoes antes do inicio da jornada;
- explicacao da rota baseada nas respostas do diagnostico;
- revisao automatica local do Curriculo Guiado por regras simples;
- deteccao orientativa de campos ausentes, objetivo curto e possiveis dados
  sensiveis;
- integracao da revisao ao mentor e a missao de revisar curriculo;
- nenhum uso de API, `fetch`, chave no frontend ou envio para servidor.

Evolucao futura:

- revisao por IA ou API pertence a v1.1/backend e exige arquitetura segura no
  servidor; nao faz parte do comportamento atual.

### Sprint 8.2

Status: planejada.

Fica para esta etapa:

- modos Imersao e Vista Geral completos;
- composicao ilustrada avancada da ponte;
- motion de energia ao concluir missao;
- avanco suave de camera em momentos importantes;
- transicoes de etapa orientadas a progresso e contexto.

## v1.1/Futuro

Entram somente depois do MVP:

- Autonomia Digital;
- Escudo Digital;
- mensagem de candidatura;
- checklist de seguranca;
- novas missoes;
- IA real;
- login;
- backend Node.js + Express;
- MySQL local;
- area do instrutor;
- area admin;
- turmas;
- relatorios.

## Checklist de Controle de Escopo

Antes de adicionar qualquer funcionalidade, verificar:

- Isso ajuda a jornada Primeira Oportunidade?
- Isso cabe no sprint atual?
- Isso e necessario antes do backend?
- Isso melhora o MVP ou pertence a v1.1?
- Isso pode ser demonstrado por um recrutador em poucos minutos?

Se a resposta for fraca, registrar como futuro.
