# TechBridge 2.0 - UX Concept

## Fonte da Visao

A visao principal esta em [PRODUCT_VISION.md](PRODUCT_VISION.md). Este documento descreve o comportamento da experiencia e os componentes principais de tela.

## Conceito Central

A UX do TechBridge 2.0 deve fazer o usuario sentir que esta atravessando uma ponte, nao assistindo uma lista de aulas.

No MVP, toda a experiencia gira em torno da jornada **Primeira Oportunidade**.

## Fluxo do MVP

1. Entrada com a pergunta: "Qual ponte voce quer atravessar hoje?"
2. Objetivo unico do MVP: "Quero conquistar meu primeiro emprego".
3. Diagnostico de 3 perguntas.
4. Resultado inicial da jornada.
5. Dashboard/ponte.
6. Missao.
7. Mentor lateral simulado.
8. Curriculo Guiado.
9. Conclusao da travessia.

## Diagnostico de 3 Perguntas

Perguntas do MVP:

1. Voce ja usa e-mail?
2. Voce sabe anexar um arquivo?
3. Voce ja fez um curriculo?

O diagnostico nao escolhe varias jornadas. Ele apenas personaliza o texto inicial da jornada Primeira Oportunidade.

## Dashboard/Ponte - Wireframe Textual

### Estrutura Geral

Tela dividida em cinco areas:

1. topo da jornada;
2. painel de acao principal;
3. mapa da ponte;
4. resumo lateral;
5. acesso ao mentor.

### 1. Topo da Jornada

Conteudo:

- nome da jornada: Primeira Oportunidade;
- frase curta de contexto;
- indicador de progresso local.

Componentes clicaveis:

- botao "Recomecar jornada";
- link/botao "Ver diagnostico".

Comportamento:

- "Recomecar jornada" limpa progresso local da jornada depois de confirmacao.
- "Ver diagnostico" abre uma visualizacao simples das 3 respostas.

### 2. Painel de Acao Principal

Conteudo:

- titulo da missao atual;
- motivo da missao;
- proximo passo recomendado;
- estado da missao.

Componentes clicaveis:

- botao principal "Continuar missao";
- botao secundario "Pedir ajuda ao mentor".

Comportamento:

- "Continuar missao" abre a tela da missao atual.
- "Pedir ajuda ao mentor" abre o painel lateral com respostas fixas daquela missao.

### 3. Mapa da Ponte

Conteudo:

Cinco marcos da jornada:

1. E-mail profissional.
2. Enviar anexos.
3. Montar curriculo.
4. Revisar curriculo.
5. Travessia concluida.

Estados:

- bloqueado;
- disponivel;
- em andamento;
- concluido.

Componentes clicaveis:

- cada marco da ponte;
- tooltip ou resumo rapido do marco;
- botao "Ver detalhes" quando o marco estiver disponivel ou em andamento.

Comportamento:

- marco concluido mostra resumo e conquista;
- marco atual abre detalhes da missao;
- marco bloqueado mostra requisito anterior;
- progresso visual acende a linha da ponte ate o ultimo marco concluido.

### 4. Resumo Lateral

Conteudo:

- conquistas desbloqueadas;
- habilidades trabalhadas;
- rascunho do curriculo;
- aviso de progresso local.

Componentes clicaveis:

- card de conquista;
- link "Abrir Curriculo Guiado" quando disponivel;
- botao "Limpar rascunho" dentro do curriculo, nao no dashboard.

Comportamento:

- card de conquista abre descricao curta;
- "Abrir Curriculo Guiado" abre a ferramenta quando a missao correspondente estiver liberada;
- aviso de progresso local explica que os dados ficam neste navegador.

### 5. Acesso ao Mentor

Conteudo:

- botao fixo "Mentor";
- estado aberto/fechado do painel lateral.

Componentes clicaveis:

- botao "Mentor";
- botoes de ajuda dentro do painel:
  - Explique mais simples.
  - Me dê um exemplo.
  - Como isso ajuda meu objetivo?
  - Resuma esta missão.
  - Qual é o próximo passo?

Comportamento:

- o mentor nao usa IA real no MVP;
- cada botao retorna uma resposta fixa ligada a missao atual;
- se nao houver missao ativa, retorna uma resposta fixa sobre a jornada geral.

## Tela de Missao

Estrutura:

- contexto da missao;
- objetivo;
- conteudo curto;
- exemplo pratico;
- desafio;
- feedback;
- botao de conclusao.

Componentes clicaveis:

- "Voltar para ponte";
- "Pedir ajuda ao mentor";
- opcoes do desafio;
- "Concluir missao".

## Curriculo Guiado

Ferramenta unica do MVP.

Etapas:

1. dados basicos;
2. objetivo profissional;
3. formacao;
4. experiencias;
5. habilidades;
6. previa e copiar texto.

Componentes clicaveis:

- avancar;
- voltar;
- copiar curriculo;
- pedir exemplo ao mentor.

## Mentor Lateral Simulado

O mentor do MVP e uma simulacao controlada.

Ele deve:

- usar botoes;
- retornar respostas fixas;
- variar por missao;
- manter tom humano e simples;
- evitar prometer IA real.

Ele nao deve:

- responder livremente como chatbot real;
- pedir dados sensiveis;
- prometer emprego;
- enviar candidatura;
- afirmar que entende qualquer pergunta.

## Tom de Voz

Preferir:

- "vamos resolver isso passo a passo";
- "boa, esse ponto ajuda no seu objetivo";
- "mais uma etapa acesa na sua ponte";
- "agora voce tem um rascunho para trabalhar";
- "se travar, use o mentor para ver um exemplo".

Evitar:

- "voce errou";
- "nivel de proficiencia";
- "curso concluido";
- "usuario inexperiente";
- "agente inteligente";
- "IA personalizada" no MVP.

## Regra de UX

Se uma tela parecer curso comum, ela precisa voltar para a metafora da travessia.

A secao "Da aula para a missao" deve permanecer como contexto secundario de portfolio, depois da experiencia principal e sem chamadas de acao que disputem atencao com a jornada.

O usuario deve sempre entender:

- onde estou;
- qual e minha proxima missao;
- o que avancei;
- que ajuda fixa posso pedir;
- qual entrega pratica estou construindo.
