const inputEl = document.getElementById("input");
const infoEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaningcontainer");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    try {
        infoEl.innerText = `Searching the meaning of "${word}"...`;
        meaningContainerEl.style.display = "none";

        const res = await fetch(url);
        const result = await res.json();

        if (Array.isArray(result)) {
            const wordData = result[0];
            const definition = wordData.meanings[0].definitions[0].definition;
            const phonetics = wordData.phonetics.find(p => p.audio);

            titleEl.innerText = wordData.word;
            meaningEl.innerText = definition;

            if (phonetics && phonetics.audio) {
                audioEl.src = phonetics.audio;
                audioEl.style.display = "block";
            } else {
                audioEl.style.display = "none";
            }

            meaningContainerEl.style.display = "block";
            infoEl.innerText = "";
        } else {
            infoEl.innerText = "No meaning found. Please try another word.";
        }
    } catch (error) {
        console.error("Error:", error);
        infoEl.innerText = "An error occurred. Please try again.";
    }
}

inputEl.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value.trim());
    }
});
