import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

// === UserData Root Url ===//

export const customFetch = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_WEBSITE}/api/v1`,
})

//

export const fetchPortfolios = async () => {
  // const boltSign = await axios('https://boltsign.herokuapp.com/')
  // const jobProjectRehman = await axios(
  //   'https://jobprojectrehman.herokuapp.com/'
  // )
  // const aryanaSpa = await axios('https://aryanaspa.herokuapp.com/')
}

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
