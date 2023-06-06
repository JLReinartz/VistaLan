import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://vistalan-dc166-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

let counter = 0;

function incrementCounter() {
  const counterRef = ref(database, "person/counter");
  transaction(counterRef, (currentCount) => {
    return (currentCount || 0) + 1;
  });
}

function saveData(refPath, data) {
  const dataRef = ref(database, refPath);
  push(dataRef, data);
}

function test(event) {
  event.preventDefault(); // Prevent form submission

  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const age = document.getElementById("age").value;
  const game = document.getElementById("game").value;

  if (!fname || !lname || !age || !game) {
    alert("Please fill in all the fields.");
  } else {
    const fullNameInDB = `person/fullname`;
    const gameInDB = `game`;

    const fullName = `${fname} ${lname} ${age}`;

    saveData(fullNameInDB, fullName);
    saveData(gameInDB, game);

    incrementCounter();

    location.reload();
  }
}

const submit = document.getElementById("submit");
submit.addEventListener("click", test);

const gameRef = ref(database, "game");
onValue(gameRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const gameData = childSnapshot.val();
    console.log("Game: " + gameData);
  });
});

const fullNameRef = ref(database, "person/fullname");
onValue(fullNameRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const fullNameData = childSnapshot.val();
    console.log("Name and mail: " + fullNameData);
  });
});
