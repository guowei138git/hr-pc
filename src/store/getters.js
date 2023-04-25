const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 快捷访问
  // 在根级的getters上  开放子模块的属性给别人用
  token: state => state.user.token,  // 建立token的快捷访问
  name: state => state.user.userInfo.username, // 建立对于用户名的快捷访问
  userId: state => state.user.userInfo.userId // 建立userId的映射 也即快捷访问
}
export default getters
