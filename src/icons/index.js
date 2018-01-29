import Vue from 'vue'
import SvgIcon from './component/SvgIcon' // svg组件
import generateIconsView from './svg-icons/generateIconsView'

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
const iconMap = requireAll(req)

generateIconsView.generate(iconMap)
