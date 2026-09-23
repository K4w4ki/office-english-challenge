/* =========================================================
   DAILY TASKS — Business English
   Application logic
   ========================================================= */

(function(){
  "use strict";

  const state = {
    xp: 0,
    level: 1,
    correctTotal: 0,
    answeredTotal: 0,
    bestCombo: 0,
    currentCombo: 0,
    unlockedBadges: new Set(),
    hasResult: false,
    lastResult: null,
  };

  const LEVEL_XP = 1000;
  const LEVEL_NAMES = ["Novato do Escritório","Associado Júnior","Jogador de Time","Associado Sênior","Lenda do Escritório"];

  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  function clamp(n,min,max){ return Math.max(min, Math.min(max,n)); }

  function shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  /* =========================================================
     CHALLENGE STATE (declarado cedo para uso em translate)
     ========================================================= */
  const challenge = {
    phaseIndex: 0,
    questionIndex: 0,
    questions: [],
    timerInterval: null,
    timeLeft: 0,
    answered: false,
    totalQuestionsAllPhases: 0,
    questionsDoneAllPhases: 0,
  };

  /* =========================================================
     TRANSLATE BUTTON — Tradução em tempo real das alternativas
     ========================================================= */
  const translateState = { active: false };

  function getTranslation(enText){
    if(typeof OPTIONS_TRANSLATIONS === "undefined") return enText;
    return OPTIONS_TRANSLATIONS[enText] || enText;
  }

  function applyTranslation(){
    if(!challenge.questions || !challenge.questions.length) return;
    const q = challenge.questions[challenge.questionIndex];
    if(!q) return;

    const btns = $$(".option-btn", $("#optionsGrid"));
    btns.forEach((btn, i)=>{
      const textSpan = btn.querySelector("span:last-child");
      if(!textSpan) return;
      const original = q.options[i];
      textSpan.textContent = translateState.active
        ? getTranslation(original)
        : original;
    });
  }

  function toggleTranslation(){
    translateState.active = !translateState.active;
    const btn = $("#translateBtn");
    if(!btn) return;
    btn.classList.toggle("active", translateState.active);
    btn.setAttribute("aria-pressed", String(translateState.active));
    const label = btn.querySelector(".translate-btn-label");
    if(label) label.textContent = translateState.active ? "PT" : "EN";
    applyTranslation();
  }

  function bindTranslateButton(){
    const btn = $("#translateBtn");
    if(btn && !btn.dataset.bound){
      btn.addEventListener("click", toggleTranslation);
      btn.dataset.bound = "1";
    }
  }


  /* =========================================================
     LANGUAGE SWITCH — tradução por seção (EN | PT): tela inicial e Challenge
     ========================================================= */
  function initLangSwitch(rootSel, switchSel, dict){
    const wrap = $(rootSel);
    const sw = $(switchSel);
    if(!wrap || !sw) return;

    const els = $$("[data-i18n]", wrap);
    els.forEach(el => { el.dataset.en = el.innerHTML; }); // guarda o original em inglês

    const opts = $$(".lang-opt", sw);
    let current = "en";
    let busy = false;

    function setLang(lang){
      if(lang === current || busy) return;
      busy = true;
      current = lang;

      sw.dataset.lang = lang;
      opts.forEach(o => {
        const on = o.dataset.lang === lang;
        o.classList.toggle("active", on);
        o.setAttribute("aria-pressed", String(on));
      });

      // fade out -> troca o texto -> fade in
      wrap.classList.add("lang-swapping");
      setTimeout(() => {
        els.forEach(el => {
          const pt = dict ? dict[el.dataset.i18n] : null;
          el.innerHTML = (lang === "pt" && pt) ? pt : el.dataset.en;
        });
        wrap.classList.remove("lang-swapping");
        busy = false;
      }, 180);
    }

    opts.forEach(o => o.addEventListener("click", () => setLang(o.dataset.lang)));
  }

  /* =========================================================
     INTRO — SEQUÊNCIA MAIS LONGA E DRAMÁTICA
     ========================================================= */
  function playIntro(){
    const intro = $("#intro");
    const step1 = $("#introStep1");
    const step2 = $("#introStep2");
    const step3 = $("#introStep3");
    const skipBtn = $("#skipIntro");

    let finished = false;
    const timers = [];

    function clearTimers(){ timers.forEach(t => clearTimeout(t)); timers.length = 0; }

    function finishIntro(){
      if(finished) return;
      finished = true;
      clearTimers();
      intro.style.transition = "opacity .7s ease";
      intro.style.opacity = "0";
      setTimeout(()=>{
        intro.style.display = "none";
        showWelcome();
      }, 680);
    }

    skipBtn.addEventListener("click", finishIntro);

    step1.classList.add("show");

    timers.push(setTimeout(()=>{
      step1.classList.remove("show"); step1.classList.add("hide");
      step2.classList.add("show");
    }, 1800));

    timers.push(setTimeout(()=>{
      step2.classList.remove("show"); step2.classList.add("hide");
      step3.classList.add("show");
    }, 4400));

    timers.push(setTimeout(finishIntro, 9000));
  }

  function showWelcome(){
    $("#welcome").classList.add("active");
  }

  /* =========================================================
     NAVEGAÇÃO
     ========================================================= */
  function enterApp(){
    $("#welcome").classList.remove("active");
    $("#app").classList.add("active");
    goToView("dashboard");
    renderDashboard();
  }

  function goToView(viewName){
    $$(".view").forEach(v => v.classList.toggle("active", v.dataset.view === viewName));
    $$(".nav-item").forEach(n => n.classList.toggle("active", n.dataset.view === viewName));
    window.scrollTo({top:0, behavior:"smooth"});

    if(viewName === "results") renderResultsView();
    if(viewName === "dashboard") renderDashboard();
    if(viewName === "classroom" && !classroomState.started) initClassroom();
  }

  $$(".nav-item").forEach(btn=>{
    btn.addEventListener("click", ()=> goToView(btn.dataset.view));
  });
  $$("[data-goto]").forEach(btn=>{
    btn.addEventListener("click", ()=> goToView(btn.dataset.goto));
  });

  /* =========================================================
     XP / LEVEL / DASHBOARD
     ========================================================= */
  function addXP(amount){ state.xp += amount; updateTopBar(); }

  function currentLevelInfo(){
    const level = clamp(Math.floor(state.xp / LEVEL_XP) + 1, 1, LEVEL_NAMES.length);
    const xpIntoLevel = state.xp % LEVEL_XP;
    const name = LEVEL_NAMES[level-1];
    return { level, xpIntoLevel, name, xpForNext: LEVEL_XP };
  }

  function updateTopBar(){
    const info = currentLevelInfo();
    $("#topXpValue").textContent = state.xp;
    $("#topLevelValue").textContent = "Lv. " + info.level;
  }

  function renderDashboard(){
    const info = currentLevelInfo();
    $("#levelName").textContent = info.name;
    $("#levelBadge").textContent = "LEVEL " + String(info.level).padStart(2,"0");
    const pct = clamp((info.xpIntoLevel / info.xpForNext) * 100, 0, 100);
    $("#dashXpBarFill").style.width = pct + "%";
    $("#dashXpLabel").textContent = `${info.xpIntoLevel} / ${info.xpForNext} XP`;
    $("#dashXpToNext").textContent = `${info.xpForNext - info.xpIntoLevel} XP to next level`;

    $("#statAccuracy").textContent = state.answeredTotal > 0
      ? Math.round((state.correctTotal / state.answeredTotal) * 100) + "%"
      : "—";
    $("#statStreak").textContent = "x" + Math.max(1, state.bestCombo || 1);
    $("#statCorrect").textContent = state.correctTotal;

    renderBadges();
  }

  function renderBadges(){
    const row = $("#badgesRow");
    row.innerHTML = "";
    BADGES.forEach(b=>{
      const unlocked = state.unlockedBadges.has(b.id);
      const el = document.createElement("div");
      el.className = "badge" + (unlocked ? " unlocked" : "");
      el.innerHTML = `<span class="badge-icon">${b.icon}</span><span>${b.label}</span>`;
      row.appendChild(el);
    });
    const countEl = $("#badgesCount");
    if(countEl) countEl.textContent = `${state.unlockedBadges.size} / ${BADGES.length}`;
  }

  function unlockBadge(id){ state.unlockedBadges.add(id); }

  /* =========================================================
     LEARN VIEW
     ========================================================= */
  function renderLearn(){
    const jobsGrid = $("#jobsGrid");
    jobsGrid.innerHTML = JOBS.map(j => `
      <div class="job-card">
        <span class="job-icon">${j.icon}</span>
        <span class="job-name" data-tr>${j.name}</span>
        <p class="job-desc" data-tr>${j.desc}</p>
        <p class="job-activity" data-tr>"${j.activity}"</p>
      </div>
    `).join("");

    const tasksGrid = $("#tasksGrid");
    tasksGrid.innerHTML = DAILY_TASKS.map(t => `
      <div class="task-card">
        <span class="task-phrase" ${t.pt ? `data-pt="${String(t.pt).replace(/"/g,"&quot;")}"` : ""} data-tr>${t.phrase}</span>
        <span class="task-example" data-tr>"${t.example}"</span>
        ${t.pt ? `<span class="task-pt">🇧🇷 ${t.pt}</span>` : ""}
      </div>
    `).join("");

    const exprGrid = $("#expressionsGrid");
    exprGrid.innerHTML = EXPRESSIONS.map((e,i) => `
      <div class="expr-card" data-idx="${i}">
        <div class="expr-front">
          <span class="expr-icon">💬</span>
          <span class="expr-phrase">${e.phrase}</span>
        </div>
        <span class="expr-hint">Toque para revelar</span>
        <div class="expr-back">
          <span class="expr-meaning">${e.meaning}</span>
          <span class="expr-example" data-tr>"${e.example}"</span>
        </div>
      </div>
    `).join("");
    $$(".expr-card", exprGrid).forEach(card=>{
      card.addEventListener("click", ()=> card.classList.toggle("flipped"));
    });
  }


  /* =========================================================
     LEARN — botão 🌐 EN | PT em cada seção (Jobs, Daily Tasks, Expressions, Grammar)
     Cada seção tem seu próprio idioma. Elementos com data-tr são traduzidos:
     - data-pt="..." → tradução explícita (ex.: campo pt das Daily Tasks)
     - senão procura o texto em LEARN_TRANSLATIONS
     ========================================================= */
  function learnLookup(en){
    if(typeof LEARN_TRANSLATIONS === "undefined") return null;
    const t = en.trim();
    const wrapped = t.length > 1 && t.startsWith('"') && t.endsWith('"');
    const core = wrapped ? t.slice(1, -1) : t;
    const pt = LEARN_TRANSLATIONS[core];
    if(!pt) return null;
    return wrapped ? `"${pt}"` : pt;
  }

  function initLearnLang(){
    $$(".learn-panel").forEach(panel=>{
      const sw = panel.querySelector(".lang-switch");
      if(!sw) return;
      const els = $$("[data-tr]", panel);
      els.forEach(el => { el.dataset.en = el.innerHTML; });
      const opts = $$(".lang-opt", sw);
      panel.dataset.lang = "en";
      let current = "en";
      let busy = false;

      function setLang(lang){
        if(lang === current || busy) return;
        busy = true;
        current = lang;
        panel.dataset.lang = lang;
        sw.dataset.lang = lang;
        opts.forEach(o=>{
          const on = o.dataset.lang === lang;
          o.classList.toggle("active", on);
          o.setAttribute("aria-pressed", String(on));
        });
        panel.classList.add("lang-swapping");
        setTimeout(()=>{
          els.forEach(el=>{
            if(lang === "pt"){
              const pt = el.dataset.pt || learnLookup(el.dataset.en);
              el.innerHTML = pt || el.dataset.en;
            } else {
              el.innerHTML = el.dataset.en;
            }
          });
          panel.classList.remove("lang-swapping");
          busy = false;
        }, 180);
      }
      opts.forEach(o => o.addEventListener("click", ()=> setLang(o.dataset.lang)));
    });
  }

  $$(".subtab").forEach(tab=>{
    tab.addEventListener("click", ()=>{
      $$(".subtab").forEach(t=>t.classList.remove("active"));
      tab.classList.add("active");
      $$(".learn-panel").forEach(p=>p.classList.remove("active"));
      $("#learn-" + tab.dataset.learn).classList.add("active");
    });
  });

  /* =========================================================
     CHALLENGE ENGINE
     ========================================================= */
  function totalChallengeQuestions(){
    return CHALLENGE_PHASES.reduce((sum,p)=> sum + p.questions.length, 0);
  }

  function startChallenge(){
    state.xp = 0;
    state.correctTotal = 0;
    state.answeredTotal = 0;
    state.currentCombo = 0;
    state.bestCombo = 0;
    updateTopBar();

    // Reset do botão de tradução
    translateState.active = false;
    const tBtn = $("#translateBtn");
    if(tBtn){
      tBtn.classList.remove("active");
      const lbl = tBtn.querySelector(".translate-btn-label");
      if(lbl) lbl.textContent = "EN";
    }

    challenge.phaseIndex = 0;
    challenge.questionsDoneAllPhases = 0;
    challenge.totalQuestionsAllPhases = totalChallengeQuestions();

    $("#challengeIntro").classList.add("hidden");
    $("#challengePlay").classList.add("active");

    loadPhase(0, true);
  }

  function loadPhase(index, showTransition){
    challenge.phaseIndex = index;
    challenge.questionIndex = 0;
    const phase = CHALLENGE_PHASES[index];
    challenge.questions = phase.questions;

    if(showTransition){
      const overlay = $("#phaseTransition");
      $("#phaseTransitionNum").textContent = "FASE " + (index+1);
      $("#phaseTransitionTitle").textContent = phase.title;
      overlay.classList.add("show");
      setTimeout(()=>{
        overlay.classList.remove("show");
        renderQuestion();
      }, 1300);
    } else {
      renderQuestion();
    }
  }

  function renderQuestion(){
    const phase = CHALLENGE_PHASES[challenge.phaseIndex];
    const q = challenge.questions[challenge.questionIndex];
    challenge.answered = false;

    $("#hudPhase").textContent = phase.label;
    $("#hudQuestion").textContent = `Question ${challenge.questionIndex+1} / ${challenge.questions.length}`;
    $("#hudXpValue").textContent = state.xp;
    $("#hudCombo").innerHTML = state.currentCombo >= 2
      ? `<span class="combo-tag">${state.currentCombo >= 5 ? "🔥 ON FIRE!" : "COMBO x" + state.currentCombo}</span>`
      : "";

    const overallDone = challenge.questionsDoneAllPhases;
    const overallPct = (overallDone / challenge.totalQuestionsAllPhases) * 100;
    $("#challengeProgressFill").style.width = overallPct + "%";

    $("#questionContext").textContent = q.context || "";
    $("#questionText").textContent = q.text;

    const grid = $("#optionsGrid");
    grid.innerHTML = "";
    const letters = ["A","B","C","D"];
    q.options.forEach((opt, i)=>{
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
      btn.addEventListener("click", ()=> handleAnswer(i, q, btn));
      grid.appendChild(btn);
    });

    // Reaplica tradução se o botão estiver ativo
    if(translateState.active) applyTranslation();

    $("#feedbackBox").innerHTML = "";
    $("#feedbackBox").classList.remove("show");

    startTimer(phase.timer, q);
  }

  function startTimer(seconds, q){
    clearInterval(challenge.timerInterval);
    const timerEl = $("#hudTimer");
    if(!seconds || seconds <= 0){
      timerEl.style.display = "none";
      return;
    }
    timerEl.style.display = "flex";
    timerEl.classList.remove("low");
    challenge.timeLeft = seconds;
    $("#hudTimerValue").textContent = challenge.timeLeft;

    challenge.timerInterval = setInterval(()=>{
      challenge.timeLeft--;
      $("#hudTimerValue").textContent = Math.max(challenge.timeLeft,0);
      if(challenge.timeLeft <= 3) timerEl.classList.add("low");
      if(challenge.timeLeft <= 0){
        clearInterval(challenge.timerInterval);
        if(!challenge.answered) handleTimeout(q);
      }
    }, 1000);
  }

  function handleTimeout(q){
    challenge.answered = true;
    state.answeredTotal++;
    state.currentCombo = 0;

    $$(".option-btn", $("#optionsGrid")).forEach((btn,i)=>{
      btn.disabled = true;
      if(i === q.correct) btn.classList.add("correct");
      else btn.classList.add("dim");
    });

    showFeedback(false, q, true);
  }

  function handleAnswer(selectedIndex, q, btnEl){
    if(challenge.answered) return;
    challenge.answered = true;
    clearInterval(challenge.timerInterval);

    const isCorrect = selectedIndex === q.correct;
    state.answeredTotal++;

    const allBtns = $$(".option-btn", $("#optionsGrid"));
    allBtns.forEach((btn,i)=>{
      btn.disabled = true;
      if(i === q.correct) btn.classList.add("correct");
      else if(i === selectedIndex) btn.classList.add("incorrect");
      else btn.classList.add("dim");
    });

    if(isCorrect){
      state.correctTotal++;
      state.currentCombo++;
      state.bestCombo = Math.max(state.bestCombo, state.currentCombo);
      addXP(100);
      unlockBadge("first_correct");
      if(state.currentCombo >= 3) unlockBadge("combo3");
      $("#hudCombo").innerHTML = state.currentCombo >= 2
        ? `<span class="combo-tag">${state.currentCombo >= 5 ? "🔥 ON FIRE!" : "COMBO x" + state.currentCombo}</span>`
        : "";
      $("#hudXpValue").textContent = state.xp;
    } else {
      state.currentCombo = 0;
      $("#hudCombo").innerHTML = "";
    }

    showFeedback(isCorrect, q, false);
  }

  function showFeedback(isCorrect, q, timedOut){
    const box = $("#feedbackBox");
    const headClass = isCorrect ? "correct" : "incorrect";
    const headText = timedOut ? "⏱ TIME'S UP!" : (isCorrect ? "✓ CORRECT!" : "✕ NOT QUITE!");
    box.innerHTML = `
      <div class="feedback-head ${headClass}">${headText}</div>
      <p class="feedback-text">${q.explanation}</p>
      ${isCorrect ? `<p class="feedback-xp">+100 XP</p>` : ""}
      <div class="feedback-next">
        <button class="btn btn-primary" id="nextQuestionBtn">
          <span>${isLastQuestionOverall() ? "View results" : "Next question"}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    `;
    box.classList.add("show");
    $("#nextQuestionBtn").addEventListener("click", advanceQuestion);
  }

  function isLastQuestionOverall(){
    const isLastInPhase = challenge.questionIndex === challenge.questions.length - 1;
    const isLastPhase = challenge.phaseIndex === CHALLENGE_PHASES.length - 1;
    return isLastInPhase && isLastPhase;
  }

  function advanceQuestion(){
    challenge.questionsDoneAllPhases++;
    const isLastInPhase = challenge.questionIndex === challenge.questions.length - 1;

    if(isLastInPhase){
      unlockBadge("phase_complete");
      const isLastPhase = challenge.phaseIndex === CHALLENGE_PHASES.length - 1;
      if(isLastPhase){ finishChallenge(); return; }
      else { loadPhase(challenge.phaseIndex + 1, true); return; }
    } else {
      challenge.questionIndex++;
      renderQuestion();
    }
  }

  function finishChallenge(){
    clearInterval(challenge.timerInterval);
    $("#challengePlay").classList.remove("active");

    const accuracy = state.answeredTotal > 0
      ? Math.round((state.correctTotal / state.answeredTotal) * 100)
      : 0;

    if(accuracy === 100) unlockBadge("perfect");
    unlockBadge("challenge_complete");

    state.hasResult = true;
    state.lastResult = { xp: state.xp, accuracy, combo: state.bestCombo };

    $("#challengeIntro").classList.remove("hidden");
    launchConfetti();
    goToView("results");
  }

  $("#startChallengeBtn").addEventListener("click", ()=>{
    enterApp();
    goToView("challenge");
  });
  $("#beginChallengeBtn").addEventListener("click", startChallenge);
  $("#playAgainBtn").addEventListener("click", ()=>{ goToView("challenge"); });

  /* =========================================================
     RESULTS VIEW
     ========================================================= */
  function getRank(xp){
    return RANKS.find(r => xp >= r.min && xp <= r.max) || RANKS[RANKS.length-1];
  }

  function renderResultsView(){
    const empty = $("#resultsEmpty");
    const full = $("#resultsFull");

    if(!state.hasResult){
      empty.classList.add("active");
      full.classList.remove("active");
      return;
    }
    empty.classList.remove("active");
    full.classList.add("active");

    const r = state.lastResult;
    const rank = getRank(r.xp);

    $("#resultScore").textContent = r.xp + " XP";
    $("#resultAccuracy").textContent = r.accuracy + "%";
    $("#resultCombo").textContent = "x" + Math.max(1, r.combo);
    $("#resultRank").textContent = rank.title;
    $("#resultsHeadline").textContent = "Congratulations!";
    $("#resultsMsg1").textContent = rank.message;
    $("#resultsMsg2").textContent = "But tomorrow… there's a meeting.";
  }

  /* =========================================================
     CLASSROOM MODE
     ========================================================= */
  const classroomState = { started:false, index:0, scoreA:0, scoreB:0, questions:[], revealed:false, awarded:null };
  const CLASSROOM_POINTS = 100;
  let classroomLang = "en"; // idioma das alternativas no Classroom (mantido entre perguntas)

  // Mostra as alternativas em inglês ou português conforme o idioma atual
  function paintClassroomOptions(){
    const q = classroomState.questions[classroomState.index];
    if(!q) return;
    $$(".option-btn", $("#classroomOptionsGrid")).forEach((el,i)=>{
      const span = el.querySelector("span:last-child");
      if(!span) return;
      span.textContent = classroomLang === "pt" ? getTranslation(q.options[i]) : q.options[i];
    });
  }

  function setClassroomLang(lang){
    if(lang === classroomLang) return;
    classroomLang = lang;
    const sw = $("#classroomLangSwitch");
    sw.dataset.lang = lang;
    $$(".lang-opt", sw).forEach(o=>{
      const on = o.dataset.lang === lang;
      o.classList.toggle("active", on);
      o.setAttribute("aria-pressed", String(on));
    });
    const grid = $("#classroomOptionsGrid");
    grid.classList.add("lang-swapping");
    setTimeout(()=>{
      paintClassroomOptions();
      grid.classList.remove("lang-swapping");
    }, 180);
  }

  $$("#classroomLangSwitch .lang-opt").forEach(o=>{
    o.addEventListener("click", ()=> setClassroomLang(o.dataset.lang));
  });

  function initClassroom(){
    classroomState.started = true;
    classroomState.index = 0;
    classroomState.scoreA = 0;
    classroomState.scoreB = 0;
    // Embaralha a ordem das perguntas e também das alternativas
    // (na Fase 4 a resposta certa era sempre a letra A)
    classroomState.questions = shuffle(CLASSROOM_QUESTIONS).map(q=>{
      const order = shuffle(q.options.map((_,i)=>i));
      return { ...q, options: order.map(i=>q.options[i]), correct: order.indexOf(q.correct) };
    });
    updateClassroomScores();
    $("#classroomWinner").classList.remove("show");
    renderClassroomQuestion();
  }

  function renderClassroomQuestion(){
    if(classroomState.index >= classroomState.questions.length) classroomState.index = 0;
    const q = classroomState.questions[classroomState.index];
    classroomState.revealed = false;
    classroomState.awarded = null;

    $("#classroomProgress").textContent = `Question ${classroomState.index+1} / ${classroomState.questions.length}`;
    $("#classroomContext").textContent = q.context || "";
    $("#classroomQuestionText").textContent = q.text;

    const grid = $("#classroomOptionsGrid");
    grid.innerHTML = "";
    grid.classList.remove("revealed");
    const exp = $("#classroomExplanation");
    exp.classList.remove("show");
    exp.textContent = "";

    const letters = ["A","B","C","D"];
    q.options.forEach((opt,i)=>{
      const div = document.createElement("div");
      div.className = "option-btn";
      div.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
      grid.appendChild(div);
    });
    paintClassroomOptions();
    updateClassroomControls();
  }

  function revealClassroomAnswer(){
    if(classroomState.revealed) return;
    classroomState.revealed = true;
    const q = classroomState.questions[classroomState.index];
    const grid = $("#classroomOptionsGrid");
    grid.classList.add("revealed");
    $$(".option-btn", grid).forEach((el,i)=>{
      if(i === q.correct) el.classList.add("correct");
    });
    if(q.explanation){
      const exp = $("#classroomExplanation");
      exp.textContent = "💡 " + q.explanation;
      exp.classList.add("show");
    }
    updateClassroomControls();
  }

  function updateClassroomControls(){
    const st = classroomState;
    const locked = !!st.awarded;
    $("#teamACorrectBtn").disabled = locked;
    $("#teamBCorrectBtn").disabled = locked;
    $("#classroomNoneBtn").disabled = locked;
    $("#classroomUndoBtn").disabled = !locked;
    const rb = $("#classroomRevealBtn");
    rb.disabled = st.revealed;
    rb.querySelector("span").textContent = st.revealed ? "✅ RESPOSTA REVELADA" : "👁️ REVELAR RESPOSTA";
  }

  function updateClassroomScores(){
    $("#teamAScore").textContent = classroomState.scoreA;
    $("#teamBScore").textContent = classroomState.scoreB;
  }

  function bumpScore(el){
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  }

  // Marca o ponto (ou "ninguém") uma única vez por pergunta e já revela a resposta
  function awardClassroom(team){
    if(classroomState.awarded) return;
    classroomState.awarded = team;
    if(team === "A"){ classroomState.scoreA += CLASSROOM_POINTS; updateClassroomScores(); bumpScore($("#teamAScore")); }
    if(team === "B"){ classroomState.scoreB += CLASSROOM_POINTS; updateClassroomScores(); bumpScore($("#teamBScore")); }
    revealClassroomAnswer();
    updateClassroomControls();
  }

  // Desfaz a marcação (caso clique no time errado)
  function undoClassroomAward(){
    const t = classroomState.awarded;
    if(!t) return;
    if(t === "A"){ classroomState.scoreA -= CLASSROOM_POINTS; }
    if(t === "B"){ classroomState.scoreB -= CLASSROOM_POINTS; }
    classroomState.awarded = null;
    updateClassroomScores();
    updateClassroomControls();
  }

  function nextClassroomQuestion(){
    classroomState.index++;
    if(classroomState.index >= classroomState.questions.length) showClassroomWinner();
    else renderClassroomQuestion();
  }

  $("#classroomRevealBtn").addEventListener("click", revealClassroomAnswer);
  $("#teamACorrectBtn").addEventListener("click", ()=> awardClassroom("A"));
  $("#teamBCorrectBtn").addEventListener("click", ()=> awardClassroom("B"));
  $("#classroomNoneBtn").addEventListener("click", ()=> awardClassroom("none"));
  $("#classroomUndoBtn").addEventListener("click", undoClassroomAward);
  $("#classroomNextBtn").addEventListener("click", nextClassroomQuestion);
  $("#classroomResetBtn").addEventListener("click", initClassroom);
  $("#classroomPlayAgainBtn").addEventListener("click", initClassroom);

  // Atalhos de teclado para quem apresenta
  document.addEventListener("keydown", (e)=>{
    const view = $("#view-classroom");
    if(!view || !view.classList.contains("active")) return;
    if($("#classroomWinner").classList.contains("show")) return;
    if(e.ctrlKey || e.metaKey || e.altKey) return;
    if(e.target.closest && e.target.closest("input, textarea, select")) return;
    const onButton = e.target.closest && e.target.closest("button");
    if(onButton && (e.key === " " || e.key === "Enter")) return; // deixa o botão focado agir sozinho

    switch(e.key){
      case " ": case "r": case "R": e.preventDefault(); revealClassroomAnswer(); break;
      case "1": awardClassroom("A"); break;
      case "2": awardClassroom("B"); break;
      case "0": awardClassroom("none"); break;
      case "u": case "U": undoClassroomAward(); break;
      case "n": case "N": case "ArrowRight": nextClassroomQuestion(); break;
      case "t": case "T": setClassroomLang(classroomLang === "en" ? "pt" : "en"); break;
    }
  });

  function showClassroomWinner(){
    const winnerBox = $("#classroomWinner");
    let subText;
    if(classroomState.scoreA === classroomState.scoreB) subText = "EMPATE!";
    else if(classroomState.scoreA > classroomState.scoreB) subText = "TIME A VENCEU!";
    else subText = "TIME B VENCEU!";
    $("#classroomWinnerSub").textContent = subText;
    winnerBox.classList.add("show");
    launchConfetti();
  }

  /* =========================================================
     ABOUT MODAL
     ========================================================= */
  $("#aboutBtn").addEventListener("click", ()=> $("#aboutModal").classList.add("show"));
  $("#aboutModalClose").addEventListener("click", ()=> $("#aboutModal").classList.remove("show"));
  $("#aboutModal").addEventListener("click", (e)=>{
    if(e.target.id === "aboutModal") $("#aboutModal").classList.remove("show");
  });

  /* =========================================================
     CONFETTI FX
     ========================================================= */
  function launchConfetti(){
    const layer = $("#fxLayer");
    const colors = ["#3B82F6","#8B5CF6","#EC4899","#10B981","#F59E0B"];
    const count = 80;
    for(let i=0;i<count;i++){
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random()*100 + "vw";
      piece.style.background = colors[Math.floor(Math.random()*colors.length)];
      piece.style.animationDuration = (2.4 + Math.random()*1.8) + "s";
      piece.style.animationDelay = (Math.random()*0.5) + "s";
      piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
      layer.appendChild(piece);
      setTimeout(()=> piece.remove(), 5000);
    }
  }

  /* =========================================================
     INIT
     ========================================================= */
  function init(){
    renderLearn();
    updateTopBar();
    bindTranslateButton();
    initLearnLang();
    initLangSwitch("#welcome", "#welcomeLangSwitch",
      typeof WELCOME_TRANSLATIONS !== "undefined" ? WELCOME_TRANSLATIONS : null);
    initLangSwitch("#challengeIntro", "#challengeLangSwitch",
      typeof CHALLENGE_TRANSLATIONS !== "undefined" ? CHALLENGE_TRANSLATIONS : null);
    playIntro();
    initFakeScrollbar();
  }

  function initFakeScrollbar(){
    const bar = document.getElementById("fakeScrollbar");
    const thumb = document.getElementById("fakeScrollbarThumb");
    if(!bar || !thumb){
      console.warn("Fake scrollbar: elementos não encontrados.");
      return;
    }

    let idleTimer = null;
    let rafPending = false;

    function update(){
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const winHeight = window.innerHeight;

      if(docHeight <= winHeight + 4){
        thumb.style.opacity = "0";
        return;
      }
      thumb.style.opacity = "";

      const thumbRatio = winHeight / docHeight;
      const thumbHeight = Math.max(thumbRatio * winHeight, 40);
      const maxTop = winHeight - thumbHeight - 8;
      const scrollRatio = scrollTop / Math.max(docHeight - winHeight, 1);
      const thumbTop = scrollRatio * maxTop + 4;

      thumb.style.height = thumbHeight + "px";
      thumb.style.top = thumbTop + "px";
    }

    function scheduleUpdate(){
      if(rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        update();
      });
    }

    function onScroll(){
      scheduleUpdate();
      bar.classList.add("scrolling");
      bar.classList.remove("idle");
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        bar.classList.remove("scrolling");
        bar.classList.add("idle");
      }, 900);
    }

    let dragging = false;
    let startY = 0;
    let startScrollTop = 0;

    thumb.addEventListener("mousedown", (e) => {
      dragging = true;
      startY = e.clientY;
      startScrollTop = window.scrollY;
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if(!dragging) return;
      const delta = e.clientY - startY;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const winHeight = window.innerHeight;
      const ratio = (docHeight - winHeight) / (winHeight - 40);
      window.scrollTo(0, startScrollTop + delta * ratio);
    });

    document.addEventListener("mouseup", () => {
      if(!dragging) return;
      dragging = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    });

    bar.addEventListener("click", (e) => {
      if(e.target === thumb) return;
      const clickY = e.clientY;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const winHeight = window.innerHeight;
      const ratio = clickY / winHeight;
      window.scrollTo({
        top: ratio * (docHeight - winHeight),
        behavior: "smooth"
      });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);

    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"]
    });

    setTimeout(update, 100);
    setTimeout(update, 600);
    setTimeout(update, 1500);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
