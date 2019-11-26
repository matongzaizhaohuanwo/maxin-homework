// @ts-ignore
import stringify from 'qs-stringify';
import axios from 'axios';

const TIME_OUT = 10000;
const TAG = 'NetWorkUtil';

export default class Result {
  result: number = 0;
  data: any = null;
  message: string = '';

  constructor(result: number, data: any, message: string) {
    this.result = result;
    this.data = data;
    this.message = message;
  }
}

export function sendPutRequest(url: string, body: any = {}, headers: any = {}, config: any = {}) {
  headers['Content-Type'] = 'application/json';
  return sendRequest(url, 'PUT', JSON.stringify(body), headers, config);
}

export function sendPostJsonRequest(url: string, body: any = {}, headers: any = {}, config: any = {}) {
  headers['Content-Type'] = 'application/json';
  return sendRequest(url, 'POST', JSON.stringify(body), headers, config);
}

export function sendPostTextRequest(url: string, body: any = {}, headers: any = {}, config: any = {}) {
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return sendRequest(url, 'POST', body, headers, config);
}

export function sendPostFormRequest(url: string, body: any = {}, headers: any = {}, config: any = {}) {
  headers['Content-Type'] = 'multipart/form-data';
  return sendRequest(url, 'POST', body, headers, config);
}

export function sendGetRequest(url: string, body: any = {}, headers: any = {}, config: any = {}) {
  url = url + (url.endsWith('?') ? '' : '?');
  url = url + stringify(body);
  return sendRequest(url, 'GET', null, headers, config);
}

export function sendDeleteJsonRequest(url: string, body: any = {}, headers: any = {}, config: any = {}) {
  url = url + (url.endsWith('?') ? '' : '?');
  url = url + stringify(body);
  return sendRequest(url, 'DELETE', null, headers, config);
}

function sendRequest(url: string, method: string, body: any, headers: any, config: any) {
  const option: any = {
    url: url,
    method: method,
    headers: {
      Accept: 'text/plain,application/x-www-form-urlencoded,multipart/form-data,application/json'
    }
  };

  if (body) {
    option['data'] = body;
  }

  if (headers) {
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        option['headers'][key] = headers[key];
      }
    }
  }

  if (config) {
    for (const key in config) {
      if (config.hasOwnProperty(key)) {
        option[key] = config[key];
      }
    }
  }

  return axios(option)
    .then((response: any) => {
      if (response.ok || response.status === 200) {
        return Promise.resolve(response.data);
      }
    })
    .then(json => {
      return new Result(json.code, json.data, json.massage);
    })
    .catch(error => {
      console.log(error);
    });
}
