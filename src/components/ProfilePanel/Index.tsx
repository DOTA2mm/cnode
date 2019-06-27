/**
 * 帖子详情页 - 楼主个人信息
 */
import { IUserData } from '@src/types/index';
import { getUserByName } from '@src/utils/api'
import eventProxy from '@src/utils/eventProxy'
import { Skeleton } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'
import style from './Index.module.less'

interface ILoginnameProps {
  loginname: string
}

interface IUserState {
  user: IUserData
}

class ProfilePanel extends React.Component<ILoginnameProps, IUserState> {
  public static propTypes = {
    loginname: PropTypes.string.isRequired
  }

  constructor(props: ILoginnameProps) {
    super(props)
    this.state = {
      // 用户相关信息
      user: {} as IUserData
    }
  }

  public componentDidMount() {
    if (this.props.loginname) {
      this.fetchData(this.props.loginname)
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   this.fetchData(nextProps.loginname)
  // }

  public componentDidUpdate(prevProps: ILoginnameProps) {
    if (this.props.loginname !== prevProps.loginname) {
      this.fetchData(this.props.loginname)
    }
  }

  public async fetchData(loginname: string) {
    const res = await getUserByName(loginname)
    eventProxy.trigger('user', res.data)
    this.setState({
      user: res.data
    })
  }

  public render() {
    if (!this.state.user.loginname) {
      return <Skeleton active={true} />
    }
    return (
      <div className={style.panel}>
        <Link className={style.user} to={`/user/${this.state.user.loginname}`}>
          <img src={this.state.user.avatar_url} alt="avatar" />
          <span>{this.state.user.loginname}</span>
        </Link>
        <div>
          积分：
          {this.state.user.score}
        </div>
        <div>
          Github：
          <a
            href={`https://github.com/${this.state.user.githubUsername}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {this.state.user.githubUsername}
          </a>
        </div>
        <div>
          注册时间：{moment(this.state.user.create_at, 'YYYY-MM-DD') .startOf('day') .fromNow()}
        </div>
      </div>
    )
  }
}

export default ProfilePanel
