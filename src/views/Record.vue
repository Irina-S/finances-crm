<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_NewRecord' | localize }}</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!this.categories.length" class="center">
      {{ 'NoCategories' | localize }}.
      <router-link to="/categories">{{ 'AddNewCat' | localize }}</router-link>
    </p>

    <form v-else @submit.prevent="submitHandler" class="form">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
        <label>{{ 'SelectCat' | localize }}</label>
      </div>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span>{{ 'Income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>{{ 'Outcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
          id="amount"
          type="number"
        />
        <label for="amount">{{ 'Amount' | localize }}</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
          >{{ 'MinValue' | localize }} -
          {{ $v.amount.$params.minValue.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required,
          }"
          id="description"
          type="text"
        />
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
          >Введите описание</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import M from 'materialize-css/dist/js/materialize.min'

export default {
  name: 'record',
  data: () => ({
    categories: [],
    loading: true,
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: '',
  }),
  validations: {
    amount: { minValue: minValue(1) },
    description: { required },
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') return true

      return this.info.bill >= this.amount
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          })

          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount

          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (error) {
          console.error(error)
        }
      } else {
        this.$message(
          `Недостаточно средств на счете ${this.amount - this.info.bill}`
        )
      }
    },
  },
}
</script>

<style></style>
