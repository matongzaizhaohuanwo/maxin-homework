/**
 * 登录
 */
export function API_LOGIN(): string {
  return '/api/v1/login';
}

/**
 * 登出
 */
export function API_LOGOUT(): string {
  return '/api/v1/logout';
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

/**
 * 下载文件
 */
export function API_GET_FILE(): string {
  return '/api/v1/workfile';
}

/**
 * 评分
 */
export function API_COMMENT(): string {
  return '/api/v1/comment-work';
}

/**
 * 提交作业
 */
export function API_SUBMIT_HOMEWORK(): string {
  return '/api/v1/post-work';
}
