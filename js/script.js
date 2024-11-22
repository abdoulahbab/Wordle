
const letters = document.querySelectorAll('.scoreboard-letter');
const word="";
console.log(letters);
let currentIndex=0;
function handleKeyDown(event) {
    letter=event.key;
    console.log(event);
    console.log(`Key pressed: ${letter}`);

    DisplayLetter(letter);   

}



window.addEventListener("keydown", handleKeyDown);
function DisplayLetter(letter){
    if(Validate(letter)) {letters[currentIndex++].textContent = letter.toUpperCase( );
       
    }
    

}
function Validate(letter){
  return /^[a-zA-Z]$/.test(letter);
}