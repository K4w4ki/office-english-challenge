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

    // ⏱️ TIMINGS MAIS LONGOS — intro agora dura ~9s no total
    // Step 1: "A project by" — 1.8s
    step1.classList.add("show");

    // Step 2: Nomes — entra aos 1.8s, fica 2.6s
    timers.push(setTimeout(()=>{
      step1.classList.remove("show"); step1.classList.add("hide");
      step2.classList.add("show");
    }, 1800));

    // Step 3: Título principal — entra aos 4.4s, fica 4.6s
    timers.push(setTimeout(()=>{
      step2.classList.remove("show"); step2.classList.add("hide");
      step3.classList.add("show");
    }, 4400));

    // Finalização — 9s
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
        <span class="job-name">${j.name}</span>
        <p class="job-desc">${j.desc}</p>
        <p class="job-activity">"${j.activity}"</p>
      </div>
    `).join("");

    const tasksGrid = $("#tasksGrid");
    tasksGrid.innerHTML = DAILY_TASKS.map(t => `
      <div class="task-card">
        <span class="task-phrase">${t.phrase}</span>
        <span class="task-example">"${t.example}"</span>
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
          <span class="expr-example">"${e.example}"</span>
        </div>
      </div>
    `).join("");
    $$(".expr-card", exprGrid).forEach(card=>{
      card.addEventListener("click", ()=> card.classList.toggle("flipped"));
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
  const classroomState = { started:false, index:0, scoreA:0, scoreB:0, questions:[] };

  function initClassroom(){
    classroomState.started = true;
    classroomState.index = 0;
    classroomState.scoreA = 0;
    classroomState.scoreB = 0;
    classroomState.questions = shuffle(CLASSROOM_QUESTIONS);
    updateClassroomScores();
    $("#classroomWinner").classList.remove("show");
    renderClassroomQuestion();
  }

  function renderClassroomQuestion(){
    if(classroomState.index >= classroomState.questions.length) classroomState.index = 0;
    const q = classroomState.questions[classroomState.index];
    $("#classroomProgress").textContent = `Question ${classroomState.index+1} / ${classroomState.questions.length}`;
    $("#classroomContext").textContent = q.context || "";
    $("#classroomQuestionText").textContent = q.text;

    const grid = $("#classroomOptionsGrid");
    grid.innerHTML = "";
    const letters = ["A","B","C","D"];
    q.options.forEach((opt,i)=>{
      const div = document.createElement("div");
      div.className = "option-btn";
      div.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
      grid.appendChild(div);
    });
  }

  function revealClassroomAnswer(){
    const q = classroomState.questions[classroomState.index];
    $$(".option-btn", $("#classroomOptionsGrid")).forEach((el,i)=>{
      if(i === q.correct) el.classList.add("correct");
    });
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

  $("#teamACorrectBtn").addEventListener("click", ()=>{
    classroomState.scoreA += 100;
    updateClassroomScores(); bumpScore($("#teamAScore"));
    revealClassroomAnswer();
  });
  $("#teamBCorrectBtn").addEventListener("click", ()=>{
    classroomState.scoreB += 100;
    updateClassroomScores(); bumpScore($("#teamBScore"));
    revealClassroomAnswer();
  });
  $("#classroomNextBtn").addEventListener("click", ()=>{
    classroomState.index++;
    if(classroomState.index >= classroomState.questions.length) showClassroomWinner();
    else renderClassroomQuestion();
  });
  $("#classroomResetBtn").addEventListener("click", initClassroom);
  $("#classroomPlayAgainBtn").addEventListener("click", initClassroom);

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

      // Se a página é menor que a tela, esconde a barra
      if(docHeight <= winHeight + 4){
        thumb.style.opacity = "0";
        return;
      }
      thumb.style.opacity = "";

      // Proporção visível
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

    // 🖱️ Arrastar a thumb
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
      const ratio = (docHeight - winHeight) / (winHeight - 40); // thumb altura min 40
      window.scrollTo(0, startScrollTop + delta * ratio);
    });

    document.addEventListener("mouseup", () => {
      if(!dragging) return;
      dragging = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    });

    // 🖱️ Clique na track (fora da thumb) = pula
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

    // 🔄 Eventos
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("load", scheduleUpdate);

    // 🔁 Observa mudanças no DOM (troca de views, modal, etc.)
    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"]
    });

    // 🚀 Primeira renderização (após o layout)
    setTimeout(update, 100);
    setTimeout(update, 600);
    setTimeout(update, 1500);
  }
  
  document.addEventListener("DOMContentLoaded", init);
})();
