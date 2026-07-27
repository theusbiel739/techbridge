import type {
  InitialJourneyState,
  MentorAction,
  MentorGuidance,
  MissionId,
} from "../../domain/types";

export const mentorActions: MentorAction[] = [
  { id: "simplify", label: "Explique mais simples" },
  { id: "example", label: "Me dê um exemplo" },
  { id: "goal-impact", label: "Como isso ajuda meu objetivo?" },
  { id: "summary", label: "Resuma esta missão" },
  { id: "next-step", label: "Qual é o próximo passo?" },
];

const welcomeGuidance: MentorGuidance = {
  contextLabel: "Antes da travessia",
  introduction:
    "Olá! Quando você escolher seu objetivo, eu mostro orientações curtas para cada etapa da ponte.",
  responses: {
    simplify:
      "Primeiro, escolha a ponte que você quer atravessar. Depois, responda três perguntas simples para organizar seu caminho.",
    example:
      "Você pode começar escolhendo o objetivo de conquistar seu primeiro emprego. O diagnóstico ajuda a definir onde prestar mais atenção.",
    "goal-impact":
      "Seu objetivo vira um caminho curto: preparar comunicação, arquivos e currículo para buscar a primeira oportunidade com mais confiança.",
    "next-step":
      "Escolha o objetivo disponível na tela. Você não precisa preparar nenhum documento agora.",
    summary:
      "Seu começo tem três partes: escolher o objetivo, responder o diagnóstico e conhecer a jornada recomendada.",
  },
};

const completedGuidance: MentorGuidance = {
  contextLabel: "Travessia concluída",
  introduction:
    "Você acendeu todos os marcos desta ponte. Vale reconhecer o caminho e guardar o que aprendeu para os próximos passos.",
  responses: {
    simplify:
      "Você concluiu as cinco missões. Agora já tem uma sequência prática para preparar seus materiais profissionais.",
    example:
      "Antes de analisar uma oportunidade, você pode conferir o e-mail, o arquivo e o currículo usando os passos da jornada.",
    "goal-impact":
      "A travessia ajuda seu objetivo porque reúne uma base prática para analisar oportunidades e preparar seus materiais com mais autonomia.",
    "next-step":
      "Revise as habilidades no dashboard e escolha uma ação pequena para praticar com calma.",
    summary:
      "Você trabalhou comunicação digital, envio de arquivos, construção e revisão de currículo.",
  },
};

const missionGuidance: Record<MissionId, MentorGuidance> = {
  "professional-email": {
    contextLabel: "E-mail profissional",
    introduction:
      "Vamos deixar este passo leve: o importante é ter um endereço simples, fácil de reconhecer e que você consiga acessar.",
    responses: {
      simplify:
        "Use seu nome de um jeito claro, evite apelidos e confirme que consegue entrar na conta.",
      example:
        "Um formato como nome.sobrenome@email.com costuma ser mais fácil de identificar em uma candidatura.",
      "goal-impact":
        "Um e-mail claro ajuda empresas a reconhecer seu contato e responder sobre uma oportunidade.",
      "next-step":
        "Pense no endereço que você usaria e confira três pontos: leitura fácil, nome reconhecível e acesso à conta.",
      summary:
        "Nesta missão, você aprende a reconhecer um e-mail adequado para contatos profissionais.",
    },
  },
  "send-attachments": {
    contextLabel: "Enviar anexos",
    introduction:
      "Anexar um arquivo fica mais seguro quando você segue sempre a mesma ordem e confere antes de enviar.",
    responses: {
      simplify:
        "Clique no clipe, escolha o arquivo, espere carregar e confira o nome. Só depois pense em enviar.",
      example:
        "Se aparecer curriculo-nome.pdf junto à mensagem, confira se esse é mesmo o documento que você queria anexar.",
      "goal-impact":
        "Saber conferir anexos ajuda você a compartilhar o currículo correto com mais segurança quando precisar.",
      "next-step":
        "Localize um arquivo de teste e repasse os quatro passos sem enviar nada: anexar, escolher, esperar e conferir.",
      summary:
        "A missão ensina a selecionar e conferir um anexo antes do envio.",
    },
  },
  "build-first-resume": {
    contextLabel: "Primeiro currículo",
    introduction:
      "Seu primeiro currículo pode ser simples. Ele precisa organizar informações úteis, não parecer perfeito.",
    responses: {
      simplify:
        "Separe contato, objetivo, formação, experiências e habilidades. Projetos e trabalhos informais também podem contar.",
      example:
        "Uma habilidade concreta pode ser atendimento ao público, organização de arquivos ou uso básico de editor de texto.",
      "goal-impact":
        "O currículo organiza sua formação, experiências e habilidades para apresentar o que você pode oferecer em uma primeira oportunidade.",
      "next-step":
        "Pense em três informações essenciais e em uma habilidade prática que você consegue explicar com suas palavras.",
      summary:
        "Nesta missão, você reconhece as partes básicas de um currículo para primeira oportunidade.",
    },
  },
  "review-resume": {
    contextLabel: "Revisar currículo",
    introduction:
      "Nesta missão eu uso sempre o método fixo XYZ. Não há análise por IA: você confere cada ponto de forma transparente.",
    responses: {
      simplify:
        "X: confira as informações essenciais. Y: leia o texto e organize títulos. Z: retire dados sensíveis ou desnecessários.",
      example:
        "Em X, veja se contato e objetivo estão presentes. Em Y, mantenha títulos e datas consistentes. Em Z, retire CPF, RG, endereço completo e data de nascimento.",
      "goal-impact":
        "Revisar reduz erros de contato e deixa suas informações mais claras para quem analisar o currículo.",
      "next-step":
        "Comece pelo X mostrado na atividade. Depois confirme Y e Z. Se faltar algo, abra o Currículo Guiado para ajustar.",
      summary:
        "XYZ é uma rotina fixa: essenciais presentes, texto claro e dados sensíveis removidos.",
    },
  },
  "complete-first-crossing": {
    contextLabel: "Concluir a travessia",
    introduction:
      "Chegar até aqui significa que você já construiu um caminho. Agora é hora de reconhecer o que avançou.",
    responses: {
      simplify:
        "Revise o que aprendeu e escolha um próximo passo pequeno. Você não precisa resolver tudo hoje.",
      example:
        "Seu próximo passo pode ser conferir seus materiais antes de analisar uma oportunidade, sem enviar nada ainda.",
      "goal-impact":
        "Reunir e-mail, anexos e currículo cria uma base mais segura para continuar sua busca pela primeira oportunidade.",
      "next-step":
        "Escolha uma ação segura para praticar depois da jornada e conclua este último marco quando estiver pronto.",
      summary:
        "A última missão reúne e-mail, anexos e currículo para fechar sua primeira travessia.",
    },
  },
};

export function getMentorGuidance(
  state: InitialJourneyState,
): MentorGuidance {
  if (!state.startedAt) {
    return welcomeGuidance;
  }

  if (!state.currentMissionId) {
    return completedGuidance;
  }

  return missionGuidance[state.currentMissionId];
}
