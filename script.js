let speech = new SpeechSynthesisUtterance();
let voices = [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  
  // Sort voices by language and name for better user experience
  voices.sort((a, b) => a.lang.localeCompare(b.lang) || a.name.localeCompare(b.name));
  
  // Populate the voiceSelect dropdown with language and voice name
  voiceSelect.innerHTML = "";  // Clear existing options
  voices.forEach((voice, i) => {
    let option = new Option(`${voice.name} - ${voice.lang}`, i);
    voiceSelect.appendChild(option);
  });
  
  // Set the initial voice to the first one in the list
  speech.voice = voices[0];
};

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});
