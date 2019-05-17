window.onload = function() {
  var canvas = document.getElementById("sky");
  var context = canvas.getContext("2d");
  context.fillStyle = "white";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create 2-5 constellations
  var minConst = 2;
  var maxConst = 5;
  var minStarsPerConst = 7;
  var maxStarsPerConst = 45;
  var maxStarRadius = 3;
  var maxConstRadius = 0.3 * (Math.min(window.innerWidth, window.innerHeight));
  var starDelay = 100;
  var lineDrawChance = 0.5;

  var randomizeConsts = false;
  var randomizeConstRadius = true;
  var fixedConsts = [];
  var lastConst = 0; // set automatically

  function draw() {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.beginPath();

    if (randomizeConsts) {
      alert("hi");
      var numConst = Math.random() * (maxConst - minConst) + minConst;
      drawConstellations(numConst);
    } else {
      var left = window.innerWidth * 0.25;
      var left2 = window.innerWidth * 0.15;
      var right = window.innerWidth * 0.75;
      var right2 = window.innerWidth * 0.85;
      var middle = window.innerWidth * 0.5;
      var top = window.innerHeight * 0.25;
      var top2 = window.innerHeight * 0.15;
      var bot = window.innerHeight * 0.75;
      // var posTL = {x : left, y : top, size: 0.7};
      var posTL2 = {x : left2, y : top, size : 0.7};
      // var posTR = {x : right, y : top};
      var posTR2 = {x : right2, y : top, size : 0.7};
      var posT2M = {x : middle, y : top2, size : 0.5};
      var posBL = {x : left, y : bot, size : 1};
      var posBR = {x : right, y : bot, size : 1};
      fixedConsts = [];
      fixedConsts.push(posBL);
      fixedConsts.push(posBR);
      fixedConsts.push(posTL2);
      fixedConsts.push(posTR2);
      fixedConsts.push(posT2M);
      numConst = fixedConsts.length;
      drawConstellations(numConst);
    }
  }

  function drawConstellations(numConst) {
    if (numConst <= 0) {
      draw();
      return;
    }
    var constRadius = maxConstRadius * (Math.random() * 0.8 + 0.2);

    var x = 0;
    var y = 0;
    if (randomizeConsts) {
      x = Math.random() * (window.innerWidth - constRadius * 2) + constRadius;
      y = Math.random() * (window.innerHeight - constRadius * 2) + constRadius;
    } else {
      x = fixedConsts[numConst - 1].x;
      y = fixedConsts[numConst - 1].y;
      if (randomizeConstRadius) {
        constRadius *= fixedConsts[numConst - 1].size;
      } else {
        constRadius = maxConstRadius * fixedConsts[numConst - 1].size;
      }
    }
    var numStars = Math.random() * (maxStarsPerConst - minStarsPerConst) +
                   minStarsPerConst;
    drawStars(numStars, numConst, constRadius, x, y, []);
  }

  function drawStars(numStars, numConst, constRadius, centerx, centery, stars) {

    if (numStars > 0) {
      var x = centerx - constRadius + Math.random() * constRadius * 2;
      var y = centery - constRadius + Math.random() * constRadius * 2;

      var linesDrawn = 0;

      for (var i = 0; i < stars.length; i++) {
        var dist = Math.sqrt((x - stars[i].x) * (x - stars[i].x) +
                             (y - stars[i].y) * (y - stars[i].y)) /
                   2 / constRadius;
        if ((dist < 0.6 && (linesDrawn < 4 || dist < 0.2)) ||
            (i == stars.length - 1 && linesDrawn == 0)) {
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(stars[i].x, stars[i].y);

          var opacity = 1 - dist;

          context.strokeStyle =
              'rgba(255,255,255,' + parseFloat(opacity * opacity) + ')';
          context.stroke();
          linesDrawn++;
        }
      }
      context.beginPath();
      context.strokeStyle = "white";
      context.fillStyle = "white";
      context.arc(x, y, Math.random() * maxStarRadius, 0, Math.PI * 2, true);
      context.fill();
      stars.push({x : x, y : y});

      setTimeout(function() {
        drawStars(numStars - 1, numConst, constRadius, centerx, centery, stars);
      }, starDelay);
    } else {
      drawConstellations(numConst - 1);
    }
  }
  draw();
}