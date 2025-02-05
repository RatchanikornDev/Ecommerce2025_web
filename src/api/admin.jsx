import axios from 'axios'

export const getOrderAdmin = async (token) => {
  //code body
  return axios.get('https://ecommerce2025-api.vercel.app/api/admin/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const changeOrderStatus = async (token, orderId, orderStatus) => {
  // code body
  return axios.put(
    'https://ecommerce2025-api.vercel.app/api/admin/order-status',
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const getListAllUsers = async (token) => {
  //code body
  return axios.get('https://ecommerce2025-api.vercel.app/api/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const ChangeUserStatus = async (token, value) => {
  //code body
  return axios.post(
    'https://ecommerce2025-api.vercel.app/api/change-status',
    value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const ChangeUserRole = async (token, value) => {
  //code body
  return axios.post(
    'https://ecommerce2025-api.vercel.app/api/change-role',
    value,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
