
function Game(){
	/*
	The game object will include the world object, the title screen,
	and other stuff.
	*/

	this.state="title_screen";
	this.world=new World();
	this.gui=document.getElementById("gui");
	this.gui.style.width=this.world.camera.canvas.width+"px";
	this.gui.style.height=this.world.camera.canvas.height+"px";
	this.gui.style.border="2px black double";

	this.startMenu=document.getElementById("start_menu");
	this.startMenu.getElementsByTagName("button")[0].addEventListener("click",()=>{this.start();});

	this.pauseMenu=document.getElementById("pause_play");
	this.pauseMenu.getElementsByTagName("button")[0].addEventListener("click",(e)=>{e.preventDefault();this.stop();});
}




Game.prototype.start=function(){
	this.state="playing";
	this.startMenu.style.display="none";
	window.requestAnimationFrame(()=>{this.gameLoop()});
}


Game.prototype.stop=function(){
	this.state="paused";
}

Game.prototype.gameLoop=function(){
	this.world.step();
	if(this.state==="playing"){
		window.requestAnimationFrame(()=>{this.gameLoop()});
	}
}