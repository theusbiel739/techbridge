import type {
  JourneyAchievement,
  JourneyDefinition,
  DiagnosticQuestion,
  JourneyGoal,
  JourneyMission,
  JourneyRoute,
  JourneyRuntimeDefinition,
  JourneySkill,
} from "../../domain/types";
import { getJourneyMissions } from "../../domain/journeyDefinition";
import { techbridgeCampaignChapters } from "../../campaigns/techbridgeCampaign";

export const firstJobGoal: JourneyGoal = {
  id: "first-job",
  title: "Quero conquistar meu primeiro emprego",
  description:
    "Organize os passos digitais essenciais para buscar oportunidades com mais confiança.",
};

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "uses-email",
    prompt: "Você já usa e-mail?",
    supportingText:
      "Pode ser qualquer conta de e-mail que você consiga acessar hoje.",
  },
  {
    id: "attaches-files",
    prompt: "Você sabe anexar um arquivo?",
    supportingText:
      "Por exemplo, enviar uma foto ou documento junto com um e-mail.",
  },
  {
    id: "has-resume",
    prompt: "Você já fez um currículo?",
    supportingText:
      "Não precisa estar pronto ou atualizado para responder sim.",
  },
];

export const firstOpportunityRoute: JourneyRoute = {
  id: "first-opportunity-route",
  chapterId: "chapter-7-goal-in-action",
  title: "Primeira Oportunidade",
  missionIds: ["build-first-resume", "review-resume"],
};

export const firstOpportunityJourney: JourneyDefinition = {
  id: "first-opportunity",
  goalId: firstJobGoal.id,
  title: "Primeira Oportunidade",
  description:
    "Uma travessia prática para preparar seu e-mail, seus anexos e seu primeiro currículo.",
  campaignId: "techbridge-campaign",
  routeIds: [firstOpportunityRoute.id],
  chapters: techbridgeCampaignChapters,
  verticalSliceCheckpointMissionId: "complete-first-crossing",
};

