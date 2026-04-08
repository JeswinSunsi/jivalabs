<template>
  <div class="jivalab-container">
    <header class="header">
      <span style="display: flex; align-items: center;">
        <img src="../assets/arrowblue.png" alt="Go Back" class="arrow-back" @click="$router.push('/home')">
        <div class="logo">Jiva<span style="font-weight: 400;">lab</span></div>
      </span>
      <div class="header-icons">
        <LanguageSwitcher />
        <div class="notification-icon">
          <img src="../assets/chat.png" alt="Notifications" class="icon-placeholder" @click="$router.push('/chat')">
        </div>
        <div class="profile-icon">
          <img src="../assets/usericon.png" alt="Notifications" class="icon-placeholder" @click="$router.push('/profile')">
        </div>
      </div>
    </header>

    <div class="content-card">
      <div class="red-top"></div>
      <div class="mic-icon-container">
        <div class="mic-icon">
          <img src="../assets/mic.png" alt="Microphone" class="mic-icon-placeholder">
        </div>
      </div>

      <h2 class="title">{{ t('voice.title') }}</h2>
      <div class="instructions-list">
        <div class="instruction-item" v-motion
          :initial="{ x: -50, opacity: 0 }"
          :enter="{ x: 0, opacity: 1, transition: { delay: 100 } }">
          <div class="instruction-number">1</div>
          <div class="instruction-text">
            <p style="color: #0896B6;">{{ t('voice.instruction1') }} <span class="highlight">{{ t('voice.instruction1Highlight') }}</span></p>
          </div>
        </div>

        <div class="instruction-item" v-motion
          :initial="{ x: -50, opacity: 0 }"
          :enter="{ x: 0, opacity: 1, transition: { delay: 300 } }">
          <div class="instruction-number">2</div>
          <div class="instruction-text">
            <p style="color: #0896B6;">{{ t('voice.instruction2') }} <span class="highlight">{{ t('voice.instruction2Highlight') }}</span>
            </p>
          </div>
        </div>

        <div class="instruction-item" v-motion
          :initial="{ x: -50, opacity: 0 }"
          :enter="{ x: 0, opacity: 1, transition: { delay: 500 } }">
          <div class="instruction-number">3</div>
          <div class="instruction-text">
            <p style="color: #0896B6;">{{ t('voice.instruction3') }} <span class="highlight">{{ t('voice.instruction3Highlight') }}</span></p>
          </div>
        </div>
      </div>

      <span style="display: flex; flex-direction: column; align-items: start;" v-show="firstRecordingStarted">
        <div class="prompt-box">
          <p v-if="selectedLanguage == 'english'">
            <span v-for="(word, index) in promptWords" :key="index"
              :class="{ 'spoken-word': spokenWordIndices.includes(index) }">
              {{ word }}{{ index < promptWords.length - 1 ? ' ' : '' }} </span>
          </p>
          <p v-if="selectedLanguage != 'english'">
            {{ promptText }}
          </p>
        </div>

        <select v-model="selectedLanguage" @change="changeLanguage"
          style="margin-left: 1rem; margin-bottom: 1rem; height: 2rem; width: 25%; border-radius: 0.5rem;">
          <option value="english">English</option>
          <option value="tamil">Tamil</option>
          <option value="hindi">Hindi</option>
          <option value="malayalam">Malayalam</option>
          <option value="konkani">Konkani</option>
        </select>
      </span>

      <button v-motion
        :initial="{ y: 20, opacity: 0 }"
        :enter="{ y: 0, opacity: 1, transition: { delay: 700 } }"
        class="record-button" 
        @click="toggleRecording" 
        v-show="!hasRecorded"
      >
        {{ isRecording ? t('voice.recording') : t('voice.ready') }}
      </button>

    </div>


    <Transition name="slide-up">
      <div class="next-btn" v-if="hasRecorded" @click="goToNextPrompt" :class="{ loading: PDFLoading }">
        {{ t('voice.continue') }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';

const route = useRoute();
const disease = route.params.disease;
const { t } = useI18n();

const isRecording = ref(false);
const hasRecorded = ref(false);
const transcript = ref('');
const recognition = ref(null);
const spokenWordIndices = ref([]);
let promptIndex = 0;
const promptContent = ref(["THE GENTLE BREEZE MAKES THIS AFTERNOON QUITE REFRESHING", "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", "{SAY AAAAHH WITHOUT MOVING YOUR LIPS}"]);
let promptText = ref("THE GENTLE BREEZE MAKES THIS AFTERNOON QUITE REFRESHING");
const promptWords = ref(promptText.value.split(' '));
const firstRecordingStarted = ref(false);

const selectedLanguage = ref('english');

const PDFLoading = ref(false);
const mediaRecorder = ref(null);
const audioContext = ref(null);
const audioStream = ref(null);
const audioBlob = ref(null);
const processorNode = ref(null);
const recordedSamples = ref([]);

function changeLanguage() {
  console.log(selectedLanguage.value);
  if (selectedLanguage.value === "english") {
    promptContent.value = ["THE GENTLE BREEZE MAKES THIS AFTERNOON QUITE REFRESHING", "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG", "{SAY AAAAHH WITHOUT MOVING YOUR LIPS}"];
    promptText.value = promptContent.value[0];
  } else if (selectedLanguage.value === "tamil") {
    promptContent.value = ["இது ஒரு அழகான நாள்", "செய்யும் தொழிலே தெய்வம்", "{SAY AAAAHH WITHOUT MOVING YOUR LIPS}"];
    promptText.value = promptContent.value[0];
  } else if (selectedLanguage.value === "malayalam") {
    promptContent.value = ["വിത്തു നല്ലതെങ്കിൽ വിളയും നല്ലത്", "സ്വപ്‌നങ്ങൾക്ക് ചിറകുകളുണ്ടാകും!", "{SAY AAAAHH WITHOUT MOVING YOUR LIPS}"];
    promptText.value = promptContent.value[0];
  } else if (selectedLanguage.value === "hindi") {
    promptContent.value = ["आज आसमान बिल्कुल साफ़ और नीला है", "तूफ़ान के बाद इंद्रधनुष आता है", "{SAY AAAAHH WITHOUT MOVING YOUR LIPS}"];
    promptText.value = promptContent.value[0];
  } else if (selectedLanguage.value === "konkani") {
    promptContent.value = ["पावसाचे बुट बुट थेंब धराक धराक पडता", "माझें मोन खुश आसा आज", "{SAY AAAAHH WITHOUT MOVING YOUR LIPS}"];
    promptText.value = promptContent.value[0];
  }
  promptWords.value = promptText.value.split(' ');
}

function goToNextPrompt() {
  if (promptIndex < 2) {
    promptIndex++;
    promptText.value = promptContent.value[promptIndex];

    transcript.value = "";
    recognition.value = null;
    spokenWordIndices.value = [];
    isRecording.value = false;
    hasRecorded.value = false;
    mediaRecorder.value = null;
    audioBlob.value = null;
    audioContext.value = null;
    audioStream.value = null;
    processorNode.value = null;
    promptWords.value = promptText.value.split(' ');
  }
  else {
    submitRecording();
  }
}

const setupSpeechRecognition = () => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.value = new SpeechRecognition();
    recognition.value.continuous = true;
    recognition.value.interimResults = true;


    recognition.value.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript.value += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const fullTranscript = (transcript.value + interimTranscript).toUpperCase();

      promptWords.value.forEach((word, index) => {
        if (fullTranscript.includes(word) && !spokenWordIndices.value.includes(index)) {
          spokenWordIndices.value.push(index);
        }
      });

      if (spokenWordIndices.value.length === promptWords.value.length) {
        stopRecording();
      }
    };

    recognition.value.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  } else {
    alert(t('voice.unsupportedSpeech'));
  }
};

