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
      let currentActivePage = 1;
      if (selectedPage > -1) {
        currentActivePage = selectedPage;
      }
      if (!state.currentPosts.length) {
        currentPosts = payload.hits;
      } else {
        currentPosts = state.currentPosts;
      }
      return {
        ...state,
        posts: [...state.posts, ...payload.hits],
        pageNo: payload.page,
        currentActivePage,
        totalPages,
        selectedPage,
        currentPosts,
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
        selectedPage: payload,
        currentActivePage: payload,
        currentPosts: Updateposts,
        searchText: '',
      };
    }

    case SEARCH_RESULTS: {
      const searchText = payload.toLowerCase().trim();
      let filteredPost = [];
      if (
        state.currentPosts &&
        state.currentPosts.length &&
        searchText.length
      ) {
        filteredPost = state.currentPosts.filter((post) => {
          const title = post.title.toLowerCase();
          return title.includes(searchText);
        });
      }

      if (!searchText.length) {
        const selectedPage = state.selectedPage;
        const startIndex =
          selectedPage > -1
            ? (selectedPage - 1) * 20
            : (state.currentActivePage - 1) * 20;
        const endIndex = startIndex + 20;
        filteredPost = state.posts.slice(startIndex, endIndex);
      }
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
