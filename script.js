const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var colForm = document.getElementsByName("colorOption");
const input = document.querySelector('input');
var styleOptions = document.forms['styleOption'].elements['style'];
var colorOptions = document.forms['colorOption'].elements['style'];
var colorDropDown = document.forms['colorOption'].elements['rgbColors'];
var constantSliders = document.getElementsByClassName('slider');
var simDropDown = document.getElementById('simType');
var secondaryPartsNum = document.getElementById('secondaryParticles');
var sliderCont = document.getElementById('slideContainer');
var resetButton = document.getElementById('resetSim');

const Lorenz = [10, 28, 8/3];
const TSUCS1 = [40, 0.833, 0.5, 0.65, 20];
const Popcorn2 = [0.05, 3];
const MIX = [10, 28, 8/3];
const supportedSims = [["Lorenz", Lorenz], ["TSUCS1", TSUCS1], ["Popcorn2", Popcorn2], ["Mix", MIX]];

const CSS_COLOR_NAMES = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DimGrey",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSlateGrey",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "RebeccaPurple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "SlateGrey",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen",
];

for (var i = 0; i < styleOptions.length; i++) {
    styleOptions[i].onclick = function() {
        userOptions.style = this.id;
    };
}

for (var i = 0; i < CSS_COLOR_NAMES.length; i++) {
  colorDropDown[0].innerHTML += "<option value='" + CSS_COLOR_NAMES[i] +  "'>" + CSS_COLOR_NAMES[i] + "</option>"
  colorDropDown[1].innerHTML += "<option value='" + CSS_COLOR_NAMES[i] +  "'>" + CSS_COLOR_NAMES[i] + "</option>"
}

colorDropDown[0].onchange = function(){
  if (userOptions.color !== "rainbow" && userOptions.color !== "ppcol") {
    userOptions.color = colorDropDown[0].value;
  }
}

for (var i = 0; i < supportedSims.length; i++){
  simDropDown.innerHTML += "<option value='" + supportedSims[i][0] +  "'>" + supportedSims[i][0] + "</option>"
}

function genSliders(){
  userOptions.attractor = simDropDown.value;
  sliderCont.innerHTML = "";
  for (var i = 0; i < supportedSims.length; i++){
    if (simDropDown.value === supportedSims[i][0]){
      var simConsts = supportedSims[i][1];
    }
  }
  for (var i = 0; i < simConsts.length; i++){
    sliderCont.innerHTML += '<input type="range" min="' + simConsts[i]/10 + '" max="' + (simConsts[i] * 2) + '" value="' + simConsts[i] + '" step ="' + simConsts[i]/10 +'" class="slider" id="' + i + '"></br>'
  }
  var constantSliders = document.getElementsByClassName('slider');

  for (var i = 0; i < constantSliders.length; i++){
    constantSliders[i].oninput = function(){
      simConsts[this.id] = this.value;
    }
  }
}

simDropDown.addEventListener('change', function(){
  genSliders();
})

resetButton.addEventListener('click', function(){
  particles = [];
  for (var i = 0; i < 100; i++){
    particles.push(new particle());
  }
  resetSim();
  genSliders();
});

for (var i = 0; i < colorOptions.length; i++) {
    colorOptions[i].onclick = function() {
        if (this.id === "rainbow" || this.id === "ppcol") {
          userOptions.color = this.id;
        }
        else {
          userOptions.color = colorDropDown[0].value;
        }
    };
}

for (var i = 0; i < constantSliders.length; i++){
  constantSliders[i].oninput = function(){
    switch(this.name){
      case "rho":
        Lorenz[1] = this.value;
        break;
      case "sigma":
        Lorenz[0] = this.value;
        break;
      case "beta":
        Lorenz[2] = this.value;
        break;
    }
  }
}



secondaryPartsNum.addEventListener('click', function(){
  if (this.value > userOptions.secondaryParts.length){
    var tmpParticlePointer = particles[Math.floor(Math.random() * particles.length)];
    tmpParticlePointer.secColor = true;
    userOptions.secondaryParts.push(tmpParticlePointer);
  }
  else if (this.value < userOptions.secondaryParts.length){
    var tmpParticlePointer = userOptions.secondaryParts[0];
    tmpParticlePointer.secColor = false;
    userOptions.secondaryParts.shift();
  }
});

canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function isColor(strColor){
  var s = new Option().style;
  s.color = strColor;
  return true;
}

function colorCycle(){
  var now = Date.now();
  if (now - userOptions.timeDelta < 2) {
    return 'rgb(' + userOptions.rainbow[0] + ', ' + userOptions.rainbow[1] + ', ' + userOptions.rainbow[2] + ")";
  }
  var r = userOptions.rainbow[0];
  var g = userOptions.rainbow[1];
  var b = userOptions.rainbow[2];
  if(r > 0 && b == 0){
    r--;
    g++;
  }
  if(g > 0 && r == 0){
    g--;
    b++;
  }
  if(b > 0 && g == 0){
    r++;
    b--;
  }
  userOptions.rainbow[0] = r;
  userOptions.rainbow[1] = g;
  userOptions.rainbow[2] = b;
  userOptions.timeDelta = Date.now();
  return 'rgb(' + r + ', ' + g + ', ' + b + ")";
}

class sim {
  constructor(name, consts){
    this.name = name;
    this.consts = consts;
    this.constDefault = (function() {
      var defaultArray = [];
      for (var i of consts) {
        defaultArray.push(i);
      }
      return defaultArray;
    })();
  }
}

