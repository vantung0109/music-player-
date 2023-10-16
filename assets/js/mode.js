
const sun = "https://www.uplooder.net/img/image/55/7aa9993fc291bc170abea048589896cf/sun.svg";
const moon = "https://www.uplooder.net/img/image/2/addf703a24a12d030968858e0879b11e/moon.svg"

var theme = "light";
const container = document.getElementsByClassName("theme-container")[0];
const themeIcon = document.getElementById("theme-icon");
const lightMode = document.querySelector(".light-mode")
const darkMode = document.querySelector(".dark-mode")

container.addEventListener("click", setTheme);
function setTheme() {
    switch (theme) {
        case "dark":
            setLight();
            theme = "light"
            break;
        case "light":
            setDark();
            theme = "dark"
            break;
    }
}

function setLight() {
    container.classList.remove("shadow-dark");
    setTimeout(() => {
        container.classList.add("shadow-light");
        themeIcon.classList.remove("change");
    }, 200);
    themeIcon.classList.add("change");
    themeIcon.src = sun;

    lightMode.style.display = 'block'
    darkMode.style.display = 'none'
}

function setDark() {
    container.classList.remove("shadow-light");
    setTimeout(() => {
        container.classList.add("shadow-dark");
        themeIcon.classList.remove("change");
    }, 200);
    themeIcon.classList.add("change");
    themeIcon.src = moon;

    lightMode.style.display = 'none'
    darkMode.style.display = 'block'
}