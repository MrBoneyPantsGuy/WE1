"use strict";

const d = document;
const home = d.getElementById("home");

const getJsonData = async function() {
    return await fetch("./src/jsonData.json").then(res => res.json());
}
const jsonData = getJsonData();


// listen to all clicks on the main menu
const main = document.querySelectorAll(".navigateMain");
main.forEach(item => item.addEventListener('click', async function() {
    const activate = setActive(item);
    const data = await jsonData;
    const week = item.innerHTML;
    const subtitle = d.getElementById("week");
    const subs = d.getElementById("files");
    const desc = d.getElementById("info");
    const task = d.getElementById("task");
    let id = 0;

    // submenu
    subtitle.innerHTML = week; // assign title
    subs.innerHTML = ""; // clear list

    // appends all files to the list
    data[week].files.forEach(elem => {
        const entry = d.createElement("li");
        entry.className = "navigateSub";
        entry.setAttribute("id", (id++).toString());
        const name = d.createTextNode(elem.name);
        entry.appendChild(name);
        subs.appendChild(entry);
    });

    // set the description and remove prior src code
    desc.innerHTML = "<span class='content-title'>"+ data[week].desc+"<a class='invisible'>0</a></span>";
    desc.style.display = "inline";

    // set the goals for each maintab
    task.innerHTML = createList("Lernziele:", data[week].goals);
    task.style.display = "inline";

    // Check if we need to render content or just dislay it as innerText()
    if(data[week].needsRendering === true) {
        const render = readyForRender();
        if(week === "Home" || week === "Notenverbesserungen") {
            d.getElementById("code-container").innerHTML = await fetch(data[week].files[0].pfad).then(res => res.text());
        } else {
            d.getElementById("code-container").innerHTML = "<h2>Füge gerenderte " + week + "-PHP-Seite hier ein...</h2>";
        }
        d.getElementById("sub-menu").style.display = "none";
        task.style.display = "none";
    } else {
        const code = readyForCode();
        d.getElementById("code").innerText = "";
        d.getElementById("sub-menu").style.display = "block";
    }

    // select all elements in the submenu and add the eventlistener to fetch the corresponding data
    const subEntries = d.querySelectorAll(".navigateSub")
        .forEach(sub => sub.addEventListener('click', async function() {
            const filepath = data[week].files[sub.id].pfad;
            d.getElementById("code").innerText = await fetch(filepath).then(res => res.text());
            desc.innerHTML = "<span class='content-title'>" + data[week].files[sub.id].desc + "</span><a class='renderbutton' href='"+ data[week].files[sub.id].pfad +"' target='_blank'>In Aktion anzeigen!</a>";
            task.innerHTML = createList("Aufgabenstellung:", data[week].files[sub.id].tasks);
        }));
}));

// make an unordered list with passed items
const createList = (title, jsonArray) => {
    let list = title + "<ul>";
    jsonArray.forEach(element => list += "<li>" + element + "</li>");
    list += "</ul>";
    return list;
}

// switches the content area from displaying code to actually render to fetched data by removing <pre> and <code>
const readyForRender = function () {
    const container = d.getElementById("code-container");
    container.innerHTML = "";
}

// switches the content area from rendering the fetched content to display it as code by adding <pre> and <code>
const readyForCode = function () {
    const container = d.getElementById("code-container");
    const pre = d.createElement("pre");
    const code = d.createElement("code");

    code.setAttribute("id", "code");
    pre.appendChild(code);

    container.innerHTML = "";
    container.appendChild(pre);
}

const setActive = (item) => {
    // remove all other active classes
    const navigation = d.querySelectorAll(".navigateMain").forEach(elem => {
        elem.classList.remove("active")
    })
    // add active to current element
    item.classList.add("active");
}

/* Toggle between adding and removing the "responsive" class to main-menu when the user clicks on the icon */
function toggleMenu() {
    let x = d.getElementById("main-menu");
    if (x.className === "menu") {
        x.className += " responsive";
    } else {
        x.className = "menu";
    }
}

// initialize SPA on home screen
home.click();