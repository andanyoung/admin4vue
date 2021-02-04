import * as api from '@/utils/api' 

export function getList(params) {
  return api.request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
