import storage from './persistence'
import { randomCandidate } from './toolbox'

const VueSplitter = {
  install (Vue, options = {}) {

    if (options.storage) {
      const cfg = options.storage
      if (cfg.name) storage.name = cfg.name
      if (cfg.method) storage.method = cfg.method
      if (cfg.expiry) storage.expiry = parseInt(expiry)
    }

    Vue.component(options.component || 'split-test', {
      functional: true,
      props: {
        always: String,
        name: String
      },
      render (h, ctx) {
        const name = ctx.props.name || ctx.parent.$options.name
        if (!name) throw 'VueA2B Error: The test name is mandatory!'

        const variations = ctx.slots()
        const winner = storage.entry[name]
          || ctx.props.always
          || randomCandidate(ctx.children)

        storage.entry = {name, winner}
        return variations[winner]
      }
    })
  }
}

export default VueSplitter
