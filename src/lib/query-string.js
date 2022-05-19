const keyValueToString = ([key, value]) => {
  if (typeof value === 'object' && !Array.isArray(value)) {
    throw new Error('Please check you params')
  }

  return `${key}=${value}`
}

export function queryString(objectToString) {
  return Object.entries(objectToString).map(keyValueToString).join('&')
}

export function parse(stringToObject) {
  return Object.fromEntries(
    stringToObject.split('&').map(item => {
      let [key, value] = item.split('=')

      if (value.indexOf(',') > 0) {
        value = value.split(',')
      }

      return [key, value]
    }),
  )
}
