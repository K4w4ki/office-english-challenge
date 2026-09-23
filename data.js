/* =========================================================
   DAILY TASKS — Business English
   Content data: jobs, tasks, expressions, and challenge questions
   ========================================================= */

const JOBS = [
  { name:"Production Engineer", icon:"⚙️", desc:"Plans and improves how products are made on the production line.", activity:"They usually check the production line every morning." },
  { name:"Sales Manager", icon:"📊", desc:"Leads the sales team and sets targets for the department.", activity:"She usually has meetings with the sales team." },
  { name:"Sales Assistant", icon:"🛒", desc:"Works with customers, processes orders, and writes emails.", activity:"I usually process orders in the morning." },
  { name:"Digital Designer", icon:"🎨", desc:"Creates visual content for websites, apps, and campaigns.", activity:"They create new graphics every week." },
  { name:"Admin Assistant", icon:"🗂️", desc:"Organizes documents, schedules, and daily office tasks.", activity:"She answers the phone and organizes files." },
  { name:"Finance Officer", icon:"💰", desc:"Manages budgets, invoices, and financial reports.", activity:"He writes financial reports every month." },
  { name:"Project Manager", icon:"📋", desc:"Plans projects and makes sure deadlines are met.", activity:"She goes to meetings to check project progress." },
  { name:"IT Specialist", icon:"💻", desc:"Solves technical problems and supports company systems.", activity:"He usually fixes computer problems for the team." },
];

const DAILY_TASKS = [
  { phrase:"go to meetings", example:"They go to meetings every Monday.", pt:"ir a reuniões" },
  { phrase:"call customers", example:"I call customers in the afternoon.", pt:"ligar para clientes" },
  { phrase:"process orders", example:"She processes orders every day.", pt:"processar pedidos" },
  { phrase:"do research", example:"We do research before every project.", pt:"fazer pesquisa" },
  { phrase:"make calls", example:"He makes calls to new clients.", pt:"fazer ligações" },
  { phrase:"travel for work", example:"They travel for work twice a month.", pt:"viajar a trabalho" },
  { phrase:"analyze sales data", example:"She analyzes sales data every Friday.", pt:"analisar dados de vendas" },
  { phrase:"write reports", example:"I usually write reports.", pt:"escrever relatórios" },
  { phrase:"answer the phone", example:"They answer the phone.", pt:"atender o telefone" },
  { phrase:"start work", example:"I always start work at 8 o'clock.", pt:"começar a trabalhar" },
  { phrase:"finish work", example:"He finishes work at 6 pm.", pt:"terminar o expediente" },
  { phrase:"write emails", example:"She writes emails every morning.", pt:"escrever e-mails" },
];

const EXPRESSIONS = [
  { phrase:"Touch base", meaning:"Entrar em contato rapidamente para alinhar algo.", example:"Let's touch base after lunch." },
  { phrase:"Get the ball rolling", meaning:"Dar início a uma tarefa ou projeto.", example:"Let's get the ball rolling on this project." },
  { phrase:"On the same page", meaning:"Estar de acordo ou ter o mesmo entendimento sobre algo.", example:"We are all on the same page about the deadline." },
  { phrase:"Run late", meaning:"Estar atrasado ou chegar atrasado.", example:"Sorry, I'm running late for the meeting." },
  { phrase:"Catch up", meaning:"Colocar as informações em dia ou recuperar um trabalho atrasado.", example:"Can we catch up tomorrow morning?" },
  { phrase:"Heads up", meaning:"Um aviso ou alerta antecipado.", example:"Just a heads up: the meeting moved to 10 am." },
  { phrase:"Circle back", meaning:"Voltar a um assunto ou retomá-lo mais tarde.", example:"Let's circle back to this next week." },
  { phrase:"Wrap up", meaning:"Finalizar ou concluir algo.", example:"Can you wrap up the report by Friday?" },
];

/* =========================================================
   CHALLENGE QUESTIONS
   ========================================================= */

