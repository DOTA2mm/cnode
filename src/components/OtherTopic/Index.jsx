/**
 * 作者其它话题
 */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import eventProxy from '@src/utils/eventProxy'
import style from './Index.module.less'

function OtherTopic (props) {
  const [user, setUser] = useState({})
  const [isUnmounted, setIsUnmounted] = useState(false)

  useEffect(() => {
    eventProxy.on('user', data => {
      if (!isUnmounted) {
        setUser(data)
      }
    })

    return function cleanup () {
      setIsUnmounted(true)
    }
  })

  if (!user.recent_topics) {
    return <div />
  }

  const items = user.recent_topics.map(item => {
    let temp = <Link to={`/topic/${item.id}`}>{item.title}</Link>
    // 非简单模式
    if (!props.simple) {
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
      <header>最近创建的话题</header>
      <Divider className={style.divider} />
      {items}
    </div>
  )
}

OtherTopic.propTypes = {
  simple: PropTypes.bool
}

OtherTopic.defaultProps = {
  simple: true
}

export default OtherTopic
