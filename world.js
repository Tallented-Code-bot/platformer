function World(){
	this.tiles=[];	
	this.width=30;//the world width in tiles
	this.height=10;//the world height in tiles

	this.camera=new Camera(20,10);
	this.populateTiles();	
	this.player=new Player(3,3,0.9,0.9);
	this.input=new Input();
	this.input.init(this.camera.canvas);

	this.editing=false;
	this.availableTiles=["dirt","sky","grass_top","grass_top_right","grass_top_left","grass_right","grass_left"]
	this.tileIndex=2

	this.solidTiles={
		dirt:{top:false,bottom:false,left:false,right:false},
		sky:{top:false,bottom:false,left:false,right:false},
		grass_top:{top:true,bottom:false,left:false,right:false},
		grass_top_right:{top:true,bottom:false,right:true,left:false},
		grass_top_left:{top:true,bottom:false,right:false,left:true},
		grass_right:{top:false,bottom:false,left:false,right:true},
		grass_left:{top:false,bottom:false,left:true,right:false}
	}
}


World.prototype.step=function(){
	this.player.keyControl(this.input);
	// if(this.editing)
	this.editMap();
	this.player.step(this);
	this.camera.x=this.player.x-this.camera.width/2;
	if(this.camera.x<0)this.camera.x=0;
	this.camera.render(this);
}


World.prototype.populateTiles=function(){
	for(let x=0;x<this.width;x++){
		this.tiles.push([]);
		for(let y=0;y<this.height;y++){
			let color;
			let type;
			if(x===0||x===this.width-1||y===0||y===this.height-1){//this makes a black border
				color="black";
			}
			else{
				if(Math.random()<0.25){
					color="black";
					type="dirt";
				}else{
					color="white";
					type="sky";
				}
			}
			this.tiles[x].push(new Tile(x,y,this.width,this.height,color,type,{top:true,bottom:true,left:true,right:true}));
		}
	}	
}



World.prototype.editMap=function(){
	if(this.input.one){
		this.input.one=false;
		this.tileIndex--;
		if(this.tileIndex<0)this.tileIndex=0;	
	}
	if(this.input.two){
		this.input.two=false;
		this.tileIndex++;
		if(this.tileIndex>this.availableTiles.length-1)this.tileIndex=this.availableTiles.length-1;
	}
	if(this.input.mouseDown){
		let x=Math.floor((this.input.mouseX/this.camera.tileWidth)+this.camera.x)
		let y=Math.floor(this.input.mouseY/this.camera.tileHeight);
		this.tiles[x][y]=new Tile(x,y,1,1,"black",this.availableTiles[this.tileIndex],this.solidTiles[this.availableTiles[this.tileIndex]]);
		// console.log(this.tiles[x][y].type)
	}
}