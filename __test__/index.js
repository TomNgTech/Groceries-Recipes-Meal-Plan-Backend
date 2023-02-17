const axios = require('../axiosConfig')

const getRecipes = async (id) => {
  const result = await axios.request({
    method: 'get',
    url: `/${id}`,
  })
  const { data } = result
  return data
}


module.exports = getRecipes
