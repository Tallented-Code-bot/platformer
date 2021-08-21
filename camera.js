function Camera(width,height){
	this.image=new Image();
	this.image.src="/images/game_tiles.png";
	this.imageLoadedYet=false;
	this.image.addEventListener("load",(event)=>{
		this.imageLoadedYet=true;
	})
	this.x=0;//the camera x position, in tiles
	this.y=0;//the camera y position, in tiles
	this.width=width;//the camera width in tiles
	this.height=height;//the camera height in tiles
	this.canvas=document.getElementById("game_canvas");
	this.context=this.canvas.getContext("2d");
	this.tileWidth=32;//the width in pixels for 1 tile
	this.tileHeight=32;//the height in pixels for 1 tile
	this.canvas.width=this.width*this.tileWidth;
	this.canvas.height=this.height*this.tileHeight;
	this.tileTextures={
		dirt:[32,32],
		sky:[96,0],
		grass_top:[32,0],
		grass_top_right:[64,0],
		grass_top_left:[0,0],
		grass_left:[0,32],
		grass_right:[64,32]
	}
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
				continue;
			}else{
				this.context.fillStyle=world.tiles[Math.floor(x)][Math.floor(y)].color;
			}
			this.context.fillStyle="white";

			let toDraw={
				x:(x-this.x-(this.x-Math.trunc(this.x)))*this.tileWidth,
				y:(y-this.y)*this.tileHeight,
				width:this.tileWidth,
				height:this.tileHeight,
			}

			try{
				toDraw.sourceX=this.tileTextures[world.tiles[Math.floor(x)][Math.floor(y)].type][0];
				toDraw.sourceY=this.tileTextures[world.tiles[Math.floor(x)][Math.floor(y)].type][1];
			}
			catch{
				
			}
			
			if(this.imageLoadedYet){
				this.context.drawImage(this.image,toDraw.sourceX,toDraw.sourceY,32,32,toDraw.x,toDraw.y,toDraw.width,toDraw.height);

			}else{
				this.context.fillRect(toDraw.x,toDraw.y,toDraw.width,toDraw.height);
			}
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



	this.context.fillStyle="black";
	this.context.fillText(world.availableTiles[world.tileIndex],10,10);
}




Camera.prototype.convertToPixel=function(blockX,blockY){
	let x=blockX*this.tileWidth;
	let y=blockY*this.tileHeight;
	return {x:x,y:y}
}