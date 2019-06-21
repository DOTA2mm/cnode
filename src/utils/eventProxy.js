/**
 * 一个发布订阅模式的实现
 * 用于任意两个组件间的数据传递
 */
const enventProxy = {
  onObj: {},
  oneObj: {},
  on (key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = []
    }

    this.onObj[key].push(fn)
  },
  one (key, fn) {
    if (this.onObj[key] === undefined) {
      this.oneObj = []
    }

    this.oneObj[key].push(fn)
  },
  off (key) {
    this.onObj[key] = []
    this.oneObj[key] = []
  },
  trigger (key, ...args) {
    if (!key) {
      return
    }

    if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.onObj[key].length; i++) {
        this.onObj[key][i].apply(null, args);
      }
    }
    if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.oneObj[key].length; i++) {
        this.oneObj[key][i].apply(null, args);
        this.oneObj[key][i] = undefined
      }
      // 触发执行完后清空
      this.oneObj[key] = []
    }
  }
}

export default enventProxy
