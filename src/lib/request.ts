import { objToUrlQueryString } from '@utils'

class Request {
  private defaultOptions = { mode: 'no-cors', 'Content-Type': 'application/json' }
  async get(url: string, query?: IKV, option?: any) {
    let _url = url
    if (query) {
      const queryString = objToUrlQueryString(query)
      _url += `?${queryString}`
    }
    const res = await fetch(_url, {
      method: 'GET',
      ...this.defaultOptions,
      ...option,
    })
    return res.json()
  }
  async post(url: string, data: IKV, option: IKV) {
    // return new Request('POST', url)
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...option,
    })
  }
}

export default new Request()
