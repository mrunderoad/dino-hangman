import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinoGenerator from './dino.js';

function checkLoss(wrongLetter) {
  if (wrongLetter === 6) {
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
    console.log(dino);
    let dinoArray = dino.split("");
    let wordArray = [];
    let wrongLetter = 0;
    dinoArray.forEach(function() {
      wordArray.push("_ ");
    });
    $("#hangmanWord").text(wordArray.join(""));
    $("#formOne").submit(function(event){
      event.preventDefault();
      const input = $("#letter").val();
      console.log(input);
      if (dinoArray.includes(input)) {
        dinoArray.forEach(function(letter, index) {
          if (letter === input) {
            wordArray[index] = letter;
          }
        });
        if (checkWin(wordArray)) {
          $("#game").hide();
          $("#win").show();
        }
      } else {
        $("#guessedLetters").append(input);
        wrongLetter++;
        if (checkLoss(wrongLetter)) {
          $("#game").hide();
          $("#loss").show();
        }
      }
    $('#hangmanWord').text(wordArray.join(''));
    $("#letter").val("");
    console.log(wrongLetter);
    });
  });
});