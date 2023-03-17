import axios, { AxiosRequestConfig } from 'axios'
import { Commit } from 'vuex'

const asyncAndCommit = async (url: string, mutationName: string, commit: Commit,
  config: AxiosRequestConfig = { method: 'get' }) => {
  const { data } = await axios(url, config)
  commit(mutationName, data)
  return data
}

export default asyncAndCommit
