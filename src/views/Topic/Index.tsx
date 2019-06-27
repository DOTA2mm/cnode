/**
 * 帖子详情页面
 */
import '@src/assets/style/mdstyle.css'
import OtherTopic from '@src/components/OtherTopic/Index'
import ProfilePanel from '@src/components/ProfilePanel/Index'
import RecentReply from '@src/components/RecentReply/Index'
import Reply from '@src/components/Reply/Index'
import { IArticle } from '@src/types/index';
import { Divider, Skeleton } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { getTopicById } from '../../utils/api'
import tabs from '../../utils/tabs'
import style from './Index.module.less'

interface IProps {
  match: {
    params: {
      id: string
    }
  }
}

interface IState {
  topic: IArticle
}

class Topic extends React.Component<IProps, IState> {
  public static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.node,
      }).isRequired,
    }).isRequired
  }

  constructor(props: IProps) {
    super(props)
    this.state = {
      topic: {} as IArticle
    }
  }

  public componentDidMount() {
    this.fetchData(this.props.match.params.id)
  }

  public componentWillReceiveProps(prevProps: IProps) {
    this.fetchData(prevProps.match.params.id)
  }

  // eslint-disable-next-line class-methods-use-this
  public getHTML(html: string) {
    return {
      __html: html
    }
  }

  /**
   * 封装接口调用
   * @param {string} id 帖子 id
   */
  public fetchData(id: string) {
    getTopicById(id).then((res) => {
      this.setState({
        // 接口返回值打散放入 state
        topic: {
          ...res.data
        }
      })
    })
  }

  public render() {
    if (!this.state.topic.id) {
      return <Skeleton active={true} />
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
            <Link to={`/user/${this.state.topic.author.loginname}`}>
              {this.state.topic.author.loginname}
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
          <Reply data={this.state.topic.replies} />
        </div>
        <div className={style.right}>
          <ProfilePanel loginname={this.state.topic.author.loginname} />
          <OtherTopic />
          <RecentReply />
        </div>
      </div>
    )
  }
}

export default Topic
