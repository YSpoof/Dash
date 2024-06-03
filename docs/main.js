let dialog = document.getElementById("settingsDialog");
let messageElement = document.getElementById("message");
let searchInput = document.getElementById("searchInput");
let feelingInputs = document.getElementsByName("feeling");
let profPic = document.getElementById("profPic");

let clockElement = document.getElementById("clock");
const defaultSettings = {
  name: "Fulano(a)",
  city: "São Paulo",
  profUrl: "https://source.unsplash.com/300x300/?face",
  bgUrl:
    "https://source.unsplash.com/1280x720/?computer,abstract,dark,car,tech,city,space",
  feeling: "sad",
  twoelveHours: false,
};

const settings =
  JSON.parse(localStorage.getItem("settings")) || defaultSettings;

document.body.style.backgroundImage = `url(${settings.bgUrl})`;
profPic.src = settings.profUrl;
profPic.alt = settings.name;

function showMenu() {
  dialog.showModal();
  document.getElementById("name").value = settings.name;
  document.getElementById("city").value = settings.city;
  document.getElementById("profUrl").value = settings.profUrl;
  document.getElementById("bgUrl").value = settings.bgUrl;
  document.getElementById("feeling").value = settings.feeling;
  document.getElementById("twoelveHours").checked = settings.twoelveHours;
}

function saveConfigs() {
  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const profUrl = document.getElementById("profUrl").value;
  const bgUrl = document.getElementById("bgUrl").value;
  const feeling = document.getElementById("feeling").value;
  const twoelveHoursCheck = document.getElementById("twoelveHours").checked;

  localStorage.setItem(
    "settings",
    JSON.stringify({
      name: name || defaultSettings.name,
      city: city || defaultSettings.city,
      profUrl: profUrl || defaultSettings.profUrl,
      bgUrl: bgUrl || defaultSettings.bgUrl,
      feeling: feeling || defaultSettings.feeling,
      twoelveHours: twoelveHoursCheck || defaultSettings.twoelveHours,
    })
  );
  caches.delete("cache");
  dialog.close();
  location.reload();
}

function resetConfigs() {
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
  caches.delete("cache");
  dialog.close();
  location.reload();
}

function clock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  if (settings.twoelveHours) {
    let amPm = hours >= 12 ? "PM" : "AM";
    let twelveHour = hours % 12 || 12;
    clockStr = `${twelveHour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${amPm}`;
  } else {
    clockStr = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  clockElement.innerText = clockStr;
}

setInterval(clock, 1000);

clock();
generateMessage();