const firstOpportunityMissionCatalog: JourneyMission[] = [
  {
    id: "professional-email",
    title: "Criar e-mail profissional",
    shortTitle: "E-mail profissional",
    description:
      "Prepare um endereço de e-mail adequado para contatos com empresas.",
    outcome: "Ter um canal profissional para receber e enviar oportunidades.",
    objective:
      "Reconhecer como um endereço de e-mail pode transmitir clareza e profissionalismo.",
    lesson:
      "Prefira uma combinação simples do seu nome e sobrenome. Evite apelidos, frases difíceis e muitos números. Antes de usar a conta, confirme que você consegue entrar nela e receber mensagens.",
    example:
      "Um formato como nome.sobrenome@email.com é mais fácil de identificar do que um apelido sem relação com seu nome.",
    challenge:
      "Pense no endereço que você usaria em uma candidatura e confira se ele é simples, legível e fácil de explicar para outra pessoa.",
    completionMessage:
      "Boa! Você já sabe o que observar em um e-mail profissional.",
    skillIds: ["digital-communication"],
    requirement: "required",
    creditPolicy: "completion-only",
  },
  {
    id: "send-attachments",
    title: "Aprender a enviar anexos",
    shortTitle: "Enviar anexos",
    description:
      "Entenda como escolher, conferir e enviar um arquivo por e-mail.",
    outcome: "Conseguir enviar documentos com mais segurança.",
    objective:
      "Entender os passos para anexar o arquivo correto antes de enviar um e-mail.",
    lesson:
      "Use o botão de anexo, normalmente representado por um clipe. Escolha o arquivo, espere o carregamento terminar e confira o nome exibido antes de enviar a mensagem.",
    example:
      "Antes de enviar curriculo-ana-souza.pdf, confira se esse é o documento certo e se o nome do arquivo aparece junto ao e-mail.",
    challenge:
      "Localize no seu dispositivo um arquivo de teste e repasse mentalmente os passos: anexar, selecionar, esperar e conferir. Não é necessário enviar nada agora.",
    completionMessage:
      "Mais um marco aceso: você conhece a sequência segura para anexar arquivos.",
    skillIds: ["file-sharing", "digital-communication"],
    requirement: "required",
    creditPolicy: "completion-only",
  },
  {
    id: "build-first-resume",
    title: "Montar meu primeiro currículo",
    shortTitle: "Montar currículo",
    description:
      "Organize suas informações em um currículo simples e fácil de entender.",
    outcome: "Criar uma primeira versão do seu currículo.",
    objective:
      "Identificar as informações essenciais de um currículo para primeira oportunidade.",
    lesson:
      "Um currículo inicial pode ser direto: contato, objetivo profissional, formação, experiências relevantes e habilidades. Projetos, trabalhos informais e atividades escolares também podem mostrar o que você sabe fazer.",
    example:
      "Na parte de habilidades, prefira itens concretos como organização de arquivos, atendimento ao público ou uso básico de editores de texto.",
    challenge:
      "Escolha três informações que não podem faltar no seu primeiro currículo e pense em uma habilidade prática que você gostaria de destacar.",
    completionMessage:
      "Boa, agora você reconhece a estrutura básica do seu primeiro currículo.",
    skillIds: ["resume-writing"],
    requirement: "required",
    creditPolicy: "completion-only",
  },
  {
    id: "review-resume",
    title: "Revisar meu currículo",
    shortTitle: "Revisar currículo",
    description:
      "Confira o texto e deixe as informações prontas para compartilhar.",
    outcome: "Ter um currículo mais claro e confiável.",
    objective:
      "Aplicar uma revisão simples antes de compartilhar um currículo.",
    lesson:
      "Leia com calma, confira telefone e e-mail, procure erros de digitação e mantenha títulos e datas consistentes. Uma leitura em voz alta pode revelar trechos confusos.",
    example:
      "Se uma experiência usa mês e ano, mantenha o mesmo formato nas demais. Confira também se o arquivo tem um nome fácil de reconhecer.",
    challenge:
      "Use esta sequência em um documento de teste: conferir contato, títulos, datas, escrita e nome do arquivo.",
    completionMessage:
      "Revisão concluída: você tem um processo simples para conferir seu currículo.",
    skillIds: ["professional-review", "resume-writing"],
    requirement: "required",
    creditPolicy: "completion-only",
  },
  {
    id: "complete-first-crossing",
    title: "Concluir minha primeira travessia",
    shortTitle: "Travessia concluída",
    description:
      "Revise o caminho percorrido e reconheça o que você já consegue fazer.",
    outcome: "Encerrar a jornada com uma entrega prática preparada.",
    objective:
      "Reconhecer as habilidades trabalhadas e organizar o próximo passo da busca por emprego.",
    lesson:
      "Concluir a travessia não significa saber tudo. Significa ter um caminho mais claro: usar um e-mail adequado, enviar arquivos com atenção e preparar um currículo compreensível.",
    example:
      "Seu próximo passo pode ser separar uma vaga para analisar e conferir se seu currículo está adequado antes de qualquer envio.",
    challenge:
      "Escolha uma próxima ação pequena e segura para realizar depois desta jornada, sem enviar candidatura agora.",
    completionMessage:
      "Travessia concluída! Você construiu uma base prática para buscar sua primeira oportunidade.",
    skillIds: ["digital-communication", "professional-review"],
    requirement: "required",
    creditPolicy: "completion-only",
  },
];

export const firstOpportunityMissions = getJourneyMissions(
  firstOpportunityJourney,
  firstOpportunityMissionCatalog,
  [firstOpportunityRoute],
);

export const journeySkills: JourneySkill[] = [
  { id: "digital-communication", label: "Comunicação digital" },
  { id: "file-sharing", label: "Envio de arquivos" },
  { id: "resume-writing", label: "Construção de currículo" },
  { id: "professional-review", label: "Revisão profissional" },
];

export const journeyAchievements: JourneyAchievement[] = [
  {
    id: "crossing-started",
    title: "Travessia iniciada",
    description: "Você escolheu um objetivo e acendeu o primeiro marco.",
    unlock: { type: "journey-started" },
  },
  {
    id: "first-step-completed",
    title: "Primeiro passo",
    description: "A primeira missão da ponte foi concluída.",
    unlock: { type: "completed-mission-count", count: 1 },
  },
];

export const firstOpportunityRuntime: JourneyRuntimeDefinition = {
  journey: firstOpportunityJourney,
  missions: firstOpportunityMissions,
  skills: journeySkills,
  achievements: journeyAchievements,
  diagnosticQuestionIds: diagnosticQuestions.map(({ id }) => id),
};
