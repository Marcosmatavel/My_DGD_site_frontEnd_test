const recordBtn = document.getElementById('audio_record');
const promptTextBox = document.getElementById('prompt_text_box');

const controlsContainer = document.createElement('div');
controlsContainer.style.display = 'inline-flex';
controlsContainer.style.alignItems = 'center';
controlsContainer.style.gap = '10px';
controlsContainer.style.marginLeft = '10px';
recordBtn.parentNode.insertBefore(controlsContainer, recordBtn.nextSibling);

const wave = document.createElement('span');
wave.style.width = '20px';
wave.style.height = '20px';
wave.style.borderRadius = '50%';
wave.style.background = 'radial-gradient(circle at center, #00ffff 40%, transparent 80%)';
wave.style.animation = 'wavePulse 1.2s infinite';
wave.style.display = 'none';
controlsContainer.appendChild(wave);

const cancelBtn = document.createElement('button');
cancelBtn.textContent = '✕';
cancelBtn.title = 'Cancel recording';
cancelBtn.style.display = 'none';
controlsContainer.appendChild(cancelBtn);

const stopBtn = document.createElement('button');
stopBtn.textContent = '■';
stopBtn.title = 'Stop recording';
stopBtn.style.display = 'none';
controlsContainer.appendChild(stopBtn);

const acceptBtn = document.createElement('button');
acceptBtn.textContent = '✓';
acceptBtn.title = 'Accept and submit';
acceptBtn.style.display = 'none';
controlsContainer.appendChild(acceptBtn);

let recognition;
let isRecording = false;
let interimTranscript = '';
let finalTranscript = promptTextBox.value || '';

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcriptPiece = event.results[i][0].transcript.trim();

      if (event.results[i].isFinal) {
        // Check if user said a correction phrase in final result
        if (hasCorrectionPhrase(transcriptPiece)) {
          // Clear final transcript if correction phrase detected
          finalTranscript = '';
          // Remove the correction phrase itself from final transcript
          const cleaned = removeCorrectionPhrase(transcriptPiece);
          if (cleaned) finalTranscript += cleaned + ' ';
        } else {
          finalTranscript += transcriptPiece + ' ';
        }
      } else {
        interimTranscript += transcriptPiece + ' ';
      }
    }
    // Display final + interim combined in textbox
    promptTextBox.value = finalTranscript + interimTranscript;
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    alert('Speech recognition error: ' + event.error);
    stopRecording();
  };

  recognition.onend = () => {
    if (isRecording) {
      recognition.start(); // auto restart for continuous
    }
  };
} else {
  alert('Speech Recognition API not supported in this browser.');
  recordBtn.disabled = true;
}

cancelBtn.addEventListener('click', () => {
  stopRecording();
  finalTranscript = '';
  interimTranscript = '';
  promptTextBox.value = '';
  toggleControls(false);
});

stopBtn.addEventListener('click', () => {
  stopRecording();
  // User can review transcript now before accepting
});

acceptBtn.addEventListener('click', () => {
  stopRecording();
  promptTextBox.disabled = true;
  acceptBtn.disabled = true;
  cancelBtn.disabled = true;
  stopBtn.disabled = true;
  wave.style.display = 'inline-block';
  wave.style.animationPlayState = 'running';

  setTimeout(() => {
    wave.style.display = 'none';
    promptTextBox.disabled = false;
    acceptBtn.disabled = false;
    cancelBtn.disabled = false;
    stopBtn.disabled = false;
    alert('Transcript accepted. You can now upload files or edit the text.');
  }, 1500);
});

recordBtn.addEventListener('click', () => {
  if (isRecording) return; // force stop only with buttons
  startRecording();
});

function startRecording() {
  recognition.start();
  isRecording = true;
  toggleControls(true);
  wave.style.display = 'inline-block';
  wave.style.animationPlayState = 'running';
  recordBtn.style.display = 'none';
}

function stopRecording() {
  recognition.stop();
  isRecording = false;
  toggleControls(false);
  wave.style.display = 'none';
  recordBtn.style.display = 'inline-block';
}

function toggleControls(show) {
  cancelBtn.style.display = show ? 'inline-block' : 'none';
  stopBtn.style.display = show ? 'inline-block' : 'none';
  acceptBtn.style.display = show ? 'inline-block' : 'none';
}

// Detect correction phrases for clearing or replacing text
function hasCorrectionPhrase(text) {
  const phrases = [
    'sorry',
    'i mean',
    "i meant",
    "no no",
    "no, no",
    "i didn’t mean",
    "i did not mean",
    "correction",
    "scratch that",
  ];
  const lower = text.toLowerCase();
  return phrases.some(phrase => lower.includes(phrase));
}

// Remove correction phrase and return the cleaned text after it
function removeCorrectionPhrase(text) {
  const correctionRegex = /(sorry|i mean|i meant|no no|no, no|i didn’t mean|i did not mean|correction|scratch that)[,]?/i;
  return text.replace(correctionRegex, '').trim();
}
