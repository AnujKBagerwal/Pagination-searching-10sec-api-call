/* eslint-disable no-unused-expressions */
import React from 'react';
import ReactPaginate from 'react-paginate';
import { Form, Table, Row, Col } from 'react-bootstrap';

const DisplayTable = ({ state, handlePageClick, handleSearch }) => {
  const { currentPosts, currentActivePage, searchText, totalPages } = state;

  return (
    <div>
      <Form>
        <Form.Group className="searchField">
          <Form.Control
            type="text"
            placeholder="Search record by Title"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>

      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Created_at</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.length ? (
            currentPosts.map((data, index) => (
              <tr key={index}>
                <td className="contextLeft">
                  {data.title ? <span>{data.title}</span> : <span>NA</span>}
                </td>
                <td className="contextLeft">
                  {data.url ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={data.url}
                      onClick={(e) => e.stopPropagation()}
                      title={data.url}
                    >
                      {data.url}
                    </a>
                  ) : (
                    // <span>{data.url}</span>
                    <span>NA</span>
                  )}
                </td>
                <td className="contextLeft">
                  {data.created_at ? (
                    <span>{data.created_at}</span>
                  ) : (
                    <span>NA</span>
                  )}
                </td>
                <td className="contextLeft">
                  {data.author ? <span>{data.author}</span> : <span>NA</span>}
                </td>
              </tr>
            ))
          ) : (
            <h2>No Record Available</h2>
          )}
        </tbody>
      </Table>

      <Row className="mt-2">
        <Col lg={12}>
          <ReactPaginate
            forcePage={currentActivePage - 1}
            pageCount={totalPages}
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
            onPageChange={(e) => handlePageClick(e)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DisplayTable;
