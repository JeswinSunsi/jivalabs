<template>
  <label class="language-switcher">
    <span class="language-label">{{ t('language.label') }}</span>
    <select v-model="currentLocale" class="language-select" aria-label="Select language">
      <option v-for="code in localeOptions" :key="code" :value="code">
        {{ t(`language.options.${code}`) }}
      </option>
    </select>
  </label>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { LOCALE_STORAGE_KEY, SUPPORTED_LOCALES } from '../i18n';

const { locale, t } = useI18n();

const localeOptions = SUPPORTED_LOCALES;

const currentLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value;

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, value);
    }
  }
});
</script>

<style scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.language-label {
  color: #4f6470;
  font-size: 0.8rem;
  font-weight: 600;
}

.language-select {
  border: 1px solid #b9d7de;
  border-radius: 0.4rem;
  background-color: #ffffff;
  color: #0f5c6c;
  font-size: 0.8rem;
  font-weight: 600;
  height: 2rem;
  min-width: 6.2rem;
  padding: 0 0.5rem;
}

.language-select:focus {
  outline: 2px solid #9fd7e3;
  outline-offset: 1px;
}
</style>
