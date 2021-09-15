import Vector from "./vector.js";
export function Entity(x,y,width,height){
	this.position=new Vector(x,y);
	this.oldPosition=new Vector(x,y);
	this.width=width;
	this.height=height;
	this.velocity=new Vector(0,0);
}



Entity.prototype.step=function(world){
	this.oldPosition=new Vector(this.position.x,this.position.y);

	this.position.addTo(this.velocity);
	this.velocity.addTo(new Vector(0,0.03));
	this.velocity.multTo(new Vector(0.9,0.9));
	this.checkCollisions(world);
};


Entity.prototype.checkCollisions=function(world){
	let top;
	let left;
	let right;
	let bottom;
	let color;

	//get the tile that the top left of the player is on
	left=Math.floor(this.getLeft());
	top=Math.floor(this.getTop());
	//get the color of that tile
	color=world.tiles[left][top];
	this.routeCollision(color,left,top);

	right=Math.floor(this.getRight());
	top=Math.floor(this.getTop());
	color=world.tiles[right][top];
	this.routeCollision(color,right,top);


	left=Math.floor(this.getLeft());
	bottom=Math.floor(this.getBottom());
	color=world.tiles[left][bottom];
	this.routeCollision(color,left,bottom);

	right=Math.floor(this.getRight());
	bottom=Math.floor(this.getBottom());
	color=world.tiles[right][bottom];
	this.routeCollision(color,right,bottom);

};





Entity.prototype.routeCollision=function(tile,tileX,tileY){
	if(tile.solidTop){
		if(this.collideWithTop(tileY))return;
	}
	if(tile.solidLeft){
		if(this.collideWithLeft(tileX))return;
	}
	if(tile.solidRight){
		if(this.collideWithRight(tileX+1))return;
	}
	if(tile.solidBottom){
		if(this.collideWithBottom(tileY+1))return;
	}
};




Entity.prototype.getLeft=function(){return this.position.x;};
Entity.prototype.getRight=function(){return this.position.x+this.width;};
Entity.prototype.getTop=function(){return this.position.y;};
Entity.prototype.getBottom=function(){return this.position.y+this.height;};

Entity.prototype.setLeft=function(left){this.position.x=left;};
Entity.prototype.setRight=function(right){this.position.x=right-this.width;};
Entity.prototype.setTop=function(top){this.position.y=top;};
Entity.prototype.setBottom=function(bottom){this.position.y=bottom-this.height;};

Entity.prototype.getOldLeft=function(){return this.oldPosition.x;};
Entity.prototype.getOldRight=function(){return this.oldPosition.x+this.width;};
Entity.prototype.getOldTop=function(){return this.oldPosition.y;};
Entity.prototype.getOldBottom=function(){return this.oldPosition.y+this.height;};

Entity.prototype.setOldLeft=function(left){this.oldPosition.x=left;};
Entity.prototype.setOldBottom=function(bottom){this.oldPosition.y=bottom-this.height;};
Entity.prototype.setOldRight=function(right){this.oldPosition.x=right-this.width;};
Entity.prototype.setOldTop=function(top){this.oldPosition.y=top;};



Entity.prototype.collideWithTop=function(tileTop){
	if(this.getBottom()>tileTop&&this.getOldBottom()<=tileTop){
		this.setBottom(tileTop-0.003125);
		this.velocity.y=0;
		return true;
	}
	return false;
};


Entity.prototype.collideWithBottom=function(tileBottom){
	if(this.getTop()<tileBottom&&this.getOldTop()>=tileBottom){
		this.setTop(tileBottom);
		this.velocity.y=0;
		return true;
	}
	return false;
};


Entity.prototype.collideWithLeft=function(tileLeft){
	if(this.getRight()>tileLeft&&this.getOldRight()<=tileLeft){
		this.setRight(tileLeft-0.0003125);
		this.velocity.x=0;
		return true;
	}
	return false;
};

Entity.prototype.collideWithRight=function(tileRight){
	if(this.getLeft()<tileRight&&this.getOldLeft()>=tileRight){
		this.setLeft(tileRight);
		this.velocity.x=0;
		return true;
	}
	return false;
};