function Player(x,y,width,height){
	Entity.call(this,x,y,width,height);
}
Player.prototype=Object.create(Entity.prototype);



Player.prototype.keyControl=function(input){
	this.xVel=0;
	this.yVel=0;
	if(input.left)this.xVel=-0.1;
	if(input.right)this.xVel=0.1;
	if(input.up)this.yVel=-0.1;
	if(input.down)this.yVel=0.1;
}