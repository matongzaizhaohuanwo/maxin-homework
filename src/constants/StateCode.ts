export default class StateCode {
  static SUCCESS = 200;
  static NOT_LOGIN = 301;
  static ERROR = 500;
  static ERROR_EXIST_USER = 10001;
  static INVALID_PARAMS = 10002;
  static ERROR_NOT_EXIST_USER = 10004;
  static ERROR_USER_PASSWORD = 10003;
  static ERROR_NOT_EXIST_TAG = 10005;
  static ERROR_FILE = 10006;
}

export class StateMsg {
  static SUCCESS: 'ok';
  static NOT_LOGIN: '用户未登录';
  static INVALID_PARAMS: '请求参数错误';
  static ERROR: '系统错误';
  static ERROR_EXIST_USER: '该用户已注册';
  static ERROR_NOT_EXIST_USER: '用户不存在';
  static ERROR_USER_PASSWORD: '密码错误';
  static ERROR_FILE: '文件错误';
}
