const ruleBtn = document.querySelectorAll('.ruleBtn');
const resetScoreBtn = document.querySelectorAll('.resetScoreBtn');
const modalClose = document.querySelectorAll('.modal__close');
const paperIcon = document.querySelectorAll('.icon--paper-position');
const rockIcon = document.querySelectorAll('.icon--rock-position');
const scissorsIcon = document.querySelectorAll('.icon--scissors-position');
const selctItem = document.querySelectorAll('.selctItem');
const humanPick = document.querySelectorAll('.humanPick');
const scoreContainer = document.querySelectorAll('.score-container');
const humanRadicalBg = document.querySelectorAll('.humanRadicalBg');
const computerRadicalBg = document.querySelectorAll('.computerRadicalBg');

let computerScore = 0 ;
let humanScore = 0;

window.addEventListener('load', () => {
    if(!localStorage.length == 0){
        const lSHumanScore = localStorage.getItem('Human');
        const lSComputerScore = localStorage.getItem('computer');
        computerScore = lSComputerScore;
        humanScore = lSHumanScore ;
        scoreContainer[0].firstElementChild.lastElementChild.innerText = lSHumanScore;
        scoreContainer[0].lastElementChild.lastElementChild.innerText = lSComputerScore;
    }
});

ruleBtn.forEach(el => {
    el.addEventListener('click', () => {
        console.log(ruleBtn);
        let modelContainer = el.previousElementSibling;
        modelContainer.classList.remove('hide-item');
    })
});

resetScoreBtn.forEach(el =>{
    el.addEventListener('click', () => {
        computerScore = 0;
        humanScore = 0;
        scoreContainer[0].firstElementChild.lastElementChild.innerText = humanScore;
        scoreContainer[0].lastElementChild.lastElementChild.innerText = computerScore;
        localStorage.clear();

    })
})

modalClose.forEach(el => {
    el.addEventListener('click', function(){
        let modelContainer = el.parentElement.parentElement.parentElement;
        modelContainer.classList.add('hide-item');
    })
});

paperIcon.forEach(el => {
    // console.log(el);
    el.addEventListener('click', function(){
        let selctItemDiv = el.parentElement.parentElement;
        let pickContainerDiv = el.parentElement.parentElement.nextElementSibling;
        // console.log('paper clicked');
        itemSelected('paper','icon--paper', selctItemDiv, pickContainerDiv);
    })
})

rockIcon.forEach(el => {
    // console.log(el);
    el.addEventListener('click', function(){
        let selctItemDiv = el.parentElement.parentElement;
        let pickContainerDiv = el.parentElement.parentElement.nextElementSibling;
        // console.log('rock clicked');
        itemSelected('rock','icon--rock', selctItemDiv, pickContainerDiv);
    })
})

scissorsIcon.forEach(el => {
    // console.log(el);
    el.addEventListener('click', function(){
        let selctItemDiv = el.parentElement.parentElement;
        let pickContainerDiv = el.parentElement.parentElement.nextElementSibling;
        // console.log('scissors clicked');
        itemSelected('scissors','icon--scissors', selctItemDiv, pickContainerDiv);
    })
})

