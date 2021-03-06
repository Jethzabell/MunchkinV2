//I should use regex expression to get value html  "gear: value"

(function() {
  //Get elements
  const preObject = document.getElementById('object');
  const ulTable = document.getElementById('tabla');
  //Create references
  const dbRefObject = firebase.database().ref().child('Users');
  //Sync table changes
  dbRefObject.on('child_added', snap => {

    var gear = snap.child('Gear').val();
    var level = snap.child('Level').val();
    var name = snap.child('Name').val();
    var strenght = snap.child('Strenght').val();


    $(ulTable).append("<tr id="+snap.key+"><td>" + name + "</td><td>" + gear + "</td><td>" + level + "</td><td>" + strenght + "</td></tr>");

  });  //child_added

  dbRefObject.on('child_changed', snap => {

    var gear = snap.child('Gear').val();
    var level = snap.child('Level').val();
    var name = snap.child('Name').val();
    var strenght = snap.child('Strenght').val();

    $("#"+snap.key).html("<td>" + name + "</td><td>" + gear + "</td><td>" + level + "</td><td>" + strenght + "</td>");

  });  //child_changed

  dbRefObject.on('child_removed', snap => {

    var gear = snap.child('Gear').val();
    var level = snap.child('Level').val();
    var name = snap.child('Name').val();
    var strenght = snap.child('Strenght').val();

    $("#"+snap.key).html("<td>" + name + "</td><td>" + gear + "</td><td>" + level + "</td><td>" + strenght + "</td>").remove();

  }); //child_removed

  //Handle Account Status
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      var name = user.displayName;
      var photoURL = user.photoURL;

      console.log(name);
      $("#userName").html("Hello " + name);
      $("#profilePic").attr("src", photoURL);
      $("#collapseNavBar").hide();
    }
  });
}()); //end of function

function insertData() {

  var gear = document.getElementById('gear').value;
  var level = document.getElementById('level').value;
  var strenght = document.getElementById('strenght').value;

  firebase.database().ref('Users').set({
    Gear:gear,
    Level:level,
    Strenght:strenght
  });
  //I can call also doing jquery
  /*$('#addButton').click(function(){
    dbRefObject.push({
      Gear:$('#inputGear').val('');
      Level:$('#inputLevel').val('');
      Strenght:$('#inputSrenght').val('');
    });
  });*/
}

function insertAutoKey() {
  var gear = document.getElementById('gear').value;
  var level = document.getElementById('level').value;
  var strenght = document.getElementById('strenght').value;

  const dbRefObject = firebase.database().ref().child('Users');

  parseInt(gear);
  parseInt(strenght);
  parseInt(level);

  //A post entry
  var postData = {
    Gear:gear,
    Level:level,
    Strenght:strenght
  };

  //Get a key for a new post
  var newPostKey = dbRefObject.push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list
  var updates = {};
  updates['/Users/Jethzabell'] = postData;
  //updates['/Users/Jethzabell'+ newPostKey] = postData;
  //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  return firebase.database().ref().update(updates);
}

//-----Getters------
function getGear(){
  var gear;
  const preObject = document.getElementById('gearOut');
  var currentUser = firebase.auth().currentUser.uid;
  //Create references
  const dbRef = firebase.database().ref().child('Users/'+currentUser+'/Gear');

  //Sync object changes - tutorial.html
  dbRef.on('value', snap => {
    preObject.innerText = snap.val();
    gear = snap.val();
  });

  return gear;
}

function getStrenght(){
  var strenght;
  const preObject = document.getElementById('strenghtOut');
    var currentUser = firebase.auth().currentUser.uid;

  //Create references
  const dbRef = firebase.database().ref().child('Users/'+currentUser+'/Strenght');

  //Sync object changes - tutorial.html
  dbRef.on('value', snap => {
    preObject.innerText = snap.val();
    strenght = snap.val();
  });

  return strenght;
}

function getLevel(){
  var level;
  const preObject = document.getElementById('levelOut');
    var currentUser = firebase.auth().currentUser.uid;
  //Create references
  const dbRef = firebase.database().ref().child('Users/'+currentUser+'/Level');

  //Sync object changes - tutorial.html
  dbRef.on('value', snap => {
    preObject.innerText = snap.val();
    level = snap.val();
  });

  return level;
}

//------- Up --------
function levelUp(){
  var level = getLevel();
  var gear = getGear();
  var strenght = getStrenght();
  level++;
  strenght = gear + level;
  updateOps(gear, level, strenght)
}

function gearUp(){
  var level = getLevel();
  var gear = getGear();
  var strenght = getStrenght();
  gear++;
  strenght = gear + level;
  updateOps(gear, level, strenght)
}
//------ Down -------
function gearDown(){
  var level = getLevel();
  var gear = getGear();
  var strenght = getStrenght();
  gear--;
  strenght = level + gear;
  updateOps(gear, level, strenght);
}

function levelDown(){
  var level = getLevel();
  var gear = getGear();
  var strenght = getStrenght();
  level--;
  strenght = gear + level;
  updateOps(gear, level, strenght)
}
//--- Update Ops ----
function updateOps(gear, level, strenght){
  var name = firebase.auth().currentUser.displayName;
  const dbRefObject = firebase.database().ref().child('Users');
  var currentUser = firebase.auth().currentUser.uid;
  //A post entry
  var postData = {
    Gear:gear,
    Level:level,
    Name:name,
    Strenght:strenght
  };

  //Get a key for a new post
  var newPostKey = dbRefObject.push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list
  var updates = {};
  updates['/Users/'+currentUser] = postData;
  //updates['/Users/Jethzabell'+ newPostKey] = postData;
  //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  return firebase.database().ref().update(updates);
}

function restartGame(){
  updateOps(1,0,1);
}
// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: 'index.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
