import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchApiData,
  updatePagination,
  searchResults,
} from '../store/actionCreators';
import DisplayTable from './DisplayTable';

export class controller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageNo: 0,
      posts: [],
      currentPosts: [],
      searchText: '',
      selectedPage: -1,
      totalPages: 0,
      filteredPost: [],
      currentActivePage: 1,
    };
  }

  async componentDidMount() {
    const { posts } = this.state;
    const { fetchApiData } = this.props;
    try {
      if (posts.length === 0) {
        fetchApiData(this.props.totalPages);
      }
      setInterval(async () => {
        await fetchApiData(this.props.totalPages);
      }, 10000);
    } catch {}
  }

  componentDidUpdate(previousProps, previousState, screenShot) {
    if (this.props.posts.length !== previousProps.posts.length) {
      this.setState((previousProps) => ({
        ...previousProps,
        posts: this.props.posts,
        pageNo: this.props.pageNo,
        totalPages: this.props.totalPages,
        searchText: this.props.searchText,
        selectedPage: this.props.selectedPage,
        currentPosts: this.props.currentPosts,
        filteredPost: this.props.filteredPost,
        currentActivePage: this.props.currentActivePage,
      }));
    }
  }

  handlePageClick = (e) => {
    this.props.updatePagination(e.selected + 1);
  };

  handleSearch = (value) => {
    console.log('value', value);
    this.props.searchResults(value);
  };

  render() {
    // console.log('state', this.state);
    console.log('props', this.props);
    return (
      <div>
        <DisplayTable
          state={this.state}
          handlePageClick={this.handlePageClick}
          handleSearch={this.handleSearch}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageNo: state.pageNo,
    selectedPage: state.selectedPage,
    posts: state.posts,
    currentPosts: state.currentPosts,
    totalPages: state.totalPages,
    filteredPost: state.filteredPost,
    currentActivePage: state.currentActivePage,
    searchText: state.searchText,
  };
};

const mapDispatchToProps = {
  fetchApiData,
  searchResults,
  updatePagination,
};

export default connect(mapStateToProps, mapDispatchToProps)(controller);
