let odpady = [];

// Wczytaj dane z pliku JSON
fetch("odpady.json")
  .then(response => response.json())
  .then(data => {
    odpady = data;
    console.log("Wczytano", odpady.length, "rekordów.");
  })
  .catch(error => {
    console.error("Błąd wczytywania danych:", error);
  });

// Obsługa przycisku
document.getElementById("searchButton").addEventListener("click", wyszukaj);

// Obsługa Entera
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") wyszukaj();
});

function wyszukaj() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (!query) {
    resultDiv.textContent = "Wpisz nazwę odpadu.";
    return;
  }

  const matches = odpady.filter(o => o.Nazwa.toLowerCase().includes(query));

  if (matches.length > 0) {
    matches.forEach(o => {
      resultDiv.innerHTML += `
        <div class="result-item">
          <h3>${o.Nazwa}</h3>
          <p><strong>Gdzie wyrzucić:</strong> ${o["Gdzie Wyrzucić2"]}</p>
          ${o.Komentarz ? `<p class="comment">${o.Komentarz}</p>` : ""}
        </div>
      `;
    });
  } else {
    resultDiv.textContent = "Nie znaleziono takiego odpadu 😕";
  }
}
