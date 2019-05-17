window.onload = function() {
  var canvas = document.getElementById("sky");
  var context = canvas.getContext("2d");
  context.fillStyle = "white";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create 2-5 constellations
  var minConst = 2;
  var maxConst = 5;
  var minStarsPerConst = 5;
  var maxStarsPerConst = 8;
  var maxStarRadius = 3;
  var maxConstRadius = 0.4 * (Math.min(window.innerWidth, window.innerHeight));
  var starDelay = 400;
  var lineDrawChance = 0.5;

  function draw() {
    var numConst = Math.random() * (maxConst - minConst) + minConst;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.beginPath();
    drawConstellations(numConst);
  }

  function drawConstellations(numConst) {
    if (numConst <= 0) {
      draw();
      return;
    }
    var constRadius = maxConstRadius * (Math.random() * 0.9 + 0.1);
    var x = Math.random() * (window.innerWidth - constRadius * 2) + constRadius;
    var y =
        Math.random() * (window.innerHeight - constRadius * 2) + constRadius;
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