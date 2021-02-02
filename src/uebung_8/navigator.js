"use strict"
let id = 0;
const d = document;

// helper functions
const appendChildren = ( parentElement, children ) => { children.forEach( elem => { parentElement.appendChild( elem )})};
const setAttributes = (element, attributes) => { attributes.forEach(tuple => { element.setAttribute( tuple[0], tuple[1] )})};

// Every buttonclick fetches the json data anew, which was only done since the task asked for it
// It would have been enough to fetch the data once, store it and deliver the contents without async functions
const getContent = async (link, value) => {
    let stateObj = {id: id++};
    if(value === "main") {
        window.history.pushState(stateObj, link, "?category=" + link);
    } else {
        window.history.pushState(stateObj, link, "?category="+ value + "&sub=" + link);
    }
    urlChecker();
}

const urlChecker = async () => {
    const params = new URLSearchParams(window.location.search);
    const textArea = d.getElementById("content");
    const referenceArea = d.getElementById("resources");
    let main = params.get("category");
    let sub = params.get("sub");

    if(sub !== null) {
        referenceArea.innerHTML = "";
        let content = await fetch("content.json").then(res => res.json());
        textArea.innerText = content[main][sub].content;
        content[main][sub].references.forEach(link => {
            let node = d.createElement("li");
            let text = d.createTextNode(link);
            node.appendChild(text)
            referenceArea.appendChild(node);
        });
    } else {
        textArea.innerText = "";
        referenceArea.innerHTML = "";
    }
    displaySubMenu(main);
}

const displayMainMenu = async () => {
    const mainMenu = d.getElementById("main");
    let content = await fetch("content.json").then(res => res.json());

    Object.keys(content).forEach(entry => {
        let node = d.createElement("li");
        let button = d.createElement("button");
        let button_text = d.createTextNode(entry);
            setAttributes(button, [["class", "button " + entry +""], ["value", "main"]]);
        button.appendChild(button_text)
        node.appendChild(button);
        mainMenu.appendChild(node);
    });
}

const displaySubMenu = async (main = "HTML") => {
    const subMenu = d.getElementById("sub");
    subMenu.innerHTML = "";
    let content = await fetch("content.json").then(res => res.json());
    let index = (main === undefined || main == null) ? "HTML" : main;

    Object.keys(content[index]).forEach(entry => {
        let node = d.createElement("li");
        let button = d.createElement("button");
        let button_text = d.createTextNode(entry);
        setAttributes(button, [["class", "subbutton " + entry], ["value", main]]);
        button.appendChild(button_text)
        node.appendChild(button);
        subMenu.appendChild(node);
    });

    const subbuttons = d.querySelectorAll(".subbutton");
    subbuttons.forEach(button => button.addEventListener("click", event => { getContent(button.innerHTML, button.getAttribute("value"))}));
    colorButtons();
}

const colorButtons = () => {
    const buttons = d.querySelectorAll(".button");
    buttons.forEach(button => button.classList.remove("selected"));
    const params = new URLSearchParams(window.location.search);
    const main = params.get("category");
    const sub = params.get("sub");
    d.querySelectorAll("." +main).forEach(button => button.classList.add("selected"));
    d.querySelectorAll("." +sub).forEach(button => button.classList.add("selected"));
}

const main = displayMainMenu();
//const sub = displaySubMenu("HTML");

const initialize = Promise.allSettled([main, sub]).then(() => {
    const buttons = d.querySelectorAll(".button");
    buttons.forEach(button => button.addEventListener("click", event => { getContent(button.innerHTML, button.getAttribute("value"))}));
})

window.addEventListener("popstate", event => {
    urlChecker();
})