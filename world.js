function World(){
	this.tiles=[];	
	this.width=30;//the world width in tiles
	this.height=10;//the world height in tiles

	this.camera=new Camera(20,10);
	this.populateTiles();	
	this.player=new Player(3,3,0.9,0.9);
	this.input=new Input();
	this.input.init();
}


World.prototype.step=function(){
	this.player.keyControl(this.input);
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
			this.tiles[x].push(new Tile(x,y,this.width,this.height,color,type));
		}
	}	
}