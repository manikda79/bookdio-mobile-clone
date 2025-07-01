<template>
  <div class="audio-player q-pa-md">
    <div class="row items-center q-gutter-md">
      <!-- Book Cover -->
      <q-avatar size="50px" rounded>
        <img :src="currentBook.cover" :alt="currentBook.title" />
      </q-avatar>

      <!-- Book Info -->
      <div class="col">
        <div class="text-subtitle2 text-weight-medium ellipsis">
          {{ currentBook.title }}
        </div>
        <div class="text-caption text-grey-5 ellipsis">
          {{ currentBook.author }}
        </div>
      </div>

      <!-- Controls -->
      <div class="row items-center q-gutter-sm">
        <q-btn
          flat
          dense
          round
          icon="skip_previous"
          size="sm"
          @click="skipBackward"
        />
        
        <q-btn
          flat
          dense
          round
          :icon="isPlaying ? 'pause' : 'play_arrow'"
          size="md"
          @click="togglePlay"
        />
        
        <q-btn
          flat
          dense
          round
          icon="skip_next"
          size="sm"
          @click="skipForward"
        />

        <q-btn
          flat
          dense
          round
          icon="close"
          size="sm"
          @click="closePlayer"
        />
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="q-mt-sm">
      <q-slider
        v-model="currentTime"
        :min="0"
        :max="duration || 100"
        :step="1"
        color="primary"
        track-color="grey-7"
        @change="seekTo"
      />
      <div class="row justify-between text-caption text-grey-5">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>
    </div>

    <!-- Volume Control (expandable) -->
    <q-expansion-item
      v-if="showVolumeControl"
      icon="volume_up"
      label="Volume"
      dense
    >
      <q-slider
        v-model="volume"
        :min="0"
        :max="1"
        :step="0.1"
        color="primary"
        @change="setVolume"
      />
    </q-expansion-item>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAudiobooksStore } from 'src/stores/audiobooks'

const audiobooksStore = useAudiobooksStore()
const showVolumeControl = ref(false)

const currentBook = computed(() => audiobooksStore.currentBook)
const isPlaying = computed(() => audiobooksStore.isPlaying)
const currentTime = computed({
  get: () => audiobooksStore.currentTime,
  set: (value) => audiobooksStore.currentTime = value
})
const duration = computed(() => audiobooksStore.duration || 100)
const volume = computed({
  get: () => audiobooksStore.volume,
  set: (value) => audiobooksStore.volume = value
})

const togglePlay = () => {
  if (isPlaying.value) {
    audiobooksStore.pauseBook()
  } else {
    audiobooksStore.resumeBook()
  }
}

const skipBackward = () => {
  const newTime = Math.max(0, currentTime.value - 15)
  audiobooksStore.seekTo(newTime)
}

const skipForward = () => {
  const newTime = Math.min(duration.value, currentTime.value + 15)
  audiobooksStore.seekTo(newTime)
}

const seekTo = (time) => {
  audiobooksStore.seekTo(time)
}

const setVolume = (vol) => {
  audiobooksStore.setVolume(vol)
}

const closePlayer = () => {
  audiobooksStore.stopBook()
}

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.audio-player {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-top: 1px solid #333;
}
</style>