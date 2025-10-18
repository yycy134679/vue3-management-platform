/**
 * 整个项目所有接口的统一出口
 */

import request from './request'

export default {
  home: {
    // 请求左侧表格的数据
    getTableData() {
      return request({
        url: '/home/getTable',
        method: 'get',
      })
    },
  },
}
