import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactPaginate from 'react-paginate';
import { Form, Table, Row, Col } from 'react-bootstrap';

import {
  fetchApiData,
  updatePagination,
  searchResults,
} from '../store/actionCreators';

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
    console.log('props', this.props);
    return (
      <div>
        <div className="container m-5">
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search by Title, URL, Author"
                onChange={(event) => this.handleSearch(event.target.value)}
                value={this.props.searchTerm}
              />
            </Form.Group>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>URL</th>
                <th>Created At</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {this.props.currentPosts.map((post, index) => (
                <tr key={index}>
                  <td className="contextLeft">{post.title}</td>
                  <td className="contextLeft">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={post.url}
                      onClick={(e) => e.stopPropagation()}
                      title={post.url}
                    >
                      {post.url}
                    </a>
                  </td>
                  <td className="contextLeft">{post.created_at}</td>
                  <td className="contextLeft">{post.author}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row className="mt-2">
            <Col lg={12}>
              <ReactPaginate
                forcePage={this.props.currentActivePage - 1}
                pageCount={this.props.totalPages}
                breakLabel={'...'}
                breakClassName={'break-me'}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName={'pagination justify-content-center'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item prev-item'}
                nextClassName={'page-item next-item'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                pageClassName={'page-item'}
                onPageChange={(e) => this.handlePageClick(e)}
              />
            </Col>
          </Row>
        </div>
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
