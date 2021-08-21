
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
	this.startMenu.getElementsByTagName("button")[0].onclick=this.start;
}




Game.prototype.start=function(){
	this.state="playing";		
	this.startMenu.style.display="none";
}


Game.prototype.stop=function(){

}

