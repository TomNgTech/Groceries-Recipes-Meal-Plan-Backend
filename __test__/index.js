const axios = require('../axiosConfig')

const getRecipes = async (id) => {
  const result = await axios.request({
    method: 'get',
    url: `/${id}`
  })
  const { data } = result
  return data
}

const postRecipes = async (recipe)=>{
    const result = await axios.request({
        method: 'post',
        url: `/recipes/`
    })
    const {data} = result
    return data
}
module.exports = getRecipes
