const d = document;
const list = d.getElementById("list");
const speakers = [];
let current_id = 0;
let interval;

// helper functions
const appendChildren = ( parentElement, children ) => { children.forEach( elem => { parentElement.appendChild( elem )})}
const setAttributes = (element, attributes) => { attributes.forEach(tuple => { element.setAttribute( tuple[0], tuple[1] )})}

// Adds a new Speaker to the list
const addPerson = () => {
    // create new speaker object
    let speaker = {
        'name': d.getElementById("newPerson").value,
        'id': "p" + current_id,
        'time_full': Number(0),
        'time_current': Number(0)
    }
    speakers.push(speaker);

    // create all relevant tags with some attributes and append them as new node to the list
    let node = d.createElement("li");
    node.setAttribute("id", ("p"+current_id++).toString());
    let name = d.createElement("name");
    let text = d.createTextNode(speaker.name);
    name.appendChild(text);
    let time = d.createElement("time");
    let timer = d.createTextNode("00:00:00");
    time.appendChild(timer);
    let start = d.createElement("input");
        setAttributes(start, [["type", "button"], ["class", "action_button"], ["value", "Start!"]]);
        start.style.display = "none";
        start.onclick = () => continueClock(speaker);
    let stop = d.createElement("input");
        setAttributes(stop, [["type", "button"], ["class", "action_button"], ["value", "Stop!"]]);
        stop.style.display = "inline";
        stop.onclick = () => stopClock(speaker);
    appendChildren(node, [name, time, start, stop]);
    list.appendChild(node);

    // clear the current clock and create an active clock for the new speaker
    clearInterval(interval);
    continueClock(speaker);
}

// reset all speakers buttons and set buttons for active speaker
const continueClock = (speaker) => {
    let inactive, active;
    speakers.forEach(person => {
        inactive = d.getElementById(person.id).children;
        inactive[2].style.display = "inline";
        inactive[3].style.display = "none";
    })
    active = d.getElementById(speaker.id).children;
    active[2].style.display = "none";
    active[3].style.display = "inline";
    clearInterval(interval);
    interval = setInterval(() => startClock(speaker),1000);
}

// actual clock incrementer
const startClock = (speaker) => {
    let elements = d.getElementById(speaker.id).children;
    speaker.time_current += 1;
    elements[1].innerText = timeFormatter(speaker.time_current);
}

// clock stopper
const stopClock = (speaker) => {
    let elements = d.getElementById(speaker.id).children;
    clearInterval(interval);
    elements[2].style.display = "inline";
    elements[3].style.display = "none";
}

// formats the current time of a speaker from a number to a digital clock string output
const timeFormatter = (number) => {
    if(number === 0) {
        return "00:00:00";
    }

    // Hours
    let time = Math.floor(number / 3600);
    let timeString = (time >= 10 ? '' : '0') + time + ':';

    // Minutes
    time = Math.floor((number / 60)) % 60;
    timeString += (time >= 10 ? '' : '0') + time + ':';

    // Seconds
    time = number % 60;
    return timeString + (time >= 10 ? '' : '0') + time;
}

d.getElementById("add").addEventListener("click", addPerson);
d.getElementById("newPerson").addEventListener("keypress", function (e) {
    if(e.key === "Enter") {
        addPerson()
        d.getElementById("newPerson").value = "";
    }
})