function encodeWAV(samples, sampleRate = 44100) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 32 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);

  // Write the PCM samples
  floatTo16BitPCM(view, 44, samples);

  return view.buffer;
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function floatTo16BitPCM(output, offset, input) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}

const setupAudioRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioStream.value = stream;

    audioContext.value = new (window.AudioContext || window.webkitAudioContext)({
      sampleRate: 44100 // Standard sample rate for good compatibility
    });

    const source = audioContext.value.createMediaStreamSource(stream);

    const bufferSize = 4096;
    const recorder = audioContext.value.createScriptProcessor(bufferSize, 1, 1);

    recorder.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const buffer = new Float32Array(input);
      recordedSamples.value.push(buffer);
    };

    source.connect(recorder);
    recorder.connect(audioContext.value.destination);

    // Store references
    processorNode.value = recorder;
    mediaRecorder.value = {
      isRecording: true
    };

    console.log('Audio recording setup complete with standard WAV parameters');
    return true;
  } catch (error) {
    console.error('Error accessing microphone:', error);
    alert(t('voice.microphoneDenied'));
    return false;
  }
};

const toggleRecording = async () => {
  firstRecordingStarted.value = true;
  if (!isRecording.value) {
    if (!recognition.value) {
      setupSpeechRecognition();
    }
    const audioSetupSuccess = await setupAudioRecording();
    if (!audioSetupSuccess) return;

    startRecording();
  } else {
    stopRecording();
  }
};

