const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const copyStatus = document.getElementById("copyStatus");

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showStatus(`${text} copied to clipboard ✓`);
  } catch {
    showStatus(`Your handle is ${text} — select and copy it manually.`);
  }
}
function showStatus(message) {
  copyStatus.textContent = message;
}
document.getElementById("copyHandle").addEventListener("click", () => copyText("@friendstar"));
document.getElementById("copyHero").addEventListener("click", () => copyText("@friendstar"));

async function sharePage() {
  const shareData = {
    title: "FRIENDSTAR ⭐",
    text: "Good Vibes • Real Friends • Big Dreams — join the Friendstar community!",
    url: window.location.href
  };
  if (navigator.share) {
    try { await navigator.share(shareData); }
    catch (error) { if (error.name !== "AbortError") showStatus("Sharing was not available. Copy the page URL from your browser."); }
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showStatus("Page link copied ✓");
    } catch {
      showStatus("Copy the page URL from your browser's address bar.");
    }
  }
}
document.getElementById("sharePage").addEventListener("click", sharePage);
document.getElementById("shareButton").addEventListener("click", sharePage);
