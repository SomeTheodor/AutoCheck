import {
  addScore,
  addAnswer,
  feedbackEl,
  nextBtn,
  setAnswered
} from "./quiz.js";


export function handleMultiple(index, q) {
  setAnswered(true);

  const options = document.querySelectorAll(".option");

  if (index === q.correctIndex) addScore();

  options.forEach((btn, i) => {
    btn.onclick = null;
    if (i === q.correctIndex) btn.classList.add("correct");
    else if (i === index) btn.classList.add("incorrect");
  });

  addAnswer({
    question: q.question,
    selected: index,
    correct: q.correctIndex,
    options: q.options
  });

  feedbackEl.textContent = q.feedback;
  nextBtn.disabled = false;
}


export function handleCodeFill(value, q) {
  // 1. Validación: campo vacío
  if (!value.trim()) {
    feedbackEl.textContent = "⚠️ Por favor, complete la respuesta.";
    return;
  }

  // 2. Marcar como respondida
  setAnswered(true);

  const input = document.querySelector(".code-fill-input");
  const btn = document.querySelector(".primary-btn");

  const ok =
    value.trim().toLowerCase() === q.answer.toLowerCase();

  if (ok) addScore();

  // 3. Bloquear interacción
  if (input) input.disabled = true;
  if (btn) btn.disabled = true;

  // 4. Feedback visual
  if (input) {
    input.classList.add(ok ? "correct" : "incorrect");
  }

  // 5. Texto de feedback
  feedbackEl.textContent = ok
    ? "✔️ Correcto. " + q.feedback
    : `❌ Incorrecto. Respuesta correcta: ${q.answer}. ${q.feedback}`;

  // 6. Guardar respuesta
  addAnswer({
    question: q.question,
    selected: value,
    correct: q.answer
  });

  // 7. Habilitar siguiente
  nextBtn.disabled = false;
}



export function getAnswerData(a, i) {
  const isCorrect = a.options
    ? a.selected === a.correct
    : a.selected?.trim().toLowerCase() === a.correct.toLowerCase();

  return `
    <div class="review-item ${isCorrect ? "ok" : "error"}">
      <div class="review-header">
        <span class="review-number">${i + 1}</span>
        <strong>${a.question}</strong>
      </div>

      <div class="review-body">
        <p>
          Tu respuesta:
          <strong>${a.options ? a.options[a.selected] || "—" : a.selected || "—"}</strong>
        </p>
        <p>
          Correcta:
          <strong>${a.options ? a.options[a.correct] : a.correct}</strong>
        </p>
      </div>
    </div>
  `;
}

