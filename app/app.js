// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the main Main Component
var Story = require("./components/Story");

// This code here allows us to render our main component (in this case Main)
ReactDOM.render(<Story />, document.getElementById("app"));

window.onload = function() {
 	//expand the story
	document.getElementById("expand").onclick = function(event) {
		console.log("test");
		document.getElementById("test").style.width = "94%";
		document.getElementById("char").innerHTML = longP
	}

	//cut the story for the main page
	var longP = document.getElementById("char").innerHTML;
	function countAndCut() {
		var shortP = document.getElementById("char").innerHTML.slice(0, 250);
		document.getElementById("char").innerHTML = shortP + "...";
	}

	countAndCut();

	//increase the heart and flag counters
	var flagCount = 0;
	var heartCount = 0;

	document.getElementById("heart").onclick = function(event) {
		heartCount++;
		document.getElementById("heartCounter").innerHTML = " " + heartCount;
	}

	document.getElementById("flag").onclick = function(event) {
		flagCount++;
		document.getElementById("flagCounter").innerHTML = " " + flagCount;

		if (flagCount >= 10) {
			document.getElementById("test").remove();
		}
	}
}
