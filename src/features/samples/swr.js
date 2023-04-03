import { customFetch } from '@/utils/axios'
import useSWRConfig from 'swr'

const useSampleData = () => {
  const { data, error, mutate } = useSWRConfig('/samples', customFetch)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}
const singleSample = (id) => {
  const { data, error, mutate } = useSWRConfig(`/samples/${id}`, customFetch)

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  }
}

const deleteSample = async (id) => {
  try {
    const response = await customFetch.delete(`/samples/${id}`)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
export { useSampleData, singleSample, deleteSample }
