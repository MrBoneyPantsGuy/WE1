"use strict";

const d = document;
const getJsonData = async function() {
    return await fetch("./src/jsonData.json").then(res => res.json());
}
const jsonData = getJsonData();

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
    const code = d.getElementById("code");

    // appends all files to the list
    subtitle.innerHTML = week;
    d.getElementById("sub-menu").style.display = "block";

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
    code.innerText = ""

    const subEntries = d.querySelectorAll(".navigateSub")
        .forEach(sub => sub.addEventListener('click', async function() {
            const filename = sub.innerHTML
            const filepath = data[week].files[sub.id].pfad;
            code.innerText = await fetch(filepath).then(res => res.text());
            desc.innerHTML = "<p>" + data[week].files[sub.id].desc + "<button class='renderbutton'><a href='"+ data[week].files[sub.id].pfad +"' target='_blank'>In Aktion anzeigen!</a></button></p>";
        }));
}));