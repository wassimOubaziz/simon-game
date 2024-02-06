//Start Logique
let levelsArray = [];
let counter = 1;

makeLevels();

//Functions
function randomNum() {
  return Math.floor(Math.random() * 4);
}

function makeLevels() {
  for (let i = 0; i < 15; i++) {
    let arr = [];
    for (let j = 0; j < counter; j++) {
      arr.push(randomNum());
    }
    levelsArray.push(arr);
    counter++;
  }
}

function start() {
  let k = 0;
  animate(k);
  setTimeout(() => {
    removeClass("active");
    main.style.pointerEvents = "auto";
  }, levelsArray[index].length * 1000 + 1000);
}

function animate(k) {
  setTimeout(() => {
    boxes[levelsArray[index][k]].classList.add("active");
    audios[levelsArray[index][k]].play();
    setTimeout(() => {
      if (
        (boxes[levelsArray[index][k]] ?? false) &&
        boxes[levelsArray[index][k]].classList.contains("active")
      )
        boxes[levelsArray[index][k]].classList.remove("active");
    }, 800);
    k++;
    if (k < levelsArray[index].length) {
      animate(k);
    }
  }, 1000);
}

function removeClass(name) {
  boxes.forEach((box) => {
    box.classList.remove(name);
  });
}

function check() {
  if (
    JSON.stringify(testArray) == JSON.stringify(levelsArray[index]) &&
    levelsArray[index].length == testArray.length
  ) {
    header.innerHTML = `Level <span>${++counterLevel}</span>`;
    testArray = [];
    index++;
    main.style.pointerEvents = "none";
    setTimeout(() => {
      start();
    }, 1200);
  } else if (
    JSON.stringify(testArray) !== JSON.stringify(levelsArray[index]) &&
    levelsArray[index].length <= testArray.length
  ) {
    header.innerHTML = `You lose at level ${counterLevel} <br> reload to play again`;
    audios[4].play();
    testArray = [];
    main.style.opacity = "0.3";
    main.style.pointerEvents = "none";
  }
}

//End Logique

// Dom
const boxes = document.querySelectorAll("body main .box");
const audios = document.querySelectorAll("body audio");
const main = document.querySelector("body main .boxes");
let header = document.querySelector("h1");
let counterLevel = 1;
let index = 0;
let firstPlay = true;
let testArray = [];

window.addEventListener("keypress", function (e) {
  if (e.code == "Space" && firstPlay) {
    firstPlay = false;
    main.style.opacity = "1";
    main.style.pointerEvents = "auto";
    header.innerHTML = `Level <span>${counterLevel}</span>`;
    start();
  }
});

boxes.forEach((box, index) => {
  box.addEventListener("click", function () {
    box.classList.add("active");
    setTimeout(() => {
      removeClass("active");
    }, 600);
    audios[index].play();
    testArray.push(index);
    check();
  });
});
