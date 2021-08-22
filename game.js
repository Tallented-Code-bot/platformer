
function Game(){
	/*
	The game object will include the world object, the title screen,
	and other stuff.
	*/

	this.state="title_screen";
	this.world=new World();

	this.input=new Input();
	this.input.init(this.world.camera.canvas);

	this.gui=document.getElementById("gui");
	this.gui.style.width=this.world.camera.canvas.width+"px";
	this.gui.style.height=this.world.camera.canvas.height+"px";
	this.gui.style.border="2px black double";

	this.startMenu=document.getElementById("start_menu");

	this.pauseMenu=document.getElementById("pause_play");
	this.pauseMenu.getElementsByTagName("button")[0].addEventListener("click",(e)=>{e.preventDefault();this.stop();});

	this.startButton=document.querySelector("#start_menu button");
	this.startButton.addEventListener("click",(e)=>{this.start();});


	this.fileInput=document.querySelector("#start_menu input");
	this.fileInput.addEventListener("change",(event)=>{
		const fileList=Array.from(event.target.files);
		fileList.forEach((file)=>{
			const reader=new FileReader();
			reader.addEventListener("load",(event)=>{
				let worldObject=JSON.parse(event.target.result);
				this.world=new World(worldObject);
				this.startButton.click();
			})
			reader.readAsText(file);
		})
	})
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
	this.world.step(this.input);
	if(this.input.m){
		console.log("hi");
		this.stop();
		this.world.exportMap();
	}
	if(this.state==="playing"){
		window.requestAnimationFrame(()=>{this.gameLoop()});
	}
}