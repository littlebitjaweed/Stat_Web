function darkmode() {
    console.log('Dark mode');
    var element = document.body;
    var button = document.getElementById("dark-mode-toggle");
    
    element.classList.toggle("dark-mode");

    if (element.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        button.innerHTML = "🌞";
    } else {
        localStorage.setItem("theme", "light");
        button.innerHTML = "🌙"; 
    }
}

window.onload = function () {
    var button = document.getElementById("dark-mode-toggle");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        button.innerHTML = "🌞"; 
    } else {
        button.innerHTML = "🌙";
    }
};
