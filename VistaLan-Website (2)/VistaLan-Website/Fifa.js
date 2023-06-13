
// Initialize Firebase
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

document.getElementById("submit").addEventListener("click", function () {
  // Check if the cookie exists
  if (document.cookie.indexOf("formSubmitted=true") !== -1) {
    alert("You have already submitted the form. Please wait for 5 minutes before submitting again.");
    return;
  }

  // Get the input field values
  var firstName = document.getElementById("fname").value;
  var lastName = document.getElementById("lname").value;
  var email = document.getElementById("age").value;
  var captchaChecked = document.getElementById("captcha").checked;

  var emailPattern = /^\d{6}@vistacollege\.nl$/;
  var isValidEmail = emailPattern.test(email);

  if (!isValidEmail) {
    alert("Gebruik aub een geldige VISTA mail.");
    return;
  }
  if (!captchaChecked) {
    alert("Gelieve de captcha te controleren.");
    return;
  }

  // Create a reference to the Firebase Realtime Database
  var database = firebase.database();

  // Check for existing reservations with the provided email
  database
    .ref("reservaties")
    .orderByChild("email")
    .equalTo(email)
    .once("value")
    .then(function (snapshot) {
      if (snapshot.exists()) {
        // Email already used for a reservation
        alert("Deze e-mail is al gebruikt voor een reservering.");
      } else {
        // Email not used, proceed with making the reservation
        // Set the data in the database
        database
          .ref("reservaties")
          .push({
            firstName: firstName,
            lastName: lastName,
            email: email,
            Game: "Fifa"
          })
          .then(function () {
            console.log("Data successfully added to the database.");
            alert("Reservering succesvol gemaakt!");

            // Set the cookie with an expiry of 5 minutes
            var now = new Date();
            now.setTime(now.getTime() + 5 * 60 * 1000); // 5 minutes
            document.cookie = "formSubmitted=true; expires=" + now.toUTCString();
          })
          .catch(function (error) {
            console.error("Error adding data to the database: ", error);
          });
      }
    })
    .catch(function (error) {
      console.error("Error checking for existing reservations: ", error);
    });
});

