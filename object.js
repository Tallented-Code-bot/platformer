function Object(x,y,width,height){
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.xVel=0;
	this.yVel=0;
	this.keys();
}



Object.prototype.step=function(world){

	this.x+=this.xVel
	//get the tile underneath
	let tileTopLeft=world.tiles[Math.floor(this.x)][Math.floor(this.y)];
	let tileTopRight=world.tiles[Math.floor(this.x+this.width)][Math.floor(this.y)];
	let tileBottomLeft=world.tiles[Math.floor(this.x)][Math.floor(this.y+this.height)];
	let tileBottomRight=world.tiles[Math.floor(this.x+this.width)][Math.floor(this.y+this.height)];

	if(tileTopLeft.color==="black"){
		this.x=tileTopLeft.x+1;
	}	

	if(tileTopRight.color==="black"){
		this.x=tileTopRight.x-this.width;
	}

	if(tileBottomLeft.color==="black"){
		this.x=tileBottomLeft.x+1
	}

	if(tileBottomRight.color==="black"){
		this.x=tileBottomRight.x-this.width;
	}

	this.y+=this.yVel;
	tileTopLeft=world.tiles[Math.floor(this.x)][Math.floor(this.y)];
	tileTopRight=world.tiles[Math.floor(this.x+this.width)][Math.floor(this.y)];
	tileBottomLeft=world.tiles[Math.floor(this.x)][Math.floor(this.y+this.height)];
	tileBottomRight=world.tiles[Math.floor(this.x+this.width)][Math.floor(this.y+this.height)];

	if(tileTopLeft.color==="black"){
		this.y=tileTopLeft.y+1;
	}


	if(tileTopRight.color==="black"){
		this.y=tileTopRight.y+1;
	}

	if(tileBottomLeft.color==="black"){
		this.y=tileBottomLeft.y-this.height;
	}

	if(tileBottomRight.color==="black"){
		this.y=tileBottomRight.y-this.height;
	}

}


Object.prototype.keys=function(){
	window.addEventListener("keydown",(event)=>{
		if(event.key==="a"){this.xVel=-0.1}
		else if(event.key==="d"){this.xVel=0.1}
		else{this.xVel=0}

		if(event.key==="w"){this.yVel=-0.1}
		else if(event.key==="s"){this.yVel=0.1}
		else{this.yVel=0}
	})
}