const startRecording = () => {
  isRecording.value = true;
  recordedSamples.value = [];

  if (recognition.value) {
    transcript.value = '';
    spokenWordIndices.value = [];
    recognition.value.start();
  }

  console.log('Started recording audio and speech recognition');
};

const stopRecording = () => {
  isRecording.value = false;
  hasRecorded.value = true;

  if (recognition.value) {
    recognition.value.stop();
  }
  if (processorNode.value) {
    processorNode.value.disconnect();

    let sampleLength = 0;
    for (const buffer of recordedSamples.value) {
      sampleLength += buffer.length;
    }

    const mergedSamples = new Float32Array(sampleLength);
    let offset = 0;

    for (const buffer of recordedSamples.value) {
      mergedSamples.set(buffer, offset);
      offset += buffer.length;
    }

    const wavBuffer = encodeWAV(mergedSamples, audioContext.value.sampleRate);

    audioBlob.value = new Blob([wavBuffer], { type: 'audio/wav' });

    console.log('Stopped recording, created WAV file with size:', audioBlob.value.size, 'bytes');

    if (audioStream.value) {
      audioStream.value.getTracks().forEach(track => track.stop());
    }
  }
};

const submitRecording = async () => {
  if (!audioBlob.value) {
    console.error('No audio recording available');
    return;
  }

  try {
    console.log('Sending WAV file of size:', audioBlob.value.size, 'bytes');

    const formData = new FormData();
    formData.append('file', audioBlob.value, 'recording.wav');
    formData.append('transcript', transcript.value);
    PDFLoading.value = true;
    console.log(PDFLoading.value);
    const response = await fetch(`http://localhost:8000/predict/${disease}`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      console.log(blob);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'analysis.pdf';
      link.target = '_blank';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } else {
      const errorText = await response.text();
      console.error('Failed to submit recording:', errorText);
      alert(`${t('voice.submitFailed')}: ${errorText}`);
    }
  } catch (error) {
    console.error('Error submitting recording:', error);
    alert(t('voice.submitError'));
  }
};
</script>

<style scoped>
.prompt-box {
  border: 1px solid #008CA4;
  color: #cfe9ff;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
  margin: 0.8rem 1rem;
  margin-bottom: 0.4rem;
  padding: 4rem 1rem;
  border-radius: 0.9rem;
  transition: all 0.3s ease;
  line-height: 2.5rem;
}

.loading {
  background-color: #8AACB3 !important;
}

.next-btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 4rem;
  background-color: #008CA4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;
  font-weight: 600;
  font-size: 1.1rem;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(200%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
}

.spoken-word {
  color: #008CA4;
  transition: color 0.3s ease;
}

.jivalab-container {
  font-family: Poppins;
  max-width: 414px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #f5f8f9;
  margin-bottom: 1.75rem;
}

.logo {
  color: #0896B6;
  font-weight: bold;
  font-size: 22px;
}

.header-icons {
  display: flex;
  gap: 16px;
}




.arrow-back {
  transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  height: 2rem;
  width: auto;
  margin-right: 0.6rem;
}

.header-icons {
  display: flex;
  gap: 16px;
}

.notification-button,
.profile-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
}

.content-card {
  background-color: #fff;
  border-radius: 10px;
  margin: 16px;
  padding-bottom: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: #0896B6 0.5px solid;
}

.red-top {
  width: 100%;
  height: 2.5rem;
  background-color: #0896B6;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  margin-bottom: 2.5rem;
}


.icon-placeholder {
  height: 1.5rem;
  width: auto;
}

.mic-icon-placeholder {
  height: 2.8rem;
  width: auto;
}

.mic-icon-container {
  background-color: rgba(250, 82, 82, 0.1);
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.title {
  color: #0896B6;
  font-size: 1.1rem;
  margin-bottom: 0.1rem;
  margin-top: 1rem;
  font-weight: 500;
  text-align: center;
}

.instructions-list {
  width: 93%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;

}

.instruction-item {
  display: flex;
  background-color: #F0F8FF;
  align-items: center;
  border-radius: 0.5rem;
  padding: 12px 1rem;
}

.instruction-number {
  background-color: #0896B6;
  color: #FFF;
  font-weight: 400;
  width: 24px;
  height: 24px;
  font-size: 0.8rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
}

.instruction-text {
  flex: 1;
  font-size: 0.85rem;
}

.instruction-text p {
  margin: 0;
  line-height: 1.2rem;
}

.highlight {
  color: #009CB4;
  font-weight: 600;
}

.record-button {
  background-color: #009CB4;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 1.1rem;
  font-weight: bold;
  width: 93%;
  cursor: pointer;
  transition: background-color 0.2s;
}

.record-button:hover {
  background-color: #008CA4;
}
</style>