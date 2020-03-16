const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'Player attack';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'Player strong attack';
const LOG_EVENT_PLAYER_HEAL = 'Player heal';
const LOG_EVENT_MONSTER_ATTACK = "Monster attack";
const LOG_EVENT_GAME_OVER = "Game over";

const enteredValue = prompt("Maximum health for you and monster:", '100');

let chosenMaxLife = parseInt(enteredValue);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0){
    chosenMaxLife = 100;
}

function attackMonster(type){
    const maxDamage = type === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = type === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACKK;
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        alert('You would be dead but bonus life saved you');
        setPlayerHealth(initialPlayerHealth);
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        alert("It's a draw!");
        writeToLog(LOG_EVENT_GAME_OVER, 'draw', currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth <= 0){
        alert("You lost!");
        writeToLog(LOG_EVENT_GAME_OVER, 'monster', currentMonsterHealth, currentPlayerHealth);
    } else if (currentMonsterHealth <= 0){
        alert("You won!");
        writeToLog(LOG_EVENT_GAME_OVER, 'player', currentMonsterHealth, currentPlayerHealth);
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0){
        reset();
    }
}

function writeToLog(ev, val, monsterHealth, playerHealth){
    logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
        }
    battleLog.push(logEntry);
    }


function reset(){
    currentPlayerHealth = chosenMaxLife;
    currentMonsterHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function attackHandler(){
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}

function healHandler(){
    let healValue;
    if (HEAL_VALUE > chosenMaxLife - currentPlayerHealth){
        alert("You can't heal above max health!");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;   
    }
    
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function printLogHandler(){
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', printLogHandler);