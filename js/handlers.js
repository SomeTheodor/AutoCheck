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
  setAnswered(true);

  const ok =
    value.trim().toLowerCase() === q.answer.toLowerCase();

  if (ok) addScore();

  feedbackEl.textContent = ok
    ? "✔️ Correcto. " + q.feedback
    : `❌ Incorrecto. Respuesta correcta: ${q.answer}. ${q.feedback}`;

  addAnswer({
    question: q.question,
    selected: value,
    correct: q.answer
  });

  nextBtn.disabled = false;
}

export function getAnswerData(a, i) {
  if (a.options) {
    return `
      <p>
        <strong>${i + 1}. ${a.question}</strong><br>
        Tu respuesta: ${a.options[a.selected]}<br>
        Correcta: ${a.options[a.correct]}
      </p>
    `;
  }

  return `
    <p>
      <strong>${i + 1}. ${a.question}</strong><br>
      Tu respuesta: ${a.selected}<br>
      Correcta: ${a.correct}
    </p>
  `;
}

