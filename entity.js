function Entity(x,y,width,height){
	this.x=x;
	this.y=y;
	this.oldX;
	this.oldY
	this.width=width;
	this.height=height;
	this.xVel=0;
	this.yVel=0;
}



Entity.prototype.step=function(world){
	this.oldX=this.x;
	this.oldY=this.y;

	this.x+=this.xVel
	this.y+=this.yVel;
	this.yVel+=0.03;//gravity
	this.xVel*=0.9;//friction
	this.yVel*=0.9;//friction
	this.checkCollisions(world);
}


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

}





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
}




Entity.prototype.getLeft=function(){return this.x}
Entity.prototype.getRight=function(){return this.x+this.width}
Entity.prototype.getTop=function(){return this.y}
Entity.prototype.getBottom=function(){return this.y+this.height}

Entity.prototype.setLeft=function(left){this.x=left}
Entity.prototype.setRight=function(right){this.x=right-this.width}
Entity.prototype.setTop=function(top){this.y=top}
Entity.prototype.setBottom=function(bottom){this.y=bottom-this.height}

Entity.prototype.getOldLeft=function(){return this.oldX}
Entity.prototype.getOldRight=function(){return this.oldX+this.width}
Entity.prototype.getOldTop=function(){return this.oldY}
Entity.prototype.getOldBottom=function(){return this.oldY+this.height}

Entity.prototype.setOldLeft=function(left){this.oldX=left}
Entity.prototype.setOldBottom=function(bottom){this.oldY=bottom-this.height}
Entity.prototype.setOldRight=function(right){this.oldX=right-this.width}
Entity.prototype.setOldTop=function(top){this.oldY=top};



Entity.prototype.collideWithTop=function(tileTop){
	if(this.getBottom()>tileTop&&this.getOldBottom()<=tileTop){
		this.setBottom(tileTop-0.003125);
		this.yVel=0;
		return true;
	}
	return false;
}


Entity.prototype.collideWithBottom=function(tileBottom){
	if(this.getTop()<tileBottom&&this.getOldTop()>=tileBottom){
		this.setTop(tileBottom);
		this.yVel=0;
		return true;
	}
	return false
}


Entity.prototype.collideWithLeft=function(tileLeft){
	if(this.getRight()>tileLeft&&this.getOldRight()<=tileLeft){
		this.setRight(tileLeft-0.0003125);
		this.xVel=0;
		return true
	}
	return false;
}

Entity.prototype.collideWithRight=function(tileRight){
	if(this.getLeft()<tileRight&&this.getOldLeft()>=tileRight){
		this.setLeft(tileRight);
		this.xVel=0;
		return true;
	}
	return false;
}