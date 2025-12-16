fetch("data/quizzes.json")
  .then(res => res.json())
  .then(quizzes => {
    const container = document.getElementById("quizList");

    quizzes.forEach(q => {
      const div = document.createElement("div");
      div.className = "quiz";

      div.innerHTML = `
        <strong>${q.title}</strong>
        <small>${q.description}</small>
      `;

      div.onclick = () => {
        window.location.href = `quiz.html?quiz=${q.id}`;
      };

      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Error cargando el menú:", err);
  });
