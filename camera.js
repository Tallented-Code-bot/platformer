function Camera(width,height){
	this.x=0;//the camera x position, in tiles
	this.y=0;//the camera y position, in tiles
	this.width=width;//the camera width in tiles
	this.height=height;//the camera height in tiles
	this.canvas=document.getElementById("canvas");
	this.context=this.canvas.getContext("2d");
	this.tileWidth=32;//the width in pixels for 1 tile
	this.tileHeight=32;//the height in pixels for 1 tile
	this.canvas.width=this.width*this.tileWidth;
	this.canvas.height=this.height*this.tileHeight;
}


Camera.prototype.render=function(world){
	//clear the screen
	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	//render object
	this.context.fillStyle="red";
	//render blocks
	for(let x=this.x;x<this.width+this.x+1;x++){
		// console.log(x);
		for(let y=this.y;y<this.height+this.y;y++){
			if((Math.floor(x)>world.width-1||x<0)||(y>world.height-1||y<0)){
				this.context.fillStyle="white";
			}else{
				this.context.fillStyle=world.tiles[Math.floor(x)][Math.floor(y)].color;
			}
			
			let toDraw={
				x:(x-this.x-(this.x-Math.trunc(this.x)))*this.tileWidth,
				y:(y-this.y)*this.tileHeight,
				width:this.tileWidth,
				height:this.tileHeight
			}
			this.context.fillRect(toDraw.x,toDraw.y,toDraw.width,toDraw.height);
			//the formula to position tiles correctly
			//the formula should be (tile x*32)-(camera x*32)
			//this makes sense
		}
	}
	this.context.fillStyle="red";
	let toDraw={
		x:(world.player.x-this.x)*this.tileWidth,
		y:(world.player.y-this.y)*this.tileHeight,
		width:world.player.width*this.tileWidth,
		height:world.player.height*this.tileHeight
	}
	this.context.fillRect(toDraw.x,toDraw.y,toDraw.width,toDraw.height);
}




Camera.prototype.convertToPixel=function(blockX,blockY){
	let x=blockX*this.tileWidth;
	let y=blockY*this.tileHeight;
	return {x:x,y:y}
}