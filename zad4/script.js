// Numer albumu: 75560

// Logika zmiany motywu (Red <-> Green)
let btnMotyw = document.getElementById("zmienMotywBtn");
let cssLink = document.getElementById("css-link");

btnMotyw.onclick = function() {
    if (cssLink.getAttribute("href") === "red.css") {
        cssLink.setAttribute("href", "green.css");
    } else {
        cssLink.setAttribute("href", "red.css");
    }
};

// Logika pokazywania umiejętności
let btnUmiejetnosci = document.getElementById("ukryjUmiejetnosciBtn");
let sekcjaUmiejetnosci = document.getElementById("sekcja-umiejetnosci");

btnUmiejetnosci.onclick = function() {
    if (sekcjaUmiejetnosci.style.display === "none") {
        sekcjaUmiejetnosci.style.display = "block";
        btnUmiejetnosci.innerHTML = "Ukryj umiejętności";
    } else {
        sekcjaUmiejetnosci.style.display = "none";
        btnUmiejetnosci.innerHTML = "Pokaż umiejętności";
    }
};