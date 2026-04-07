<template>
    <div class="chat-container">
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
      <div class="notice-wrapper">
        <h3>Welcome to Jivalab's Personal Healthcare assistant. Stay mindful and secure.</h3>
      </div>
      <div class="messages-container" ref="messagesContainerRef">
        <div v-for="(message, index) in messages" :key="index" 
             :class="['message', message.sender === 'me' ? 'sent' : 'received']">
          <div class="message-bubble">
            <div class="message-text">{{ message.text }}</div>
          </div>
        </div>
        <div v-if="isLoading" class="message received">
          <div class="message-bubble">
            <div class="message-text loading">...</div>
          </div>
        </div>
      </div>
      
      <div class="input-container">
        <textarea 
          v-model="newMessage" 
          placeholder="Type a message..." 
          @keydown.enter.prevent="sendMessage"
          class="message-input"
          :disabled="isLoading"
        ></textarea>
        <button 
          class="send-button" 
          @click="sendMessage" 
          :disabled="!newMessage.trim() || isLoading"
        >
          Send
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, nextTick } from 'vue';
  
  const props = defineProps({
    chatName: {
      type: String,
      default: 'Chat'
    },
    initialMessages: {
      type: Array,
      default: () => []
    }
  });
  
  const emit = defineEmits(['message-sent', 'back']);
  
  const messages = ref(props.initialMessages);
  const newMessage = ref('');
  const messagesContainerRef = ref(null);
  const isLoading = ref(false);
  
  const sendMessage = async () => {
    if (newMessage.value.trim() && !isLoading.value) {
      const userMessage = {
        text: newMessage.value,
        sender: 'me'
      };
      
      messages.value.push(userMessage);
      emit('message-sent', userMessage);
      
      const messageText = newMessage.value;
      newMessage.value = '';
      scrollToBottom();
      
      isLoading.value = true;
      
      try {
        const response = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const botMessage = {
          text: data.response || data, 
          sender: 'bot'
        };
        
        messages.value.push(botMessage);
        scrollToBottom();
        
      } catch (error) {
        console.error('Error sending message:', error);
        messages.value.push({
          text: 'Sorry, there was an error sending your message. Please try again.',
          sender: 'bot'
        });
      } finally {
        isLoading.value = false;
        scrollToBottom();
      }
    }
  };
  
  const scrollToBottom = async () => {
    await nextTick();
    if (messagesContainerRef.value) {
      messagesContainerRef.value.scrollTop = messagesContainerRef.value.scrollHeight;
    }
  };
  
  onMounted(() => {
    scrollToBottom();
  });
  
  watch(() => props.initialMessages, (newVal) => {
    messages.value = newVal;
    scrollToBottom();
  }, { deep: true });
  </script>
  
  <style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 100%;
    background-color: #FFF;
    font-family: Poppins;
  }

  .notice-wrapper {
    width: 100%;
    height: 2rem;
    text-align: center;
    padding: 0rem 1rem;
    font-size: 0.9rem;
    line-height: 1.2rem;
    color: #8a8a8a;
    margin-bottom: 1rem;
  }
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #00ACC1;
    color: white;
    font-weight: bold;
  }
  
  .back-button {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .header-icons {
    display: flex;
    gap: 15px;
  }
  
  .notification-icon, .profile-icon {
    cursor: pointer;
  }
  
  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }
  
  .message {
    max-width: 70%;
    margin-bottom: 10px;
    display: flex;
  }
  
  .sent {
    align-self: flex-end;
  }
  
  .received {
    align-self: flex-start;
  }
  
  .message-bubble {
    padding: 10px 15px;
    border-radius: 18px;
    position: relative;
  }
  
  .sent .message-bubble {
    background-color: #0896B6;
    color: #fff;
    padding: 1rem 1.5rem;
    line-height: 1.3rem;
    border-bottom-right-radius: 5px;
  }
  
  .received .message-bubble {
    background-color: #8AACB3;
    color: #fff;
    line-height: 1.3rem;
    margin-bottom: -0.2rem;
    border-bottom-left-radius: 5px;
    padding: 1rem 1.5rem;
  }
  
  .message-text {
    word-wrap: break-word;
  }
  
  
  .input-container {
    display: flex;
    padding: 10px;
    background-color: white;
    border-top: 1px solid #e0e0e0;
  }
  
  .message-input {
    flex: 1;
    border: none;
    border-radius: 20px;
    padding: 10px 15px;
    resize: none;
    background-color: #f0f0f0;
    max-height: 100px;
    min-height: 40px;
    outline: none;
    font-family: inherit;
  }
  
  .send-button {
    margin-left: 10px;
    padding: 0 15px;
    background-color: #00ACC1;
    color: white;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .send-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
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

.icon-placeholder {
  height: 1.5rem;
  width: auto;
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
  </style>