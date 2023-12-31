isloop = false;
alg = false;
function setup() {
  w = 768;
  w1 = 1186;
  createCanvas(w, w1);
  background(0);
  strokeWeight(4);
  pixelDensity(10);
  pad = w / 20;
  pad1 = w1 / 20;
  thediv = createDiv("");
  thediv.addClass("div1");
  dimP = createP("");
  drawBtn = createButton("Draw");
  drawBtn.addClass("drawbutton");
  drawBtn.mousePressed(() => {
    background(0);
    if (alg)
      createCell(pad, pad, w - pad * 2, w1 - pad1 * 2, numSlider.value());
    else createCell2(pad, pad, w - pad * 2, w1 - pad1 * 2, numSlider.value());
  });
  saveBtn = createButton("Save");
  saveBtn.addClass("savebutton");
  saveBtn.mousePressed(() => {
    save("Grid.png");
  });
  algBtn = createButton("Algorithm 1");
  algBtn.addClass("algbutton");
  algBtn.mousePressed(() => {
    alg = !alg;
    // algBtn.toggleClass("active");
    algBtn.html(alg ? "Algorithm 2" : "Algorithm 1");
  });
  loopBtn = createButton("Loop");
  loopBtn.addClass("loopbutton");
  // loopBtn.addClass("active");
  loopBtn.mousePressed(() => {
    isloop = !isloop;
    loopBtn.toggleClass("active");
    loopBtn.html(isloop ? "Stop" : "Loop");
  });

  updateBtn = createButton("Update Canvas");
  updateBtn.mousePressed(() => {
    resizeCanvas(parseInt(inputDim1.value()), parseInt(inputDim2.value()));
    background(0);
    w = parseInt(inputDim1.value());
    w1 = parseInt(inputDim2.value());
    pad = w / 20;
    pad1 = w1 / 20;
    dimP.html(`Dimensions:${inputDim1.value()}px x ${inputDim2.value()}px`);
  });
  numSlider = createSlider(1, 20, 5, 1);
  numSlider.addClass("custom");
  inputDim1 = createInput("768");
  inputDim2 = createInput("1186");
  thelittlediv = createDiv("");
  thelittlediv.addClass("div2");
  thelittlediv.child(dimP);
  thelittlediv.child(inputDim1);
  thelittlediv.child(createSpan("x"));
  thelittlediv.child(inputDim2);
  thelittlediv.child(updateBtn);
  //add all sliders and buttons to the thediv

  // thediv.child(inputDim1);
  // thediv.child());
  // thediv.child(inputDim2);
  thediv.child(drawBtn);
  thediv.child(saveBtn);
  thediv.child(algBtn);
  thediv.child(loopBtn);
  thediv.child(numSlider);
  themaindiv = createDiv("");
  themaindiv.addClass("divmain");
  themaindiv.child(thediv);
  themaindiv.child(thelittlediv);
  spcX = 100;
  spcY = 100;
  frameRate(1);
  //rectMode(CENTER)
  noFill();
  strokeWeight(2);
  background(0);
  stroke(255);
}

function draw() {
  //This is a recursive function which sort of uses the block tree logic, honestly I don't know how to explain it just watch the Shiefman video
  if (isloop) {
    background(0);
    if (alg)
      createCell(pad, pad, w - pad * 2, w1 - pad1 * 2, numSlider.value());
    else createCell2(pad, pad, w - pad * 2, w1 - pad1 * 2, numSlider.value());
  }
  // noLoop();
}
function keyPressed() {
  if (key === "s") {
    save("mySketch.png");
  }
}
function createCell(posX, posY, wid, hei, depth) {
  if (depth > 0) {
    var div = random(0.1, 1);
    if (random() > 0.5) {
      createCell(posX, posY, wid, hei * div, depth - 1);
      createCell(posX, posY + hei * div, wid, hei * (1 - div), depth - 1);
    } else {
      createCell(posX, posY, wid * div, hei, depth - 1);
      createCell(posX + wid * div, posY, wid * (1 - div), hei, depth - 1);
    }
  } else {
    rect(posX, posY, wid, hei);
  }
}

function createCell2(posX, posY, wid, hei, depth) {
  if (depth > 0) {
    createCell2(posX, posY, wid / 2, hei / 2, depth - int(random([1, 2])));
    createCell2(
      posX + wid / 2,
      posY,
      wid / 2,
      hei / 2,
      depth - int(random([1, 10]))
    );
    createCell2(
      posX,
      posY + hei / 2,
      wid / 2,
      hei / 2,
      depth - int(random([1, 4]))
    );
    createCell2(
      posX + wid / 2,
      posY + hei / 2,
      wid / 2,
      hei / 2,
      depth - int(random([1, 4]))
    );
  } else {
    rect(posX, posY, wid, hei);
    point(posX + wid / 2, posY + hei / 2);
  }
}
