const today = new Date().toISOString().split('T')[0];
document.getElementById("date").textContent = today;

fetch(`puzzles/${today}.json`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("puzzles");
    const levels = ["easy", "medium", "hard"];

    levels.forEach(level => {
      const puzzle = data.puzzles[level];
      const card = document.createElement("div");
      card.className = "puzzle-card";

      card.innerHTML = `
        <h2>${level.toUpperCase()} – ${puzzle.title}</h2>
        <p><strong>Type:</strong> ${puzzle.type}</p>
        <p>${puzzle.question}</p>
        <button onclick="this.nextElementSibling.style.display='block'; this.remove()">Reveal Answer</button>
        <p style="display:none"><strong>Answer:</strong> ${puzzle.answer}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById("puzzles").innerHTML = "<p>No puzzle found for today.</p>";
  });
