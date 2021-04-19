import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import LinkBtn from "../components/LinkBtn";

function Detail(props) {
  const [books, setBooks] = useState({})

  useEffect(() => {
    API.getBooks()
      .then(res => 
        {
          console.log(res.data);
          setBooks(res.data)
        })
      .catch(err => console.log(err));
  }, [])

  return (
      <Container fluid>
        <Row>
         <Col size="md-3"></Col>
         <Col size="md-6">
          <Jumbotron >
              <h1></h1>
              <br></br>
              <h2>Saved Searches</h2>
          </Jumbotron>
          </Col>
         <Col size="md-3"></Col>
         </Row>
         <Row>
          <Col size="md-3 sm-12"></Col>
          <Col size="md-6 sm-12">
          {books.length ? (
              <Row>
                {books.map(book => (
                  <Row key={book._id}>
                    <Col size="md-2">
                    <img src={book.image} 
                    style={{display: "block",maxHeight: 200, maxWidth: 300, marginLeft:"auto", marginRight:"auto" }}>
                    </img>
                    </Col>
                    <Col size="md-8">
                    <h2>
                      {book.title}
                    </h2>
                    <h3>by {book.authors}</h3>
                    <p>{book.description}</p>
                    </Col>
                    <Row>
                    <Col size="md-2">
                      <LinkBtn onClick={() => {window.open(book.link)}}></LinkBtn>
                    </Col>
                    </Row>
                  </Row>
                ))}
              </Row>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-3 sm-12"></Col>
          </Row>


        <Row>
          <Link to="/" style={{fontSize:24}}>← Back to Search</Link>
        </Row>
      </Container>
    );
  }


export default Detail;
