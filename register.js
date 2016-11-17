var myDataRef;
var user;

$(document).ready(function() {
    $("#addBtn").click(addEmail);
    $("#doneBtn").click(redirectHome);
    $("#createAccountBtn").click(createAccount)

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCT0yJ8E5ZQcapsPtpE9PH27TLToIK_ZYM",
      authDomain: "blacklivesmatter-7f7b5.firebaseapp.com",
      databaseURL: "https://blacklivesmatter-7f7b5.firebaseio.com",
      storageBucket: "blacklivesmatter-7f7b5.appspot.com",
      messagingSenderId: "646257881900"
    };
    firebase.initializeApp(config);

    user = decodeURI(location.search.split('user=')[1]);

    myDataRef = firebase.database().ref(user);

    myDataRef.on('child_added', function(snapshot) {
      console.log(snapshot.key);
      if(snapshot.key !== "Description" && snapshot.key !== "ImageURL"){
        var message = snapshot.val();
        displayEmail(message.name, message.email);
      }
    });

});

function createAccount() {
  user =$("#user").val();
  myDataRef = firebase.database().ref(user);
  if(addEmail()) {

    alert("Created account!")
    redirectHome();
  }
}

function addEmail(){
  var email=$("#email").val()
  var name=$("#name").val()
  console.log(email+name)

  if(validateEmail(email)){
    myDataRef.push({name:name,email:email});
    return true;
  } else {
    alert("Please input a valid email address! ("+email+")");
    return false;
  }
}

function redirectHome() {
  window.location.replace("./home.html?user=" + user);
}

function displayEmail(name, email) {
  $('<div/>').text(email).prepend($('<b/>').text(name+' ')).appendTo($('#contacts'));
  $('#contacts')[0].scrollTop = $('#contacts')[0].scrollHeight;
};

function validateEmail(email) {
  valid = false;

  var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i

  if (filter.test(email))
    valid=true;
  else
    valid=false;

  return valid;
}
