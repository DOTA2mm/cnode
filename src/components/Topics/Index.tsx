/**
 * 首页帖子列表
 */
import { IArticle } from '@src/types/index'
import tabs from '@src/utils/tabs'
import { Skeleton, Tag } from 'antd'
import moment from 'moment'
import PropTypes, { string } from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'
import style from './Index.module.less'

interface IListProps {
  list: IArticle[]
}

class Topics extends React.PureComponent<IListProps> {
  public static propTypes = {
    list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])).isRequired
  }

  public render() {
    if (this.props.list.length === 0) {
      return <Skeleton active={true} />
    }
    const items = this.props.list.map((item) => {
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
