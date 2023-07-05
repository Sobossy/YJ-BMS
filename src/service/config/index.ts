// export const BASE_URL = 'http://codercba.com:8000'

let BASE_URL = ''
if (import.meta.env.DEV) {
  // development开发环境
  BASE_URL = 'http://121.37.196.89:8880'
  // BASE_URL = 'http://codercba.com:8000'
} else {
  // production生产环境
  BASE_URL = 'http://121.37.196.89:8880'
}
export const TIME_OUT = 10000
export { BASE_URL }
