<template>
  <form @click.prevent="submitHandler" class="card auth-card">
    <div class="card-content">
      <span class="card-title">{{ 'HomeAccount' | localize }}</span>
      <div class="input-field">
        <input
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
          id="email"
          type="text"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
          >{{ 'EmailRequired' | localize }}</small
        >
        <small
          v-else-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
          >{{ 'EmailIncorrect' | localize }}</small
        >
      </div>
      <div class="input-field">
        <input
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
          id="password"
          type="password"
        />
        <label for="password">{{ 'Password' | localize }}</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
          >{{ 'PasswordRequired' | localize }}</small
        >
        <small
          v-else-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
          >{{ 'PasswordMust' | localize }}
          {{ $v.password.$params.minLength.min }} {{ 'Symbols' | localize }}.
          {{ 'NoPasswordIs' | localize }} - {{ password.length }}.</small
        >
      </div>
      <div class="input-field">
        <input
          v-model.trim="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
          id="name"
          type="text"
        />
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >{{ 'EnterName' | localize }}</small
        >
      </div>
      <p>
        <label>
          <input v-model="agree" name="agree" type="checkbox" />
          <span>{{ 'Agree' | localize }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ 'Reqister' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ 'HaveAccount' | localize }}?
        <router-link to="/login">{{ 'Login' | localize }}!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: true,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style></style>
