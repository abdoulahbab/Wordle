const letters = document.querySelectorAll('.scoreboard-letter');
let word = "";
let currentIndex = 0;
let count=0;
let trials=6;
let wordOfDay="";

async function fetchWord(url='') {
    try {
        const response=await fetch(url,{
            method:'GET',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data=await response.json();
        return data; 
    } catch (error) {
        console.log(error);
   
    }
    
}
async function ValidateWord(url='',word={}) {
    try {
        const response= await fetch(url,{
            method:'POST',
            headers:{  'Content-Type': 'application/json'},
            body:JSON.stringify(word)


        });
        if(!response.ok){
            throw new Error("Netwrok error");

        }
        const jsonResponse=await response.json();
        console.log(jsonResponse);
        return jsonResponse;
        
    } catch (error) {  
        console.log("an error has occured");
    }
}
fetchWord("https://words.dev-apis.com/word-of-the-day").then(
    data=>{
        wordOfDay=data.word.toUpperCase();
    }
)


function handleKeyDown(event) {
    const key = event.key;
    console.log(`Key pressed: ${key}`);
   
    handleWord(key);
    if (trials === 0) {
        window.alert("Sorry, you lost. Try again by reloading the page.");
        window.location.reload();
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
          testWord(word,trials);
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

function testWord(word,trials){
    console.log(word);
    ValidateWord("https://words.dev-apis.com/validate-word",{word:word}).then(
        data=>(data.validWord)? console.log("valid word"): window.alert("not a valid word")
    )
    const splittedWord=word.split("");
    const splittedWordOfDay=wordOfDay.split("");

    for( i=0;i<5;++i){
        if(!splittedWordOfDay.includes(splittedWord[i])){}
        else{
            letters[(6 - trials) * 5 + i].style.backgroundColor= (splittedWordOfDay[i]===splittedWord[i])?
           'lightgreen':'lightgrey'
            ;
        }
    }
    if(word===wordOfDay){
        document.querySelector('h2').style.color='red';
        window.location.reload();
    }
}

window.addEventListener("keydown", handleKeyDown);