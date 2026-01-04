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

  if (q.type === "multiple") renderMultiple(q);
  if (q.type === "code-fill") renderCodeFill(q);
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
  const pre = document.createElement("pre");
  pre.textContent = q.template;

  const input = document.createElement("input");
  input.placeholder = "Completar código";

  const btn = document.createElement("button");
  btn.textContent = "Responder";
  btn.onclick = () => handleCodeFill(input.value, q);

  optionsEl.append(pre, input, btn);
}
