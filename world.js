function World(){
	this.tiles=[];	
	this.width=30;//the world width in tiles
	this.height=10;//the world height in tiles

	this.camera=new Camera(20,10);
	
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
	this.populateTiles();
}


World.prototype.step=function(){
	this.player.keyControl(this.input);
	// if(this.editing)
	this.editMap();
	this.player.step(this);
	this.camera.x=this.player.x-this.camera.width/2;
	if(this.camera.x<0)this.camera.x=0;
	this.camera.render(this);
	if(this.input.n)this.exportMap();
	if(this.input.m)this.importMap();
}


World.prototype.populateTiles=function(){
	for(let x=0;x<this.width;x++){
		this.tiles.push([]);//add the list
		for(let y=0;y<this.height;y++){
			let color;
			let type;
			if(x===0)type="grass_right";
			else if(x===this.width-1)type="grass_left";
			else if(y===this.height-1)type="grass_top";
			else{
				if(Math.random()<0.25){
					color="black";
					type="grass_top";
				}else{
					color="white";
					type="sky";
				}
			}

			this.tiles[x].push(new Tile(x,y,this.width,this.height,color,type,this.solidTiles[type]));
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


World.prototype.exportMap=function(){
	alert("preparing to save");
	let toSave={};//this is the object that we will be saving
	toSave.width=this.width;
	toSave.height=this.height;
	toSave.camera={
		width:this.camera.width,
		height:this.camera.height
	};
	toSave.player={
		x:this.player.x,
		y:this.player.y,
		width:this.player.width,
		height:this.player.height
	};
	toSave.tiles=[];

	for(let x=0;x<this.tiles.length;x++){
		toSave.tiles.push([]);
		for(let y=0;y<this.tiles[x].length;y++){
			toSave.tiles[x].push({
				type:this.tiles.type,
				solidLeft:this.tiles[x][y].solidLeft,
				solidRight:this.tiles[x][y].solidRight,
				solidTop:this.tiles[x][y].solidTop,
				solidBottom:this.tiles[x][y].solidBottom
			});
		}
	}

	let newFile=new File([JSON.stringify(toSave)],"game_world.json",{type:"application/json;charset=utf-8"});
	let newBlob=new Blob([JSON.stringify(toSave)],{type:"application/json"});

	let url=window.URL.createObjectURL(newBlob);
	let anchor=document.createElement("a");
	anchor.href=url;
	anchor.download="game_save.json";

	anchor.click();
	window.URL.revokeObjectURL(url);
	document.removeChild(anchor);

}



World.prototype.importMap=function(){
	let input=document.getElementById("file-picker");                         
	//this waits for a key to be pressed, and
	//then shows the file picker dialog.

	//it is impossible to directly show the dialog
	//because it needs to be "user-activated"	
	window.addEventListener("keydown",()=>{
		input.click();
	},{once:true});


	input.addEventListener("change",(event)=>{
		let fileList=event.target.files;
		alert(fileList);
	})
}