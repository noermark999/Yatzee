let terningdiv = document.getElementsByClassName("terningerne");
let spilletTurer = 0;

//Start på spil og terninger tilføjes
let holds = [false, false, false, false, false];

//Gøre inputs clickable
const inputFelter = document.querySelectorAll("input");
for (let e of inputFelter) {
  e.value = "";
  if (e.className == "selectable") {
    e.addEventListener('click', choosePoints);
  }
}

//sæt img elementer ind
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

    throwDice(holds);
    let diceImg = document.querySelectorAll("img");
    for (let i = 0; i < 5; i++) {
      let values = getValues();
      diceImg[i].src = (values[i]) + ".png";
    }
    updatePoint();
  }
  if (throwCount === 3) {
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

// ---------------------------------------------------------------------------

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
  if (throwCount != 0) {
    events.target.disabled = true;
    if (spilletTurer < 14) {
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

      const inputs = document.getElementsByClassName("selectable");
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].disabled == false) {
          inputs[i].value = 0;
        }
      }

      document.getElementById("sum").value = sum();

      document.getElementById("bonus").value = bonus();

      document.getElementById("total").value = total();
      spilletTurer++;
    } else {
      document.getElementsByClassName("kastKnap")[0].disabled = true;
      if (myalert()) {
        location.reload();
      }
    }
  }
}


// --------------------------------------------------------------------------------------


function myalert() {
  return confirm("Du har fået " + total() + " points \nVil du starte et ny spil?");
}