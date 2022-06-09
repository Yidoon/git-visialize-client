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

export const getMonthName = (month: number) => {
  return {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    13: 'December',
  }[month]
}
