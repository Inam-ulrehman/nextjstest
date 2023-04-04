import { customFetch } from '@/utils/axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import useSWRConfig from 'swr'

const useSampleData = ({ page, limit }) => {
  const { data, error, isLoading } = useSWRConfig(
    `/samples?page=${page}&limit=${limit}`,
    customFetch
  )

  return {
    data,
    isLoading,
    error,
  }
}
const singleSample = (id) => {
  const { data, isLoading, error } = useSWRConfig(`/samples/${id}`, customFetch)

  return {
    data,
    isLoading,
    error,
  }
}

const deleteSample = async (id) => {
  try {
    const response = await customFetch.delete(`/samples/${id}`)
    toast.success(response.data.msg)
  } catch (error) {
    toast.error(error.response.data.msg)
  }
}
export { useSampleData, singleSample, deleteSample }
