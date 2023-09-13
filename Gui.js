let terningdiv = document.getElementsByClassName("terningerne");

//Start på spil og terninger tilføjes
let holds = [false, false, false, false, false];

for (let i = 0; i < 5; i++) {
    let terning = document.createElement("img");
    if(holds[i]){
      terning.classList.add('held')
    }
    terning.addEventListener('click', function(){
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
            diceImg[i].src = (values[i]+1) + ".png";
        }
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

function toggleHold(terning, index){
  if(holds[index]){
    holds[index] = false;
    terning.classList.remove('held');
  } else {
    holds[index] = true;
    terning.classList.add('held');
  }
}


function getElm(name) {
    return document.getElementsByClassName(name);
}

for (let i of getValues()) {

}






//lyt efter klik på roll knap

//getElm("roll").addEventListener('click', throwDice);

//eventlistener til terninger for at holde på dem

