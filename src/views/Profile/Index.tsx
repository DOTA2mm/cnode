/**
 * 用户主页
 */
import OtherTopic from '@src/components/OtherTopic/Index'
import ProfilePanel from '@src/components/ProfilePanel/Index'
import RecentReply from '@src/components/RecentReply/Index'
import { IUserData } from '@src/types/index';
import PropTypes from 'prop-types'
import * as React from 'react'
import style from './Index.less'

interface IProps {
  match: {
    params: {
      id: string
    }
  }
}

class Profile extends React.Component<IProps, IUserData> {
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
      loginname: ''
    } as IUserData
  }

  /**
   * 此处如果使用 componentWillMount 来 setStare，则首次 render 的 loginname 有值
   * 但是，componentWillMount 为即将废弃的钩子，故在 ProfilePanel 处理 props 为空的情况
   */
  public componentDidMount() {
    this.setState({
      loginname: this.props.match.params.id
    })
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      // this.setState({
      //   loginname: prevProps.match.params.id
      // })
      this.updateState({loginname: this.props.match.params.id} as IUserData)
    }
  }

  public updateState(state: IUserData) {
    this.setState(state)
  }

  public render() {
    return (
      <div className={style.user}>
        <ProfilePanel loginname={this.state.loginname} />
        <OtherTopic simple={false} />
        <RecentReply simple={false} />
      </div>
    )
  }
}

export default Profile
