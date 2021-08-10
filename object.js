function Object(x,y,width,height){
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.xVel=0;
	this.yVel=0;
}



Object.prototype.step=function(world){
	this.yVel=0.1;
	this.y+=this.yVel;
	this.x+=this.xVel
}