# TechBridge Journey - Experience Vision

## Sprint 7.5 - Experience Vision

Esta etapa define a identidade visual e a linguagem de movimento do TechBridge Journey antes da implementacao visual da Sprint 8.

O objetivo nao e prescrever animacoes isoladas, mas estabelecer um sistema coerente para orientar decisoes de interface, ilustracao e motion.

## 1. Conceito central

O TechBridge nao e apenas um dashboard. O usuario esta atravessando uma ponte em direcao a um objetivo.

Cada elemento visual deve reforcar essa travessia. Toda animacao deve comunicar pelo menos um destes significados:

- progresso;
- conexao;
- orientacao.

A experiencia deve ajudar o usuario a perceber onde esta, qual e o proximo passo e o que conquistou ao avancar.

## 2. Modos da jornada

### Modo Imersao

- apresenta uma visao estilizada e ilustrada da ponte;
- transmite a sensacao de que o usuario esta caminhando pela jornada;
- mantem a camera parada durante a interacao, para preservar conforto e foco;
- avanca a camera de forma suave somente quando uma missao e concluida.

### Modo Vista Geral

- apresenta uma visao elevada da ponte inteira;
- mostra todas as missoes e seus estados;
- ajuda o usuario a entender onde esta;
- torna visivel quanto da travessia ja foi concluido e quanto ainda falta.

Os dois modos representam a mesma jornada: o Modo Imersao aproxima o usuario do passo atual, enquanto o Modo Vista Geral oferece contexto sobre o percurso completo.

## 3. Linguagem visual

A ponte deve parecer tecnologica, e nao uma ponte comum:

- cabos funcionam visualmente como circuitos;
- nos iluminados representam conexoes, marcos e pontos de progresso;
- energia percorre a estrutura para tornar o avancar visivel;
- uma cidade tecnologica ao fundo simboliza o objetivo da travessia;
- o tratamento visual e ilustrado e estilizado, nao realista.

Formas, luzes e conexoes devem compor um sistema visual reconhecivel, capaz de aparecer tanto na ponte quanto nos demais componentes do produto.

## 4. Regras de motion

- nao usar movimento continuo que possa causar enjoo, distracao ou perda de foco;
- priorizar animacoes curtas, suaves e com funcao clara;
- fazer a energia percorrer a ponte quando uma missao for concluida;
- avancar a camera apenas em momentos importantes da jornada;
- apresentar o mentor como um painel conectado a experiencia, e nao como uma camada desconectada;
- respeitar `prefers-reduced-motion`, oferecendo uma experiencia clara mesmo sem movimento.

O estado final de cada interacao nao pode depender apenas da animacao. Informacoes de progresso, sucesso e contexto devem permanecer compreensiveis de forma estatica.

## 5. Regra de produto

Antes de incluir qualquer animacao, responder:

> Isso ajuda o usuario a entender progresso, contexto ou conquista?

Se a animacao for apenas enfeite, ela nao entra no produto.

## Motion Coverage

A ponte pode ser o momento mais marcante da experiencia, mas nao deve parecer um elemento premium isolado dentro de um aplicativo comum. O restante da interface deve compartilhar a mesma linguagem de conexao, energia e progresso.

Essa linguagem deve aparecer nos seguintes pontos:

### Entrada e diagnostico

- usar conexoes visuais para representar o inicio da travessia;
- mostrar cada resposta como um passo que ajuda a formar a rota do usuario;
- fazer a transicao para o resultado comunicar que a jornada foi definida.

### Cards de missao

- conectar visualmente estado, sequencia e progresso;
- destacar a missao atual como um no ativo;
- tratar desbloqueio e conclusao como fluxo de energia, sem movimento permanente.

### Mentor lateral

- entrar como um painel conectado ao contexto atual;
- usar uma transicao curta que preserve a referencia espacial;
- sinalizar novas respostas como orientacao, sem competir com a missao.

### Curriculo Guiado

- representar o preenchimento por etapas como construcao de uma conexao;
- tornar o progresso entre secoes visivel e previsivel;
- usar motion apenas para orientar mudancas de etapa, validacao e atualizacao da previa.

### Copiar curriculo

- comunicar a acao concluida com um pulso breve de energia ou confirmacao equivalente;
- manter uma mensagem de sucesso textual e acessivel.

### Limpar rascunho

- tratar a confirmacao como uma interrupcao consciente do fluxo;
- evitar efeitos dramaticos ou ambiguos;
- deixar claro quando o rascunho foi removido, sem sugerir que o progresso da jornada tambem foi apagado.

### Secao "Da aula para a missao"

- usar a ideia de conexao para mostrar a passagem entre aprendizado e pratica;
- revelar a relacao entre conteudo e missao de forma curta e orientadora;
- evitar animacoes decorativas que desviem a atencao do proximo passo.

### Estados de erro e sucesso

- sucesso deve comunicar energia completando uma conexao;
- erro deve indicar onde o fluxo foi interrompido e como retoma-lo;
- cor, texto e icones devem sustentar o significado sem depender do movimento.

### Transicoes entre etapas

- preservar contexto e direcao;
- comunicar avancar, voltar ou concluir de forma consistente;
- evitar cortes ou deslocamentos que facam o usuario perder a referencia de onde esta.

## Criterio para a Sprint 8

A Sprint 8 deve transformar esta visao em uma identidade visual e de motion coerente para todo o produto. Cada decisao deve poder ser relacionada a travessia, conexao, circuito, energia ou progresso, sem comprometer conforto, acessibilidade ou clareza.
