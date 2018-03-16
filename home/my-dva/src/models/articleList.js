import { message } from 'antd';
import { getArticleList } from "../services/articleList";
import { delArticle } from "../services/articleList";

export default {
  namespace: 'article',
  state: {
    getArticleList: {},
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state, ...payload,
      };
    },
  },
  effects: {
    /**
     * 获取博客列表
     */
      *getArticleList({ payload }, { call, put }) {
        const { id } =  payload ;
        try {
          const {data} = yield call(getArticleList, { id });
          //console.log(data);

              //message.info(data.info);
              yield put({type: 'save', payload: {getArticleList: data.data}})


        } catch(error) {
          message.error(error);
        }
      },
      *delArticle({payload}, { call, put }) {
        const { id,fid } =  payload ;
        try {
          const {data} = yield call(delArticle, { id,fid });
          console.log(data);

          //message.info(data.info);
         // yield put({type: 'save', payload: {getArticleList: data.data}})


        } catch(error) {
          message.error(error);
        }
      }
  }
}
