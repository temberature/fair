import axios from 'axios'

export default axios.create({
  baseURL: 'https://easy-mock.com/mock/5a3c67260df23b51b3614cfb',
  timeout: 10000
})
