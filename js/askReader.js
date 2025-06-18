const askInput = document.getElementById("askSection");
askInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const question = askInput.value;
        const content = document.getElementById("content").innerText;

        fetch('/ask-ai/', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question: question,
                content: content
            })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById("answerSection").innerText = data.response;
        });
    }
});