const PHASE1_QUESTIONS = [
  { context:"YOU ARE A SALES ASSISTANT.", text:"What do you usually do?", options:["Analyze sales data","Repair computers","Design buildings","Cook meals"], correct:0, explanation:"Sales Assistants analyze sales data as part of their daily tasks." },
  { context:"YOU ARE AN IT SPECIALIST.", text:"What do you usually do?", options:["Design a marketing poster","Fix computer problems","Cook lunch for the team","Drive a delivery truck"], correct:1, explanation:"IT Specialists fix computer and system problems." },
  { context:"YOU ARE A FINANCE OFFICER.", text:"What do you usually do?", options:["Design websites","Answer customer calls","Write financial reports","Travel abroad daily"], correct:2, explanation:"Finance Officers manage budgets and write financial reports." },
  { context:"YOU ARE A PROJECT MANAGER.", text:"What do you usually do?", options:["Go to meetings to check progress","Fix broken machines","Paint the office","Deliver packages"], correct:0, explanation:"Project Managers go to meetings to check project progress." },
  { context:"YOU ARE A DIGITAL DESIGNER.", text:"What do you usually do?", options:["Process financial invoices","Design graphics for campaigns","Repair company cars","Manage the warehouse"], correct:1, explanation:"Digital Designers create visual content for websites and campaigns." },
  { context:"YOU ARE AN ADMIN ASSISTANT.", text:"What do you usually do?", options:["Analyze production lines","Pilot a plane","Answer the phone and organize files","Sell software licenses"], correct:2, explanation:"Admin Assistants organize documents and answer the phone." },
  { context:"YOU ARE A SALES MANAGER.", text:"What do you usually do?", options:["Lead the sales team and set targets","Fix printers","Clean the office","Write software code"], correct:0, explanation:"Sales Managers lead the sales team and set sales targets." },
  { context:"YOU ARE A PRODUCTION ENGINEER.", text:"What do you usually do?", options:["Write marketing emails","Check the production line","Book flights for the CEO","Design logos"], correct:1, explanation:"Production Engineers verificam e melhoram a linha de produção." },
  { context:"YOU ARE A SALES ASSISTANT.", text:"What do you usually do?", options:["Process orders","Repair the roof","Teach math classes","Fly airplanes"], correct:0, explanation:"Sales Assistants processam pedidos e trabalham com clientes." },
  { context:"YOU ARE AN IT SPECIALIST.", text:"What do you usually do?", options:["Cook meals for clients","Support company systems","Sell insurance","Paint walls"], correct:1, explanation:"IT Specialists dão suporte e mantêm os sistemas da empresa." },
];

const PHASE2_QUESTIONS = [
  { text:"I ______ customers on the phone.", options:["CALL","TRAVEL","WRITE","START"], correct:0, explanation:"Usamos 'call customers' quando falamos ao telefone." },
  { text:"I ______ reports.", options:["ANALYZE","GO TO","CALL","WRITE"], correct:3, explanation:"Usamos 'write reports' para documentos." },
  { text:"I ______ sales data.", options:["PROCESS","ANALYZE","ANSWER","TRAVEL"], correct:1, explanation:"Usamos 'analyze sales data' quando estudamos números." },
  { text:"I ______ orders.", options:["PROCESS","GO TO","CALL","FINISH"], correct:0, explanation:"Usamos 'process orders' em funções de vendas e admin." },
  { text:"I ______ meetings.", options:["WRITE","GO TO","ANSWER","START"], correct:1, explanation:"Usamos 'go to meetings', não 'do meetings'." },
  { text:"I ______ the phone.", options:["ANSWER","WRITE","PROCESS","TRAVEL"], correct:0, explanation:"Usamos 'answer the phone' quando alguém liga." },
  { text:"I ______ work at 8 o'clock.", options:["FINISH","START","CALL","GO TO"], correct:1, explanation:"'Start work' descreve o início do dia de trabalho." },
  { text:"I ______ for work twice a month.", options:["TRAVEL","WRITE","PROCESS","ANSWER"], correct:0, explanation:"Usamos 'travel for work' para viagens de negócios." },
  { text:"I ______ research before a project.", options:["DO","MAKE","WRITE","GO"], correct:0, explanation:"Usamos 'do research', não 'make research'." },
  { text:"I ______ calls to new clients.", options:["MAKE","DO","GO","FINISH"], correct:0, explanation:"Usamos 'make calls' para contatar alguém por telefone." },
];

