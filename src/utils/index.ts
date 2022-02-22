export const isObject = (target: IKV) => {
  return Object.prototype.toString.call(target) === '[object Object]'
}
export const objToUrlQueryString = (obj: IKV) => {
  let result = ''
  if (obj && isObject(obj)) {
    Object.keys(obj).forEach((key) => {
      result += `${key}=${obj[key]}&`
    })
  }
  return result
}
