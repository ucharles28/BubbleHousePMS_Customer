// const baseUrl = 'https://localhost:7298/api/'
const baseUrl = process.env.NEXT_PUBLIC_REACT_API_BASE_URL
export async function post(url = '', request = {}, token) {
  const response = await fetch(`${baseUrl}${url}`, {
    method: 'POST',
    // mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  })
    .then(async (res) => {
      // console.log('text', text)
      /*Check if request forbidden due to expired token
        Then request a new token if it is
     */
      if (res.status === 401) {
        const response = await get(`Auth/RenewToken/${token}`, '')
        if (response.successful) {
          localStorage.setItem('token', response.data.Token);
          localStorage.setItem('tokenExpiryDate', response.data.TokenExpiryDate);
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return await post(url, request, response.data.Token);
      }
      const responseObject = {
        successful: res.ok,
        data: await res.json()
        // data: res.ok ? await res.json() : await res.text(),
      };
      console.log('response', responseObject)
      return responseObject;
    })
    // .then((data) => data)
    .catch((error) => {
      console.log('err', error)
      // return error;
      const responseObject = {
        successful: false,
        data: 'Unable to send request. Please try again later',
      };
      return responseObject;
    });
  return response;
}

export async function put(url = '', request = {}, token) {
  const response = await fetch(`https://test.africanvo.com/api/v1/${url}`, {
    method: 'PUT',
    // mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  })
    .then(async (res) => {
      // const text = await res.text()
      // console.log('text', text)
      
      const responseObject = {
        successful: res.ok,
        data: await res.json()
        // data: res.ok ? await res.json() : await res.text(),
      };
      console.log('response', responseObject)
      return responseObject;
    })
    // .then((data) => data)
    .catch((error) => {
      console.log('err', error)
      // return error;
      const responseObject = {
        successful: false,
        data: 'Unable to send request. Please try again later',
      };
      return responseObject;
    });
  return response;
}

export async function postData(url = '', request = {}, token) {
  const response  = await fetch(`${baseUrl}${url}`, {
    method: 'POST',
    // mode: 'no-cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: new Headers({
      'Authorization': `Bearer ${token}`, 
    }),
    body: request,
  })
    .then(async (res) => {
      // const text = await res.text();
      console.log('response message', res)
      if (res.status === 401) {
        // console.log()
        const response = await get(`Auth/RenewToken/${token}`, '')
        if (response.successful) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('tokenExpiryDate', response.data.tokenExpiryDate);
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return await postData(url, request, response.data.Token);
      }
      const responseObject = {
        successful: res.ok,
        data: await res?.json(),
      };
      return responseObject;
    })
    // .then((data) => data)
    .catch((error) => {
      // return error;
      console.log('error', error)
      const responseObject = {
        successful: false,
        data: 'Unable to send request. Please try again later',
      };
      return responseObject;
    });
  return response;
}

export async function get(url = '', token, isFullUrl) {
  const response  = await fetch(isFullUrl ? url : `${baseUrl}${url}`, {
    method: 'GET',
    // mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      console.log('res', res)
      const responseObject = {
        successful: res.ok,
        data: await res?.json(),
      };
      return responseObject;
    })
    // .then((data) => data)
    .catch((error) => {
      console.log(error)
      // return error;
      const responseObject = {
        successful: false,
        data: 'Unable to send request. Please try again later',
      };
      return responseObject;
    });
  return response;
}

export async function deleteData(url = '', token) {
  const response  = await fetch(`${baseUrl}${url}`, {
    method: 'DELETE',
    // mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      console.log('res', res)
      const responseObject = {
        successful: res.ok,
        data: await res?.json(),
      };
      return responseObject;
    })
    // .then((data) => data)
    .catch((error) => {
      console.log(error)
      // return error;
      const responseObject = {
        successful: false,
        data: 'Unable to send request. Please try again later',
      };
      return responseObject;
    });
  return response;
}
