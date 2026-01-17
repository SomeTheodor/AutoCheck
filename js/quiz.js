import { renderQuestion, resetUI, initRender } from "./render.js";
import { getAnswerData } from "./handlers.js";

const params = new URLSearchParams(window.location.search);
export const quizId = params.get("quiz");

export let questions = [];
export let currentQuestion = 0;
export let score = 0;
export let answers = [];
export let answered = false;

export function setAnswered(value) {
  answered = value;
}
export function addScore() {
  score++;
}

export function addAnswer(answer) {
  answers.push(answer);
}

if (!quizId) alert("No se seleccionó ningún quiz");

// Helper
export const $ = id => document.getElementById(id);

// Elementos
export const questionEl = $("question");
export const optionsEl = $("options");
export const feedbackEl = $("feedback");
export const nextBtn = $("nextBtn");
export const imageEl = $("questionImage");
export const toggleImgBtn = $("toggleImg");
export const progressEl = $("progress");
export const quizTitleEl = $("quizTitle");

quizTitleEl.textContent = "Quiz: " + quizId.toUpperCase();

// Cargar preguntas
fetch(`data/${quizId}.json`)
  .then(res => res.json())
  .then(data => {
    questions = data;
    initRender();      
    loadQuestion();
  });


export function loadQuestion() {
  answered = false;
  resetUI();

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;

  progressEl.textContent =
    `Pregunta ${currentQuestion + 1} de ${questions.length}`;

  renderQuestion(q);
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
  }
};

function finishQuiz() {
  optionsEl.innerHTML = "";
  progressEl.textContent = "";
  nextBtn.style.display = "none";

  const percentage = Math.round((score / questions.length) * 100);

  localStorage.setItem(
    `quiz_${quizId}_lastScore`,
    JSON.stringify({
      score,
      total: questions.length,
      percentage,
      date: new Date().toLocaleString()
    })
  );

  let html = `
  <div class="result-card">
    <h3>Resultado final</h3>
    <p class="score">
      ${score} / ${questions.length}
    </p>
    <p class="percentage">
      ${percentage}%
    </p>
  </div>

  <h4 class="review-title">Revisión</h4>
`;

  answers.forEach((a, i) => {
    html += getAnswerData(a, i);
  });

  feedbackEl.innerHTML = html;
}
