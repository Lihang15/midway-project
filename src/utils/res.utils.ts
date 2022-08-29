// 将返回数据原样包装 中间件再进行包装
export class Response {
  public static Success(data?: any) {
    return data ? data : '';
  }
}
