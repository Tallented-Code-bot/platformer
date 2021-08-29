function World(options = {}) {
	this.tiles = [];
	this.width = options.width || 30; //the world width in tiles
	this.height = options.height || 10; //the world height in tiles


	if ("camera" in options) {
		this.camera = new Camera(options.camera.width || 20, options.camera.height || 10,options.camera.images);
	} else {
		this.camera = new Camera(20, 10);
	}


	if ("player" in options) {
		this.player = new Player(options.player.position.x || 3, options.player.position.y || 3, options.player.width || 0.9, options.player.height || 0.9);
	} else {
		this.player = new Player(3, 3, 0.9, 0.9);
	}


	this.input = new Input();
	this.input.init(this.camera.canvas);
	this.enemies = [];
	if ("enemies" in options) {
		for (let i = 0; i < options.enemies.length; i++) {
			this.enemies.push(new Enemy(options.enemies[i].x, options.enemies[i].y, options.enemies[i].width, options.enemies[i].height));
		}
	} else {
		this.enemies = [new Enemy(4, 3, 0.9, 0.9)];
	}

	this.editing = false;
	this.availableTiles = [
		"dirt",
		"sky",
		"grass_top",
		"grass_top_right",
		"grass_top_left",
		"grass_right",
		"grass_left",
		"grass_bottom",
		"grass_bottom_left",
		"grass_bottom_right"
	];
	this.tileIndex = 2;

	this.solidTiles = {
		dirt: { top: false, bottom: false, left: false, right: false },
		sky: { top: false, bottom: false, left: false, right: false },
		grass_top: { top: true, bottom: true, left: true, right: true },
		grass_top_right: { top: true, bottom: false, right: true, left: false },
		grass_top_left: { top: true, bottom: false, right: false, left: true },
		grass_right: { top: false, bottom: false, left: false, right: true },
		grass_left: { top: false, bottom: false, left: true, right: false },
		grass_bottom:{top:false,bottom:true,left:false,right:false},
		grass_bottom_left:{top:false,bottom:true,left:true,right:false},
		grass_bottom_right:{top:false,bottom:true,left:false,right:true}
	};


	if ("tiles" in options) {
		this.populateTiles({ tiles: options.tiles })
	} else {
		this.populateTiles();
	}
	this.camera.canvas.addEventListener(
		"dragenter",
		(event) => {
			event.stopPropagation();
			event.preventDefault();
		},
		false
	);
	this.camera.canvas.addEventListener(
		"dragover",
		(event) => {
			event.stopPropagation();
			event.preventDefault();
		},
		false
	);
	this.camera.canvas.addEventListener("drop", (event) => {
		event.stopPropagation();
		event.preventDefault();
		const dt = event.dataTransfer;
		const files = dt.files;
		this.importMap(files);
	});
}

World.prototype.step = function (input) {
	this.player.keyControl(input);
	// if(this.editing)
	this.editMap(input);
	this.player.step(this);
	this.enemies.forEach((enemy) => {
		enemy.step(this);
	})
	this.camera.position.x = this.player.position.x - this.camera.width / 2;
	if (this.camera.position.x < 0) this.camera.position.x = 0;
	this.camera.render(this);
};

World.prototype.populateTiles = function (options = {}) {
	if ("tiles" in options) {
		let tiles = options.tiles;
		this.tiles = [];
		for (let x = 0; x < tiles.length; x++) {
			this.tiles.push([]);
			for (let y = 0; y < tiles[x].length; y++) {
				this.tiles[x].push(new Tile(
					x,
					y,
					1,
					1,
					"black",
					tiles[x][y].tileType,
					{
						top: tiles[x][y].solidTop,
						bottom: tiles[x][y].solidBottom,
						left: tiles[x][y].solidLeft,
						right: tiles[x][y].solidRight
					}
				));
			}
		}
		return;
	}

	this.tiles = [];
	for (let x = 0; x < this.width; x++) {
		this.tiles.push([]); //add the list
		for (let y = 0; y < this.height; y++) {
			let color;
			let type;
			// if("tiles" in options){
			// 	this.tiles.push(new Tile(
			// 		x,
			// 		y,
			// 		1,
			// 		1,
			// 		"black",
			// 		options.tiles[x][y].tileType,
			// 		{
			// 			top:options.tiles[x][y].solidTop,
			// 			bottom:options.tiles[x][y].solidBottom,
			// 			left:options.tiles[x][y].solidLeft,
			// 			right:options.tiles[x][y].solidRight
			// 		}
			// 	));

			// }
			if (x === 0) type = "grass_right";
			else if (x === this.width - 1) type = "grass_left";
			else if (y === this.height - 1) type = "grass_top";
			else if(y===0)type="grass_bottom";
			else {
				if (Math.random() < 0.25) {
					color = "black";
					type = "grass_top";
				} else {
					color = "white";
					type = "sky";
				}
			}

			this.tiles[x].push(
				new Tile(
					x,
					y,
					this.width,
					this.height,
					color,
					type,
					this.solidTiles[type]
				)
			);
		}

	}



};

World.prototype.editMap = function (input) {
	if (input.one) {
		input.one = false;
		this.tileIndex--;
		if (this.tileIndex < 0) this.tileIndex = 0;
	}
	if (input.two) {
		input.two = false;
		this.tileIndex++;
		if (this.tileIndex > this.availableTiles.length - 1)
			this.tileIndex = this.availableTiles.length - 1;
	}
	if (input.mouseDown) {
		let x = Math.floor(
			input.mouseX / this.camera.tileWidth + this.camera.position.x
		);
		let y = Math.floor(input.mouseY / this.camera.tileHeight);
		this.tiles[x][y] = new Tile(
			x,
			y,
			1,
			1,
			"black",
			this.availableTiles[this.tileIndex],
			this.solidTiles[this.availableTiles[this.tileIndex]]
		);
		// console.log(this.tiles[x][y].type)
	}
};

World.prototype.exportMap = function () {
	let toSave = {}; //this is the object that we will be saving
	toSave.width = this.width;
	toSave.height = this.height;
	toSave.camera = {
		width: this.camera.width,
		height: this.camera.height
	};
	toSave.player = {
		x: this.player.position.x,
		y: this.player.position.y,
		width: this.player.width,
		height: this.player.height
	};
	toSave.enemies = [];
	for (let i = 0; i < this.enemies.length; i++) {
		toSave.enemies.push({
			x: this.enemies[i].x,
			y: this.enemies[i].y,
			width: this.enemies[i].width,
			height: this.enemies[i].height
		})
	}
	toSave.tiles = [];

	for (let x = 0; x < this.tiles.length; x++) {
		toSave.tiles.push([]);
		for (let y = 0; y < this.tiles[x].length; y++) {
			toSave.tiles[x].push({
				worthlessValue: "sdkfj", //it seems that the first value of
				//this object is not read, so this is junk
				tileType: this.tiles[x][y].type,
				solidLeft: this.tiles[x][y].solidLeft,
				solidRight: this.tiles[x][y].solidRight,
				solidTop: this.tiles[x][y].solidTop,
				solidBottom: this.tiles[x][y].solidBottom
			});
		}
	}

	let newFile = new File([JSON.stringify(toSave)], "game_world.json", {
		type: "application/json;charset=utf-8"
	});
	let newBlob = new Blob([JSON.stringify(toSave)], {
		type: "application/json"
	});

	let url = window.URL.createObjectURL(newBlob);
	let anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = "game_save.json";

	anchor.click();
	window.URL.revokeObjectURL(url);
	document.removeChild(anchor);
};
