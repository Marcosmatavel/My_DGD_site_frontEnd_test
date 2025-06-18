document.addEventListener("DOMContentLoaded", function (){
	let txt = document.getElementById("arrow_text");
	txt.addEventListener("mouseenter", function (){
		txt.innerText = "Start your journey here ↓";
	});

	txt.addEventListener("mouseleave", function (){
		txt.innerText = "Start your journer here";
	});
});