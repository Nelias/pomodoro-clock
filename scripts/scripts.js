// Setting session and break length again will also reset a working clock
const setterIsResetter = () => {
	resetValue = 1;
	sessionsCounter = 0;
	document.getElementById("start-stop-button").innerHTML = "Start"
	document.getElementById("seconds-shown-on-clock").innerHTML = "00";
}

// Setting time values on the panel
document.getElementById("session-length-decrease-button").onclick = (e) => {
		let value = Number(document.getElementById("session-length-set-value").innerHTML);
		if (value > 0) {
			document.getElementById("session-length-set-value").innerHTML = value - 1;
			document.getElementById("minutes-shown-on-clock").innerHTML = value - 1;
			setterIsResetter();
		}
}

document.getElementById("session-length-increase-button").onclick = (e) => {
    let value = Number(document.getElementById("session-length-set-value").innerHTML);
    document.getElementById("session-length-set-value").innerHTML = value + 1;
		document.getElementById("minutes-shown-on-clock").innerHTML = value + 1;
		setterIsResetter();
}

document.getElementById("break-length-decrease-button").onclick = (e) => {
    let value = Number(document.getElementById("break-length-set-value").innerHTML);
		if (value > 0) {
			document.getElementById("break-length-set-value").innerHTML = value - 1;
			setterIsResetter();
		}
}

document.getElementById("break-length-increase-button").onclick = (e) => {
    let value = Number(document.getElementById("break-length-set-value").innerHTML);
    document.getElementById("break-length-set-value").innerHTML = value + 1;
		setterIsResetter();
}

// Variables needed for counting time and stopping/resetting the clock
var resetValue = 0;
var currentMinutes;
var currentSeconds;
var sessionsCounter = 0;

// Clicking on the reset button
document.getElementById("reset-button").onclick = (e) => {
		resetValue = 1;
		sessionsCounter = 0;
		document.getElementById("start-stop-button").innerHTML = "Start"
    document.getElementById("break-length-set-value").innerHTML = 5;
		document.getElementById("session-length-set-value").innerHTML = 25;
		document.getElementById("minutes-shown-on-clock").innerHTML = 25;
		document.getElementById("seconds-shown-on-clock").innerHTML = "00";
}

const calculateTime = () => {
	
	if (document.getElementById("start-stop-button").innerHTML == "Start") {
		// Set values of minutes and seconds according to current state
		document.getElementById("start-stop-button").innerHTML = "Stop"
		resetValue = 0;
		if (Number(document.getElementById("minutes-shown-on-clock").innerHTML) < Number(document.getElementById("session-length-set-value").innerHTML)) {
			var minutes = currentMinutes;
			var seconds = currentSeconds + 1;
		}
		else if (Number(document.getElementById("minutes-shown-on-clock").innerHTML) < Number(document.getElementById("break-length-set-value").innerHTML) && (sessionsCounter % 2 !== 0)) {
			var minutes = currentMinutes;
			var seconds = currentSeconds + 1;
		}
		else {
			var minutes = Number(document.getElementById("minutes-shown-on-clock").innerHTML) - 1;
			var seconds = 60;
		}

		// Update timer every second
		var timeCounter = setInterval(function() {
			
			seconds--;
			
			currentMinutes = document.getElementById("minutes-shown-on-clock").innerHTML;
			currentSeconds = seconds;
			
			if (seconds == -1) {
				minutes--;
				seconds = 59;
			}
			
			// Reset timer
			if (resetValue == 1) {
				clearInterval(timeCounter);
				return;
			}
			
			if (minutes == 0 && seconds == 2) {
				var audio = new Audio("https://upload.wikimedia.org/wikipedia/commons/b/bc/Alarmclock-mechanical.ogg");
				audio.play();
			}
			
			if (minutes == -1) {
				
				sessionsCounter = sessionsCounter + 1;
				
				if (sessionsCounter % 2 === 0) {
					minutes = Number(document.getElementById("session-length-set-value").innerHTML) - 1;
				}
				else {
					minutes = Number(document.getElementById("break-length-set-value").innerHTML) - 1;
					seconds = 59;
				}
				
			}

			// Displaying timer values and setting break session
			document.getElementById("minutes-shown-on-clock").innerHTML = minutes;
			if (seconds > 9) {
				document.getElementById("seconds-shown-on-clock").innerHTML = seconds;
			}
			else if (seconds > -1 && seconds < 10){
				document.getElementById("seconds-shown-on-clock").innerHTML = "0" + seconds;
			}
			else if (minutes == 0 && seconds == 1) {
				document.getElementById("seconds-shown-on-clock").innerHTML = "0" + seconds - 1;
			}
		}, 1000); // Interval value
	}
	else if (document.getElementById("start-stop-button").innerHTML == "Stop") {
		// Setting stop state
		resetValue = 1;
		minutes = Number(document.getElementById("minutes-shown-on-clock").innerHTML);
		
		document.getElementById("start-stop-button").innerHTML = "Start"
		document.getElementById("minutes-shown-on-clock").innerHTML = currentMinutes;
		if (currentSeconds > 9) {
			document.getElementById("seconds-shown-on-clock").innerHTML = currentSeconds;
		}
		else {
			document.getElementById("seconds-shown-on-clock").innerHTML = "0" + currentSeconds;
		}
	}	
}

document.getElementById("start-stop-button").onclick = (e) => {
	calculateTime();
} 

document.getElementById("clock").onclick = (e) => {
	calculateTime();
}
