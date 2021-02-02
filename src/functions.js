"use strict";

const d = document;
const getJsonData = async function() {
    return await fetch("./src/jsonData.json").then(res => res.json());
}
const jsonData = getJsonData();
const home = d.getElementById("home");

// listen to all clicks on the main menu
const main = document.querySelectorAll(".navigateMain");
main.forEach(item => item.addEventListener('click', async function() {
    const data = await jsonData;
    const week = item.innerHTML;

    // submenu
    const subtitle = d.getElementById("week");
    const subs = d.getElementById("files");
    subs.innerHTML = ""; // clear list

    // content area
    const desc = d.getElementById("info");
    // const code = d.getElementById("code"); // needs to be accessed after rebuild
    // const container = d.getElementById("code-container"); needs to be accessed after rebuild

    // appends all files to the list
    subtitle.innerHTML = week;

    let id = 0;
    data[week].files.forEach(elem => {
        const entry = d.createElement("li");
        entry.className = "navigateSub";
        entry.setAttribute("id", (id++).toString());
        const name = d.createTextNode(elem.name);
        entry.appendChild(name);
        subs.appendChild(entry);
    });

    // set the description and remove prior src code
    desc.innerHTML = "<p>" + data[week].desc + "</p>";
    desc.style.display = "inline";

    // Exceptions for Register/Login/Logout
    if(week === "Registrieren" || week === "Anmelden" || week === "Abmelden" || week === "Home") {
        readyForRender();
        if(week === "Home") {
            d.getElementById("code-container").innerHTML = await fetch("src/home.html").then(res => res.text());
        } else {
            d.getElementById("code-container").innerHTML = "<h2>Füge gerenderte " + week + "-PHP-Seite hier ein...</h2>";
        }
        d.getElementById("sub-menu").style.display = "none";
    } else {
        readyForCode();
        d.getElementById("code").innerText = "";
        d.getElementById("sub-menu").style.display = "block";
    }

    const subEntries = d.querySelectorAll(".navigateSub")
        .forEach(sub => sub.addEventListener('click', async function() {
            const filepath = data[week].files[sub.id].pfad;
            d.getElementById("code").innerText = await fetch(filepath).then(res => res.text());
            desc.innerHTML = "<p>" + data[week].files[sub.id].desc + "<a href='"+ data[week].files[sub.id].pfad +"' target='_blank'><button class='renderbutton'>In Aktion anzeigen!</button></a></p>";
        }));
}));

const readyForRender = function () {
    const container = d.getElementById("code-container");
    container.innerHTML = "";
}

const readyForCode = function () {
    const container = d.getElementById("code-container");
    const pre = d.createElement("pre");
    const code = d.createElement("code");

    code.setAttribute("id", "code");
    pre.appendChild(code);

    container.innerHTML = "";
    container.appendChild(pre);
}

home.click();