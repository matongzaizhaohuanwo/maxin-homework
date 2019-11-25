/**
 * 登录
 */
export function API_LOGIN(): string {
  return '/api/v1/login';
}

/**
 * 注册
 */
export function API_REGISTER(): string {
  return '/api/v1/register';
}

/**
 * 院系信息
 */
export function API_GRADE_INFO(): string {
  return '/api/v1/grade-info';
}

/**
 * 作业列表
 */
export function API_HOMEWORK_LIST(): string {
  return '/api/v1/homework';
}

/**
 * 创建作业
 */
export function API_CREATE_HOMEWORK(): string {
  return '/api/v1/create-homework';
}

/**
 * 作业的提交列表
 */
export function API_SUBMIT_LIST(): string {
  return '/api/v1/grade-homework';
}
