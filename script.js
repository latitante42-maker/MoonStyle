let selectedMood = 'freddo';
const tips = [
  "Freddo non è cattivo, è lucido.",
  "Chi corre dietro perde valore.",
  "Il silenzio è una risposta.",
  "Non reagire, osserva.",
  "La calma è potere.",
  "Meno parli, più conti.",
  "Controlla le emozioni, non farti controllare.",
  "Sparisci, migliora, riapparisci."
];

const risposte = {
  freddo: [
    "Non rispondere subito. Lascia passare. Chi tiene di più alla cosa perde.",
    "Zero emozioni. Rispondi corto, secco, e torna a fare le tue cose.",
    "Non giustificarti mai. Chi si giustifica si abbassa.",
    "Falla dubitare, non supplicare. Distacco totale."
  ],
  calmo: [
    "Resta calmo. Se ti provoca vuole una reazione, non dargliela.",
    "Respira, non rispondere di impulso. La calma ti fa sembrare più grande.",
    "Accetta e vai avanti. Non hai bisogno di vincere ogni discussione."
  ],
  cattivo: [
    "Sparisci per giorni. Quando torni, come se nulla fosse.",
    "Falle vedere che stai meglio senza di lei. Quello brucia.",
    "Non chiederle nulla. Diventa tu il premio, non lei.",
    "Freddo, occupato, irraggiungibile. Così impazzisce."
  ]
};

// LOADING 10 -> 4000 in 24 sec
let count = 10;
const percentEl = document.getElementById('percent');
const progressEl = document.getElementById('progress');
const tipEl = document.getElementById('tip');
const loadingPage = document.getElementById('loadingPage');
const appPage = document.getElementById('appPage');

let tipIndex = 0;
setInterval(()=> {
  tipEl.textContent = tips[tipIndex % tips.length];
  tipIndex++;
}, 3000);

const interval = setInterval(()=> {
  count += 16; // 3990 / 240 step = ~16 per 100ms = 24 sec
  if(count >= 4000){
    count = 4000;
    clearInterval(interval);
    percentEl.textContent = "4000";
    progressEl.style.width = "100%";
    setTimeout(()=> {
      loadingPage.style.display = "none";
      appPage.style.display = "flex";
    }, 400);
  } else {
    percentEl.textContent = count;
    progressEl.style.width = ((count-10)/3990*100) + "%";
  }
}, 100);

// MOODS
document.querySelectorAll('.mood').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.mood').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    selectedMood = btn.dataset.m;
  });
});

// GENERATE
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') generate();
});

function getShort(text){
  const list = risposte[selectedMood];
  return list[Math.floor(Math.random()*list.length)];
}

function generate(){
  const text = document.getElementById('searchInput').value.trim();
  if(!text){alert('Scrivi qualcosa in "chiedimi qualcosa..."');return;}
  const ans = document.getElementById('answer');
  ans.style.display = 'block';
  ans.textContent = `Hai chiesto: "${text}"\n\n[${selectedMood.toUpperCase()} MODE]\n${getShort(text)}`;
  ans.classList.remove('show');
  void ans.offsetWidth;
  ans.classList.add('show');
}