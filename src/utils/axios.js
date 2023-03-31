import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

// === UserData Root Url ===//

export const customFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WEBSITE}/api/v1`,
})

//
//=================== vercel deploy============================

export const vercelDeploy = async () => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_WEBSITE}/api/v1/authadmin/verceldeploy`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    )
    console.log(result)
    toast.success('Pending')
  } catch (error) {
    console.log(error)
    toast.success('Error')
  }
}

// ===============================
