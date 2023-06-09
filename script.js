let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// Referencing HTML elements (in this case we are starting with buttons) by their ID

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const text = document.querySelector("#text");
const monsterStats = document.querySelector("#monsterStats");

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore,goCave,fightDragon],
        text: "You are in the town sqaure. You see a sign that says \"store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 Health (10 gold)", "Buy weaon (30 gold)", "Go to town square"],
        "button functions": [buyHealth,buyWeapon,goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime,fightBeast,goTown],
        text: "You enter the cave, you see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack,dodge,goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown,goTown,goTown],
        text: "The monster screams \"Arg!\" as it dies. You gain experience points and find gold."
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart,restart,restart],
        text: "You die."
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart,restart,restart],
        text: "You defeat the dragon! YOU WIN THE GAME!"
    }
];

// xpText,healthText,goldText,monsterName,monsterHealth,text -- reference variables

//Initialising buttons

button1.onclick = goStore;  // goStore is a function
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";  // Makes the monster stats disappear when the location is updated
    console.log("Going to store.");
    button1.innerText = location["button text"][0];  // changing the text on button 1
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];  // goStore is a function
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

// Game page buttons functions


function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

// Store page buttons functions

function goTown() {
    update(locations[0]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift;  // This "currentWeapon" variable is inly scoped inside this "if" statement.
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!";
        text.innerText += " In your inventory you have: " + inventory;
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length) {
        if (gold >= 30) {
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory; 
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
            text.innerText += " In your inventory you have: " + inventory;
        }
    } else {
        currentWeapon = weapons.length - 1;
        text.innerText = "You already have the most powerful weapon.";
        text.innerText += " In your inventory you have: " + inventory;
        button1.innerText = "Sell weapon (15 gold)";
        button1.onclick = sellWeapon;
    }
}

// Fight dargon page button functions

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";   // This is how we can update CSS styles through JavaScript.
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack () {
    text.innerText = "The " + monsters[fighting].name + " attacks";
    text.innerText = "You attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();   // Ternary operation was used to implement a conditional (if else) operation
    }
}

function dodge () {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4])
}

function lose() {
    update(locations[5]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ['stick'];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function winGame() {
    update(locations[6]);
}