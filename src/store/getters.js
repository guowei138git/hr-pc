const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 快捷访问
  // 在根级的getters上  开放子模块的属性给别人用
  token:state => state.user.token
}
export default getters
