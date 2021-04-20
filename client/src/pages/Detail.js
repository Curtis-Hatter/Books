import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import LinkBtn from "../components/LinkBtn";
import DeleteBtn from "../components/DeleteBtn";

function Detail(props) {
  const [books, setBooks] = useState({})

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks(){
  API.getBooks()
      .then(res => {setBooks(res.data)})
      .catch(err => console.log(err));
  }

  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

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
                    <Col size="lg-2 md-2 sm-12">
                    <img src={book.image} 
                    style={{display: "block",maxHeight: 200, maxWidth: 300, marginLeft:"auto", marginRight:"auto" }}>
                    </img>
                    </Col>
                    <Col size="lg-8 md-12 sm-12">
                    <h2>
                      {book.title}
                    </h2>
                    <h3>by {book.authors}</h3>
                    <p>{book.description}</p>
                    </Col>

                    <Col size="md-12">
                      <DeleteBtn onClick={() => deleteBook(book._id)}></DeleteBtn>
                      <LinkBtn onClick={() => {window.open(book.link)}}></LinkBtn>
                    </Col>

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
