import localizeFilter from '../filters/localize.filter'
import * as M from 'materialize-css/dist/js/materialize.min'

export default {
  bind(el, { value }) {
    M.Tooltip.init(el, { html: localizeFilter(value) })
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el)

    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  },
}
