let canvas=document.getElementById("canvas");
let context=canvas.getContext("2d");

let world=new World();



function loop(){
	world.step();
	window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);