import axios from 'axios'

export default axios.create({
  baseURL: 'https://www.jieshu.mobi:8181/YanglaoServer-war',
  timeout: 10000
})
