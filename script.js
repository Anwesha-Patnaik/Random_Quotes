const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author .name");
const quoteBtn = document.querySelector("button");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");

function fetchRandomImage() {
  // Fetch a new random landscape image from the Unsplash API
  fetch(
    "https://api.unsplash.com/photos/random?query=landscape&client_id=GiNgRyl1C6CK_Yj80s0uVOprDo4PyaArg59sP4vYXYk"
  )
    .then((res) => res.json())
    .then((imageData) => {
      // Use the image URL from the Unsplash response
      const landscapeImageUrl = imageData.urls.regular;

      // Set the background image and style
      document.body.style.backgroundImage = `url(${landscapeImageUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";

      // After setting the background image, fetch a random quote
      fetchRandomQuote();
    })
    .catch((error) => {
      console.error("Error fetching landscape image:", error);
    });
}

function fetchRandomQuote() {
  // Fetch a random quote from the quotable API
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      const quoteContent = result.content;
      quoteText.innerText = quoteContent;
      authorName.innerText = result.author;

      // Remove the "loading" class and update the button text
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
      // Remove the "loading" class and update the button text in case of an error
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
    });
}

function readOutQuote(quoteContent) {
  // Create a new SpeechSynthesisUtterance with the quote content
  const utterance = new SpeechSynthesisUtterance(quoteContent);

  // Use the default voice for speech synthesis
  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices[0];

  // Speak the quote loudly
  window.speechSynthesis.speak(utterance);
}

quoteBtn.addEventListener("click", () => {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  fetchRandomImage();
});

// Add a click event listener to the sound button
soundBtn.addEventListener("click", () => {
  const currentQuote = quoteText.innerText;
  readOutQuote(currentQuote);
});

// Add a click event listener to the copy button
copyBtn.addEventListener("click", () => {
  const currentQuote = quoteText.innerText;
  copyToClipboard(currentQuote);
});

// Function to copy text to clipboard
function copyToClipboard(text) {
  const dummyTextArea = document.createElement("textarea");
  dummyTextArea.value = text;
  document.body.appendChild(dummyTextArea);
  dummyTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(dummyTextArea);
}

// Initial load: Fetch a random image and quote
fetchRandomImage();

  
  