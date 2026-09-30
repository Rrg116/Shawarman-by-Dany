/*
  SHAWARMAN BY DANY
  Remplace WHATSAPP_NUMBER par ton numéro WhatsApp au format international
  sans le signe + ni espaces.
  Exemple Cameroun : 2376XXXXXXXX
*/

const WHATSAPP_NUMBER = "237XXXXXXXXX";
const PRICE = 1000;
let quantity = 1;

const qtyEl = document.getElementById("qty");
const summaryQty = document.getElementById("summaryQty");
const totalEl = document.getElementById("total");
const errorEl = document.getElementById("error");
const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");

function formatMoney(value) {
  return value.toLocaleString("fr-FR") + " FCFA";
}

function updateSummary() {
  qtyEl.textContent = quantity;
  summaryQty.textContent = `${quantity} × ${formatMoney(PRICE)}`;
  totalEl.textContent = formatMoney(quantity * PRICE);
}

function changeQty(amount) {
  quantity = Math.max(1, quantity + amount);
  updateSummary();
}

function getMinDateTime() {
  return new Date(Date.now() + 4 * 60 * 60 * 1000);
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function setDateMinimum() {
  const now = new Date();
  dateEl.min = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;

  const min = getMinDateTime();
  dateEl.value = `${min.getFullYear()}-${pad(min.getMonth()+1)}-${pad(min.getDate())}`;
  timeEl.value = `${pad(min.getHours())}:${pad(min.getMinutes())}`;
}

function selectedDateTime() {
  return new Date(`${dateEl.value}T${timeEl.value}:00`);
}

function validateFourHours() {
  const selected = selectedDateTime();
  const minimum = getMinDateTime();

  if (Number.isNaN(selected.getTime())) {
    return "Choisis une date et une heure de retrait.";
  }

  if (selected < minimum) {
    return "La commande doit être passée au moins 4 heures à l'avance.";
  }

  return "";
}

function formatDate(dateString) {
  const [y, m, d] = dateString.split("-");
  return `${d}/${m}/${y}`;
}

document.getElementById("orderForm").addEventListener("submit", (event) => {
  event.preventDefault();
  errorEl.textContent = "";

  const validation = validateFourHours();
  if (validation) {
    errorEl.textContent = validation;
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const note = document.getElementById("note").value.trim();

  const message = [
    "🥙 *NOUVELLE COMMANDE — SHAWARMAN BY DANY*",
    "",
    `👤 Client : ${name}`,
    `📞 Téléphone : ${phone}`,
    "",
    `🌯 ${quantity} × Shawarman classique`,
    `💰 *Total : ${formatMoney(quantity * PRICE)}*`,
    "",
    `📅 Retrait : ${formatDate(dateEl.value)} à ${timeEl.value}`,
    "📍 Mode : Retrait sur place",
    note ? `📝 Note : ${note}` : ""
  ].filter(Boolean).join("\n");

  if (WHATSAPP_NUMBER.includes("X")) {
    errorEl.textContent = "Le numéro WhatsApp du commerce n'est pas encore configuré. Ouvre script.js et remplace WHATSAPP_NUMBER.";
    return;
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
});

document.getElementById("contactWhatsapp").addEventListener("click", (event) => {
  if (WHATSAPP_NUMBER.includes("X")) {
    event.preventDefault();
    alert("Configure d'abord le numéro WhatsApp dans script.js.");
    return;
  }
  event.currentTarget.href = `https://wa.me/${WHATSAPP_NUMBER}`;
});

dateEl.addEventListener("change", () => errorEl.textContent = "");
timeEl.addEventListener("change", () => errorEl.textContent = "");

document.getElementById("year").textContent = new Date().getFullYear();

setDateMinimum();
updateSummary();
