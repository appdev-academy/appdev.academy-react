import {
  FETCH_ARTICLES, FETCH_ARTICLES_SUCCESS, FETCH_ARTICLES_FAILURE, RESET_ARTICLES,
  DELETE_ARTICLE, DELETE_ARTICLE_SUCCESS, DELETE_ARTICLE_FAILURE, RESET_DELETED_ARTICLE,
  FETCH_ARTICLE, FETCH_ARTICLE_SUCCESS, FETCH_ARTICLE_FAILURE, RESET_ACTIVE_ARTICLE
} from '../actions/articles'

const INITIAL_STATE = {
  articlesList: { articles: [], error: null, loading: false },
  deletedArticle: { articles: null, error: null, loading: false },
  activeArticle: { article: null, error: null, loading: false }
}

export default function(state = INITIAL_STATE, action) {
  let error
  switch(action.type) {
    case FETCH_ARTICLES:
      return { ...state, articlesList: { articles:[], error: null, loading: true }}
    case FETCH_ARTICLES_SUCCESS:
      return { ...state, articlesList: { articles: action.payload.data, error: null, loading: false }}
    case FETCH_ARTICLES_FAILURE:
      error = action.payload.data || { message: action.payload.message }
      return { ...state, articlesList: { articles: [], error: error, loading: false }}
    case RESET_ARTICLES:
      return { ...state, articlesList: { articles: [], error: null, loading: false }}
    
    case DELETE_ARTICLE:
      return { ...state, deletedArticle: { ...state.deletedArticle, loading: true }}
    case DELETE_ARTICLE_SUCCESS:
      return { ...state, deletedArticle: { article: action.payload.data, error: null, loading: false }}
    case DELETE_ARTICLE_FAILURE:
      error = action.payload.data || { message: action.payload.message }
      return { ...state, deletedArticle: { article: null, error: error, loading: false }}
    case RESET_DELETED_ARTICLE:
      return { ...state, deletedArticle: { article: null, error: null, loading: false }}
    
    case FETCH_ARTICLE:
      return { ...state, activeArticle: { ...state.activeArticle, loading: true }}
    case FETCH_ARTICLE_SUCCESS:
      return { ...state, activeArticle: { article: action.payload.data, error: null, loading: false }}
    case FETCH_ARTICLE_FAILURE:
      error = action.payload.data || { message: action.payload.message }
      return { ...state, activeArticle: { article: null, error: error, loading:false }}
    case RESET_ACTIVE_ARTICLE:
      return { ...state, activeArticle: { article: null, error: null, loading: false }}
    
    default:
      return state
  }
}