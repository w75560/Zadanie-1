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
// ZADANIE 5: Walidacja formularza kontaktowego
// Numer albumu: 75560

const formularzKontaktowy = document.getElementById("formularzKontaktowy");

formularzKontaktowy.addEventListener("submit", function(event) {
    event.preventDefault(); // Brak backendu, zatrzymujemy odświeżanie strony

    // 1. Pobieranie wartości z formularza
    const imie = document.getElementById("imie").value.trim();
    const nazwisko = document.getElementById("nazwisko").value.trim();
    const email = document.getElementById("email").value.trim();
    const wiadomosc = document.getElementById("wiadomosc").value.trim();

    // 2. Pobieranie elementów błędów
    const bladImie = document.getElementById("bladImie");
    const bladNazwisko = document.getElementById("bladNazwisko");
    const bladEmail = document.getElementById("bladEmail");
    const bladWiadomosc = document.getElementById("bladWiadomosc");
    const komunikatSukces = document.getElementById("komunikatSukces");

    // 3. Resetowanie komunikatów
    let czyZle = false;
    bladImie.style.display = "none";
    bladNazwisko.style.display = "none";
    bladEmail.style.display = "none";
    bladWiadomosc.style.display = "none";
    komunikatSukces.style.display = "none";

    // 4. Wyrażenia regularne (Regex)
    const sprawdzCyfry = /\d/; 
    const sprawdzEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // --- KONTROLA DANYCH ---

    // Walidacja: Imię
    if (imie === "") {
        bladImie.textContent = "Pole Imię jest wymagane.";
        bladImie.style.display = "block";
        czyZle = true;
    } else if (sprawdzCyfry.test(imie)) {
        bladImie.textContent = "Imię nie może zawierać cyfr.";
        bladImie.style.display = "block";
        czyZle = true;
    }

    // Walidacja: Nazwisko
    if (nazwisko === "") {
        bladNazwisko.textContent = "Pole Nazwisko jest wymagane.";
        bladNazwisko.style.display = "block";
        czyZle = true;
    } else if (sprawdzCyfry.test(nazwisko)) {
        bladNazwisko.textContent = "Nazwisko nie może zawierać cyfr.";
        bladNazwisko.style.display = "block";
        czyZle = true;
    }

    // Walidacja: E-mail
    if (email === "") {
        bladEmail.textContent = "Pole E-mail jest wymagane.";
        bladEmail.style.display = "block";
        czyZle = true;
    } else if (!sprawdzEmail.test(email)) {
        bladEmail.textContent = "Podaj poprawny adres e-mail.";
        bladEmail.style.display = "block";
        czyZle = true;
    }

    // Walidacja: Wiadomość
    if (wiadomosc === "") {
        bladWiadomosc.textContent = "Pole Wiadomość jest wymagane.";
        bladWiadomosc.style.display = "block";
        czyZle = true;
    }

    // --- WYNIK ---
    if (!czyZle) {
        komunikatSukces.style.display = "block";
        formularzKontaktowy.reset();
    }
});