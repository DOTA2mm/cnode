export interface ITopic {
  id: string,
  last_reply_at: string,
  title: string,
  author: {
    avatar_url: string,
    loginname: string
  }
}

// 用户信息接口返回
export interface IUserData {
  avatar_url: string,
  create_at: string,
  githubUsername: string,
  loginname: string,
  score: number
  recent_replies: ITopic[],
  recent_topics: ITopic[]
}

export interface IReply {
  author: {
    avatar_url: string,
    loginname: string
  },
  content: string,
  create_at: string,
  id: string,
  is_uped: boolean,
  reply_id: string | null,
  ups: string[]
}

// 文章详情接口返回
export interface IArticle {
  id: string,
  author_id: string,
  tab: string,
  content: string,
  title: string,
  last_reply_at: string,
  good: boolean,
  top: string,
  reply_count: number,
  visit_count: number,
  create_at: string,
  author: {
    avatar_url: string,
    loginname: string
  }
  replies: IReply[],
  is_collect: boolean,
}
