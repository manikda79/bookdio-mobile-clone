<template>
  <q-card class="book-details-dialog">
    <q-card-section class="relative-position">
      <!-- Close Button -->
      <q-btn
        flat
        dense
        round
        icon="close"
        class="absolute-top-right q-ma-md"
        @click="$emit('close')"
      />

      <!-- Book Cover and Info -->
      <div class="row q-gutter-lg q-pa-md">
        <div class="col-auto">
          <q-img
            :src="book.cover"
            :alt="book.title"
            style="width: 200px; height: 280px;"
            class="rounded-borders"
          />
        </div>

        <div class="col">
          <div class="text-h4 text-weight-bold q-mb-sm">
            {{ book.title }}
          </div>
          
          <div class="text-h6 text-grey-7 q-mb-md">
            by {{ book.author }}
          </div>

          <div class="text-body2 text-grey-6 q-mb-md">
            Narrated by {{ book.narrator }}
          </div>

          <div class="row items-center q-gutter-md q-mb-md">
            <div class="row items-center">
              <q-rating
                v-model="book.rating"
                size="sm"
                color="amber"
                readonly
              />
              <span class="text-body2 q-ml-xs">{{ book.rating }}</span>
            </div>
            
            <q-chip :label="book.genre" color="primary" text-color="white" />
            <q-chip :label="book.language" outline />
            <q-chip :label="book.duration" outline />
          </div>

          <div class="text-body1 q-mb-lg">
            {{ book.description }}
          </div>

          <!-- Action Buttons -->
          <div class="row q-gutter-md">
            <q-btn
              color="primary"
              icon="play_arrow"
              label="Play"
              unelevated
              @click="playBook"
            />
            
            <q-btn
              :color="isBookmarked ? 'amber' : 'grey-5'"
              :icon="isBookmarked ? 'bookmark' : 'bookmark_border'"
              :label="isBookmarked ? 'Bookmarked' : 'Bookmark'"
              outline
              @click="toggleBookmark"
            />
            
            <q-btn
              :color="isDownloaded ? 'green' : 'grey-5'"
              :icon="isDownloaded ? 'download_done' : 'download'"
              :label="isDownloaded ? 'Downloaded' : 'Download'"
              outline
              @click="toggleDownload"
            />
          </div>
        </div>
      </div>
    </q-card-section>

    <!-- Additional Info Tabs -->
    <q-card-section>
      <q-tabs
        v-model="activeTab"
        dense
        active-color="primary"
        indicator-color="primary"
        align="left"
      >
        <q-tab name="details" label="Details" />
        <q-tab name="reviews" label="Reviews" />
        <q-tab name="similar" label="Similar Books" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="details">
          <div class="text-body1">
            <div class="q-mb-md">
              <strong>Publisher:</strong> Penguin Random House Audio
            </div>
            <div class="q-mb-md">
              <strong>Release Date:</strong> January 15, 2024
            </div>
            <div class="q-mb-md">
              <strong>ISBN:</strong> 978-0-123456-78-9
            </div>
            <div class="q-mb-md">
              <strong>File Size:</strong> 245 MB
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="reviews">
          <div class="q-gutter-md">
            <q-card flat bordered v-for="review in mockReviews" :key="review.id">
              <q-card-section>
                <div class="row items-center q-mb-sm">
                  <q-avatar size="32px" class="q-mr-sm">
                    <img :src="review.avatar" />
                  </q-avatar>
                  <div>
                    <div class="text-weight-medium">{{ review.name }}</div>
                    <q-rating v-model="review.rating" size="xs" readonly />
                  </div>
                </div>
                <div class="text-body2">{{ review.comment }}</div>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>

        <q-tab-panel name="similar">
          <div class="row q-gutter-md">
            <div
              v-for="similarBook in similarBooks"
              :key="similarBook.id"
              class="col-6 col-sm-4 col-md-3"
            >
              <BookCard :book="similarBook" @click="$emit('book-selected', similarBook)" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAudiobooksStore } from 'src/stores/audiobooks'
import BookCard from './BookCard.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'book-selected'])

const audiobooksStore = useAudiobooksStore()
const activeTab = ref('details')

const isBookmarked = computed(() => 
  audiobooksStore.bookmarks.includes(props.book.id)
)

const isDownloaded = computed(() => 
  audiobooksStore.downloads.includes(props.book.id)
)

const similarBooks = computed(() => 
  audiobooksStore.audiobooks
    .filter(book => book.genre === props.book.genre && book.id !== props.book.id)
    .slice(0, 4)
)

const mockReviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    comment: 'Absolutely loved this audiobook! The narrator did an amazing job bringing the characters to life.'
  },
  {
    id: 2,
    name: 'Mike Chen',
    rating: 4,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    comment: 'Great story and excellent narration. Highly recommend for anyone who enjoys this genre.'
  }
]

const playBook = () => {
  audiobooksStore.playBook(props.book)
  emit('close')
}

const toggleBookmark = () => {
  audiobooksStore.toggleBookmark(props.book.id)
}

const toggleDownload = () => {
  audiobooksStore.toggleDownload(props.book.id)
}
</script>

<style scoped>
.book-details-dialog {
  max-width: 900px;
  width: 100%;
}
</style>