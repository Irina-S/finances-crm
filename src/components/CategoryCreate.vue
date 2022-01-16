<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
            id="name"
            type="text"
          />
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <input
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
            id="limit"
            type="number"
          />
          <label for="limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
            >Минимальная величина - {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minValue } from 'vuelidate/lib/validators'
import M from 'materialize-css/dist/js/materialize.min'
import messages from '@/utils/messages'

const LIMIT_DEFAULT = 100

export default {
  data: () => ({
    title: '',
    limit: LIMIT_DEFAULT,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(LIMIT_DEFAULT) },
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        })
        this.title = ''
        this.limit = LIMIT_DEFAULT
        this.$v.$reset()
        this.$message(messages['category-created'])
        this.$emit('created', category)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
  -webkit-appearance: none;
  margin: 0;
}
</style>