function generateMessage() {
  // Happy
  let happyDayPhrases = ["Mas que dia viu...."];
  let happyEveningPhrases = ["Essa tarde não está fácil..."];
  let happyNightPhrases = ["Eita noite longa..."];

  // Neutral
  let neutralDayPhrases = ["Bom dia."];
  let neutralEveningPhrases = ["Boa tarde."];
  let neutralNightPhrases = ["Boa noite."];

  // Sad
  let sadDayPhrases = [
    "Tenha um bom dia!",
    "Desejo-lhe um ótimo dia!",
    "Que seu dia seja incrível!",
    "Aproveite cada momento!",
    "Que hoje seja repleto de alegria!",
    "Sorria, é um novo dia!",
    "Que seu dia seja produtivo!",
    "Muita energia positiva para hoje!",
    "Faça o seu melhor hoje!",
    "Tenha um dia abençoado!",
    "Que seu dia seja cheio de sucesso!",
    "Desfrute de um dia maravilhoso!",
    "Hoje é um ótimo dia para ser feliz!",
    "Que seu dia seja iluminado!",
    "Acredite no seu potencial!",
    "Tenha um dia de conquistas!",
    "Muita paz e harmonia no seu dia!",
    "Que seu dia seja repleto de boas surpresas!",
    "Tenha um dia fantástico!",
    "Que seu dia seja especial!",
  ];
  let sadEveningPhrases = [
    "Boa tarde!",
    "Espero que sua tarde seja excelente!",
    "Tenha uma tarde maravilhosa!",
    "Aproveite bem a sua tarde!",
    "Que sua tarde seja produtiva!",
    "Desejo-lhe uma tarde tranquila!",
    "Muita energia positiva para a sua tarde!",
    "Que sua tarde seja cheia de conquistas!",
    "Tenha uma tarde abençoada!",
    "Que sua tarde seja repleta de alegria!",
    "Desfrute de uma tarde fantástica!",
    "Espero que sua tarde seja muito especial!",
    "Boa tarde e muito sucesso!",
    "Que sua tarde seja iluminada!",
    "Tenha uma tarde cheia de boas surpresas!",
    "Que a sua tarde seja incrível!",
    "Muita paz na sua tarde!",
    "Espero que sua tarde seja produtiva e agradável!",
    "Tenha uma tarde cheia de energia positiva!",
    "Que sua tarde seja repleta de bons momentos!",
  ];
  let sadNightPhrases = [
    "Tenha uma boa noite!",
    "Desejo-lhe uma ótima noite!",
    "Que sua noite seja incrível!",
    "Aproveite cada momento da noite!",
    "Que hoje à noite seja repleta de alegria!",
    "Sorria, é uma nova noite!",
    "Que sua noite seja produtiva!",
    "Muita energia positiva para esta noite!",
    "Faça o seu melhor esta noite!",
    "Tenha uma noite abençoada!",
    "Que sua noite seja cheia de sucesso!",
    "Desfrute de uma noite maravilhosa!",
    "Hoje é uma ótima noite para ser feliz!",
    "Que sua noite seja iluminada!",
    "Acredite no seu potencial, mesmo à noite!",
    "Tenha uma noite de conquistas!",
    "Muita paz e harmonia na sua noite!",
    "Que sua noite seja repleta de boas surpresas!",
    "Tenha uma noite fantástica!",
    "Que sua noite seja especial!",
  ];

  // generate a random message based on the feeling and time of the day
  let message = "";
  let feeling = settings.feeling;
  let hours = new Date().getHours();

  function getMessage(feeling, phrases) {
    const { dayPhrases, eveningPhrases, nightPhrases } = phrases;

    if (hours >= 6 && hours < 12) {
      return dayPhrases[Math.floor(Math.random() * dayPhrases.length)];
    } else if (hours >= 12 && hours < 18) {
      return eveningPhrases[Math.floor(Math.random() * eveningPhrases.length)];
    } else {
      return nightPhrases[Math.floor(Math.random() * nightPhrases.length)];
    }
  }

  switch (feeling) {
    case "happy":
      message = getMessage(feeling, {
        dayPhrases: happyDayPhrases,
        eveningPhrases: happyEveningPhrases,
        nightPhrases: happyNightPhrases,
      });
      break;
    case "neutral":
      message = getMessage(feeling, {
        dayPhrases: neutralDayPhrases,
        eveningPhrases: neutralEveningPhrases,
        nightPhrases: neutralNightPhrases,
      });
      break;
    default:
      message = getMessage(feeling, {
        dayPhrases: sadDayPhrases,
        eveningPhrases: sadEveningPhrases,
        nightPhrases: sadNightPhrases,
      });
  }

  messageElement.innerText = `Olá, ${settings.name}. ${message}`;
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
}

function saveSearch(search) {
  let searches = new Set(JSON.parse(sessionStorage.getItem("searches")) || []);
  searches.add(search);
  sessionStorage.setItem("searches", JSON.stringify(Array.from(searches)));
  loadSearches();
}

function loadSearches() {
  let searches = JSON.parse(sessionStorage.getItem("searches")) || [];
  let searchList = document.getElementById("recentSearches");
  searchList.innerHTML = "";

  searches.forEach((search) => {
    let searchItem = document.createElement("option");
    searchItem.value = search;
    searchList.appendChild(searchItem);
  });
}

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    window.open(`https://www.google.com/search?q=${searchInput.value}`);
    saveSearch(searchInput.value);
    searchInput.value = "";
  }
});

window.onload = () => {
  loadSearches();
  searchInput.focus();
  registerServiceWorker();
  document.title = `${settings.name} - Dashy`;
};

window.onfocus = () => {
  searchInput.focus();
};
