import axios from 'axios'

// http://101.200.38.13/fair/api/v1.0
// https://easy-mock.com/mock/5aa797c86701e17a67bde1ad/fair
export default axios.create({
  baseURL: 'http://101.200.38.13/fair/api/v1.0',
  timeout: 10000
})
