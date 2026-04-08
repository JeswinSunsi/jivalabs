<template>
  <div class="app-container">
    <header class="header">
      <div class="logo">Jiva<span style="font-weight: 400;">lab</span></div>
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

    <main class="content">
      <section class="hero-section">
        <h1 class="hero-title">
          <span class="title-black" :class="fadeClass">{{ currentDisease }},</span>
          <span class="title-teal">{{ t('home.heroSuffix') }}</span>
        </h1>
        <p class="hero-description">
          {{ t('home.description') }}
          <span class="read-more">{{ t('home.readMore') }}</span>
        </p>
      </section>

      <section class="info-cards">
        <img src="../assets/button1.png" :alt="t('home.tests.pneumonia')" @click="$router.push('/scan/pneumonia')">
        <img src="../assets/button2.png" :alt="t('home.tests.parkinsons')" @click="$router.push('/voice/park')">
      </section>

      <section class="recommended-tests">
        <h2 class="section-title">{{ t('home.recommendedTests') }}</h2>
        <div class="test-tags">
          <span
            v-for="test in testItems"
            :key="test.key"
            class="test-tag"
            :class="{ 'tag-disabled': !test.route }"
            @click="test.route && $router.push(test.route)"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, scale: [1, 1.05, 1], transition: { delay: test.delay, duration: 500 } }"
          >
            {{ t(`home.tests.${test.key}`) }}
          </span>
        </div>
      </section>

      <section class="recent-insights">
        <h2 class="section-title">{{ t('home.recentInsights') }}</h2>
        <div class="insight-item">
          <div class="insight-info">
            <h3 class="insight-title">{{ t('home.insights.respiratoryAnalysis') }}</h3>
            <p class="insight-date">{{ t('home.insights.twoDaysAgo') }}</p>
          </div>
          <div class="insight-status">
            <span class="status-text">{{ t('home.insights.normal') }}</span>
            <span class="status-indicator green"></span>
          </div>
        </div>
        <div class="insight-item">
          <div class="insight-info">
            <h3 class="insight-title">{{ t('home.insights.torsoXrayAnalysis') }}</h3>
            <p class="insight-date">{{ t('home.insights.oneWeekAgo') }}</p>
          </div>
          <div class="insight-status">
            <span class="status-text">{{ t('home.insights.attention') }}</span>
            <span class="status-indicator yellow"></span>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p class="footer-text">
        {{ t('home.footer') }}
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';

const { t } = useI18n();

const diseaseKeys = ['parkinsons', 'sclerosis', 'pneumonia', 'dysarthria', 'tumors'];
const currentIndex = ref(0);
const fadeClass = ref('');
const currentDisease = computed(() => t(`home.diseaseCycle.${diseaseKeys[currentIndex.value]}`));

const testItems = [
  { key: 'pneumonia', route: '/scan/pneumonia', delay: 100 },
  { key: 'parkinsons', route: '/voice/park', delay: 300 },
  { key: 'brainTumor', route: '/scan/braintumor', delay: 500 },
  { key: 'lateralSclerosis', route: '/voice/als', delay: 700 },
  { key: 'dysarthria', route: '/voice/dysarthria', delay: 900 },
  { key: 'fibrosis', route: '', delay: 1100 },
  { key: 'lungCancer', route: '', delay: 1300 },
  { key: 'pneumothorax', route: '', delay: 1400 }
];

let intervalId = null;

const rotateDisease = () => {
  fadeClass.value = 'fade-out';
  
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % diseaseKeys.length;
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
  cursor: pointer;
}

.tag-disabled {
  opacity: 0.7;
  cursor: default;
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