const OFFICE_TIMELINE = [
  { time:"08:00", task:"Start work" },
  { time:"09:30", task:"Answer the phone" },
  { time:"10:00", task:"Go to a meeting" },
  { time:"11:30", task:"Write emails" },
  { time:"13:00", task:"Have lunch" },
  { time:"14:00", task:"Process orders" },
  { time:"15:30", task:"Analyze data" },
  { time:"17:30", task:"Finish work" },
];

const PHASE3_QUESTIONS = [
  { context:"A WORKING DAY", text:"What do you do at 10:00?", options:["Go to a meeting","Write emails","Have lunch","Finish work"], correct:0, explanation:"Às 10:00 a agenda mostra 'Go to a meeting'." },
  { context:"A WORKING DAY", text:"What do you do at 13:00?", options:["Start work","Analyze data","Have lunch","Answer the phone"], correct:2, explanation:"Às 13:00 é hora do almoço." },
  { context:"A WORKING DAY", text:"What do you do at 08:00?", options:["Finish work","Start work","Process orders","Go to a meeting"], correct:1, explanation:"08:00 é quando o dia de trabalho começa." },
  { context:"A WORKING DAY", text:"What do you do at 17:30?", options:["Start work","Have lunch","Finish work","Write emails"], correct:2, explanation:"17:30 é quando o dia de trabalho termina." },
  { context:"FREQUENCY", text:"\"I ______ start work at 8.\" (100% of the time)", options:["Rarely","Sometimes","Always","Never"], correct:2, explanation:"'Always' significa 100% das vezes." },
  { context:"FREQUENCY", text:"\"She ______ has meetings.\" (most of the time)", options:["Never","Usually","Rarely","Sometimes"], correct:1, explanation:"'Usually' descreve algo que acontece na maioria das vezes." },
  { context:"FREQUENCY", text:"\"They ______ travel for work.\" (not very often)", options:["Always","Often","Rarely","Usually"], correct:2, explanation:"'Rarely' significa que algo acontece poucas vezes." },
  { context:"FREQUENCY", text:"\"He ______ analyzes sales data.\" (most weeks)", options:["Never","Often","Rarely","Sometimes"], correct:1, explanation:"'Often' descreve uma rotina frequente." },
  { context:"A WORKING DAY", text:"What do you do at 14:00?", options:["Process orders","Start work","Go to a meeting","Have lunch"], correct:0, explanation:"Às 14:00 a agenda mostra 'Process orders'." },
  { context:"FREQUENCY", text:"\"I ______ answer personal calls at work.\" (0% of the time)", options:["Always","Usually","Often","Never"], correct:3, explanation:"'Never' significa 0% das vezes." },
];

const PHASE4_QUESTIONS = [
  { context:"Your manager sends you 20 emails.", text:"What do you do?", options:["Answer the emails","Go home","Sleep","Ignore everything"], correct:0, explanation:"Um bom profissional responde os e-mails de trabalho." },
  { context:"A customer calls you.", text:"What do you do?", options:["Answer the phone","Analyze sales data","Travel for work","Finish work"], correct:0, explanation:"Quando um cliente liga, você atende o telefone." },
  { context:"It's 10:00 and your meeting starts now.", text:"What do you do?", options:["Go to the meeting","Write a report","Have lunch","Go home"], correct:0, explanation:"Na hora da reunião, você vai para a reunião." },
  { context:"Your report is due today.", text:"What do you do?", options:["Write the report","Call a friend","Take a nap","Ignore the deadline"], correct:0, explanation:"Com prazo hoje, você escreve o relatório." },
  { context:"A customer asks about their order.", text:"What do you do?", options:["Process and check the order","Sing a song","Close the office","Change jobs"], correct:0, explanation:"Quando perguntam sobre um pedido, você verifica e processa." },
  { context:"It's 13:00 and you're hungry.", text:"What do you do?", options:["Have lunch","Start work","Go to a meeting","Write emails"], correct:0, explanation:"13:00 é hora do almoço na agenda." },
  { context:"You need new information for a project.", text:"What do you do?", options:["Do research","Take a vacation","Ignore the project","Call in sick"], correct:0, explanation:"Quando você precisa de informações, você faz pesquisa." },
  { context:"It's 17:30 and your tasks are done.", text:"What do you do?", options:["Finish work","Start a new project","Call more clients","Go to another meeting"], correct:0, explanation:"17:30 é quando o dia de trabalho termina." },
];

