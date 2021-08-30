function Camera(width,height,images){
	this.image=new Image();
	this.image.src="/images/game_tiles.png";
	this.imageLoadedYet=false;
	this.image.addEventListener("load",(event)=>{
		this.imageLoadedYet=true;
	})
	this.images=images;
	this.position=new Vector(0,0);
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
		grass_right:[64,32],
		grass_bottom:[32,64],
		grass_bottom_left:[0,64],
		grass_bottom_right:[64,64]
	}
}


Camera.prototype.render=function(world){
	//clear the screen
	this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	//render object
	this.context.fillStyle="red";
	//render blocks
	for(let x=this.position.x;x<this.width+this.position.x+1;x++){
		// console.log(x);
		for(let y=this.position.y;y<this.height+this.position.y;y++){
			if((Math.floor(x)>world.width-1||x<0)||(y>world.height-1||y<0)){
				this.context.fillStyle="white";
				continue;
			}else{
				this.context.fillStyle=world.tiles[Math.floor(x)][Math.floor(y)].color;
			}
			this.context.fillStyle="white";

			let toDraw={
				x:Math.floor((x-this.position.x-(this.position.x-Math.trunc(this.position.x)))*this.tileWidth),
				y:(y-this.position.y)*this.tileHeight,
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
				this.context.drawImage(this.images.tilesImage,toDraw.sourceX,toDraw.sourceY,32,32,toDraw.x,toDraw.y,toDraw.width,toDraw.height);

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
		x:(world.player.position.x-this.position.x)*this.tileWidth,
		y:(world.player.position.y-this.position.y)*this.tileHeight,
		width:world.player.width*this.tileWidth,
		height:world.player.height*this.tileHeight
	}
	// this.context.drawImage(this.images.playerImage,32,0,32,32,toDraw.x,toDraw.y,32,32);
	this.context.fillRect(toDraw.x,toDraw.y,toDraw.width,toDraw.height);



	this.context.fillStyle="black";
	world.enemies.forEach((enemy)=>{
		toDraw={
			x:(enemy.position.x-this.position.x)*this.tileWidth,
			y:(enemy.position.y-this.position.y)*this.tileHeight,
			width:(enemy.width)*this.tileWidth,
			height:(enemy.height)*this.tileHeight
		}
		this.context.fillRect(toDraw.x,toDraw.y,toDraw.width,toDraw.height);
	});



	this.context.fillStyle="black";
	this.context.fillText(world.availableTiles[world.tileIndex],10,10);
}




Camera.prototype.convertToPixel=function(blockX,blockY){
	let x=blockX*this.tileWidth;
	let y=blockY*this.tileHeight;
	return {x:x,y:y}
}