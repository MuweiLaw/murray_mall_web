// 1. 引入
import axios from 'axios'
// 2. 配置信息
let config = {
  // 每次请求的协议、IP地址。  设置该配置后，每次请求路径都可以使用相对路径，例如"/admin/login"
  baseURL: 'http://localhost:36240/admin',
  // 请求超时时间
  timeout: 10000,
  // 每次请求携带cookie
  withCredentials: true
}
// 3. 创建实例
const instance = axios.create(config)
// 4. 导出
export default instance
