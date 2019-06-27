/**
 * tab 相关信息
 */
interface ITabs {
  [index: string]: {
    name: string,
    color: string
  }
}
const tabs: ITabs = {
  ask: {
    color: 'geekblue',
    name: '问答',
  },
  good: {
    color: 'magenta',
    name: '精华',
  },
  job: {
    color: 'blue',
    name: '招聘',
  },
  share: {
    color: 'green',
    name: '分享',
  }
}
export default tabs