const CHALLENGE_PHASES = [
  { key:"phase2", label:"PHASE 1 — DAILY TASKS", title:"Daily Tasks", questions: PHASE2_QUESTIONS, timer:25 },
  { key:"phase1", label:"PHASE 2 — WHO ARE YOU?", title:"Who Are You?", questions: PHASE1_QUESTIONS, timer:25 },
  { key:"phase3", label:"PHASE 3 — A WORKING DAY", title:"A Working Day", questions: PHASE3_QUESTIONS, timer:25 },
  { key:"phase4", label:"PHASE 4 — WHAT WOULD YOU DO?", title:"What Would You Do?", questions: PHASE4_QUESTIONS, timer:25 },
];

/* Classroom: 15 questões selecionadas (as mais divertidas de cada fase).
   Os números são as posições (começando em 0) dentro de cada lista de perguntas. */
const CLASSROOM_PICKS = {
  phase1: [1, 3, 5, 6],   // IT Specialist, Project Manager, Admin Assistant (avião!), Sales Manager
  phase2: [5, 6, 8, 9],   // answer the phone, start work, do research, make calls (do vs make)
  phase3: [3, 5, 6, 9],   // 17:30 finish work, Usually, Rarely, Never
  phase4: [0, 3, 4],      // 20 emails, prazo do relatório (soneca!), cliente pergunta do pedido
};

const CLASSROOM_QUESTIONS = [
  ...CLASSROOM_PICKS.phase1.map(i => PHASE1_QUESTIONS[i]),
  ...CLASSROOM_PICKS.phase2.map(i => ({ ...PHASE2_QUESTIONS[i], context:"COMPLETE THE SENTENCE" })),
  ...CLASSROOM_PICKS.phase3.map(i => PHASE3_QUESTIONS[i]),
  ...CLASSROOM_PICKS.phase4.map(i => PHASE4_QUESTIONS[i]),
];

const BADGES = [
  { id:"first_correct", icon:"🥇", label:"First Correct Answer" },
  { id:"combo3", icon:"🔥", label:"Combo x3" },
  { id:"phase_complete", icon:"📍", label:"Phase Complete" },
  { id:"challenge_complete", icon:"🏆", label:"Challenge Survivor" },
  { id:"perfect", icon:"💎", label:"Perfect Accuracy" },
];

const RANKS = [
  { min:900, max:100000, title:"CEO Material", message:"You lead with confidence — the whole office runs better because of you." },
  { min:700, max:899, title:"Great Professional", message:"Reliable, sharp, and ready for whatever the workday brings." },
  { min:500, max:699, title:"Good Start", message:"You know the basics — with a little more practice, you will run the place." },
  { min:0, max:499, title:"You Need More Coffee", message:"Tough day at the office. Review the Learn section and try again!" },
];

/* =========================================================
   TRADUÇÕES DAS ALTERNATIVAS (para o botão 🌐 PT)
   Mapeia o texto original em inglês → tradução natural em português
   ========================================================= */

