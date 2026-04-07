<template>
    <div class="health-answers">
      <div class="content-container">
        <div class="header-section">
          <h1 class="main-title">Health Answers,</h1>
          <h2 class="subtitle">Without The Waiting Room</h2>
          <p class="tagline">Accessible healthcare at your fingertips</p>
        </div>
  
        <div class="illustration-section">
          <div class="illustration">
            <img src="../assets/hero.png" alt="Healthcare illustration" class="hero-img"/>
          </div>
        </div>
  
        <div class="brand-section">
          <h3 class="brand-name">Jiva<span style="font-weight: 400;">lab</span></h3>
        </div>
  
        <div class="conditions-section">
          <div class="scrolling-container">
            <div class="condition-row row-1">
              <button class="condition-button">Pneumonia</button>
            <button class="condition-button">Parkinson's Syndrome</button>
            <button class="condition-button">Brain Tumor</button>
            <button class="condition-button">Lateral Sclerosis</button>
            <button class="condition-button">Pneumonia</button>
              <!-- Duplicate buttons for continuous scrolling effect -->
              <button class="condition-button">Pneumonia</button>
              <button class="condition-button">Parkinson's Syndrome</button>
              <button class="condition-button">Brain Tumor</button>
              <button class="condition-button">Lateral Sclerosis</button>
              <button class="condition-button">Pneumonia</button>
            </div>
          </div>
          
          <div class="scrolling-container">
            <div class="condition-row row-2">
              <button class="condition-button">Bronchiolitis</button>
              <button class="condition-button">COPD</button>
              <button class="condition-button">Dysarthia</button>
              <button class="condition-button">Lung Cancer</button>
              <button class="condition-button">Heart Disease</button>
              <!-- Duplicate buttons for continuous scrolling effect -->
              <button class="condition-button">Bronchiolitis</button>
              <button class="condition-button">COPD</button>
              <button class="condition-button">Dysarthia</button>
              <button class="condition-button">Lung Cancer</button>
              <button class="condition-button">Heart Disease</button>
            </div>
          </div>
        </div>
  
        <div class="cta-section">
          <button class="analyze-button" @click="$router.push('/home')">
            Analyze Now
            <span class="arrow-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .health-answers {
    font-family: Poppins;
    max-width: 100%;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .hero-img {
    height: auto;
    width: 80vw;
  }
  
  .content-container {
    width: 100%;
    max-width: 420px;
    height: 100%;
    background-color: #e8f4ff;
    padding-top: 3rem;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .header-section {
    margin-bottom: 1rem;
    padding: 2rem 1.5rem;
  }
  
  .main-title {
    font-size: 1.75rem;
    font-weight: bold;
    line-height: 1.5rem;
    margin: 0;
    color: #000;
  }
  
  .subtitle {
    font-size: 1.65rem;
    font-weight: bold;
    margin: 0.5rem 0;
    line-height: 3rem;
    color: #0098b6;
    margin-bottom: 0rem;
  }
  
  .tagline {
    font-size: 1rem;
    color: #666;
    margin: 0.5rem 0;
    margin-top: 0.3rem;
  }
  
  .illustration-section {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }
  
  .illustration {
    width: 100%;
    max-width: 250px;
    display: flex;
    justify-content: center;
  }
  
  .brand-section {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  
  .brand-name {
    font-size: 1.5rem;
    color: #0098b6;
    font-weight: bold;
  }
  
  .conditions-section {
    margin-bottom: 0rem;
  }
  
  
  .scrolling-container {
    overflow: hidden;
    margin-bottom: 0.5rem;

  }
  
  .condition-row {
    display: flex;
    white-space: nowrap;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 30s; /* Slow scrolling speed */
    width: max-content;
  }
  
  
  .row-1 {
    animation-name: scroll-left;
  }
  
  .row-2 {
    animation-name: scroll-right;
    animation-delay: 0.5s;
  }
  
  @keyframes scroll-left {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%); /* Move to half of the content width */
    }
  }
  
  @keyframes scroll-right {
    0% {
      transform: translateX(-50%); /* Start from middle */
    }
    100% {
      transform: translateX(0%); /* Move to original position */
    }
  }
  
  .condition-button {
    background-color: rgba(8, 150, 182, 0.08);
    color: #0098b6;
    border: none;
    padding: 0.7rem 1.75rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    margin-right: 0.5rem;
    white-space: nowrap;
  }
  
  .cta-section {
    display: flex;
    justify-content: center;
    margin-top: 5%;
    padding-bottom: 2rem;
  }
  
  .analyze-button {
    background-color: #0098b6;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .arrow-icon {
    font-size: 1.2rem;
  }
  </style>