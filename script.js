// Declaration of variables
const audio = document.getElementById("audio");


//audio.style.display = "none";

// Ligth - Dark Mode Toggle
const darkMode = document.getElementById("dark");
const lightMode = document.getElementById("light");
const userName = document.getElementById("userName");
const body = document.body;

darkMode.onclick = toggleDarkMode;
lightMode.onclick = toggleLightMode;
lightMode.style.display = "none";


function toggleDarkMode(){
    document.body.style.backgroundColor  = "black";
    lightMode.style.display = "block";
    darkMode.style.display = "none";
    body.style.color = "white";
    body.style.transition = "background-color 0.5s ease";
}

function toggleLightMode(){
    document.body.style.backgroundColor = "white";
    darkMode.style.display = "block";
    lightMode.style.display = "none";
    body.style.color = "black";
    body.style.transition = "background-color 0.5s ease";
}