const OPTIONS_TRANSLATIONS = {
  // =========================================================
  // PHASE 1 — WHO ARE YOU?
  // =========================================================

  "Analyze sales data": "Analisar dados de vendas",
  "Repair computers": "Consertar computadores",
  "Design buildings": "Projetar edifícios",
  "Cook meals": "Preparar refeições",
  "Design a marketing poster": "Criar um cartaz de marketing",
  "Fix computer problems": "Resolver problemas de computador",
  "Cook lunch for the team": "Preparar o almoço da equipe",
  "Drive a delivery truck": "Dirigir um caminhão de entregas",
  "Design websites": "Criar sites",
  "Answer customer calls": "Atender ligações de clientes",
  "Write financial reports": "Elaborar relatórios financeiros",
  "Travel abroad daily": "Viajar para o exterior diariamente",
  "Go to meetings to check progress": "Participar de reuniões para acompanhar o progresso",
  "Fix broken machines": "Consertar máquinas com defeito",
  "Paint the office": "Pintar o escritório",
  "Deliver packages": "Fazer entregas de encomendas",
  "Process financial invoices": "Processar faturas financeiras",
  "Design graphics for campaigns": "Criar artes para campanhas",
  "Repair company cars": "Consertar os carros da empresa",
  "Manage the warehouse": "Gerenciar o estoque",
  "Analyze production lines": "Analisar as linhas de produção",
  "Pilot a plane": "Pilotar um avião",
  "Answer the phone and organize files": "Atender o telefone e organizar arquivos",
  "Sell software licenses": "Vender licenças de software",
  "Lead the sales team and set targets": "Liderar a equipe de vendas e definir metas",
  "Fix printers": "Consertar impressoras",
  "Clean the office": "Limpar o escritório",
  "Write software code": "Programar sistemas",
  "Write marketing emails": "Escrever e-mails de marketing",
  "Check the production line": "Verificar a linha de produção",
  "Book flights for the CEO": "Reservar voos para o CEO",
  "Design logos": "Criar logotipos",
  "Process orders": "Processar pedidos",
  "Repair the roof": "Consertar o telhado",
  "Teach math classes": "Dar aulas de matemática",
  "Fly airplanes": "Pilotar aviões",
  "Support company systems": "Prestar suporte aos sistemas da empresa",
  "Sell insurance": "Vender seguros",
  "Paint walls": "Pintar paredes",


  // =========================================================
  // PHASE 2 — DAILY TASKS
  // =========================================================

  "CALL": "LIGAR",
  "TRAVEL": "VIAJAR",
  "WRITE": "ESCREVER",
  "START": "COMEÇAR",
  "ANALYZE": "ANALISAR",
  "GO TO": "IR PARA",
  "PROCESS": "PROCESSAR",
  "ANSWER": "ATENDER",
  "FINISH": "TERMINAR",
  "DO": "FAZER",
  "MAKE": "FAZER",
  "GO": "IR",


  // =========================================================
  // PHASE 3 — A WORKING DAY / FREQUENCY
  // =========================================================

  "Go to a meeting": "Participar de uma reunião",
  "Write emails": "Escrever e-mails",
  "Have lunch": "Almoçar",
  "Finish work": "Encerrar o expediente",
  "Start work": "Começar o expediente",
  "Analyze data": "Analisar dados",
  "Answer the phone": "Atender o telefone",

  "Rarely": "Raramente",
  "Sometimes": "Às vezes",
  "Always": "Sempre",
  "Never": "Nunca",
  "Usually": "Geralmente",
  "Often": "Frequentemente",


  // =========================================================
  // PHASE 4 — WHAT WOULD YOU DO?
  // =========================================================

  "Answer the emails": "Responder aos e-mails",
  "Go home": "Ir para casa",
  "Sleep": "Dormir",
  "Ignore everything": "Ignorar tudo",
  "Travel for work": "Viajar a trabalho",
  "Write a report": "Elaborar um relatório",
  "Call a friend": "Ligar para um amigo",
  "Take a nap": "Tirar uma soneca",
  "Ignore the deadline": "Ignorar o prazo",
  "Process and check the order": "Processar e conferir o pedido",
  "Sing a song": "Cantar uma música",
  "Close the office": "Fechar o escritório",
  "Change jobs": "Mudar de emprego",
  "Do research": "Fazer uma pesquisa",
  "Take a vacation": "Tirar férias",
  "Ignore the project": "Ignorar o projeto",
  "Call in sick": "Avisar que está doente",
  "Start a new project": "Iniciar um novo projeto",
  "Call more clients": "Entrar em contato com mais clientes",
  "Go to another meeting": "Participar de outra reunião",

  // Extras que estavam sem tradução
  "Cook meals for clients": "Preparar refeições para clientes",
  "Go to the meeting": "Ir à reunião",
  "Write the report": "Escrever o relatório",
};


