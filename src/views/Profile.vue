<template>
    <div class="profile-container" >
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
          <img src="../assets/usericon.png" alt="Notifications" class="icon-placeholder">
        </div>
      </div>
    </header>

        <div style="padding: 0rem 1rem;">
            <div class="profile-section" style="padding: 0rem 1rem;">
            <div class="avatar-container">
                <img src="../assets/pfp.jpeg" alt="Profile Picture" style="border-radius: 50%; height: 6rem; width: 6rem;;" >
            </div>
            <h2 class="profile-name">Jezwin Sunsi</h2>
            <p class="profile-email">jeswinsunsi@gmail.com</p>
            <button class="edit-profile-button">Edit Profile</button>
        </div>

        <div class="card" style="padding: 0rem 1rem;">
            <h3 class="section-title">Account</h3>

            <div class="menu-item">
                <div class="menu-item-left">
                    <span class="icon">👤</span>
                    <span>Personal Information</span>
                </div>
                <span class="chevron">›</span>
            </div>

            <div class="menu-item">
                <div class="menu-item-left">
                    <span class="icon">⚙️</span>
                    <span>Settings</span>
                </div>
                <span class="chevron">›</span>
            </div>

            <div class="menu-item">
                <div class="menu-item-left">
                    <span class="icon">🔔</span>
                    <span>Notifications</span>
                </div>
                <span class="chevron">›</span>
            </div>

            <div class="menu-item">
                <div class="menu-item-left">
                    <span class="icon">🛡️</span>
                    <span>Privacy & Security</span>
                </div>
                <span class="chevron">›</span>
            </div>
        </div>

        <span>
            <div class="card ">
            <h3 class="section-title">Preferences</h3>

            <div class="toggle-item">
                <div class="toggle-item-left">
                    <h4 class="toggle-title">Push Notifications</h4>
                    <p class="toggle-description">Receive alerts about your analysis</p>
                </div>
                <label class="toggle">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                </label>
            </div>

            <div class="toggle-item">
                <div class="toggle-item-left">
                    <h4 class="toggle-title">Analysis Reminders</h4>
                    <p class="toggle-description">Get reminded to perform regular checks</p>
                </div>
                <label class="toggle">
                    <input type="checkbox" checked>
                    <span class="toggle-slider"></span>
                </label>
            </div>

            <div class="toggle-item">
                <div class="toggle-item-left">
                    <h4 class="toggle-title">Data Sharing</h4>
                    <p class="toggle-description">Share anonymous data to improve the service</p>
                </div>
                <label class="toggle">
                    <input type="checkbox">
                    <span class="toggle-slider"></span>
                </label>
            </div>
        </div>
        </span>
    </div>


    </div>
</template>

<script setup>

</script>

<style scoped>
.profile-container {
    max-width: 600px;
    margin: 0 auto;
    font-family: Poppins;
    color: #333;
}

.back-nav {
    margin-bottom: 20px;
}

.icon-placeholder {
  height: 1.5rem;
  width: auto;
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

.profile-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.avatar-container {
    margin-bottom: 15px;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #e9e9e9;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-name {
    margin: 10px 0 5px 0;
    font-weight: 600;
}

.profile-email {
    color: #666;
    margin: 0 0 15px 0;
}

.edit-profile-button {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 8px 15px;
    font-size: 12px;
    cursor: pointer;
}

.card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    overflow: hidden;
}

.section-title {
    padding: 15px;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
}

.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-top: 1px solid #f0f0f0;
    cursor: pointer;
    font-size: 0.9rem;
}

.menu-item-left {
    display: flex;
    align-items: center;
}

.icon {
    margin-right: 10px;
    font-size: 14px;
}

.chevron {
    color: #999;
    font-size: 10px;
}

.toggle-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-top: 1px solid #f0f0f0;
}

.toggle-item-left {
    flex: 1;
}

.toggle-title {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
}

.toggle-description {
    margin: 5px 0 0 0;
    font-size: 12px;
    color: #666;
}

.toggle {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
}

.toggle input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 24px;
    transition: .4s;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    border-radius: 50%;
    transition: .4s;
}

input:checked+.toggle-slider {
    background-color: #2196F3;
}

input:checked+.toggle-slider:before {
    transform: translateX(26px);
}

.logout-text {
    color: #f44336;
}
</style>