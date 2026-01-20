import {
  optionsEl,
  imageEl,
  toggleImgBtn,
  feedbackEl,
  nextBtn
} from "./quiz.js";

import { handleMultiple, handleCodeFill } from "./handlers.js";

export function initRender() {
  toggleImgBtn.onclick = () => {
    const visible = imageEl.style.display === "block";
    imageEl.style.display = visible ? "none" : "block";
    toggleImgBtn.textContent = visible ? "Ver imagen" : "Ocultar imagen";
  };
}

export function resetUI() {
  feedbackEl.textContent = "";
  nextBtn.disabled = true;
  nextBtn.textContent = "Siguiente";
  optionsEl.innerHTML = "";
  imageEl.style.display = "none";
  toggleImgBtn.style.display = "none";
}


export function renderQuestion(q) {
  if (q.image) {
    imageEl.src = q.image;
    toggleImgBtn.style.display = "block";
    toggleImgBtn.textContent = "Ver imagen";
  }

  if (q.type === "multiple") {
    renderMultiple(q);
  }

  if (q.type === "code-fill") {
    renderCodeFill(q);
    nextBtn.textContent = "Responder";
    nextBtn.disabled = false;
  }
}


function renderMultiple(q) {
  q.options.forEach((option, index) => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = option;
    btn.onclick = () => handleMultiple(index, q);
    optionsEl.appendChild(btn);
  });
}

function renderCodeFill(q) {
  const sentence = document.createElement("div");
  sentence.className = "code-fill-sentence";

  const parts = q.template.split("_____");

  parts.forEach((part, index) => {
    sentence.appendChild(document.createTextNode(part));

    if (index < parts.length - 1) {
      const input = document.createElement("input");
      input.className = "code-fill-input";
      input.placeholder = "write here";
      input.dataset.index = index;
      sentence.appendChild(input);
    }
  });

  optionsEl.appendChild(sentence);
}


