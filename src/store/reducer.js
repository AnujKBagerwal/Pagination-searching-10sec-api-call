import {
  GET_API_LIST,
  SET_API_LIST,
  ERROR_API_LIST,
  UPDATE_API_LIST,
  UPDATE_PAGINATION,
  SEARCH_RESULTS,
} from './action';

const initialState = {
  pageNo: 0,
  posts: [],
  error: null,
  totalPages: 0,
  searchText: '',
  currentPosts: [],
  orgCurrentPosts: [],
  selectedPage: -1,
  filteredPost: [],
  currentActivePage: 1,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_API_LIST:
      return {
        ...state,
        posts: payload.data,
      };

    case SET_API_LIST: {
      let totalPages = state.totalPages + 1;
      let selectedPage = state.selectedPage;
      let currentPosts = [];
      let orgCurrentPosts = [];

      let currentActivePage = 1;
      if (selectedPage > -1) {
        currentActivePage = selectedPage;
      }
      if (!state.currentPosts.length) {
        currentPosts = payload.hits;
        orgCurrentPosts = payload.hits;
      } else {
        currentPosts = state.currentPosts;
        orgCurrentPosts = state.currentPosts;
      }
      return {
        ...state,
        totalPages,
        selectedPage,
        currentPosts,
        orgCurrentPosts,
        currentActivePage,
        pageNo: payload.page,
        posts: [...state.posts, ...payload.hits],
      };
    }

    case UPDATE_API_LIST:
      return {
        ...state,
        posts: payload.data.hits,
      };

    case ERROR_API_LIST:
      return {
        ...state,
        error: payload,
      };

    case UPDATE_PAGINATION: {
      const selectedPage = payload;
      const posts = [...state.posts];
      const startIndex =
        selectedPage > -1
          ? (selectedPage - 1) * 20
          : (state.currentActivePage - 1) * 20;
      const endIndex = startIndex + 20;
      let Updateposts = posts.slice(startIndex, endIndex);
      console.log('selectedPage', selectedPage);
      console.log('posts', Updateposts);
      return {
        ...state,
        searchText: '',
        selectedPage: payload,
        currentPosts: Updateposts,
        currentActivePage: payload,
        orgCurrentPosts: Updateposts,
      };
    }

    case SEARCH_RESULTS: {
      const searchText = payload;
      const { orgCurrentPosts } = state;
      const tmpData = [...orgCurrentPosts];
      const filteredPost = tmpData.filter((data) =>
        data.title.toLowerCase().includes(searchText.toLowerCase())
      );
      return {
        ...state,
        searchText: payload,
        currentPosts: filteredPost,
      };
    }

    default:
      return state;
  }
};

export default reducer;
