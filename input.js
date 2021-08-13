function Input(){
	this.left=false;
	this.right=false;
	this.up=false;
	this.down=false;
}


Input.prototype.init=function(){
	window.addEventListener("keydown",(event)=>{
		switch(event.key){
			case "ArrowUp":this.up=true;break;
			case "ArrowDown":this.down=true;break;
			case "ArrowLeft":this.left=true;break;
			case "ArrowRight":this.right=true;break;
			case "a":this.left=true;break;
			case "d":this.right=true;break;
			case "w":this.up=true;break;
			case "s":this.down=true;break;
		}
	});
	window.addEventListener("keyup",(event)=>{
		switch(event.key){
			case "ArrowUp":this.up=false;break;
			case "ArrowDown":this.down=false;break;
			case "ArrowLeft":this.left=false;break;
			case "ArrowRight":this.right=false;break;
			case "a":this.left=false;break;
			case "d":this.right=false;break;
			case "w":this.up=false;break;
			case "s":this.down=false;break;
		}
	});
}