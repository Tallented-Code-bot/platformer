import {World} from "./world.js";
import {Input} from "./input.js";
export function Game(){
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
	this.startMenu.startButton=this.startMenu.querySelector("button");
	// this.startButton=document.querySelector("#start_menu button");
	this.startMenu.startButton.addEventListener("click",()=>{this.start();});
	

	this.pauseMenu=document.getElementById("pause_play");
	this.pauseMenu.getElementsByTagName("button")[0].addEventListener("click",(e)=>{e.preventDefault();this.stop();});

	this.instructionMenu=document.getElementById("instruction_menu");
	this.instructionMenu.homeButton=this.instructionMenu.querySelector("button");
	this.instructionMenu.homeButton.addEventListener("click",()=>{this.showStartMenu();});


	this.startMenu.instructionButton=this.startMenu.querySelectorAll("button")[1];
	this.startMenu.instructionButton.addEventListener("click",()=>{this.showInstructionMenu();});


	this.fileInput=document.querySelector("#start_menu input");
	this.fileInput.addEventListener("change",(event)=>{
		const fileList=Array.from(event.target.files);
		fileList.forEach((file)=>{
			const reader=new FileReader();
			reader.addEventListener("load",(event)=>{
				let worldObject=JSON.parse(event.target.result);
				worldObject.camera.images=this.loadImages(["tilesImage","playerImage"],["images/game_tiles.png","images/game_player.png"],()=>{
					this.world=new World(worldObject);
					this.startMenu.startButton.click();
				});
			});
			reader.readAsText(file);
		});
	});
	this.world=new World({
		camera:{
			images:this.loadImages(["tilesImage","playerImage"],["images/game_tiles.png","images/game_player.png"],()=>{this.showStartMenu();})
		}
	});
}


Game.prototype.showStartMenu=function(){
	this.startMenu.style.display="block";
	this.instructionMenu.style.display="none";
};


Game.prototype.showInstructionMenu=function(){
	this.startMenu.style.display="none";
	this.instructionMenu.style.display="block";
};




Game.prototype.start=function(){
	this.state="playing";
	this.startMenu.style.display="none";
	window.requestAnimationFrame(()=>{this.gameLoop();});
};


Game.prototype.stop=function(){
	this.state="paused";
};

Game.prototype.gameLoop=function(){
	this.world.step(this.input);
	if(this.input.m){
		console.log("hi");
		this.stop();
		this.world.exportMap();
	}
	if(this.state==="playing"){
		window.requestAnimationFrame(()=>{this.gameLoop();});
	}
};



Game.prototype.loadImages=function(names, files, onAllLoaded){
	var i=0, numLoading=names.length;
	const onload= ()=> --numLoading ===0 && onAllLoaded();
	
	const images={};
	while(i<names.length){
		const img= images[names[i]]=new Image;
		img.src=files[i++];
		img.onload=onload;
	}
	return images;
};