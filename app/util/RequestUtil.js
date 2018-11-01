import { debugRequest } from '../constants/Urls'

export default request = (payload) => {
  const { url, method = 'get', body, toastNetworkError = true, headers } = payload;
  return fetch(url, {
    method,
    body,
    headers
  }).then((response) => {
    return parseResponse(response);
  }).then((responseBody) => {
    debugRequest && console.log('Request success:', {
      url,
      method,
      requestBody: body,
      responseBody,
    });
    return responseBody;
  }).catch((error) => {
    debugRequest && console.error('Request failure:', {
      url,
      method,
      body,
      error,
    });
    if (toastNetworkError && (error instanceof RequestError && error.status !== 401 ||
      error instanceof TypeError && error.message === 'Network request failed')) {
      toastShort(RequestResult.TEXT_REQUEST_ERROR);
    }
    return Promise.reject(error);
  });
};

async function parseResponse(response) {
  const cloneResponse = response.clone();
  let responseBody;
  try {
    responseBody = await response.json();
  } catch (e) {
    // response body 不是 json 格式
    if (e instanceof SyntaxError) {
      responseBody = await cloneResponse.text();
    } else {
      throw e;
    }
  }
  if (response.ok) {
    return responseBody;
  } else {
    let message = responseBody;
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    throw new RequestError(message, response.status);
  }
}
