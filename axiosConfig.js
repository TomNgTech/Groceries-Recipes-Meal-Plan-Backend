const axios = require('axios')

const axiosInstance = axios.default.create({
  baseURL: 'https://testurl.com/recipes'
})

module.exports = axiosInstance
