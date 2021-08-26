function Player(x,y,width,height){
	Entity.call(this,x,y,width,height);
	this.jumping=true;
}
Player.prototype=Object.create(Entity.prototype);



Player.prototype.keyControl=function(input){
	if(input.left)this.velocity.x=-0.1;
	if(input.right)this.velocity.x=0.1;
	if(input.up){
		if(!this.jumping){
			this.velocity.subtractFrom(new Vector(0,0.5));
			this.jumping=true;
		}
	}
	if(input.down)this.velocity.y=0.1;
}




Player.prototype.collideWithTop=function(tileTop){
	// console.log("top");
	// console.log(this.getBottom()>tileTop&&this.getOldBottom()<=tileTop);

	// console.log(this.getBottom(),this.getOldBottom(),tileTop)
	if(this.getBottom()>tileTop&&this.getOldBottom()<=tileTop){
		// console.log("topHi");
		this.setBottom(tileTop-0.003125);
		this.velocity.y=0;
		this.jumping=false;
		return true;
	}
	return false;
}