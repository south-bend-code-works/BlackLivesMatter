$(document).ready(function() {
    $("#loginBtn").click(redirectHome);
});

function redirectHome() {
  var user=$("#user").val()
  window.location.replace("./home.html?user=" + user);
}
