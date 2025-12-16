const params = new URLSearchParams(window.location.search);
const quizId = params.get("quiz");

let questions = [];
let currentQuestion = 0;
let score = 0;

if (!quizId) {
  alert("No se seleccionó ningún quiz");
}

document.getElementById("quizTitle").textContent =
  "Quiz: " + quizId.toUpperCase();

fetch(`data/${quizId}.json`)
  .then(res => res.json())
  .then(data => {
    questions = data;
    loadQuestion();
  })
  .catch(err => {
    console.error("Error cargando el quiz:", err);
  });


    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const feedbackEl = document.getElementById("feedback");
    const nextBtn = document.getElementById("nextBtn");
    const imageEl = document.getElementById("questionImage");
    const toggleImgBtn = document.getElementById("toggleImg");

    function loadQuestion() {
      const q = questions[currentQuestion];
      questionEl.textContent = q.question;

      feedbackEl.textContent = "";
      nextBtn.disabled = true;

      optionsEl.innerHTML = "";

      if (q.image) {
        imageEl.src = q.image;
        imageEl.style.display = "none";
        toggleImgBtn.style.display = "block";
        toggleImgBtn.textContent = "Ver imagen";
      } else {
        imageEl.style.display = "none";
        toggleImgBtn.style.display = "none";
      }

      q.options.forEach((option, index) => {
        const btn = document.createElement("div");
        btn.className = "option";
        btn.textContent = option;
        btn.onclick = () => selectOption(index);
        optionsEl.appendChild(btn);
      });
    }

    toggleImgBtn.onclick = () => {
      if (imageEl.style.display === "none") {
        imageEl.style.display = "block";
        toggleImgBtn.textContent = "Ocultar imagen";
      } else {
        imageEl.style.display = "none";
        toggleImgBtn.textContent = "Ver imagen";
      }
    };

    function selectOption(index) {
      const q = questions[currentQuestion];
      const options = document.querySelectorAll(".option");

      if (index === q.correctIndex) score++;

      options.forEach((btn, i) => {
        btn.onclick = null;
        if (i === q.correctIndex) btn.classList.add("correct");
        else if (i === index) btn.classList.add("incorrect");
      });

      feedbackEl.textContent = q.feedback;
      nextBtn.disabled = false;
    }

    nextBtn.onclick = () => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        questionEl.textContent = "¡Quiz finalizado!";
        optionsEl.innerHTML = "";
        imageEl.style.display = "none";
        toggleImgBtn.style.display = "none";

        const percentage = Math.round((score / questions.length) * 100);
        feedbackEl.innerHTML =
          `Puntaje: <strong>${score}</strong> / ${questions.length}<br>
           Resultado: <strong>${percentage}%</strong>`;

        nextBtn.style.display = "none";
      }
    };