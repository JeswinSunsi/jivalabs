<template>
  <div class="app-container">
    <header class="header">
      <div class="logo">Jiva<span style="font-weight: 400;">lab</span></div>
      <div class="header-icons">
        <div class="notification-icon">
          <img src="../assets/chat.png" alt="Notifications" class="icon-placeholder" @click="$router.push('/chat')">
        </div>
        <div class="profile-icon">
          <img src="../assets/usericon.png" alt="Notifications" class="icon-placeholder" @click="$router.push('/profile')">
        </div>
      </div>
    </header>

    <main class="content">
      <section class="hero-section">
        <h1 class="hero-title">
          <span class="title-black" :class="fadeClass">{{ currentDisease }},</span>
          <span class="title-teal">Checked Simply</span>
        </h1>
        <p class="hero-description">
          Let's be honest - getting good healthcare isn't always easy. For too many of us, seeing a doctor means taking.
          <span class="read-more">Read More</span>
        </p>
      </section>

      <section class="info-cards">
        <img src="../assets/button1.png" alt="diagnose" @click="$router.push('/scan/pneumonia')">
        <img src="../assets/button2.png" alt="detect" @click="$router.push('/voice/park')">
      </section>

      <section class="recommended-tests">
        <h2 class="section-title">Recommended Tests</h2>
        <div class="test-tags">
          <span class="test-tag" @click="$router.push('/scan/pneumonia')" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, scale: [1, 1.05, 1], transition: { delay: 100, duration: 500 } }">Pneumonia</span>
          <span class="test-tag" @click="$router.push('/voice/park')" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, scale: [1, 1.05, 1], transition: { delay: 300, duration: 500 } }">Parkinson's Syndrome</span>
          <span class="test-tag" @click="$router.push('/scan/braintumor')" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, scale: [1, 1.05, 1], transition: { delay: 500, duration: 500 } }">Brain Tumor</span>
          <span class="test-tag" @click="$router.push('/voice/als')" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, scale: [1, 1.05, 1], transition: { delay: 700, duration: 500 } }">Lateral Sclerosis</span>
          <span class="test-tag" @click="$router.push('/voice/dysarthria')" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, scale: [1, 1.05, 1], transition: { delay: 900, duration: 500 } }">Dysarthia</span>
          <span class="test-tag" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, scale: [1, 1.05, 1], transition: { delay: 1100, duration: 500 } }">Fibrosis</span>
          <span class="test-tag" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, scale: [1, 1.05, 1], transition: { delay: 1300, duration: 500 } }">Lung Cancer</span>
          <span class="test-tag" v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, scale: [1, 1.05, 1], transition: { delay: 1400, duration: 500 } }">Pneumothorax</span>
        </div>
      </section>

      <section class="recent-insights">
        <h2 class="section-title">Recent Insights</h2>
        <div class="insight-item">
          <div class="insight-info">
            <h3 class="insight-title">Respiratory Analysis</h3>
            <p class="insight-date">2 days ago</p>
          </div>
          <div class="insight-status">
            <span class="status-text">Normal</span>
            <span class="status-indicator green"></span>
          </div>
        </div>
        <div class="insight-item">
          <div class="insight-info">
            <h3 class="insight-title">Torso XRay Analysis</h3>
            <p class="insight-date">1 week ago</p>
          </div>
          <div class="insight-status">
            <span class="status-text">Attention</span>
            <span class="status-indicator yellow"></span>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p class="footer-text">
        Made with ☕ & 💖 by <span style="font-weight: 600;">Team Tactile</span> | 2026
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
const diseases = ref([
  'Parkinson\'s',
  'Sclerosis',
  'Pneumonia',
  'Dysarthia',
  'Tumors'
]);

const currentDisease = ref(diseases.value[0]);
const currentIndex = ref(0);
const fadeClass = ref('');
let intervalId = null;
const rotateDisease = () => {
  fadeClass.value = 'fade-out';
  
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % diseases.value.length;
    currentDisease.value = diseases.value[currentIndex.value];
    fadeClass.value = 'fade-in';
    setTimeout(() => {
      fadeClass.value = '';
    }, 1000);
  }, 1000);
};

onMounted(() => {
  intervalId = setInterval(rotateDisease, 3500);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.app-container {
  max-width: 100%;
  margin: 0 auto;
  font-family: Poppins;
  color: #333;
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
  width: 100% !important;
}

.logo {
  color: #00a2b9;
  font-weight: bold;
  font-size: 22px;
}

.header-icons {
  display: flex;
  gap: 16px;
}


.fade-out {
  animation: fadeOut 1s ease-out forwards;
}

.fade-in {
  animation: fadeIn 1s ease-in forwards;
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.content {
  flex: 1;
  padding: 0 20px;
}

.hero-section {
  margin-bottom: 20px;
}

.hero-title {
  font-size: 1.7rem;
  line-height: 1.2;
  margin-bottom: 10px;
}

.title-black {
  color: #000;
  display: block;
  font-weight: bold;
}

.title-teal {
  color: #00a2b9;
  display: block;
  font-weight: bold;
  line-height: 2.7rem;
}

.hero-description {
  color: #5A6678;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.read-more {
  color: #5A6678;
  font-weight: 600;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 2.6rem;
}


.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}

.test-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 2.6rem;
}

.icon-placeholder {
  height: 1.5rem;
  width: auto;
}

.test-tag {
  background-color: rgba(8, 150, 182, 0.08);
  color: #00a2b9;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
}

.recent-insights {
  margin-bottom: 20px;
}

.insight-item {
  background-color: #F8FAFC;
  border-radius: 0.6rem;
  padding: 1.5rem 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.insight-title {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 4px 0;
}

.insight-date {
  font-size: 12px;
  color: #888;
  margin: 0;
}

.insight-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-text {
  font-size: 14px;
  color: #666;
}

.status-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.green {
  background-color: #4CAF50;
}

.yellow {
  background-color: #FFC107;
}

.footer {
  text-align: center;
  padding: 1.2rem;
  margin-top: auto;
  color: #00a2b9;
  background-color: #ECF7FA;
  font-size: 12px;
}

.heart-icon {
  color: red;
}
</style>