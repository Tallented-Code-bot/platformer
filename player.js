function Player(x,y,width,height){
	Entity.call(this,x,y,width,height);
	this.jumping=true;
}
Player.prototype=Object.create(Entity.prototype);



Player.prototype.keyControl=function(input){
	if(input.left)this.xVel=-0.1;
	if(input.right)this.xVel=0.1;
	if(input.up){
		if(!this.jumping){
			this.yVel=-0.5;
			this.jumping=true;
		}
	}
	if(input.down)this.yVel=0.1;
}




Player.prototype.collideWithTop=function(tileTop){
	if(this.getBottom()>tileTop&&this.getOldBottom()<=tileTop){
		this.setBottom(tileTop-0.003125);
		this.yVel=0;
		this.jumping=false;
		return true;
	}
	return false;
}