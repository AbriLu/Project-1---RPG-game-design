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


// xpText,healthText,goldText,monsterName,monsterHealth,text -- reference variables

//Initialising buttons

button1.onclick = goStore;  // goStore is a function
button2.onclick = goCave;
button3.onclick = fightDragon;

function goStore() {
    console.log("Going to store.");
}

function goCave() {
    console.log("Going to store.");
}

function fightDragon() {
    console.log("Going to store.");
}