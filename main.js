let canvas=document.getElementById("canvas");
let context=canvas.getContext("2d");





function loop(){
	window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);