export function Vector(x,y){
	this.x=x;
	this.y=y;
}


Vector.prototype.addTo=function(toAdd){
	this.x+=toAdd.x;
	this.y+=toAdd.y;
};


Vector.prototype.add=function(toAdd){
	return new Vector(this.x+toAdd.x,this.y+toAdd.y);
};


Vector.prototype.subtractFrom=function(toSub){
	this.x-=toSub.x;
	this.y-=toSub.y;
};


Vector.prototype.subtract=function(toSub){
	return new Vector(this.x-toSub.x,this.y-toSub.y);
};


Vector.prototype.multTo=function(toMult){
	this.x*=toMult.x;
	this.y*=toMult.y;
};


Vector.prototype.mult=function(toMult){
	return new Vector(this.x*toMult.x,this.y*toMult.y);
};