function itemSelected(typeOfItem ,itemBorderClass, selectItemdiv,pickContainerDiv){
    console.log(itemBorderClass); // current class which has to be added
    console.log(selectItemdiv);
    // hide the current div & show the next div
    selectItemdiv.classList.add('hide');
    pickContainerDiv.classList.remove('hide');

    // Add the selected class into humanpick class
    humanPick.forEach(humanElem => {
        // checking if there are any classes exist if any remove them
        if(humanElem.classList.contains('icon--paper')){
            humanElem.classList.remove('icon--paper');
        }
        if(humanElem.classList.contains('icon--rock')){
            humanElem.classList.remove('icon--rock');
        }
        if(humanElem.classList.contains('icon--scissors')){
            humanElem.classList.remove('icon--scissors');
        }

        humanElem.classList.add(itemBorderClass);
        let humanpickChildren = humanElem.children;
        console.log(humanpickChildren);
        
        for(item of humanpickChildren){
            console.log(item);
            if(item.classList.contains(typeOfItem)){
                item.classList.remove('hide');
            }else{
                item.classList.add('hide');
            }
        }

        // setting up computer Random item
        let computerPick = document.querySelectorAll('.computerPick');
        let arrayItems = ["rock", "paper", "scissors"];
        let randomArrayitem = arrayItems[Math.floor(Math.random() * arrayItems.length)];
        console.log(randomArrayitem);
        computerPick.forEach(comElem => {
            console.log(comElem);

            if(comElem.classList.contains('icon--paper')){
                comElem.classList.remove('icon--paper');
                comElem.classList.remove('icon--big');
            }
            if(comElem.classList.contains('icon--rock')){
                comElem.classList.remove('icon--rock');
                comElem.classList.remove('icon--big');
            }
            if(comElem.classList.contains('icon--scissors')){
                comElem.classList.remove('icon--scissors');
                comElem.classList.remove('icon--big');
            }

            comElem.classList.add('icon--big', 'icon--'+randomArrayitem);
            comElem.classList.remove('empty-icon');

            let compPickChildren = comElem.children;
            for(item of compPickChildren){
                console.log(item);
                if(item.classList.contains(randomArrayitem)){
                    item.classList.remove('hide');
                }else{
                    item.classList.add('hide');
                }
            }
        })

        // displaying the result
        const playAgainContainer = document.querySelectorAll('.play-again');

        playAgainContainer.forEach(playAgainElem => {
            // console.log(playAgainElem);
            playAgainElem.classList.remove('hide');

            // change the content based on the win/loss/ draw
            let displayResultElem = playAgainElem.children;
            for(item of displayResultElem){
                console.log(item);
                if(item.classList.contains('play-again__heading')){
                    // print the statement

                     // Checking for the result now
                    // possibilities if both are equal
                    scoreContainer.forEach(scoreContainerDiv =>{
                        if(typeOfItem === randomArrayitem){
                            item.innerText = 'Draw';
                        }else if(typeOfItem === 'paper' && randomArrayitem === 'rock'){
                            item.innerText = 'you win';
                            humanScore++;
                            humanRadicalBg[0].classList.remove('hide');
                            humanRadicalBg[0].classList.add('radical-bg');
                        }else if(typeOfItem === 'rock' && randomArrayitem === 'scissors'){
                            item.innerText = 'you win';
                            humanScore++;
                            humanRadicalBg[0].classList.remove('hide');
                            humanRadicalBg[0].classList.add('radical-bg');
                        }else if(typeOfItem === 'scissors' && randomArrayitem === 'paper'){
                            item.innerText = 'you win';
                            humanScore++;
                            humanRadicalBg[0].classList.remove('hide');
                            humanRadicalBg[0].classList.add('radical-bg');
                        }else{
                            item.innerText = 'you loss';
                            computerScore++;
                            computerRadicalBg[0].classList.remove('hide');
                            computerRadicalBg[0].classList.add('radical-bg');
                        }
                        console.log(typeOfItem , randomArrayitem);

                        let scoreContainerItems = scoreContainerDiv.children;
                        for(scoreElem of scoreContainerItems){
                            if(scoreElem.classList.contains('humanScore')){
                                scoreUpdate(scoreElem, humanScore);
                                localStorage.setItem('Human', humanScore);
                            }
                            if(scoreElem.classList.contains('computerScore')){
                                scoreUpdate(scoreElem, computerScore);
                                localStorage.setItem('computer', computerScore);
                            }
                        }
                    })
                }
                if(item.classList.contains('play-again__btn')){
                    item.addEventListener('click', ()=> {
                        console.log('clear everything');
                        // reset to starting state
                        playAgainElem.classList.add('hide');
                        playAgainElem.parentElement.classList.add('hide');
                        selctItem[0].classList.remove('hide');
                        

                        // save it to local storage (optional task)
                    })
                }
            }
        })
    })
}

function scoreUpdate(scoreElem , currentScore){
    const scoreBoard = scoreElem.children;
    for(score of scoreBoard){
        if(score.classList.contains('score__number')){
            console.log(score);
            score.innerText = currentScore;
        }
    }
}