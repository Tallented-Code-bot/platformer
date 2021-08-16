function Tile(x,y,width,height,color,type,solid){
	this.x=x;
	this.y=y;
	this.color=color;
	this.width=width;
	this.height=height;
	this.type=type;
	this.solidTop=solid.top;
	this.solidBottom=solid.bottom;
	this.solidLeft=solid.left;
	this.solidRight=solid.right;
}