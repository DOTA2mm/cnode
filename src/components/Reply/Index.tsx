/* eslint-disable global-require */
/**
 * 帖子评论
 */
import { IReply } from '@src/types/index'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import style from './Index.module.less'

interface IDataProps {
  data: IReply[]
}

function getHTML(html: string) {
  return {
    __html: html
  }
}

function getThumbs(length: number) {
  if (!length) {
    return <span />
  }
  return (
    <span className={style.thumbs}>
      <img src={require('@src/assets/image/thumbs-up.svg')} alt="点赞" />
      {length}
    </span>
  )
}

class Reply extends PureComponent<IDataProps> {
  public static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      author: PropTypes.shape({
        avatar_url: PropTypes.string,
        loginname: PropTypes.string
      }),
      content: PropTypes.string.isRequired,
      create_at: PropTypes.string
    })).isRequired
  }

  public render() {
    const data = this.props.data.map((reply, index) => {
      return (
        <div key={reply.id}>
          <Link to={`/user/${reply.author.loginname}`}>
            <img src={reply.author && reply.author.avatar_url} alt="头像" />
          </Link>
          <div>
            <div className={style.info}>
              <p>
                <span>
                  {index + 1}
                  楼&nbsp;
                </span>
                <Link to={`/user/${reply.author.loginname}`}>
                  {reply.author.loginname}
                </Link>
                <span>
                  &nbsp;
                  {moment(reply.create_at, 'YYYY-MM-DD').startOf('day').fromNow()}
                </span>
              </p>
              {getThumbs(reply.ups.length)}
            </div>
            <p dangerouslySetInnerHTML={getHTML(reply.content)} />
          </div>
        </div>
      )
    })
    // 在最前面插入一行React元素，来展示一共有多少条回复信息
    data.unshift(
      <div key={1}>
        <span>{this.props.data.length}</span>
        &nbsp;回复
      </div>
    )

    return <div className={style.reply}>{data}</div>
  }
}

export default Reply
