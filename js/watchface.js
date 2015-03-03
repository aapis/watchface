var WatchFace = function(config){
  this.resource = config;
  this._drawn = false;
  this.draw();

  return this;
};

WatchFace.prototype.draw = function(){
  if(!this._drawn){
    try {
      if(this.resource.style == "circle" || this.resource.style == undefined){ 
        this.circle(this.resource.height, this.resource.width);
      }else {
        this.square(this.resource.height, this.resource.width);
      }
      this._drawn = true;
    }catch(err){
      this._drawn = false;
    }
  }
};

WatchFace.prototype.circle = function(height, width){
  this.resource.context.beginPath();
  this.resource.context.arc(width/2, height/2, height/width * 100, 0, Math.PI*2, true);
  this.resource.context.closePath();
  
  // do save/restore in here
  design = new WatchFace.Design(this.resource.context);
  design.set_opacity(0.5);
  design.set_fill_style();
  design.draw();
};

WatchFace.Design = function(ctx){
  this.context = ctx;
  this.opacity = 1;
};

WatchFace.Design.prototype.set_fill_style = function(){
  this.context.fillStyle = "rgba(0,0,0,"+ this.opacity +")";
};

WatchFace.Design.prototype.set_opacity = function(opacity){
  this.opacity = opacity;
};

WatchFace.Design.prototype.draw = function(){
  this.draw_time();
  // custom face design
  this.draw_custom_face();

  // draw to canvas
  this.context.fill();
};

WatchFace.Design.prototype.draw_time = function(){
  this.context.font = "20px Georgia";

  if(this.type = "digital"){
    this.context.fillText("hello, world", 50, 50);
  }else {
    // draw analog hands and shit
  }
};

WatchFace.Design.prototype.draw_custom_face = function(){

};