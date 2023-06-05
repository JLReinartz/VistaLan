import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://vistalan-dc166-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
let variableCounter = null;

const submit = document.getElementById("submit");

function saveData(refPath, data) {
    const dataRef = ref(database, refPath);
    push(dataRef, data);
  }
  
  function test() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const age = document.getElementById("age").value;
    const game = document.getElementById("game").value;
  
    if (!fname || !lname || !age || !game) {
      alert("Please fill in all the fields.");
    } else {
      const fullNameInDB = `person${variableCounter}/fullname`;
      const ageInDB = `person${variableCounter}/age`;
      const gameInDB = `person${variableCounter}/game`;
  
      const fullName = `${fname} ${lname}`;
  
      saveData(fullNameInDB, fullName);
      saveData(ageInDB, age);
      saveData(gameInDB, game);
  
      variableCounter++;
  
      location.reload();
    }
  }

submit.addEventListener("click", test);

onValue(ref(database), (snapshot) => {
    const persons = snapshot.val();
    if (persons) {
        const personKeys = Object.keys(persons);
        const lastPersonKey = personKeys[personKeys.length - 1];
        variableCounter = Number(lastPersonKey.substring(6)) + 1;
    } else {
        variableCounter = 1;
    }
});
