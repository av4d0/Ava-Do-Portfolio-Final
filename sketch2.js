let tiles = [];
let numTilesX = 10;
let numTilesY = 10;
let tileWidth, tileHeight;

function preload() {
  img = loadImage('orch1d.png');
}

function setup() {
  createCanvas(2000, 1000);
  tileWidth = width / numTilesX;
  tileHeight = height / numTilesY;
  
  for (let x = 0; x < numTilesX; x++) {
    for (let y = 0; y < numTilesY; y++) {
      let tile = new Tile(x * tileWidth, y * tileHeight, tileWidth, tileHeight, x, y);
      tiles.push(tile);
    }
  }
}

function draw() {
  background(0);
  
  for (let tile of tiles) {
    tile.display();
  }
}

class Tile {
  constructor(x, y, w, h, imgX, imgY) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imgX = imgX;
    this.imgY = imgY;
    this.hovered = false;
    this.offset = random(10);
  }
  
  isMouseOver() {
    return mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h;
  }
  
  display() {
    if (this.isMouseOver()) {
      this.hovered = true;
      let zoomFactor = 1.2;
      image(
        img, 
        this.x - this.w * (zoomFactor - 1) / 2, 
        this.y - this.h * (zoomFactor - 1) / 2, 
        this.w * zoomFactor, 
        this.h * zoomFactor, 
        this.imgX * tileWidth, 
        this.imgY * tileHeight, 
        tileWidth, 
        tileHeight
      );
    } else {
      this.hovered = false;
      image(
        img, 
        this.x, 
        this.y, 
        this.w, 
        this.h, 
        this.imgX * tileWidth, 
        this.imgY * tileHeight, 
        tileWidth, 
        tileHeight
      );
    }
  }
  
  clicked() {
    if (this.isMouseOver()) {
      this.x += random(-50, 50);
      this.y += random(-50, 50);
    }
  }
}

function mousePressed() {
  for (let tile of tiles) {
    tile.clicked();
  }
}