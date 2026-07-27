# TechBridge 2.0 - Roadmap

## Fonte Principal

A visao de produto esta em [PRODUCT_VISION.md](PRODUCT_VISION.md). Este roadmap organiza a evolucao do TechBridge 2.0 em fases de implementacao.

## Direcao Atual

O TechBridge 2.0 evolui o prototipo academico atual para o **TechBridge Journey MVP**: uma experiencia em que o usuario atravessa uma jornada pratica de autonomia digital.

MVP aprovado:

- uma jornada completa: **Primeira Oportunidade**;
- uma ferramenta pratica: **Curriculo Guiado**;
- diagnostico inicial com 3 perguntas;
- dashboard como travessia;
- mentor lateral simulado com botoes e respostas fixas por missao;
- progresso local no navegador;
- sem backend, banco, login ou IA real.

## Modulos Conceituais Consolidados

### 1. Diagnostico do Projeto Atual

O projeto atual e um prototipo academico estatico, publicado no Netlify. A v2 deve preservar esse historico e mostrar evolucao de produto.

### 2. Estrategia de Produto

O TechBridge deixa de ser apenas um site educativo e passa a ser uma jornada guiada da inseguranca digital ate uma conquista pratica.

### 3. Arquitetura Oficial

Direcao tecnica planejada:

- React, TypeScript e Vite na v2;
- dados locais no MVP;
- progresso em `localStorage`;
- backend Node.js/Express e MySQL apenas em fase futura;
- IA real apenas depois do mentor simulado validar a experiencia.

### 4. Identidade Visual

A identidade nasce da logo original: ponte, circuitos, progresso, azul, coral, menta e amarelo, com visual humano e acessivel.

### 5. Product Vision

Documento principal: [PRODUCT_VISION.md](PRODUCT_VISION.md).

### 6. Jornada do Usuario

Fluxo principal:

1. entrada;
2. diagnostico de 3 perguntas;
3. dashboard da jornada Primeira Oportunidade;
4. missao;
5. mentor lateral simulado;
6. conquista;
7. Curriculo Guiado.

### 7. Experiencia Visual e Interativa

O produto deve usar a ponte como mapa, com missoes como marcos da travessia e progresso visual claro.

### 8. Objetivos, Missoes e Conquistas

No MVP, o unico objetivo ativo e:

> Quero conquistar meu primeiro emprego.

Jornadas como Autonomia Digital e Escudo Digital ficam para v1.1/futuro.

### 9. Mentor Lateral

No MVP, o mentor e simulado. Ele usa botoes e respostas fixas por missao. Ele nao e agente inteligente, nao usa IA real e nao deve prometer personalizacao dinamica.

### 10. Dashboard e Progresso como Travessia

O dashboard deve mostrar a ponte, a missao atual, conquistas, progresso local e acesso ao mentor lateral.

### 11. Missao e Desafio

Cada missao deve ter contexto, objetivo, conteudo curto, exemplo, desafio, feedback e conclusao.

### 12. Curriculo Guiado

O Curriculo Guiado e a unica ferramenta pratica do MVP. Mensagem de candidatura fica para v1.1/futuro.

### 13. Diagnostico Inicial

O diagnostico do MVP tera 3 perguntas e servira para ajustar a orientacao inicial dentro da jornada Primeira Oportunidade.

### 14. SaaS Futuro

Aluno, instrutor, admin, turmas, relatorios e insights ficam documentados como futuro, nao como MVP.

### 15. Dados, Backend e MySQL

No MVP, sem backend. Depois, o projeto pode evoluir para Node.js, Express, API REST e MySQL local.

### 16. Roadmap de Implementacao

A execucao acontece por sprints, com escopo fechado por etapa.

### 17. Escopo Final do MVP

Documento principal: [MVP_SCOPE.md](MVP_SCOPE.md).

## Roadmap por Sprints

### Sprint 0 - Documentacao

Objetivo:

Consolidar a visao, escopo e plano antes de codar.

Entrega:

- product vision;
- escopo do MVP;
- UX concept;
- roadmap;
- implementation sprints;
- README atualizado.

### Sprint 1 - Base Tecnica + Visual Inicial

Objetivo:

Criar a base React, TypeScript e Vite com identidade visual inicial.

Entrega:

- setup do app;
- estrutura de pastas;
- dados locais iniciais;
- design tokens;
- layout base;
- primeira tela visual inspirada na ponte.

### Sprint 2 - Entrada + Diagnostico

Objetivo:

Criar a entrada da jornada e o diagnostico de 3 perguntas.

Entrega:

- tela inicial;
- objetivo Primeira Oportunidade;
- diagnostico de 3 perguntas;
- resultado inicial;
- salvamento local.

### Sprint 3 - Dashboard/Travessia

Objetivo:

Criar a ponte navegavel da jornada.

Entrega:

- dashboard;
- mapa da ponte;
- marcos de missao;
- missao atual;
- progresso local;
- conquistas iniciais.

### Sprint 4 - Missoes

Objetivo:

Implementar a jornada Primeira Oportunidade.

Entrega:

- tela de missao;
- missoes da jornada;
- desafios;
- feedback;
- conclusao de missao.

### Sprint 5 - Mentor Lateral

Objetivo:

Adicionar mentor simulado sem IA real.

Entrega:

- painel lateral;
- botoes de ajuda;
- respostas fixas por missao;
- tom leve e humano.

### Sprint 6 - Ferramentas Praticas

Objetivo:

Implementar o Curriculo Guiado.

Entrega:

- formulario em etapas;
- previa ao vivo;
- texto copiavel;
- persistencia local do rascunho.

### Sprint 7 - Polimento + Deploy

Status:

Polimento e preparacao para deploy concluidos localmente. Screenshots reais e deploy publico ainda pendentes de confirmacao.

Objetivo:

Preparar o MVP para portfolio.

Entrega:

- responsividade;
- acessibilidade;
- microcopy;
- estados de sucesso/vazio;
- README final;
- configuracao de deploy documentada;
- screenshots reais apos o deploy, pendentes de confirmacao;
- deploy publico no Netlify ou Vercel, pendente de confirmacao.

## v1.1/Futuro

- Autonomia Digital.
- Escudo Digital.
- Mensagem de candidatura.
- Checklist de seguranca.
- IA real.
- Login.
- Backend.
- MySQL.
- Area do instrutor.
- Area admin.
- Turmas.
- Relatorios.

## Fora do Escopo da Sprint 0.1

- Implementacao React.
- Mudanca nas telas HTML atuais.
- Instalacao de dependencias.
- Backend.
- Banco.
- IA real.
