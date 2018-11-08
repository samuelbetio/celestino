let prize = 0;
let possiblePrize = 10;
let prize2 = 0;
const numSix = 6;
const numOne = 1;
const numTen = 10;
const numFive = 5;
const numEleven = 11;
const numThirty = 30;
const numFifteen = 15;
const numSeven = 7;
let query = confirm('Do you want to play a game ?');
if (query === true) {
  let random = Math.floor(Math.random() * numSix);
  let attempts = 3;
  fn1();

  let fn1 = function game() {
    for (let i = 0; i < 3; i++) {
      let userAnswer = +prompt(
        'Enter number from 0 to 5\n' +
          'Attempts left: ' +
          attempts +
          '\nTotal Prize: ' +
          prize +
          '$' +
          '\nPossible prize on current attempt: ' +
          possiblePrize +
          '$'
      );
      if (random !== userAnswer) {
        --attempts;
        if (attempts === 3) {
          possiblePrize = numTen;
        } else if (attempts === 2) {
          possiblePrize = numFive;
        } else if (attempts === numOne) {
          possiblePrize = 2;
        }
      } else if (random === userAnswer) {
        if (attempts === 3) {
          prize = numTen;
          let mazltoff = confirm(
            'Congratulation! Your prize is: ' +
              prize +
              ' Do you want to continue?'
          );
          if (mazltoff === true) {
            fn();
          }
          break;
        } else if (attempts === 2) {
          prize = numFive;
          let mazltoff = confirm(
            'Congratulation! Your prize is: ' +
              prize +
              ' Do you want to continue?'
          );
          if (mazltoff === true) {
            fn();
          }
          break;
        } else if (attempts === numOne) {
          prize = 2;
          let mazltoff = confirm(
            'Congratulation! Your prize is: ' +
              prize +
              ' Do you want to continue?'
          );
          if (mazltoff === true) {
            fn();
          }

          break;
        }
      }
      if (attempts === 0) {
        alert('Thank you for a game. Your prize is: ' + prize);
      }
      if (userAnswer === false) {
        break;
      }
    }
  }

  let fn = function game2() {
    attempts = 3;
    random = Math.floor(Math.random() * numEleven);
    possiblePrize = numThirty;
    for (let i = 0; i < 3; i++) {
      let userAnswer = +prompt(
        'Enter number from 0 to 10\n' +
          'Attempts left: ' +
          attempts +
          '\nTotal Prize: ' +
          prize +
          '$' +
          '\nPossible prize on current attempt: ' +
          possiblePrize +
          '$'
      );
      if (random !== userAnswer) {
        --attempts;
        if (attempts === 3) {
          possiblePrize = numThirty;
        } else if (attempts === 2) {
          possiblePrize = numFifteen;
        } else if (attempts === numOne) {
          possiblePrize = numSeven;
        }
      } else if (random === userAnswer) {
        if (attempts === 3) {
          prize2 = numThirty;
          break;
        } else if (attempts === 2) {
          prize2 = numFifteen;
          break;
        } else if (attempts === numOne) {
          prize2 = numSeven;
          break;
        }
      }
      if (attempts === 0) {
        let totalPrize = prize + prize2;
        alert('Thank you for a game. Your prize is ' + totalPrize);
      }
      if (userAnswer === false) {
        break;
      }
    }
  }
  let again = confirm('Do you want to play again? ');
  if (again === true) {
    random = Math.floor(Math.random() * numSix);
    attempts = 3;
    prize = 0;
    possiblePrize = numTen;
    fn1();
  } else {
    let totalPrize = prize + prize2;
    alert('Thank you for a game. Your prize is: ' + totalPrize);
  }
} else {
  alert('You did not become a millionaire, but can.');
}
