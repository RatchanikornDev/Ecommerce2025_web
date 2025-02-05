import axios from 'axios'

export const payment = async (token) =>
  await axios.post(
    'https://ecommerce2025-api.vercel.app/api/user/create-payment-intent',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
