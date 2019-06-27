import request from '@src/utils/request'

interface IGetTopicsParams {
  limit: number,
  page: number,
  tab: string
}

// 获取首页帖子列表数据
export const getTopics = (data: IGetTopicsParams) => {
  return request({
    method: 'get',
    params: data,
    url: '/topics',
  })
}

// 获取帖子详情数据
export const getTopicById = (id: string) => {
  return request({
    method: 'get',
    url: `/topic/${id}`,
  })
}

// 获取用户详情数据
export const getUserByName = (loginname: string) => {
  return request({
    method: 'get',
    url: `/user/${loginname}`,
  })
}
