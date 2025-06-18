document.addEventListener("DOMContentLoaded", function () {
	let txt = document.getElementById("link_sign");
	txt.addEventListener("mouseenter", function () {
		txt.innerText = " 🔗 Marcos Eduardo Matavel ©®";
	});

	txt.addEventListener("mouseleave", function () {
		txt.innerText = "Marcos Eduardo Matavel©®";
	});
}); 