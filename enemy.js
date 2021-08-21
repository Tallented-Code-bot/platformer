function Enemy(x,y,width,height){
	Entity.call(this,x,y,width,height);
	this.jumping=true;
}
Enemy.prototype=Object.create(Entity.prototype);


Enemy.prototype.doAi=function(world){
	let d=world.player.x-this.x;
	if(-1<=d&&d<=1){
		//do nothing
	}
	else if(d<0){
		this.moveLeft();
	}else if(d>0){
		this.moveRight();
	}
}

Enemy.prototype.step=function(world){
	this.doAi(world);
	this.oldX=this.x;
	this.oldY=this.y;

	this.x+=this.xVel
	this.y+=this.yVel;
	this.yVel+=0.03;//gravity
	this.xVel*=0.9;//friction
	this.yVel*=0.9;//friction
	this.checkCollisions(world);
}

Enemy.prototype.collideWithTop=function(tileTop){
	if(this.getBottom()>tileTop&&this.getOldBottom()<=tileTop){
		this.setBottom(tileTop-0.003125);
		this.yVel=0;
		this.jumping=false;
		return true;
	}
	return false;
}


Enemy.prototype.jump=function(){
	if(!this.jumping){
		this.yVel=-0.5;
		this.jumping=true;
	}
}


Enemy.prototype.moveLeft=function(){
	this.xVel=-0.1;
}

Enemy.prototype.moveRight=function(){
	this.xVel=0.1;
}

