const urlBase = import.meta.env.VITE_API_URL

export const fetchWitoutToken = (endpoint, data, method = 'GET') => {
  const url = `${urlBase}/${endpoint}`

  if (method === 'GET') {
    return fetch(url)
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }
}