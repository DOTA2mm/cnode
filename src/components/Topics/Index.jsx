/**
 * 首页帖子列表
 */
import * as React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Tag, Skeleton } from 'antd'
import tabs from '@src/utils/tabs'
import moment from 'moment'
import style from './Index.module.less'

class Topics extends React.PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])).isRequired
  }

  render () {
    if (this.props.list.length === 0) {
      return <Skeleton active />
    }
    const items = this.props.list.map(item => {
      return (
        <div className={style.topic} key={item.id}>
          <Link to={`/user/${item.author.loginname}`}>
            <img src={item.author.avatar_url} alt="avatar" />
          </Link>
          <span className={style.count}>
            <em>{item.reply_count}</em>
            /
            <em>{item.visit_count}</em>
          </span>
          <Tag color={tabs[item.tab] && tabs[item.tab].color}>
            {tabs[item.tab] && tabs[item.tab].name}
          </Tag>
          <Link className={style.title} to={`/topic/${item.id}`}>
            {item.title}
          </Link>
          <span className={style.time}>
            {moment(item.last_reply_at, 'YYYY-MM-DD').startOf('day').fromNow()}
          </span>
        </div>
      )
    })
    return <div>{items}</div>
  }
}

export default Topics
