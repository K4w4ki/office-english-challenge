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
  { context:"A WORKING DAY", text:"O que você faz às 13:00?", options:["Start work","Analyze data","Have lunch","Answer the phone"], correct:2, explanation:"Às 13:00 é hora do almoço." },
  { context:"A WORKING DAY", text:"O que você faz às 08:00?", options:["Finish work","Start work","Process orders","Go to a meeting"], correct:1, explanation:"08:00 é quando o dia de trabalho começa." },
  { context:"A WORKING DAY", text:"O que você faz às 17:30?", options:["Start work","Have lunch","Finish work","Write emails"], correct:2, explanation:"17:30 é quando o dia de trabalho termina." },
  { context:"FREQUENCY", text:"\"I ______ start work at 8.\" (100% das vezes)", options:["Rarely","Sometimes","Always","Never"], correct:2, explanation:"'Always' significa 100% das vezes." },
  { context:"FREQUENCY", text:"\"She ______ has meetings.\" (na maioria das vezes)", options:["Never","Usually","Rarely","Sometimes"], correct:1, explanation:"'Usually' descreve algo que acontece na maioria das vezes." },
  { context:"FREQUENCY", text:"\"They ______ travel for work.\" (poucas vezes)", options:["Always","Often","Rarely","Usually"], correct:2, explanation:"'Rarely' significa que algo acontece poucas vezes." },
  { context:"FREQUENCY", text:"\"He ______ analyzes sales data.\" (toda semana, frequentemente)", options:["Never","Often","Rarely","Sometimes"], correct:1, explanation:"'Often' descreve uma rotina frequente." },
  { context:"A WORKING DAY", text:"O que você faz às 14:00?", options:["Process orders","Start work","Go to a meeting","Have lunch"], correct:0, explanation:"Às 14:00 a agenda mostra 'Process orders'." },
  { context:"FREQUENCY", text:"\"I ______ answer personal calls at work.\" (0% das vezes)", options:["Always","Usually","Often","Never"], correct:3, explanation:"'Never' significa 0% das vezes." },
];

const PHASE4_QUESTIONS = [
  { context:"Your manager sends you 20 emails.", text:"What do you do?", options:["Answer the emails","Go home","Sleep","Ignore everything"], correct:0, explanation:"Um bom profissional responde os e-mails de trabalho." },
  { context:"Um cliente liga para você.", text:"What do you do?", options:["Answer the phone","Analyze sales data","Travel for work","Finish work"], correct:0, explanation:"Quando um cliente liga, você atende o telefone." },
  { context:"São 10:00 e sua reunião começa agora.", text:"What do you do?", options:["Go to the meeting","Write a report","Have lunch","Go home"], correct:0, explanation:"Na hora da reunião, você vai para a reunião." },
  { context:"O prazo do seu relatório é hoje.", text:"What do you do?", options:["Write the report","Call a friend","Take a nap","Ignore the deadline"], correct:0, explanation:"Com prazo hoje, você escreve o relatório." },
  { context:"Um cliente pergunta sobre o pedido dele.", text:"What do you do?", options:["Process and check the order","Sing a song","Close the office","Change jobs"], correct:0, explanation:"Quando perguntam sobre um pedido, você verifica e processa." },
  { context:"São 13:00 e você está com fome.", text:"What do you do?", options:["Have lunch","Start work","Go to a meeting","Write emails"], correct:0, explanation:"13:00 é hora do almoço na agenda." },
  { context:"Você precisa de novas informações para um projeto.", text:"What do you do?", options:["Do research","Take a vacation","Ignore the project","Call in sick"], correct:0, explanation:"Quando você precisa de informações, você faz pesquisa." },
  { context:"São 17:30 e suas tarefas acabaram.", text:"What do you do?", options:["Finish work","Start a new project","Call more clients","Go to another meeting"], correct:0, explanation:"17:30 é quando o dia de trabalho termina." },
];

const CHALLENGE_PHASES = [
  { key:"phase1", label:"PHASE 1 — WHO ARE YOU?", title:"Who Are You?", questions: PHASE1_QUESTIONS, timer:12 },
  { key:"phase2", label:"PHASE 2 — DAILY TASKS", title:"Daily Tasks", questions: PHASE2_QUESTIONS, timer:10 },
  { key:"phase3", label:"FASE 3 — A WORKING DAY", title:"A Working Day", questions: PHASE3_QUESTIONS, timer:10 },
  { key:"phase4", label:"PHASE 4 — WHAT WOULD YOU DO?", title:"What Would You Do?", questions: PHASE4_QUESTIONS, timer:0 },
];

const CLASSROOM_QUESTIONS = [
  ...PHASE1_QUESTIONS,
  ...PHASE2_QUESTIONS.map(q => ({ ...q, context:"COMPLETE THE SENTENCE" })),
  ...PHASE3_QUESTIONS,
  ...PHASE4_QUESTIONS,
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