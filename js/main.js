var canvas;

window.onload = function(){
  canvas = new AbstractTriangles(window.innerWidth, window.innerHeight);
  var gui = new dat.GUI();
  var c1 = gui.add(canvas, 'triangleSets', 1, 5).step(1);
  var c2 = gui.add(canvas, 'trianglesPerSet', 1, 40).step(1);
  var c3 = gui.add(canvas, 'limitPointsToBounds');

  function cDraw(){
    canvas.draw(window.innerWidth, window.innerHeight);
  }

  // because AbstractTriangles object is static SVG these are needed.
  // alternatively alter frameUpdate to call canvas.draw(w,h);
  c1.onChange(cDraw);
  c2.onChange(cDraw);
  c3.onChange(cDraw);
};

window.onkeyup = function(e){
  if (e.keyCode == 186){
    canvas.draw(window.innerWidth, window.innerHeight);
  }
}

window.onresize = function(){
  canvas.draw(window.innerWidth, window.innerHeight);
}

var Point = function(x,y){
  var my = {'x': x, 'y':y};

  my.toSVGString = function(which){
    return (which == 1 ? 'M' : 'L') + this.x.toString() + ' ' + this.y.toString();
  }

  return my;
}


var AbstractTriangles = function(w, h){
  var width = w;
  var height = h;
  var paper = Raphael(0, 0, width, height);
  var my = {};

  my.triangleSets = 2;
  my.trianglesPerSet = 15;
  my.limitPointsToBounds = true;

  my.draw = function(w, h){
    //initialize and resize
    width = w;
    height = h;
    paper.setSize(width,height);

    //background
    paper.rect(0, 0, width, height).attr({
      'fill': '90-'+randomHexColor()+'-'+randomHexColor(), 
      'stroke-width': 0
    });
    
    //random triangles
    for (var i=0; i < my.triangleSets; i++){
      randomTriangles(my.trianglesPerSet, randomRGBA, randomRGBA, 0);
    }
  }

  //for when AbstractTriangles is initialized
  my.draw(width, height);

  function randomTriangles(count, fillColorFunction, strokeColorFunction, strokeWidth){
    var count  = randInt(count)+1;
    var point = randomPoint();
    for (var i=0; i < count; i++){
      triangle(point, randomPoint(), randomPoint(), fillColorFunction(), strokeColorFunction(), strokeWidth);
    }
  }

  function triangle(p1, p2, p3, fill, stroke, strokeWidth){
    paper.path(p1.toSVGString(1)+p2.toSVGString()+p3.toSVGString()+'Z').attr({
      'fill':fill,
      'stroke':stroke,
      'stroke-width': strokeWidth
    });
  }

  function randomPoint(){
    var margin = (my.limitPointsToBounds ? 0 : 300);
    var ret = new Point(randInt(width+margin*2)-margin, randInt(height+margin*2)-margin);
    return ret;
  }

  function randomHexColor(){
    var ret = '#' + randInt(0xffffff).toString(16);
    while (ret.length < 7){
      ret += '0';
    }
    return ret;
  }

  function randomRGBA(){
    return 'rgba(' + randInt(255) + ','
    + randInt(255)  + ','
    + randInt(255)  + ','
    + randFloat().toString().substr(0,4) + ')';
  }

  function randInt(upper){
    if (upper==null){
      upper = 1;
    }
    return Math.floor(Math.random()*upper);
  }

  function randFloat(upper){
    if(upper==null){
      upper = 1;
    }
    return Math.random()*upper;
  }

  return my;
}
