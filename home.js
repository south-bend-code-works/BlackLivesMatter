var myDataRef;
var user;

(function(){
  $(document).ready(init);

  function init(){
    $('#alert').click(emailAlert);
    $('#contacts').click(redirectRegister);

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
    console.log("1"+user);
  }

  function emailAlert(){
    myDataRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        emailjs.send("sendgrid", "template_DcXloNwt", {"name_r":childData.name,"name_s":user,"email_r":childData.email});
      });
    });
    alert("Your contacts have been alerted!");
  }

  function redirectRegister() {
    window.location.replace("./register.html?user=" + user);
  }

})();
