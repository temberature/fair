import axios from 'axios'

// https://easy-mock.com/mock/5a3c67260df23b51b3614cfb
// https://www.jieshu.mobi:8181/YanglaoServer-war
export default axios.create({
  baseURL: 'https://easy-mock.com/mock/5aa797c86701e17a67bde1ad/fair',
  timeout: 10000
})
