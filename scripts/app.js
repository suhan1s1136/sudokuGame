const closeGame=document.getElementById('gameclose');
const newGameButton=document.getElementsByClassName('newgame');
const solutionButton=document.getElementById('solution');
const eraseAll=document.getElementById('eraseall');
const gameboard = document.getElementById('gameboard');
const cells = gameboard.querySelectorAll('li');
const numPad=document.getElementById('numpad');
const numButtons=numPad.querySelectorAll('li');
const winText=document.getElementById('wintext');
const digitForm=document.getElementById('digitForm');
const takeInput=document.getElementById('takeinput');
eraseAll.addEventListener('click', fillGameboard);
let custom=false;



takeInput.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission behavior
  custom = true;
  TakeBoard();
});


for(const cell of cells){
    cell.addEventListener('click',selectedCell);

}
for(const num of numButtons){
    num.addEventListener('click',addNumber);
}
solutionButton.addEventListener('click',solveSudoku);
closeGame.addEventListener('click',removeText);



for (const button of newGameButton) {
  button.addEventListener('click', () => location.reload());
}


 

