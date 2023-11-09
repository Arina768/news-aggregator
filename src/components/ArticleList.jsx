import React from "react";
import { Spinner, Card, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

const ArticleList = ({ articles, fetchMoreArticles, error, handleRetry }) => {
  return (
    <div className="mb-3">
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreArticles}
        hasMore={!error}
        loader={
          <div className="infinite-scroll-spinner">
            <Spinner animation="border" role="status" variant="primary" />
          </div>
        }
      >
        <ul className="m-0 p-0">
          {articles.map((article) => (
            <Card key={article.id} className="my-3">
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.text}</Card.Text>
                <Button href={article.link} variant="primary">
                  Read More
                </Button>
              </Card.Body>
            </Card>
          ))}
        </ul>
      </InfiniteScroll>
      {error && (
        <div className="text-center">
          <p>An error occurred while loading more data.</p>
          <Button variant="primary" onClick={handleRetry}>
            Retry
          </Button>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
