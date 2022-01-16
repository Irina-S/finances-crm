import M from 'materialize-css/dist/js/materialize.min'

const DEFAULT_ERROR_MSG = 'Что-то пошло не так'

export default {
  install(Vue) {
    Vue.prototype.$message = function (html) {
      M.toast({ html })
    }

    Vue.prototype.$error = function (html) {
      M.toast({ html: `[Ошибка]: ${html || DEFAULT_ERROR_MSG}` })
    }
  },
}
