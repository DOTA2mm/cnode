/**
 * 帖子详情页面
 */
import * as React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Divider, Skeleton } from 'antd'
import moment from 'moment'
import { getTopicById } from '../../utils/api'
import '@src/assets/style/mdstyle.css'
import style from './Index.module.less'
import tabs from '../../utils/tabs'

class Topic extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.node,
      }).isRequired,
    }).isRequired
  }

  constructor () {
    super()
    this.state = {
      topic: {}
    }
  }

  componentDidMount () {
    this.fetchData(this.props.match.params.id)
  }

  componentWillReceiveProps (prevProps) {
    this.fetchData(prevProps.match.params.id)
  }

  // eslint-disable-next-line class-methods-use-this
  getHTML (html) {
    return {
      __html: html
    }
  }

  /**
   * 封装接口调用
   * @param {string} id 帖子 id
   */
  fetchData (id) {
    getTopicById(id).then(res => {
      this.setState({
        // 接口返回值打散放入 state
        topic: {
          ...res.data,
          ...res.data.author
        }
      })
    })
  }

  render () {
    if (!this.state.topic.id) {
      return <Skeleton active />
    }
    return (
      <div className={style.topic}>
        <div className={style.left}>
          <div className={style.title} dangerouslySetInnerHTML={this.getHTML(this.state.topic.title)} />
          <div className={style.info}>
            <span>
              发布于&nbsp;
              {moment(this.state.topic.create_at, 'YYYY-MM-DD').startOf('day').fromNow()}
              &nbsp;•&nbsp;
            </span>
            作者：
            <Link to={`/user/${this.state.topic.loginname}`}>
              {this.state.topic.loginname}
            </Link>
            &nbsp;•&nbsp;
            <span>
              {this.state.topic.visit_count}
              次浏览&nbsp;•&nbsp;
            </span>
            <span>
              来自：
              {tabs[this.state.topic.tab] && tabs[this.state.topic.tab].name}
            </span>
          </div>
          <Divider />
          <div
            className={style.content}
            dangerouslySetInnerHTML={this.getHTML(this.state.topic.content)}
          />
        </div>
      </div>
    )
  }
}

export default Topic
