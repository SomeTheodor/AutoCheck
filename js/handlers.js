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


export function handleCodeFill(_, q) {
  const inputs = document.querySelectorAll(".code-fill-input");

  // 1. Campo vacío
  for (let input of inputs) {
    if (!input.value.trim()) {
      feedbackEl.textContent = "⚠️ Completá todos los espacios.";
      return;
    }
  }

  setAnswered(true);

  let allCorrect = true;

  inputs.forEach((input, i) => {
    const userValue = input.value.trim().toLowerCase();
    const correctAnswer = Array.isArray(q.answer)
      ? q.answer[i].toLowerCase()
      : q.answer.toLowerCase();

    const ok = userValue === correctAnswer;

    input.classList.add(ok ? "correct" : "incorrect");
    input.disabled = true;

    if (!ok) allCorrect = false;
  });

  if (allCorrect) addScore();

  feedbackEl.textContent = allCorrect
    ? "✔️ Correcto. " + q.feedback
    : `❌ Incorrecto. Respuesta correcta: ${
        Array.isArray(q.answer) ? q.answer.join(" / ") : q.answer
      }. ${q.feedback}`;

  addAnswer({
    question: q.question,
    selected: [...inputs].map(i => i.value),
    correct: q.answer
  });

  nextBtn.disabled = false;
}




export function getAnswerData(a, i) {
  let isCorrect = false;

  // MULTIPLE CHOICE
  if (a.options) {
    isCorrect = a.selected === a.correct;
  }

  // CODE FILL
  else {
    // múltiple blanks
    if (Array.isArray(a.correct)) {
      isCorrect =
        Array.isArray(a.selected) &&
        a.selected.length === a.correct.length &&
        a.selected.every(
          (val, idx) =>
            val.trim().toLowerCase() ===
            a.correct[idx].trim().toLowerCase()
        );
    }
    // un solo blank
    else {
      isCorrect =
        typeof a.selected === "string" &&
        a.selected.trim().toLowerCase() ===
          a.correct.trim().toLowerCase();
    }
  }

  // Mostrar respuestas
  const userAnswer = Array.isArray(a.selected)
    ? a.selected.join(" / ")
    : a.options
      ? a.options[a.selected]
      : a.selected || "—";

  const correctAnswer = Array.isArray(a.correct)
    ? a.correct.join(" / ")
    : a.options
      ? a.options[a.correct]
      : a.correct;

  return `
    <div class="review-item ${isCorrect ? "ok" : "error"}">
      <div class="review-header">
        <span class="review-number">${i + 1}</span>
        <strong>${a.question}</strong>
      </div>

      <div class="review-body">
        <p>
          Tu respuesta:
          <strong>${userAnswer}</strong>
        </p>
        <p>
          Correcta:
          <strong>${correctAnswer}</strong>
        </p>
      </div>
    </div>
  `;
}


