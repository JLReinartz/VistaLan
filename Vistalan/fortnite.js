import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://vistalan-dc166-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

const submit = document.getElementById("submit");

/* function saveData(refPath, data) {
  const dataRef = ref(database, refPath);
  push(dataRef, data);
}### we gebruiken het niet :P ᓚᘏᗢ ###*/ 

function updateCounter() {
  const counterRef = ref(database, 'Fortniteplayers/counter');

  runTransaction(counterRef, (currentValue) => {
    return (currentValue || 0) + 1;
  });
}

function test() {
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const age = document.getElementById("age").value;
  const mail = document.getElementById("mail").value;
  const number = document.getElementById("number").value;

  if (!fname || !lname || !age || !mail) {
    alert("Please fill in all the fields.");
  } else {
    const FortnitePlayersRef = ref(database, 'Fortniteplayers/persons');

    push(FortnitePlayersRef, {
      fullname: `${fname} ${lname}`,
      age: age,
      mail: mail,
      number: number
    });

    updateCounter();

    location.reload();
  }
}

function logCounterValue() {
  const counterRef = ref(database, 'Fortniteplayers/counter');

  onValue(counterRef, (snapshot) => {
    const counterValue = snapshot.val();
    console.log("Counter", counterValue);
  });
}

logCounterValue();

submit.addEventListener("click", test);

onValue(ref(database, 'Fortniteplayers/FornitePlayers'), (snapshot) => {
  const FornitePlayers = snapshot.val();
  if (FornitePlayers) {
    const personKeys = Object.keys(FornitePlayers);
    const FornitePlayers = personKeys.length;
    console.log("Number of FornitePlayers: " + numberOfFornitePlayers);

    personKeys.forEach((personKey) => {
      const personData = FornitePlayers[personKey];
      const fullName = personData.fullname;
      const mail = personData.mail;
      console.log("Fullname: " + fullName);
      console.log("Email: " + mail);
    });
  }
});


const gameRef = ref(database, "game");
onValue(gameRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const gameData = childSnapshot.val();
    console.log("Game: " + gameData);
  });
});
