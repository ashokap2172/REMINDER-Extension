setInterval(() => {
	var now= new Date();
	document.getElementById('timeNow').innerHTML= now.toLocaleTimeString();;
	// document.getElementById('timeNow').innerHTML= now.toString().substring(0,25);
}, 1000);

reminders=[];
item=[];

var btn = document.getElementById("add");
btn.addEventListener("click", function () {
	var txt = document.getElementById("txt").value;
	var exTime = document.getElementById("exTime").value;
	var exDateStr = String(new Date(exTime));
	var cdt = new Date();
	var tDiff = Date.parse(cdt) - Date.parse(exDateStr);



	if (txt == "" && exTime == "") {
		alert("Enter a reminder and a DateTime !!!");
	} else {
		if (txt == "") {
		alert("Enter a Reminder!");
		}
		if (exTime == "") {
		alert("Enter a DateTime!");
		}
		if (tDiff >= 0) {
		alert("Plan a Reminder for the Future !!!");
		}
	}
	
	if (txt != "" && exTime != "" && tDiff < 0) {
		document.getElementById("txt").value = "";
		document.getElementById("exTime").value = "";
		let ml= Math.abs(tDiff);
		// let sec= Math.abs(tDiff/1000);
		// console.log(ml);

		chrome.runtime.sendMessage({
			type: 'notification',
			message: txt,
			time:ml
		}
		,
		function(response) {
		}
		);

		// item = JSON.parse(localStorage.getItem("msgs"));
		if(item)
		{
			item.push(txt);
			console.log(txt+" pushed to array "+item);
			localStorage.setItem("msgs", JSON.stringify(item));
		}
		else{
			reminders.push(txt);
			console.log(txt+" pushed to remindrs "+reminders);
			localStorage.setItem("msgs", JSON.stringify(reminders));
		}


		let li = document.createElement("LI");
		let btn = document.createElement("BUTTON");
		btn.appendChild(document.createTextNode("x"));
		li.appendChild(document.createTextNode(txt));
		li.appendChild(btn);
		document.getElementById("list").appendChild(li);

	}
});


item = JSON.parse(localStorage.getItem("msgs"));
console.log("array fetched from local storage: "+item);
if (item)
 	{
		for (let i = 0; i < item.length; i++) 
		{
			document.getElementById("list").innerHTML += "<li>" + item[i] + '<button>x</button> ' + "</li>";
		}
	}

let ol = document.getElementById("list");
ol.addEventListener("click", function (e) {
  let xli = e.target.parentNode;
//   let liText=xli.innerText;
//   console.log(`'${liText}'`);
  console.log(xli.innerText.slice(0,-1));
  let pos=item.indexOf(xli.innerText.slice(0,-1));
  item.splice(pos,1);// return array with remove element

  console.log(item);

  localStorage.setItem("msgs", JSON.stringify(item));

  chrome.runtime.sendMessage({
	type: 'clear',
	message: xli.innerText.slice(0,-1)
	}
	);
	ol.removeChild(xli);

});