<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6 text-center">{{ isSignUp ? 'Create Account' : 'Sign In' }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="handleSubmit" class="q-gutter-md">
        <q-input
          v-if="isSignUp"
          v-model="name"
          filled
          label="Full Name"
          :rules="[val => !!val || 'Name is required']"
        />

        <q-input
          v-model="email"
          filled
          label="Email"
          type="email"
          :rules="[val => !!val || 'Email is required']"
        />

        <q-input
          v-model="password"
          filled
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :rules="[val => !!val || 'Password is required']"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
            />
          </template>
        </q-input>

        <div class="q-mt-md">
          <q-btn
            :label="isSignUp ? 'Create Account' : 'Sign In'"
            type="submit"
            color="primary"
            class="full-width"
            :loading="loading"
          />
        </div>

        <q-separator class="q-my-md" />

        <q-btn
          label="Sign in with Google"
          color="white"
          text-color="primary"
          outline
          icon="img:https://developers.google.com/identity/images/g-logo.png"
          class="full-width"
          @click="handleGoogleSignIn"
          :loading="loading"
        />

        <div class="text-center q-mt-md">
          <q-btn
            flat
            :label="isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'"
            @click="isSignUp = !isSignUp"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'

const emit = defineEmits(['close'])

const authStore = useAuthStore()
const $q = useQuasar()

const isSignUp = ref(false)
const loading = ref(false)
const showPassword = ref(false)

const email = ref('')
const password = ref('')
const name = ref('')

const handleSubmit = async () => {
  loading.value = true
  
  try {
    let result
    if (isSignUp.value) {
      result = await authStore.signup(email.value, password.value, name.value)
    } else {
      result = await authStore.login(email.value, password.value)
    }

    if (result.success) {
      $q.notify({
        type: 'positive',
        message: isSignUp.value ? 'Account created successfully!' : 'Welcome back!',
        position: 'top'
      })
      emit('close')
    } else {
      $q.notify({
        type: 'negative',
        message: result.error || 'Authentication failed',
        position: 'top'
      })
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'An error occurred. Please try again.',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}

const handleGoogleSignIn = async () => {
  loading.value = true
  
  try {
    const result = await authStore.loginWithGoogle()
    
    if (result.success) {
      $q.notify({
        type: 'positive',
        message: 'Welcome back!',
        position: 'top'
      })
      emit('close')
    } else {
      $q.notify({
        type: 'negative',
        message: result.error || 'Google sign-in failed',
        position: 'top'
      })
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'An error occurred. Please try again.',
      position: 'top'
    })
  } finally {
    loading.value = false
  }
}
</script>