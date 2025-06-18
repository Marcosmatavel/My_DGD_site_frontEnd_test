const toggleBtn = document.getElementById("toggler");
const managementPanel = document.getElementById("management_side");
const forwardToggle = document.getElementById("first_toggler");
const backwardToggle = document.getElementById("second_toggler");

toggleBtn.addEventListener("click", () => {
    const isActive = managementPanel.classList.toggle("active");

    forwardToggle.style.display = isActive ? "none" : "block";
    backwardToggle.style.display = isActive ? "block" : "none";
});
