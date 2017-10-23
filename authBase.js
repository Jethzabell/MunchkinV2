
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxNiW43QLES6cTIncOrOqTKbYpivgLM4w",
    authDomain: "veryfirst-e4512.firebaseapp.com",
    databaseURL: "https://veryfirst-e4512.firebaseio.com",
    projectId: "veryfirst-e4512",
    storageBucket: "veryfirst-e4512.appspot.com",
    messagingSenderId: "962525809825"
  };
  firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
var user;

function signIn(){
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult(provider).then(function(result) {

    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });
}

//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
  if(user) {
    //window.location = 'tutorial.html'; //After successful login, user will be redirected to home.html
    console.log(user.displayName);
  }
});
