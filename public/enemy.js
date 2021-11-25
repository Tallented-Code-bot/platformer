import {Entity} from "./entity.js";
import {Vector} from "./vector.js";
export function Enemy(x,y,width,height){
	Entity.call(this,x,y,width,height);
	this.jumping=true;
}
Enemy.prototype=Object.create(Entity.prototype);


Enemy.prototype.doAi=function(world){
	let d=world.player.position.x-this.position.x;
	if(-1<=d&&d<=1){
		//do nothing
	}
	else if(d<0){
		this.moveLeft();
	}else if(d>0){
		this.moveRight();
	}

	
};

Enemy.prototype.step=function(world){
	this.doAi(world);
	this.oldPosition=new Vector(this.position.x,this.position.y);

	this.position.addTo(this.velocity);
	this.velocity.addTo(new Vector(0,0.03));
	this.velocity.multTo(new Vector(0.9,0.9));
	this.checkCollisions(world);
};

Enemy.prototype.collideWithTop=function(tileTop){
	if(this.getBottom()>tileTop&&this.getOldBottom()<=tileTop){
		this.setBottom(tileTop-0.003125);
		this.velocity.y=0;
		this.jumping=false;
		return true;
	}
	return false;
};


Enemy.prototype.jump=function(){
	if(!this.jumping){
		this.velocity.y=-0.5;
		this.jumping=true;
	}
};


Enemy.prototype.moveLeft=function(){
	this.velocity.x=-0.1;
};

Enemy.prototype.moveRight=function(){
	this.velocity.x=0.1;
};

