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
    }
];

// xpText,healthText,goldText,monsterName,monsterHealth,text -- reference variables

//Initialising buttons

button1.onclick = goStore;  // goStore is a function
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
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

function fightDragon() {
    console.log("Fighting dragon.");
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

function buyWeapon() {
    if (gold >= 30) {
        gold -= 30;
        currentWeapon++;
        goldText.innerText = gold;
        text.innerText = "You now have a new weapon."
    }
}

// Fight dargon page button functions

function fightSlime() {
    console.log("Going to you bought 10 health.");
}

function fightBeast() {
    console.log("Going to you bought 10 health.");
}





