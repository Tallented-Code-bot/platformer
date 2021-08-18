function Input(){
	this.left=false;
	this.right=false;
	this.up=false;
	this.down=false;
	this.mouseDown;
	this.mouseX;
	this.mouseY;
	this.editing=false;
	this.one=false;
	this.two=false;
	this.n=false;
}


Input.prototype.init=function(canvas){
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
			case "0":this.editing=true;break;
			case "1":this.one=true;break;
			case "2":this.two=true;break;
			case "n":this.n=true;break;
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
			case "0":this.editing=false;break;
			case "n":this.n=false;break;
		}
	});

	window.addEventListener("mousemove",(event)=>{
		let rect=canvas.getBoundingClientRect();
		this.mouseX=event.clientX-rect.left;
		this.mouseY=event.clientY-rect.top;
	});

	window.addEventListener("mousedown",(event)=>{
		this.mouseDown=true;
	});

	window.addEventListener("mouseup",(event)=>{
		this.mouseDown=false;;
	})
}