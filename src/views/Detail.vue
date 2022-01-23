<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          'Menu_History' | localize
        }}</router-link>
        <a @click.prevent class="breadcrumb"> {{ record.recordType }} </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="record.recordTypeClass">
            <div class="card-content white-text">
              <p>{{ 'Description' | localize }}: {{ record.description }}</p>
              <p>{{ 'Amount' | localize }}: {{ record.amount | currency }}</p>
              <p>{{ 'Category' | localize }}: {{ record.caregoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      {{ 'RecordWith' | localize }}={{ $route.params.id }}
      {{ 'NotFound' | localize }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data: () => ({
    record: null,
    loading: true,
  }),
  async mounted() {
    const recordId = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', recordId)

    const category = await this.$store.dispatch(
      'fetchCategoryById',
      record.categoryId
    )

    this.record = {
      ...record,
      caregoryName: category.title,
      recordType: record.type === 'income' ? 'Доход' : 'Расход',
      recordTypeClass: record.type === 'income' ? 'green' : 'red',
    }

    this.loading = false
  },
}
</script>

<style></style>
