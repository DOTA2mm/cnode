/**
 * 话题作者的最近回复
 */
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import eventProxy from '@src/utils/eventProxy'
import style from './Index.module.less'

class RecentReply extends React.Component {
  static defaultProps = {
    simple: true
  }

  static propTypes = {
    simple: PropTypes.bool
  }

  constructor () {
    super()
    this.state = {
      user: {}
    }
  }

  componentDidMount () {
    this.isUnmounted = false
    eventProxy.on('user', data => {
      if (!this.isUnmounted) {
        this.setState({
          user: data
        })
      }
    })
  }

  // 又一个即将被废弃的钩子，用 useEffect hook 可以代替（返回函数）
  componentWillUnmount () {
    this.isUnmounted = true
  }

  render () {
    if (!this.state.user.recent_replies) {
      return <div />
    }

    const items = this.state.user.recent_replies.map(item => {
      let temp = <Link to={`/topic/${item.id}`}>{item.title}</Link>
      // 非简单模式
      if (!this.props.simple) {
        temp = (
          <div>
            <Link className={style.avatar} to={`/user/${item.author.loginname}`}>
              <img src={item.author && item.author.avatar_url} alt="avatar" />
            </Link>
            <Link key={item.id} to={`/topic/${item.id}`}>{item.title}</Link>
            <span className={style.time}>
              {moment(item.last_reply_at, 'YYYY-MM-DD')
              .startOf('day')
              .fromNow()}
            </span>
            <Divider className={style['insider-divider']} />
          </div>
        )
      }
      return <div key={item.id}>{temp}</div>
    })

    return (
      <div className={style.panel}>
        <header>最近参与的话题</header>
        <Divider className={style.divider} />
        {items}
      </div>
    )
  }
}

export default RecentReply
