import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoGenerator from './dino.js';

function checkLoss(wrongLetter) {
  if (wrongLetter === 10) {
    return true;
  } else {
    return false;
  }
}

function checkWin(wordArray) {
  if (wordArray.includes("_ ")){
    return false;
  } else {
    return true;
  }
}



$(document).ready(function() {
  let promise = DinoGenerator.getDino();
  promise.then(function(response) {
    const body = JSON.parse(response);
    const dino = body[0][0].toLowerCase();
    let dinoArray = dino.split("");
    let wordArray = [];
    let wrongLetter = 0;
    dinoArray.forEach(function() {
      wordArray.push("_ ");
    })
    $("").text(wordArray.join(""));
    $("#formOne").submit(function(event){
      event.preventDefault();
      const input = $("#letter").val();
      if (dinoArray.includes(input)) {
        dinoArray.forEach(function(letter, index) {
          if (letter === input) {
            wordArray[index] = letter;
          }
        });
      })
    })
  })
});

// discord went down? stuck in a loading circle