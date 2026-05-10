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
// --- ZADANIE 6: Pobieranie danych z pliku JSON 
// Numer albumu: 75560

document.addEventListener("DOMContentLoaded", function() {
    
    // Pobieranie danych z lokalnego pliku JSON
    fetch('dane.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Błąd podczas ładowania pliku JSON");
            }
            return response.json();
        })
        .then(dane => {
            
            // 1. Dynamiczne tworzenie listy umiejętności
            const listaUmiejetnosci = document.getElementById("lista-umiejetnosci");
            if (listaUmiejetnosci) {
                dane.umiejetnosci.forEach(element => {
                    let li = document.createElement("li");
                    li.textContent = element;
                    listaUmiejetnosci.appendChild(li);
                });
            }

            // 2. Dynamiczne tworzenie listy projektów
            const listaProjektow = document.getElementById("lista-projektow");
            if (listaProjektow) {
                dane.projekty.forEach(projekt => {
                    let li = document.createElement("li");
                    // Użycie innerHTML do pogrubienia nazwy projektu
                    li.innerHTML = `<strong>${projekt.nazwa}:</strong> ${projekt.opis}`;
                    listaProjektow.appendChild(li);
                });
            }
            
        })
        .catch(error => {
            console.error("Wystąpił problem z pobieraniem danych:", error);
        });
});
// --- ZAD7: Local Storage 
// Numer albumu: 75560

document.addEventListener("DOMContentLoaded", function() {
    const inputNotatki = document.getElementById("nowa-notatka");
    const btnDodaj = document.getElementById("dodaj-notatke");
    const listaNotatek = document.getElementById("lista-notatek");

    if (inputNotatki && btnDodaj && listaNotatek) {
        
        // 1. Ładowanie danych z localStorage po odświeżeniu
        function ladujNotatki() {
            listaNotatek.innerHTML = ""; 
            let zapisaneNotatki = JSON.parse(localStorage.getItem("mojeNotatki")) || [];
            
            zapisaneNotatki.forEach((notatka, index) => {
                let li = document.createElement("li");
                li.textContent = notatka + " ";
                li.style.marginBottom = "5px";
                
                // Przycisk usuwania
                let btnUsun = document.createElement("button");
                btnUsun.textContent = "Usuń";
                btnUsun.style.marginLeft = "10px";
                btnUsun.style.cursor = "pointer";
                btnUsun.onclick = function() {
                    usunNotatke(index);
                };
                
                li.appendChild(btnUsun);
                listaNotatek.appendChild(li);
            });
        }

        // 2. Dodawanie nowego elementu do Local Storage
        btnDodaj.addEventListener("click", function() {
            let tekst = inputNotatki.value.trim();
            if (tekst !== "") {
                let zapisaneNotatki = JSON.parse(localStorage.getItem("mojeNotatki")) || [];
                zapisaneNotatki.push(tekst); 
                localStorage.setItem("mojeNotatki", JSON.stringify(zapisaneNotatki)); 
                inputNotatki.value = ""; 
                ladujNotatki(); 
            } else {
                alert("Wpisz tekst notatki!");
            }
        });

        // 3. Funkcja usuwająca element
        function usunNotatke(index) {
            let zapisaneNotatki = JSON.parse(localStorage.getItem("mojeNotatki")) || [];
            zapisaneNotatki.splice(index, 1); 
            localStorage.setItem("mojeNotatki", JSON.stringify(zapisaneNotatki)); 
            ladujNotatki(); 
        }

        // Start
        ladujNotatki();
    }
});
// --- ZADANIE 8: Komunikacja z serwerem (POST do JSONPlaceholder) ---
// Numer albumu: 75560

document.addEventListener("DOMContentLoaded", function() {
    const formularz = document.getElementById("formularzKontaktowy");
    
    if (formularz) {
        formularz.addEventListener("submit", function(event) {
            event.preventDefault(); // Strona się nie przeładuje po kliknięciu Wyślij

            // 1. Pobieranie danych z formularza
            const imie = document.getElementById("imie").value;
            const email = document.getElementById("email").value;
            const wiadomosc = document.getElementById("wiadomosc").value;

            // 2. Tworzenie paczki danych (JSON)
            const daneDoWyslania = {
                name: imie,
                email: email,
                message: wiadomosc,
                timestamp: new Date().toISOString()
            };

            // 3. Publiczne API zalecone przez wykładowcę (JSONPlaceholder - w 100% darmowe)
            const backendURL = "https://jsonplaceholder.typicode.com/posts";

            // 4. Wysłanie danych (metoda POST)
            fetch(backendURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(daneDoWyslania)
            })
            .then(response => response.json())
            .then(data => {
                // Wypisanie w konsoli, aby pokazać prowadzącemu na wideo
                console.log("=== ZADANIE 8: SUKCES ===");
                console.log("Serwer JSONPlaceholder otrzymał dane:", data);
                
                // Alert dla użytkownika
                alert("Sukces! Formularz został wysłany. Serwer nadał ID zgłoszenia: " + data.id);
                
                formularz.reset(); // Czyszczenie formularza po wysłaniu
            })
            .catch(error => {
                console.error("Błąd podczas wysyłania:", error);
                alert("Wystąpił błąd podczas wysyłania danych.");
            });
        });
    }
});
