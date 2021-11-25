export function Pathfinder(){
	this.map=[];// this is the map.	
}


Pathfinder.prototype.initializeMap=function(world){
	for(let x=0;x<world.width;x++){
		this.map.push([]);
		for(let y=0;y<world.height;y++){
			if(world.tiles[x][y].type==="sky"&&world.tiles[x][y+1].type==="grass_top"){
				//if a tile is a sky tile with grass below it
				this.map[x].push(true);//set the tile to walkable
			}else{
				this.map[x].push(false);//set the tile to not walkable.
			}
		}
	}
	console.log(this.map);
};

Pathfinder.prototype.unsetNodes=function(){
	for(let x=0;x<this.map.length;x++){
		for(let y=0;y<this.map[x].length;y++){
			this.map[x][y].g=undefined;
			this.map[x][y].h=undefined;
			this.map[x][y].i=undefined;
		}
	}
};



Pathfinder.prototype.findPath = function(startX,startY,endX,endY) {
	let startNode=new Node(startX,startY,this.map);
	startNode.g=startNode.h=startNode.f=0;

	let endNode=new Node(endX,endY,this.map);
	endNode.g=endNode.h=endNode.f=0;

	let openList=[];
	let closedList=[];	

	openList.push(startNode);

	while(openList.length!=0){
		//get the current node
		let currentNode=openList[0];
		let currentIndex=0;
		for(let i=0;i<openList.length;i++){
			if(openList[i].f<currentNode.f){
				currentNode=openList[i];
				currentIndex=i;
			}
		}

		//move the current node to the closedList
		openList.splice(currentIndex,1);
		closedList.push(currentNode);
		
		//if the goal is found		
		if(currentNode===endNode){
			let path=[];		
			let current=currentNode;
			while(current!=undefined){
				path.push(current.position);
				current=current.parent;
			}
			return path;
		}

		//generate children
		let adjacentPositions=[{x:0,y:-1},{x:0,y:1},{x:-1,y:0},{x:1,y:0},{x:-1,y:-1},{x:-1,y:1},{x:1,y:-1},{x:1,y:1}];
		//[(0, -1), (0, 1), (-1, 0), (1, 0), (-1, -1), (-1, 1), (1, -1), (1, 1)]
		let children=[];
		for(let i=0;i<adjacentPositions.length;i++){
			//get the node position
			let nodePosition={x:currentNode.position.x+adjacentPositions[i].x,y:currentNode.position.y+adjacentPositions[i].y};

			//make sure the node is within range
			if(nodePosition.x>this.map.length-1||nodePosition.x<0||nodePosition.y>this.map[0].length-1||nodePosition.y<0){
				continue;
			}

			//make sure the terrain is walkable
			if(!this.map[nodePosition.x][nodePosition.y]){
				continue;
			}

			// let newNode=Node(currentNode,nodePosition);
			let newNode=new Node(nodePosition.x,nodePosition.y,this.map,currentNode);

			children.push(newNode);
		}
		loop1:
		for(let i=0;i<children.length;i++){
			
			for(let j=0;j<closedList;j++){
				if(children[i]===closedList[j]){
					continue loop1;
				}
				children[i].g=currentNode.g+1;
				children[i].h=((children[i].position.x-endNode.position.x)**2)+((children[i].position.y-endNode.position.y)**2);
				children[i].f=children[i].g+children[i].h;
			}

			for(let j=0;j<openList.length;j++) {
				if(children[i]==openList[j] && children[i].g>openList[j].g){
					continue loop1;
				}
			}

			openList.push(children[i]);
		}

			
			


	}
};





function Node(x,y,map,parent=undefined){
	this.walkable=map[x][y];
	this.position={x:x,y:y};
	this.parent=parent;
	this.g;
	this.h;
	this.i;
}

Node.prototype.calculate=function(startX,startY,endX,endY){
	
};