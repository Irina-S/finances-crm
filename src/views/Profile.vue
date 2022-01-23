<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form @submit.prevent="submitHandler" class="form">
      <div class="input-field">
        <input
          v-model="name"
          id="description"
          type="text"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="description">{{ 'Name' | localize }}</label>
        <span
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >{{ 'EnterName' | localize }}</span
        >
      </div>

      <div class="switch">
        <label>
          English
          <input v-model="isRuLocale" type="checkbox" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import * as M from 'materialize-css/dist/js/materialize.min'

export default {
  data: () => ({
    name: '',
    isRuLocale: true,
  }),
  validations: {
    name: { required },
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'

    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
  },
  watch: {
    info() {
      this.name = this.info.name
      this.isRuLocale = this.info.locale === 'ru-RU'
    },
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
