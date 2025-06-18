document.addEventListener("DOMContentLoaded", () => {
    const sideBarAi = document.getElementById("aiToggle");
    const aiSection = document.getElementById("aiSection");
    let position = 0;

    
    // Toggle AIsidebar
    sideBarAi.addEventListener("click", () => {
      if (position == 0){
        aiSection.classList.add("active");
        position = 1;
      }else{
        aiSection.classList.remove("active");
        position = 0;
      }
    });  

});