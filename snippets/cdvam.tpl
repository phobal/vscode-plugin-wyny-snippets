/**
 * @prefix WYNY_CDvaM
 * @description 创建一个 dva model 结构
 */
import { getList } from './service'

export const namespace = '$1'

export default {
  namespace,
  state: {
    data: []
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const res = yield call(getList, payload)
      if (res?.data) {
        yield put({
          type: 'setState',
          payload: {
            data: res.data
          }
        })
      }
    }
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },
}
