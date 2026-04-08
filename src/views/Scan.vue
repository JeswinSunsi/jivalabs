<template>
  <div class="jivalab-container">
    <header class="header">
      <span style="display: flex; align-items: center;">
        <img src="../assets/arrowblue.png" alt="Go Back" class="arrow-back" @click="$router.push('/home')">
        <div class="logo">Jiva<span style="font-weight: 400;">lab</span></div>
      </span>
      <div class="header-icons">
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
      <p v-if="uploadHintText" class="upload-hint">{{ uploadHintText }}</p>
      <div class="mic-icon-container" @click="triggerFileInput">
        <div class="mic-icon">
          <img src="../assets/upload.png" alt="Upload" class="mic-icon-placeholder">
        </div>
      </div>

      <input 
        type="file" 
        ref="fileInput" 
        @change="handleFileChange" 
        accept="image/jpeg,image/png" 
        style="display: none;" 
      />

      <div class="instructions-list">
        <div class="instruction-item" v-motion
          :initial="{ x: -50, opacity: 0 }"
          :enter="{ x: 0, opacity: 1, transition: { delay: 100 } }">
          <div class="instruction-number">1</div>
          <div class="instruction-text">
            <p style="color: #0896B6;">{{ t('scan.supportedFiles') }}<span class="highlight"> {{ t('scan.includesJpgPng') }}</span></p>
          </div>
        </div>
      </div>

      <div v-if="selectedFileName" class="selected-file">
        <p>{{ t('scan.selected') }}: {{ selectedFileName }}</p>
      </div>

      <button 
        class="record-button" 
        @click="uploadImage" 
        :disabled="!hasImage || isLoading"
        :class="{ 'button-disabled': !hasImage || isLoading }" v-motion
          :initial="{ x: -50, opacity: 0 }"
          :enter="{ x: 0, opacity: 1, transition: { delay: 300 } }"
      >
        {{ isLoading ? t('scan.uploading') : t('scan.ready') }}
      </button>
      <div v-if="apiResponse?.error" class="result-card error-card">
        <p class="result-title">{{ t('scan.uploadFailed') }}</p>
        <p class="result-description">{{ apiResponse.error }}</p>
      </div>

      <div v-else-if="apiResponse?.predicted_class" class="result-card">
        <p class="result-title">{{ t('scan.predictionResult') }}</p>
        <p class="result-value">{{ apiResponse.predicted_class }}</p>
        <p v-if="pneumoniaProbability !== null" class="result-description">
          {{ t('scan.pneumoniaProbability') }}: {{ pneumoniaProbability }}%
        </p>
      </div>

      <div v-else-if="apiResponse?.message" class="result-card">
        <p class="result-title">{{ t('scan.uploadComplete') }}</p>
        <p class="result-description">{{ apiResponse.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useRoute } from "vue-router"
const route = useRoute()
const disease = route.params.disease
const { t } = useI18n();

const fileInput = ref(null);
const hasImage = ref(false);
const isLoading = ref(false);
const apiResponse = ref(null);
const selectedFileName = ref('');

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    hasImage.value = true;
    selectedFileName.value = file.name;
  } else {
    hasImage.value = false;
    selectedFileName.value = '';
  }
};

const uploadImage = async () => {
  if (!hasImage.value || isLoading.value) return;
  
  const file = fileInput.value.files[0];
  if (!file) return;
  
  try {
    isLoading.value = true;
    apiResponse.value = null;
    
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`http://localhost:8000/predict/${disease}`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`;

      try {
        const errorData = await response.json();
        if (errorData?.detail) {
          errorMessage = errorData.detail;
        }
      } catch {
        const errorText = await response.text();
        if (errorText) {
          errorMessage = errorText;
        }
      }

      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type') || '';
    const disposition = response.headers.get('content-disposition') || '';
    const blob = await response.blob();
    const headerSample = await blob.slice(0, 20).text();
    const isPdfResponse =
      disease === 'braintumor' ||
      contentType.includes('application/pdf') ||
      disposition.toLowerCase().includes('.pdf') ||
      headerSample.includes('%PDF-');

    if (isPdfResponse) {
      const fileNameMatch = disposition.match(/filename="?([^\"]+)"?/i);
      const downloadName = fileNameMatch?.[1] || `${disease}_report.pdf`;

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = downloadName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      apiResponse.value = { message: t('scan.reportGenerated') };
      return;
    }

    const responseText = await blob.text();
    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      throw new Error(responseText || t('scan.unexpectedResponse'));
    }

    apiResponse.value = data;
    console.log(apiResponse.value);
    
  } catch (error) {
    console.error('Error uploading image:', error);
    apiResponse.value = { error: error.message };
    alert(`${t('scan.uploadError')}: ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};
const pneumoniaProbability = computed(() => {
  if (!apiResponse.value?.predicted_class) {
    return null;
  }

  const rawProbability =
    apiResponse.value.pneumonia_probability_percent ??
    apiResponse.value.pneumonia_probability;

  if (typeof rawProbability === 'string') {
    const parsed = Number(rawProbability.replace('%', '').trim());
    return Number.isFinite(parsed) ? Math.round(parsed) : null;
  }

  if (typeof rawProbability === 'number') {
    return rawProbability <= 1
      ? Math.round(rawProbability * 100)
      : Math.round(rawProbability);
  }

  return null;
});

const uploadHintText = computed(() => {
  if (disease === 'pneumonia') {
    return t('scan.uploadHintPneumonia');
  }

  if (disease === 'braintumor') {
    return t('scan.uploadHintBrainTumor');
  }

  return '';
});
</script>

<style scoped>
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

.notification-button, .profile-button {
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
  background-color: rgba(99, 180, 121, 0.1);
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
}

.upload-hint {
  margin: 0 1.4rem 0.9rem;
  text-align: center;
  color: #0d4f5d;
  font-size: 0.86rem;
  font-weight: 500;
  line-height: 1.25rem;
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

.selected-file {
  margin: 0 0 16px 0;
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
  color: #0896B6;
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

.record-button:hover:not(:disabled) {
  background-color: #008CA4;
}

.button-disabled {
  background-color: #a0d3dd;
  cursor: not-allowed;
}
.result-card {
  width: 93%;
  margin: 16px 0 0;
  padding: 12px 14px;
  background-color: #f0f8ff;
  border: 1px solid #0896b6;
  border-radius: 8px;
  color: #0d4f5d;
}

.error-card {
  border-color: #c0392b;
  background-color: #fdecea;
  color: #7b241c;
}

.result-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
}

.result-value {
  margin: 6px 0 4px;
  font-size: 1.1rem;
  text-transform: capitalize;
  font-weight: 700;
}

.result-description {
  margin: 0;
  font-size: 0.88rem;
}
</style>