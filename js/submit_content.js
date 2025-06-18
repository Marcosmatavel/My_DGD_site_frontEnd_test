document.getElementById("ai-question").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const question = this.value.trim();
    if (question) {
      askAI(question);
      this.value = "";
    }
  }
});

async function askAI(question) {
  const responseBox = document.getElementById("ai-response");
  responseBox.innerHTML = "Thinking...";

  try {
    const res = await fetch("/ask-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    responseBox.innerHTML = `<p>${data.answer}</p>`;
  } catch (err) {
    responseBox.innerHTML = "Error: Unable to reach the AI.";
  }
}

aiInput.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
});
