// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** health GET /health */
export async function healthUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/health', {
    method: 'GET',
    ...(options || {}),
  })
}
