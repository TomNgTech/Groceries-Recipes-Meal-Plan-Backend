const axios = require('axios')
const url = require('../../axiosConfig') 
module.exports = {
 
  async getRecipes() {
    try {
       
      const response = await axios.get(url)
      return response
    } catch (err) {
      return err
    }
  },

  async getRecipesById(recipeId) {
    try {
      const response = await axios.get(url + `/${recipeId}`)
      return response[0]
    } catch (err) {
      return err
    }
  },
}