/* =========================================================
   TRADUÇÕES DA TELA INICIAL (botão 🌐 EN | PT)
   Chaves = valores de data-i18n no index.html
   ========================================================= */
const WELCOME_TRANSLATIONS = {
  tag:       "Simulação de Escritório · Nível 01",
  title:     'Bem-vindo ao <span class="welcome-title-accent">escritório</span>',
  question:  "Você consegue sobreviver a um dia de trabalho?",
  desc:      "Aprenda como os profissionais falam sobre seus empregos, tarefas diárias e rotinas — e depois teste seus conhecimentos em um desafio ao vivo.",
  start:     "Iniciar Desafio",
  phases:    "fases",
  questions: "questões",
  xp:        "XP disponível",
  line1:     "— Atender o telefone",
  line2:     "— Ir a uma reunião",
  line3:     "— Escrever e-mails",
  line4:     "— Processar pedidos",
};

/* =========================================================
   TRADUÇÕES DA ABA CHALLENGE (botão 🌐 EN | PT)
   ========================================================= */
const CHALLENGE_TRANSLATIONS = {
  ch_tag:  "Minijogo",
  ch_sub:  "Você consegue sobreviver a um dia no escritório?",
  ch_p1:   "Tarefas Diárias",
  ch_p1d:  "Complete frases reais do ambiente de trabalho.",
  ch_p2:   "Quem É Você?",
  ch_p2d:  "Descubra sua profissão e o que você costuma fazer.",
  ch_p3:   "Um Dia de Trabalho",
  ch_p3d:  "Acompanhe uma agenda completa de escritório.",
  ch_p4:   "O Que Você Faria?",
  ch_p4d:  "Reaja a situações do dia a dia no trabalho.",
};


/* =========================================================
   TRADUÇÕES DA ABA LEARN (botão 🌐 EN | PT em cada seção)
   Chave = texto original em inglês (sem aspas) → tradução em português
   ========================================================= */
