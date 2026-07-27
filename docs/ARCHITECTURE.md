# TechBridge Journey - Arquitetura

## Objetivo

A aplicação moderna permanece isolada em `journey/`. A arquitetura separa a
campanha completa do recorte implementado no MVP para permitir evolução sem
duplicar o fluxo atual ou transformar capítulos ainda vazios em conteúdo
fictício.

O MVP `Primeira Oportunidade` continua sendo um vertical slice local com as
mesmas cinco missões, o mesmo diagnóstico, o mesmo mentor simulado e o mesmo
Currículo Guiado.

## Vocabulário do domínio

### Campanha completa

É a estrutura narrativa canônica do TechBridge: um prólogo e oito capítulos.
Ela representa o percurso completo até a Autonomia Digital, mesmo quando um
capítulo ainda não possui missões implementadas.

1. Prólogo — Escolher o Destino
2. Capítulo 1 — Acender a Ponte
3. Capítulo 2 — Encontrar o Caminho
4. Capítulo 3 — Criar Conexões
5. Capítulo 4 — Escudo Digital
6. Capítulo 5 — Construir e Produzir
7. Capítulo 6 — Inteligência com Propósito
8. Capítulo 7 — Objetivo em Ação
9. Capítulo 8 — Autonomia Digital

### Jornada

É a experiência organizada para um objetivo do usuário. Uma jornada referencia
a campanha, seleciona rotas e define o checkpoint que encerra seu vertical
slice atual.

### Rota

É uma variação de percurso dentro de um capítulo. No modelo atual,
`Primeira Oportunidade` é uma rota do Capítulo 7. Outras rotas poderão ser
adicionadas sem transformar o Capítulo 7 inteiro em uma única sequência fixa.

### Capítulo

É uma etapa canônica ordenada da campanha. O contrato contém:

- identificador estável;
- ordem;
- título;
- propósito estrutural curto;
- missões associadas;
- tipo de checkpoint;
- estágio visual da ponte;
- indicação de obrigatoriedade.

Um capítulo pode permanecer vazio no vertical slice. Isso não significa que ele
foi concluído ou removido da campanha.

### Missão

É a unidade prática atômica, identificada por um ID estável. O modelo já
distingue missões obrigatórias ou opcionais e prevê crédito por conclusão ou
diagnóstico. A lógica completa de opcionais e créditos ainda não foi ativada no
MVP.

### Checkpoint

É um marco estrutural de prólogo, capítulo, rota, vertical slice ou conclusão da
campanha. `Concluir minha primeira travessia` é somente o checkpoint final do
vertical slice atual. Ele não representa a chegada à cidade nem a conclusão do
Capítulo 8.

### Vertical slice do MVP

É o recorte funcional usado para provar a experiência:

- `Criar e-mail profissional` → Capítulo 3;
- `Enviar anexos` → Capítulo 3;
- `Montar currículo` → Capítulo 7, rota Primeira Oportunidade;
- `Revisar currículo` → Capítulo 7, rota Primeira Oportunidade;
- `Concluir minha primeira travessia` → checkpoint do vertical slice.

Os demais capítulos existem na definição, mas permanecem sem missões no MVP.

## Estrutura de código

```text
journey/src/features/journey/
├── JourneyEntry.tsx
├── campaigns/
├── components/
├── domain/
├── journeys/
│   └── first-opportunity/
├── persistence/
└── resume/
```

- `campaigns/`: definição canônica do prólogo e dos oito capítulos;
- `domain/`: contratos, validação, ordenação, progresso genérico e transições
  visuais;
- `journeys/`: composição de jornada, rota, catálogos e adaptadores;
- `persistence/`: leitura, validação e migrações de estado;
- `components/`: experiência visível já existente;
- `resume/`: contratos e revisão local do Currículo Guiado.

## Ordenação e validação

A ordem visível do vertical slice é derivada da ordem dos capítulos. Missões do
checkpoint do vertical slice são acrescentadas depois das missões dos
capítulos.

A validação rejeita:

- capítulos com IDs ou ordens duplicadas;
- missões repetidas em capítulos ou checkpoints;
- missões referenciadas fora do catálogo;
- missões do catálogo sem associação;
- rotas ausentes ou com missões fora do capítulo correspondente.

Capítulos vazios são válidos.

## Progresso genérico

`deriveJourneyProgress` recebe a definição de execução e os IDs concluídos. Ele
não importa uma jornada específica. Catálogos de missões, habilidades e
conquistas são fornecidos pelo chamador.

O contrato também aceita, de forma transitória, missões creditadas pelo
diagnóstico e missões opcionais ignoradas. Essas entradas preparam a evolução
sem ativar novas regras de produto no MVP.

O progresso usa IDs estáveis em vez da posição como identidade. Isso permite
inserir missões futuramente sem apagar automaticamente IDs já concluídos.

## Estado persistido

O formato atual continua na versão 2 e usa a mesma chave:

`techbridge:journey:initial-state`

Nenhum campo foi adicionado ao valor salvo. O adaptador da jornada
`Primeira Oportunidade` fornece a definição e a chave para a camada genérica de
persistência. A compatibilidade da migração antiga v1 → v2 foi mantida.

### Preparação da migração v2 → v3

A migração v3 não é executada nesta etapa. Existe apenas um planejador puro,
sem escrita, que identifica:

- campanha e jornada;
- rotas ativas;
- IDs concluídos que podem ser preservados;
- IDs que precisariam de reconciliação.

Antes de adicionar missões à campanha em produção, a v3 deverá definir como
persistir créditos do diagnóstico, opcionais, capítulos, checkpoints e versão
da definição. Até essa decisão, a validação estrita da v2 continua preservada.

## Estado transitório visual

Eventos visuais futuros ficam em um contrato separado e não são persistidos.
Ele pode representar:

- missão concluída;
- checkpoint ativado;
- avanço dentro do capítulo;
- mudança de capítulo;
- câmera avançando;
- ambiente sendo revelado.

Esse contrato não executa animações e não participa da validação do estado v2.

## Limites preservados

- nenhuma nova missão ou atividade foi adicionada;
- nenhum conteúdo educacional foi criado;
- nenhuma animação ou mudança visual foi implementada;
- mentor, diagnóstico, progresso e Currículo Guiado mantêm o comportamento
  visível;
- a v1 na raiz do repositório permanece inalterada;
- nenhum deploy faz parte desta etapa.
