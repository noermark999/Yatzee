let terningdiv = document.getElementsByClassName("terningerne");
let total = 0;

//Start på spil og terninger tilføjes
let holds = [false, false, false, false, false];

const inputFelter = document.querySelectorAll("input");
for (let e of inputFelter) {
  e.value = "";
  if (e.className == "selectable") {
    e.addEventListener('click', choosePoints);
  }
}

for (let i = 0; i < 5; i++) {
  let terning = document.createElement("img");
  if (holds[i]) {
    terning.classList.add('held')
  }
  terning.addEventListener('click', function () {
    toggleHold(terning, i);
  });
  terning.style.width = "50px";
  terning.style.margin = "5px"
  terningdiv[0].appendChild(terning);
}

// ----------------------------------------------------------------------

// Function til kast og sættes til knappen kast
function kast() {
  if (throwCount < 3) {
    //Mangler function til at se hvilke der skal holdes
    throwDice(holds);
    let diceImg = document.querySelectorAll("img");
    for (let i = 0; i < 5; i++) {
      let values = getValues();
      console.log(values);
      diceImg[i].src = (values[i]) + ".png";
    }
    updatePoint();
  }
  if (throwCount == 3) {
    let kastKnap = document.getElementsByClassName("kastKnap");
    kastKnap[0].disabled = true;
  }
  let turn = document.getElementById("turn");
  turn.innerHTML = "Tur: " + throwCount;
}

let kastBut = document.getElementsByClassName("kastKnap");
kastBut[0].addEventListener('click', kast)

// -----------------------------------------------------------------------------

const inputs = document.querySelectorAll("input");
for (let e of inputs) {
  e.readOnly = true;
  e.style.width = "40px";
}

// --------------------------------------------------------------------------

function toggleHold(terning, index) {
  if (holds[index]) {
    holds[index] = false;
    terning.classList.remove('held');
  } else {
    holds[index] = true;
    terning.classList.add('held');
  }
}

// -----------------------------------------------------------------------

function updatePoint() {
  const inputs = document.getElementsByClassName("selectable");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].disabled == false) {
      inputs[i].value = getResults()[i];
    }
  }
}

// -------------------------------------------------------------------------------


function choosePoints(events) {
  events.target.disabled = true;
  document.querySelector("button").disabled = false;
  throwCount = 0;
  holds = [false, false, false, false, false];
  for (let e of document.querySelectorAll("img")) {
    e.classList.remove('held');
  }
  let diceImg = document.querySelectorAll("img");
  for (let i = 0; i < 5; i++) {
    diceImg[i].src = "0.png";
  }
  let turn = document.getElementById("turn");
  turn.innerHTML = "Slå igen:"
  total += parseInt(events.target.value);
  let totalInput = document.getElementById("total");
  totalInput.value = total;
  const inputs = document.getElementsByClassName("selectable");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].disabled == false) {
      inputs[i].value = 0;
    }
  }
}