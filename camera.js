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
	for(let x=this.x;x<this.width+this.x;x++){
		for(let y=this.y;y<this.height+this.y;y++){
			let position=this.convertToPixel(x,y);
			if((x>world.width-1||x<0)||(y>world.height-1||y<0)){
				this.context.fillStyle="white";
			}else{
				this.context.fillStyle=world.tiles[x][y].color;
			}
			
			let xPosition=x*this.tileWidth-this.x*this.tileWidth;
			let yPosition=y*this.tileHeight-this.y*this.tileHeight;
			this.context.fillRect(xPosition,yPosition,this.tileWidth,this.tileHeight)	
			//the formula to position tiles correctly
			//the formula should be (tile x*32)-(camera x*32)
			//this makes sense
		}
	}
	this.context.fillStyle="red";
	this.context.fillRect(world.player.x*this.tileWidth,world.player.y*this.tileHeight,world.player.width*this.tileWidth,world.player.height*this.tileHeight);
}




Camera.prototype.convertToPixel=function(blockX,blockY){
	let x=blockX*this.tileWidth;
	let y=blockY*this.tileHeight;
	return {x:x,y:y}
}