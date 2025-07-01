<template>
  <q-card 
    class="book-card cursor-pointer"
    @click="$emit('click', book)"
  >
    <div class="relative-position">
      <q-img
        :src="book.cover"
        :alt="book.title"
        ratio="3/4"
        class="book-cover"
      >
        <div class="absolute-top-right q-pa-xs">
          <q-btn
            flat
            dense
            round
            size="sm"
            :icon="isBookmarked ? 'bookmark' : 'bookmark_border'"
            :color="isBookmarked ? 'amber' : 'white'"
            @click.stop="toggleBookmark"
          />
        </div>
        
        <div class="absolute-bottom-right q-pa-xs">
          <q-btn
            flat
            dense
            round
            size="sm"
            icon="play_arrow"
            color="white"
            class="bg-primary"
            @click.stop="playBook"
          />
        </div>
      </q-img>
    </div>

    <q-card-section class="q-pa-sm">
      <div class="text-subtitle2 text-weight-medium ellipsis-2-lines">
        {{ book.title }}
      </div>
      <div class="text-caption text-grey-6 ellipsis">
        {{ book.author }}
      </div>
      
      <div class="row items-center justify-between q-mt-xs">
        <div class="row items-center">
          <q-rating
            v-model="book.rating"
            size="xs"
            color="amber"
            readonly
          />
          <span class="text-caption text-grey-6 q-ml-xs">
            {{ book.rating }}
          </span>
        </div>
        
        <div class="text-caption text-grey-6">
          {{ book.duration }}
        </div>
      </div>

      <q-chip
        :label="book.genre"
        size="sm"
        color="primary"
        text-color="white"
        class="q-mt-xs"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import { useAudiobooksStore } from 'src/stores/audiobooks'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const audiobooksStore = useAudiobooksStore()

const isBookmarked = computed(() => 
  audiobooksStore.bookmarks.includes(props.book.id)
)

const toggleBookmark = () => {
  audiobooksStore.toggleBookmark(props.book.id)
}

const playBook = () => {
  audiobooksStore.playBook(props.book)
}
</script>

<style scoped>
.book-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.book-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.book-cover {
  border-radius: 8px 8px 0 0;
}

.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2;
  max-height: 2.4em;
}
</style>