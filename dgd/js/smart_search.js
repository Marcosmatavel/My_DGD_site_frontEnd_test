const searchInput = document.getElementById("search_input");
const topicListItems = document.querySelectorAll("#topic-list li");

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    topicListItems.forEach(item => {
        const isVisible = item.textContent.toLowerCase().includes(value);
        item.style.display = isVisible ? "block" : "none";
    });
});
