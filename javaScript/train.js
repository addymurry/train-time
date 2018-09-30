$(document).ready(function(){
var config = {
    apiKey: "AIzaSyC3JTQfC-q98RV2C7j1VugAWFR1TVFzNP4",
    authDomain: "train-project-ace4e.firebaseapp.com",
    databaseURL: "https://train-project-ace4e.firebaseio.com",
    projectId: "train-project-ace4e",
    storageBucket: "",
    messagingSenderId: "27918875498"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$('#submit').on('click', function (event) {
    event.preventDefault();


    var Train = $("#Train").val().trim();
    var Destination = $("#Destination").val().trim();
    var Time = $("#Time").val().trim();
    var Frequency = $("#Frequency").val().trim();

    var ChooChoo = {
        Train: Train,
        Destination: Destination,
        Time: Time,
        Frequency: Frequency,
    }

    database.ref().push(ChooChoo);

    $('.form-control').val("");
console.log("ChooChoo")


});
database.ref().on('child_added', function (snapshot) {

    timeConverter = moment(snapshot.val().Time, 'HH:mm').subtract(1, 'years');

    timeOther = moment().diff(moment(timeConverter), 'minutes');

    timeLeft = timeOther % snapshot.val().Frequency;

    timeAway = snapshot.val().Frequency - timeLeft;

    arrival = moment().add(timeAway, 'minutes');

    var Schedule = $('<tr>').append(
        $('<td>').text(snapshot.val().Train),
        $('<td>').text(snapshot.val().Destination),
        $('<td>').text(snapshot.val().Frequency),
        $('<td>').text(arrival.format('HH:mm')),
        $('<td>').text(timeAway),

    )

    $('#theGoods').append(Schedule)


})
});