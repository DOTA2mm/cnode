import Topics from '@src/components/Topics/Index'
import { IArticle } from '@src/types/index'
import { getTopics } from '@src/utils/api'
import { Spin, Tabs } from 'antd'
import React, { Component } from 'react'
import './Index.less'

const { TabPane } = Tabs

interface IState {
  limit: number,
  list: IArticle[],
  page: number,
  store: {
    [index: string]: {
      limit: number,
      data: IArticle[]
    }
  },
  tab: string
}

/**
 * 网站首页
 */
class Home extends Component<any, IState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      limit: 20,
      list: [],
      page: 1,
      store: {}, // 存储所有Tab对应的数据，因为切换Tab后就没必要重新以limit:20加载数据。
      tab: 'all' // 当前Tab，声明在全局变量里是为了滚动时相关函数也可以获取的到
    }
  }

  /**
   * 1. 调用接口获取数据
   * 2. 绑定窗口滚动监听函数
   * P.S. 一般在此钩子下面调用接口或者类似操作
   */
  public componentDidMount() {
    this.getTopics()
    window.addEventListener('scroll', this.scrollMethod)
  }

  /**
   * 组件被销毁时，记得移除绑定的滚动事件
   */
  public componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollMethod)
  }

  /**
   * 封装好的获取首页数据的函数，这样就不需要每次使用都copy一遍代码了
   */
  public getTopics() {
    const state = this.state
    getTopics({
      limit: state.limit,
      page: state.page,
      tab: state.tab
    }).then((res) => {
      const store = state.store

      this.setState((prevState) => ({
        limit: prevState.limit + 10,
        list: res.data,
      }))
      // this.setState({
      //   list: res.data,
      //   limit: this.state.limit + 10
      // })
      // 将数据存储到对应的key下
      store[state.tab] = {
        data: res.data,
        limit: state.limit,
      }
    })
  }

  /**
   * 滚动函数，判断当前滚动条是否到了底部来决定是否重新拉取数据
   */
  public scrollMethod = () => {
    const sumH =
      document.body.scrollHeight || document.documentElement.scrollHeight
    const viewH = document.documentElement.clientHeight
    const scrollH =
      document.body.scrollTop || document.documentElement.scrollTop
    if (viewH + scrollH >= sumH) {
      this.getTopics()
    }
  }

  /**
   * 当前Tab变化时判断Store里是否已经存储数据。
   * 是：拉出来，设置到state中
   * 否：重新获取数据
   * 这里使用箭头函数而不是上面的那种方式，是为了解决this问题
   * 详情看：https://react.docschina.org/docs/react-without-es6.html#%E8%87%AA%E5%8A%A8%E7%BB%91%E5%AE%9A
   * （或者自行Google）
   */
  public tabChanged = (tab: string) => {
    const { store } = this.state

    // 如果未存储当前Tab的数据，重新获取
    if (!store[tab]) {
      this.setState(
        {
          limit: 20,
          list: [],
          tab,
        },
        () => {
          this.getTopics()
        }
      )
      return
    }

    this.setState({
      limit: store[tab].limit,
      list: store[tab].data,
      tab,
    })
  }

  public render() {
    return (
      <div className="home">
        <Spin spinning={false}>
          <div>
            <Tabs defaultActiveKey="all" onChange={this.tabChanged}>
              <TabPane tab="全部" key="all">
                <Topics list={this.state.list} />
              </TabPane>
              <TabPane tab="精华" key="good">
                <Topics list={this.state.list} />
              </TabPane>
              <TabPane tab="分享" key="share">
                <Topics list={this.state.list} />
              </TabPane>
              <TabPane tab="问答" key="ask">
                <Topics list={this.state.list} />
              </TabPane>
              <TabPane tab="工作" key="job">
                <Topics list={this.state.list} />
              </TabPane>
            </Tabs>
          </div>
        </Spin>
      </div>
    )
  }
}

export default Home