const LEARN_TRANSLATIONS = {
  // ---------- JOBS: cargos ----------
  "Production Engineer": "Engenheiro(a) de Produção",
  "Sales Manager": "Gerente de Vendas",
  "Sales Assistant": "Assistente de Vendas",
  "Digital Designer": "Designer Digital",
  "Admin Assistant": "Assistente Administrativo",
  "Finance Officer": "Analista Financeiro",
  "Project Manager": "Gerente de Projetos",
  "IT Specialist": "Especialista em TI",

  // ---------- JOBS: descrições ----------
  "Plans and improves how products are made on the production line.": "Planeja e melhora a forma como os produtos são fabricados na linha de produção.",
  "Leads the sales team and sets targets for the department.": "Lidera a equipe de vendas e define metas para o departamento.",
  "Works with customers, processes orders, and writes emails.": "Atende clientes, processa pedidos e escreve e-mails.",
  "Creates visual content for websites, apps, and campaigns.": "Cria conteúdo visual para sites, aplicativos e campanhas.",
  "Organizes documents, schedules, and daily office tasks.": "Organiza documentos, agendas e tarefas diárias do escritório.",
  "Manages budgets, invoices, and financial reports.": "Gerencia orçamentos, faturas e relatórios financeiros.",
  "Plans projects and makes sure deadlines are met.": "Planeja projetos e garante que os prazos sejam cumpridos.",
  "Solves technical problems and supports company systems.": "Resolve problemas técnicos e dá suporte aos sistemas da empresa.",

  // ---------- JOBS: frases de atividade ----------
  "They usually check the production line every morning.": "Eles geralmente verificam a linha de produção toda manhã.",
  "She usually has meetings with the sales team.": "Ela geralmente tem reuniões com a equipe de vendas.",
  "I usually process orders in the morning.": "Eu geralmente processo pedidos pela manhã.",
  "They create new graphics every week.": "Eles criam novas artes toda semana.",
  "She answers the phone and organizes files.": "Ela atende o telefone e organiza arquivos.",
  "He writes financial reports every month.": "Ele elabora relatórios financeiros todo mês.",
  "She goes to meetings to check project progress.": "Ela vai a reuniões para acompanhar o progresso do projeto.",
  "He usually fixes computer problems for the team.": "Ele geralmente resolve problemas de computador para a equipe.",

  // ---------- DAILY TASKS: exemplos ----------
  "They go to meetings every Monday.": "Eles vão a reuniões toda segunda-feira.",
  "I call customers in the afternoon.": "Eu ligo para clientes à tarde.",
  "She processes orders every day.": "Ela processa pedidos todos os dias.",
  "We do research before every project.": "Nós fazemos pesquisa antes de cada projeto.",
  "He makes calls to new clients.": "Ele faz ligações para novos clientes.",
  "They travel for work twice a month.": "Eles viajam a trabalho duas vezes por mês.",
  "She analyzes sales data every Friday.": "Ela analisa dados de vendas toda sexta-feira.",
  "I usually write reports.": "Eu geralmente escrevo relatórios.",
  "They answer the phone.": "Eles atendem o telefone.",
  "I always start work at 8 o'clock.": "Eu sempre começo a trabalhar às 8 horas.",
  "He finishes work at 6 pm.": "Ele termina o expediente às 18h.",
  "She writes emails every morning.": "Ela escreve e-mails toda manhã.",

  // ---------- EXPRESSIONS: exemplos ----------
  "Let's touch base after lunch.": "Vamos nos falar rapidinho depois do almoço.",
  "Let's get the ball rolling on this project.": "Vamos dar o pontapé inicial neste projeto.",
  "We are all on the same page about the deadline.": "Estamos todos alinhados sobre o prazo.",
  "Sorry, I'm running late for the meeting.": "Desculpe, estou atrasado para a reunião.",
  "Can we catch up tomorrow morning?": "Podemos conversar e nos atualizar amanhã de manhã?",
  "Just a heads up: the meeting moved to 10 am.": "Só um aviso: a reunião foi remarcada para as 10h.",
  "Let's circle back to this next week.": "Vamos retomar este assunto na semana que vem.",
  "Can you wrap up the report by Friday?": "Você consegue finalizar o relatório até sexta-feira?",
  "💡 Click a card to reveal its meaning and an example.": "💡 Clique em um card para revelar o significado e um exemplo.",

  // ---------- GRAMMAR ----------
  "Present Simple — talking about your job": "Presente Simples — falando sobre o seu trabalho",
  "Present Simple — daily routines": "Presente Simples — rotinas diárias",
  "Adverbs of Frequency": "Advérbios de Frequência",
  "I am a Sales Manager.": "Eu sou gerente de vendas.",
  "She is an IT Specialist.": "Ela é especialista em TI.",
  "They are Production Engineers.": "Eles são engenheiros de produção.",
  "She often has meetings.": "Ela frequentemente tem reuniões.",
  "They usually come to the office.": "Eles geralmente vêm ao escritório.",
  "He doesn't call customers.": "Ele não liga para clientes.",
  "She doesn't analyze sales data.": "Ela não analisa dados de vendas.",
  "These words show how often something happens.": "Estas palavras mostram com que frequência algo acontece.",
  "Never": "Nunca",
  "Rarely": "Raramente",
  "Sometimes": "Às vezes",
  "Often": "Frequentemente",
  "Usually": "Geralmente",
  "Always": "Sempre",
};
