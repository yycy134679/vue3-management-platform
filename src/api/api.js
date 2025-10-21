/**
 * 整个项目所有接口的统一出口
 */

import request from './request'

export default {
  home: {
    // 请求左侧表格的数据
    getTableData() {
      return request({
        url: '/home/getTableData',
        method: 'get',
      })
    },
    getCountData() {
      return request({
        url: '/home/getCountData',
        method: 'get',
      })
    },
    getChartData() {
      return request({
        url: '/home/getChartData',
        method: 'get',
      })
    },
    // getUserData() {
    //   return request({
    //     url: '/home/getUserData',
    //     method: 'get',
    //   })
    // },
  },
  user: {
    getUserList(params) {
      return request({
        url: '/user/getUserList',
        method: 'get',
        data: params,
      })
    },
  },
}
