import SvgIcon from '../components/svgIcon/index.vue' // svg组件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
export default (app) => {
  app.component('svg-icon', SvgIcon)
}
