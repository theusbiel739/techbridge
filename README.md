# TechBridge

O **TechBridge** é um projeto de inclusão digital que ajuda pessoas iniciantes a transformar objetivos reais em passos simples e práticos. A versão moderna do projeto, **TechBridge Journey**, organiza esse aprendizado como uma travessia com diagnóstico, missões, progresso e uma entrega concreta.

## Projeto publicado

A [versão 1 está publicada no Netlify](https://techbridgee.netlify.app/). Ela permanece na raiz do repositório como referência histórica em HTML, CSS e JavaScript.

A versão 2 está pronta como MVP local em `journey/`. O deploy público ainda não foi realizado.

## Evolução do projeto

A v2 preserva a intenção de inclusão digital da v1, mas transforma conteúdos antes apresentados como aulas e questionários em uma experiência prática: diagnóstico, missões, progresso e uma ferramenta útil. A primeira versão continua publicada e preservada como parte da história do projeto.

## TechBridge Journey MVP

O MVP acompanha uma única jornada completa: **Primeira Oportunidade**.

Principais funcionalidades:

- entrada com um objetivo profissional claro;
- diagnóstico rápido de três perguntas;
- dashboard com ponte, cinco missões e progresso visual;
- atividades práticas com conclusão por etapas;
- habilidades e conquistas ligadas ao avanço;
- mentor lateral simulado, com respostas fixas e contextuais;
- Currículo Guiado com formulário, prévia ao vivo e cópia como texto;
- progresso e rascunho salvos localmente;
- confirmação segura antes de limpar o rascunho;
- navegação por teclado, foco visível e avisos acessíveis de sucesso e erro;
- layout responsivo e suporte a `prefers-reduced-motion`.

O mentor não usa IA real. Backend, login, banco de dados, geração de PDF/DOCX e envio para vagas não fazem parte deste MVP.

## Stack

### v2 — Journey MVP

- React;
- TypeScript;
- Vite;
- CSS responsivo;
- `localStorage`.

### v1 — referência histórica

- HTML5;
- CSS3;
- JavaScript;
- Netlify.

## Como rodar localmente

Requisitos: Node.js e npm.

```bash
git clone https://github.com/theusbiel739/techbridge.git
cd techbridge/journey
npm install
npm run dev
```

O Vite informa no terminal o endereço local da aplicação.

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos finais são gerados em `journey/dist`.

## Preparação para deploy da v2

Configuração esperada em uma plataforma como Netlify:

- base directory: `journey`
- build command: `npm run build`
- publish directory: `journey/dist`

O deploy real será feito em uma etapa separada, após confirmação.

## Privacidade e armazenamento local

Objetivo, respostas, progresso e rascunho do currículo são armazenados no `localStorage` do navegador. Nenhum dado é enviado a um servidor.

Como os dados ficam no dispositivo, eles podem ser perdidos ao limpar o armazenamento do navegador. O Currículo Guiado também orienta a não inserir CPF, RG, endereço completo, data de nascimento ou outras informações sensíveis.

## Status

- v1: protótipo acadêmico publicado;
- v2: Sprints 1 a 7 concluídas localmente;
- build de produção: configurado para gerar `journey/dist`;
- deploy público da v2: pendente de confirmação.

## Próximos passos

- publicar a v2 e validar a URL pública;
- registrar screenshots reais após o deploy;
- avaliar novas jornadas somente depois do MVP publicado;
- considerar backend, login, banco e IA real apenas em evoluções futuras.

## Documentação da v2

- [Roadmap TechBridge 2.0](docs/TECHBRIDGE_2_ROADMAP.md)
- [Escopo do MVP](docs/MVP_SCOPE.md)
- [Product Vision](docs/PRODUCT_VISION.md)
- [UX Concept](docs/UX_CONCEPT.md)
- [Implementation Sprints](docs/IMPLEMENTATION_SPRINTS.md)
- [Arquitetura da Journey](docs/ARCHITECTURE.md)
