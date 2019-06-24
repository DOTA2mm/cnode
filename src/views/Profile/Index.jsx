/**
 * 用户主页
 */
import * as React from 'react'
import PropTypes from 'prop-types'
import ProfilePanel from '@src/components/ProfilePanel/Index'
import OtherTopic from '@src/components/OtherTopic/Index'
import RecentReply from '@src/components/RecentReply/Index'
import style from './Index.less'

class Profile extends React.Component {
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
      loginname: ''
    }
  }

  /**
  * 此处如果使用 componentWillMount 来 setStare，则首次 render 的 loginname 有值
  * 但是，componentWillMount 为即将废弃的钩子，故在 ProfilePanel 处理 props 为空的情况
  */
  componentDidMount () {
    this.setState({
      loginname: this.props.match.params.id
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      // this.setState({
      //   loginname: prevProps.match.params.id
      // })
      this.updateState({loginname: this.props.match.params.id})
    }
  }

  updateState (state) {
    this.setState(state)
  }

  render () {
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
