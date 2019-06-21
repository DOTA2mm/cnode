/* eslint-disable global-require */
import * as React from 'react'
import './Index.less'
import { Modal, Icon } from 'antd'

class Header extends React.Component {
  // 实例属性的新写法
  state = { visible: false }

  handleOk = () => {
    this.setState({
      visible: false
    })
  }

  showModel = () => {
    this.setState({
      visible: true
    })
  }

  render() {
    return (
      <div className="header">
        <div>
          <a href="/"><img src={require('@src/assets/image/cnodejs.svg')} alt="log" /></a>
          <span onClick={this.showModel}>关于</span>
        </div>
        <Modal
          title="关于本项目"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleOk}
        >
          <p>
            作者：
            <a href="https://blog.chenteng.me" target="_blank" rel="nofollow noopener noreferrer">Chuck</a>
          </p>
          <p>
            源码：
            <a href="https://blog.chenteng.me" target="_blank" rel="nofollow noopener noreferrer">cnode-react</a>
          </p>
          <Icon type="star" theme="twoTone" twoToneColor="#eb2f96" />
            &nbsp;欢迎Star~&nbsp;
          <Icon type="star" theme="twoTone" twoToneColor="#eb2f96" />
        </Modal>
      </div>
    )
  }
}

export default Header