class particle {
  constructor(){
    this.x = 0.01 + (userOptions.variance * Math.random()); 
    this.y = 0.01 + (userOptions.variance * Math.random()); 
    this.z = 0.01 + (userOptions.variance * Math.random()); 
    this.history = [];
    this.col = random_rgba();
    this.timeDelta = Date.now();
    this.secColor = false;
  }
}
  
class options {
  constructor(){
    this.style = "line";
    this.color = "rainbow";
    this.rainbow = [255, 0, 0];
    this.variance = 0.5;
    this.attractor = "Lorenz";
    this.secondaryParts = [];
  }
}

var userOptions = new options();

var particles = [];
for (var i = 0; i < 100; i++){
  particles.push(new particle());
}

var simSpecs = [];
for (var i = 0; i < supportedSims.length; i++){
  simSpecs.push(new sim(supportedSims[i][0], supportedSims[i][1]))
}

function resetSim(){
  for (var sim of supportedSims){
    for (var target of simSpecs){
      if(target.name === sim[0]){
        for (var i = 0; i < sim[1].length; i++){
          sim[1][i] = target.constDefault[i];
        }
      }
    }
  }
}

var mixCount = 0;
function updateParticles(){
  for (var p of particles){
    switch (userOptions.attractor) {
      case "Lorenz":
        var newx = (Lorenz[0] * (p.y - p.x)) * 0.01;
        var newy =  (p.x * (Lorenz[1] - p.z) - p.y) * 0.01;
        var newz = (p.x * p.y - Lorenz[2] * p.z) * 0.01;
        p.x = p.x + newx;
        p.y = p.y + newy;
        p.z = p.z + newz;
        break;
      case "TSUCS1":
        var newx = (TSUCS1[0] * (p.y - p.x) + TSUCS1[2] * p.x * p.z) * 0.001;
        var newy = (TSUCS1[4] * p.y - p.x * p.z) * 0.001;
        var newz = (TSUCS1[1] * p.z + p.x * p.y - TSUCS1[3] * (p.x * p.x)) * 0.001;
        p.x = p.x + newx;
        p.y = p.y + newy;
        p.z = p.z + newz;
        break;
      case "Popcorn2":
        var tmpx = p.x;
        var tmpy = p.y
        p.x = tmpx - (Popcorn2[0] * Math.sin(tmpy + Math.tan(Popcorn2[1] * tmpy)) * 2);
        p.y = tmpy - (Popcorn2[0] * Math.sin(tmpx + Math.tan(Popcorn2[1] * tmpx)) * 2);
        break;
      case "Mix":
        if(mixCount % 2 !== 0 && mixCount % 3 !== 0){
          var newx = (Lorenz[0] * (p.y - p.x)) * 0.01;
          var newy =  (p.x * (Lorenz[1] - p.z) - p.y) * 0.01;
          var newz = (p.x * p.y - Lorenz[2] * p.z) * 0.01;
          p.x = p.x + newx;
          p.y = p.y + newy;
          p.z = p.z + newz;
        }
        else {
          var tmpx = p.x;
          var tmpy = p.y;
          p.x = tmpx - (Popcorn2[0] * Math.sin(tmpy + Math.tan(Popcorn2[1] * tmpy)) * 2);
          p.y = tmpy - (Popcorn2[0] * Math.sin(tmpx + Math.tan(Popcorn2[1] * tmpx)) * 2);
        }
        break;
    }
    if (p.history.length < 100){
      p.history.push([p.x, p.y, p.z]);
    }
    else {
      p.history.shift();
      p.history.push([p.x, p.y, p.z]);
    }
    mixCount += Math.floor((Math.random() * 2));
    switch (userOptions.style) {
      case "line":
        ctx.strokeStyle = userOptions.color === "rainbow" ? colorCycle()
                          : userOptions.color === "ppcol" ? p.col : p.secColor === false ? userOptions.color : colorDropDown[1].value;
        ctx.lineWidth = 2;
        ctx.fillStyle = p.col;
        ctx.beginPath();
        ctx.moveTo(Math.floor(canvas.width / 2 + (p.history[0][0] * 10)), Math.floor(canvas.height / 2 + (p.history[0][1] * 10)));
        for (var hp = 1; hp < p.history.length; hp++){
          //console.log(p.history[hp]);
          ctx.lineTo(Math.floor(canvas.width / 2 + (p.history[hp][0] * 10)), Math.floor(canvas.height / 2 + (p.history[hp][1] * 10)));
        }
        ctx.stroke();
        break;
      default:
        ctx.fillStyle = userOptions.color === "rainbow" ? colorCycle()
                          : userOptions.color === "ppcol" ? p.col : p.secColor === false ? userOptions.color : colorDropDown[1].value;
        for (var hp of p.history){
          //console.log(p.history[hp]);
          ctx.fillRect(Math.floor(canvas.width / 2 + (hp[0] * 10)), Math.floor(canvas.height / 2 + (hp[1] * 10)), 2, 2);
        }
        break; 
    }
    //ctx.fillRect(canvas.width / 2 + (p.x * 10), canvas.height / 2 + (p.y * 10), 2, 2);
    //console.log(p.x, p.y);
  }
  requestAnimationFrame(animate);
}

function animate(now){
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  updateParticles();
}

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
requestAnimationFrame(animate);