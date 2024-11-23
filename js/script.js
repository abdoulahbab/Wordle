const letters = document.querySelectorAll('.scoreboard-letter');
let word = "";
let currentIndex = 0;
let count=0;
let trials=6;

function handleKeyDown(event) {
    const key = event.key;
    console.log(`Key pressed: ${key}`);
   
    handleWord(key);
    if (trials === 0) {
        window.alert("Sorry, you lost. Try again by reloading the page.");
    }
}

function handleWord(key) {
    if (isLetter(key)) {
        if(currentIndex<5){
            letters[(6-trials)*5+currentIndex].textContent = key.toUpperCase();
        word += key.toUpperCase();
        currentIndex++;
        }
        else{
            letters[(6-trials)*5+currentIndex-1].textContent = key.toUpperCase();
            word = word.slice(0,-1)+key.toUpperCase();
        }
        
    }
    else if (key === 'Enter') {
      console.log(word.length);
      if (word.length === 5) {
          console.log(word);
          word = ""; 
          currentIndex = 0;
          trials--;
      } else {
          console.log("Press enter after inserting 5 letters");
      }
  }
   else if (key === 'Backspace'&&currentIndex>=0) {
    currentIndex--;
    letters[(6 - trials) * 5 + currentIndex].textContent = "";
    word = word.slice(0, -1);
   }
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}



window.addEventListener("keydown", handleKeyDown);