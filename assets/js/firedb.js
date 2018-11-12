<!DOCTYPE html>

<head>
        <meta charset="utf-8">

        <title>Intercambio</title>

          <!-- My firebase code -->
        <script src="https://www.gstatic.com/firebasejs/5.5.8/firebase.js"></script>   
    
        <!-- Easily add sign-in to your Web app with FirebaseUI -->
        <script src="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.js"></script>
        <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.css" />  

        <script>
        var config = {
                apiKey: "AIzaSyBW_UVlgoqHZOscL6qXeFaI-ouRD03Pwgw",
                authDomain: "intercambio-6993c.firebaseapp.com",
                databaseURL: "https://intercambio-6993c.firebaseio.com",
                projectId: "intercambio-6993c",
                storageBucket: "intercambio-6993c.appspot.com",
                messagingSenderId: "1001013270606"
            };
            firebase.initializeApp(config);
            
        </script>
</head>
<html>
    <body>
        <!-- The surrounding HTML is left untouched by FirebaseUI.
        Your app may use that space for branding, controls and other customizations.-->
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>

        <h1>WE ARE LIVE</h1>
        <p id="hola"></p>
    </body>
</html>


<!-- my firebase code -->
<script>
    //-----Getters------
    function displayWho(){


        //get current user
        var currentUser = firebase.auth().currentUser.uid;

        //Create references
        const dbRef = firebase.database().ref().child('Users/'+currentUser+'/Name/QuienTeToco');
        document.getElementById('hola').innerText = currentUser;
        //get the name of the user
        dbRef.on('value', gotData, errData);
    }

    function gotData(data){
        document.getElementById('hola').innerText = data.val();
    }

    function errData(err){
        console.log('Error: ' + err)
    }

    // FirebaseUI config.
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
            },
            uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    displayWho();
  } else {
    // No user is signed in.
  }
});


</script>



