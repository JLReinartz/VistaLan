var firebaseConfig = {
  apiKey: "AIzaSyCudlDAjHw0aR2dHolMEv-knjpPyQu9PoE",
  authDomain: "vistalan-dc166.firebaseapp.com",
  databaseURL:
    "https://vistalan-dc166-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vistalan-dc166",
  storageBucket: "vistalan-dc166.appspot.com",
  messagingSenderId: "770100937512",
  appId: "1:770100937512:web:2c6237b45c83b3a9d4061d",
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var reservatiesRef = database.ref("reservaties");
var contactRef = database.ref("contact");

reservatiesRef.on("value", function (snapshot) {
  var dataContainer = document.getElementById("data-container");
  dataContainer.innerHTML = ""; // Clear the existing data

  var count = 1;
  snapshot.forEach(function (childSnapshot) {
    var childData = childSnapshot.val();
    var row = document.createElement("tr");

    var numberCell = document.createElement("td");
    numberCell.textContent = count++;
    row.appendChild(numberCell);

    var nameCell = document.createElement("td");
    nameCell.textContent = childData.firstName + " " + childData.lastName;
    row.appendChild(nameCell);

    var emailCell = document.createElement("td");
    emailCell.textContent = childData.email;
    row.appendChild(emailCell);

    var gameCell = document.createElement("td");
    gameCell.textContent = childData.Game;
    row.appendChild(gameCell);

    dataContainer.appendChild(row);
  });
});

contactRef.on("value", function (snapshot) {
  var dataContainerContact = document.getElementById("data-container-contact");
  dataContainerContact.innerHTML = ""; // Clear the existing data

  var count = 1;
  snapshot.forEach(function (childSnapshot) {
    var childData = childSnapshot.val();
    var row = document.createElement("tr");

    var numberCell = document.createElement("td");
    numberCell.textContent = count++;
    row.appendChild(numberCell);

    var nameCell = document.createElement("td");
    nameCell.textContent = childData.firstName + " " + childData.lastName;
    row.appendChild(nameCell);

    var emailCell = document.createElement("td");
    emailCell.textContent = childData.email;
    row.appendChild(emailCell);

    var messageCell = document.createElement("td");
    messageCell.textContent = childData.message;
    row.appendChild(messageCell);

    dataContainerContact.appendChild(row);
  });
});


