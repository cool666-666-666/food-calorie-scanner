const cloud = require('wx-server-sdk')
const axios = require('axios')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  try {
    const res = await axios.get('https://api.github.com')

    return {
      success: true,
      data: res.data
    }

  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}