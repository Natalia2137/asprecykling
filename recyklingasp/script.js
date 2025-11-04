const db = [
  { keys: ['gazeta', 'papier', 'karton', 'tektura'], bin: 'NIEBIESKI', code: 'blue', note: 'Papier – usuń folie i zabrudzenia.' },
  { keys: ['butelka plastikowa', 'butelka pet', 'folia', 'opakowanie plastikowe'], bin: 'ŻÓŁTY', code: 'yellow', note: 'Plastik i metale – wyrzucaj puste i wypłukane.' },
  { keys: ['słoik', 'butelka szklana', 'szkło'], bin: 'ZIELONY', code: 'green', note: 'Szkło – usuń zakrętki i wieczka.' },
  { keys: ['resztki jedzenia', 'obierki', 'skórki'], bin: 'BRĄZOWY', code: 'brown', note: 'Bioodpady – wyrzucaj bez opakowań.' },
  { keys: ['bateria', 'akumulator', 'elektronika', 'telefon'], bin: 'SPECJALNE', code: 'gray', note: 'Oddaj do punktu zbiórki elektrośmieci.' },
  { keys: ['opakowanie po jogurcie', 'kubek po jogurcie', 'tetrapak'], bin: 'ŻÓŁTY', code: 'yellow', note: 'Opakowania po nabiale – wypłukać przed wyrzuceniem.' },
];

const qEl = document.getElementById('q');
const go = document.getElementById('go');
const results = document.getElementById('results');

function findMatch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;

  for (const item of db) {
    for (const k of item.keys) {
      if (q === k) return item;
    }
  }
  for (const item of db) {
    for (const k of item.keys) {
      if (q.includes(k) || k.includes(q)) return item;
    }
  }
  return null;
}

function renderResult(item) {
  if (!item) {
    results.innerHTML = `
      <div class="bin">
        <div class="dot gray">?</div>
        <div class="info">
          <strong>Nie znaleziono jasnej podpowiedzi</strong>
          <div class="muted">Spróbuj innego określenia lub sprawdź zasady w swojej gminie.</div>
        </div>
      </div>`;
    return;
  }

  results.innerHTML = `
    <div class="bin">
      <div class="dot ${item.code}">${item.bin[0]}</div>
      <div class="info">
        <strong>Wyrzucaj do: ${item.bin}</strong>
        <div class="muted">${item.note}</div>
      </div>
    </div>`;
}

go.addEventListener('click', () => {
  const val = qEl.value;
  const found = findMatch(val);
  renderResult(found);
});

qEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') go.click();
});

document.querySelectorAll('.chip').forEach(el => {
  el.addEventListener('click', () => {
    qEl.value = el.textContent;
    go.click();
  });
});

results.innerHTML = `<div class="muted">Wpisz nazwę odpadu i naciśnij „Sprawdź”.</div>`;
