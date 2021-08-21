function Enemy(x,y,width,height){
	Entity.call(this,x,y,width,height);
	this.jumping=true;
}
Enemy.prototype=Object.create(Entity.prototype);



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

