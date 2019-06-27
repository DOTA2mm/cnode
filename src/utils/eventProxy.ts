/**
 * 一个发布订阅模式的实现
 * 用于任意两个组件间的数据传递
 */

// tslint:disable:prefer-for-of

interface IEventProxy {
  onObj: {
    [key: string]: Array<(args: any) => void>
  },
  oneObj: {
    [key: string]: Array<(args: any) => void>
  },
  on(key: string, fn: (args: any) => void): void,
  one(key: string, fn: (args: any) => void): void,
  off(key: string): void,
  trigger(key: string, args: any[]): void
}

const eventProxy: IEventProxy = {
  onObj: {},
  oneObj: {},
  on(key: string, fn: (args: any) => void) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = []
    }

    this.onObj[key].push(fn)
  },
  one(key, fn) {
    if (this.onObj[key] === undefined) {
      this.oneObj[key] = []
    }

    this.oneObj[key].push(fn)
  },
  off(key) {
    this.onObj[key] = []
    this.oneObj[key] = []
  },
  trigger(key: string, ...args: any[]) {
    if (!key) {
      return
    }

    if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
      for (let i = 0; i < this.onObj[key].length; i++) {
        this.onObj[key][i].apply(null, args as [any]);
      }
    }
    if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
      for (let i = 0; i < this.oneObj[key].length; i++) {
        this.oneObj[key][i].apply(null, args as [any]);
      }
      // 触发执行完后清空
      this.oneObj[key] = []
    }
  }
}

export default eventProxy
