function Object(x,y,width,height){
	this.x=x;
	this.y=y;
	this.oldX;
	this.oldY
	this.width=width;
	this.height=height;
	this.xVel=0;
	this.yVel=0;
}



Object.prototype.keyControl=function(input){
	this.xVel=0;
	this.yVel=0;
	if(input.left)this.xVel=-0.1;
	if(input.right)this.xVel=0.1;
	if(input.up)this.yVel=-0.1;
	if(input.down)this.yVel=0.1;
}



Object.prototype.step=function(world){
	this.oldX=this.x;
	this.oldY=this.y;

	this.x+=this.xVel
	this.y+=this.yVel;
	this.checkCollisions(world);
}


Object.prototype.checkCollisions=function(world){
	let top;
	let left;
	let right;
	let bottom;
	let color;

	//get the tile that the top left of the player is on
	left=Math.floor(this.getLeft());
	top=Math.floor(this.getTop());
	//get the color of that tile
	color=world.tiles[left][top].color;
	this.routeCollision(color,left,top);

	right=Math.floor(this.getRight());
	top=Math.floor(this.getTop());
	color=world.tiles[right][top].color;
	this.routeCollision(color,right,top);


	left=Math.floor(this.getLeft());
	bottom=Math.floor(this.getBottom());
	color=world.tiles[left][bottom].color;
	this.routeCollision(color,left,bottom);

	right=Math.floor(this.getRight());
	bottom=Math.floor(this.getBottom());
	color=world.tiles[right][bottom].color;
	this.routeCollision(color,right,bottom);

}





Object.prototype.routeCollision=function(color,tileX,tileY){
	if(color==="black"){//all black tiles should be collided on all sides
		if(this.collideWithTop(tileY)){return;}
		if(this.collideWithLeft(tileX))return;
		if(this.collideWithRight(tileX+1))return;//the 1 represents a tile width/height
		this.collideWithBottom(tileY+1);
	}	
}




Object.prototype.getLeft=function(){return this.x}
Object.prototype.getRight=function(){return this.x+this.width}
Object.prototype.getTop=function(){return this.y}
Object.prototype.getBottom=function(){return this.y+this.height}

Object.prototype.setLeft=function(left){this.x=left}
Object.prototype.setRight=function(right){this.x=right-this.width}
Object.prototype.setTop=function(top){this.y=top}
Object.prototype.setBottom=function(bottom){this.y=bottom-this.height}

Object.prototype.getOldLeft=function(){return this.oldX}
Object.prototype.getOldRight=function(){return this.oldX+this.width}
Object.prototype.getOldTop=function(){return this.oldY}
Object.prototype.getOldBottom=function(){return this.oldY+this.height}

Object.prototype.setOldLeft=function(left){this.oldX=left}
Object.prototype.setOldBottom=function(bottom){this.oldY=bottom-this.height}
Object.prototype.setOldRight=function(right){this.oldX=right-this.width}
Object.prototype.setOldTop=function(top){this.oldY=top};



Object.prototype.collideWithTop=function(tileTop){
	if(this.getBottom()>tileTop&&this.getOldBottom()<=tileTop){
		this.setBottom(tileTop-0.003125);
		this.yVel=0;
		return true;
	}
	return false;
}


Object.prototype.collideWithBottom=function(tileBottom){
	if(this.getTop()<tileBottom&&this.getOldTop()>=tileBottom){
		this.setTop(tileBottom);
		this.yVel=0;
		return true;
	}
	return false
}


Object.prototype.collideWithLeft=function(tileLeft){
	if(this.getRight()>tileLeft&&this.getOldRight()<=tileLeft){
		this.setRight(tileLeft-0.0003125);
		this.xVel=0;
		return true
	}
	return false;
}

Object.prototype.collideWithRight=function(tileRight){
	if(this.getLeft()<tileRight&&this.getOldLeft()>=tileRight){
		this.setLeft(tileRight);
		this.xVel=0;
		return true;
	}
	return false;
}