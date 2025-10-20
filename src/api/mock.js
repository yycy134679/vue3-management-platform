import Mock from 'mockjs'
import homeApi from './mockData/home.js'

// 拦截请求  第一个参数：拦截地址（正则写法），第二个：请求方法，第三个：假数据
Mock.mock(/\/api\/home\/getTableData/, 'get', homeApi.getTableData)
Mock.mock(/\/api\/home\/getCountData/, 'get', homeApi.getCountData)
Mock.mock(/\/api\/home\/getChartData/, 'get', homeApi.getChartData)
