/*********************************
    LISTEN BTN 
*********************************/
// Function to handle the speech synthesis
function speakDutch(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.rate = 0.8;
    utterance.lang = 'nl-NL'; // Set the language to Dutch (Netherlands)
    synth.speak(utterance);
}

// Add click event listeners to all buttons with class "listen-button"
const listenButtons = document.querySelectorAll('.listen-button');
listenButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dutchText = button.getAttribute('data-text');
        speakDutch(dutchText);
    });
});

/*********************************
    TITLE 
*********************************/
// Array containing English and Dutch titles
const titles = [
    "Welcome to Dutch 101",
    "Welkom bij Nederlands 101"
];

// Function to update the title once after a 10-second delay
setTimeout(() => {
    const titleElement = document.getElementById('title');
    const newTitle = titles[1]; // Use the Dutch title

    // Apply the fade-in/fade-out animation class
    titleElement.classList.add('fade-animation');

    // After 2 seconds, remove the animation class and update the title
    setTimeout(() => {
        titleElement.classList.remove('fade-animation');
        titleElement.textContent = newTitle;
    }, 2000);
}, 10000);

/*********************************
    SPEECH BTN 
*********************************/
function removePunctuation(inputString) {
    // Use a regular expression to replace all punctuation characters with an empty string
    return inputString.replace(/[.,?!]/g, '');
}
// Voice recognition and row highlighting
const dataTable = document.getElementById('dataTable');
const checkButtons = document.querySelectorAll('.check-button');

checkButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const row = dataTable.rows[index + 1]; // +1 to account for the table header row
        const dutchColumn = row.cells[1].textContent; // Get the Dutch sentence from the row

        // Initialize the SpeechRecognition object
        const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
        recognition.lang = 'nl-NL'; // Set the language to Dutch

        recognition.onresult = function (event) {
            const spokenText = event.results[0][0].transcript;
            console.log(spokenText.toLowerCase());
            if (spokenText.toLowerCase() === removePunctuation(dutchColumn.toLowerCase())) {
                row.classList.add('highlight-green');
            } else {
                row.classList.add('highlight-red');
            }
            console.log(removePunctuation(dutchColumn.toLowerCase()));

            // Remove the highlight after 1 second
            setTimeout(() => {
                row.classList.remove('highlight-green', 'highlight-red');
            }, 3000);
        };

        // Start speech recognition
        recognition.start();
    });
});