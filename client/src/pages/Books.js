import React, { useState, useEffect } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import GAPI from "../utils/GAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Books() {
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  function saveBook(book) {
      // console.log(book.volumeInfo);
      // const {title, authors, description, imageLinks, infoLink} = book.volumeInfo;

      API.saveBook({
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks.smallThumbnail,
        link: book.volumeInfo.infoLink,
        title: book.volumeInfo.title
      }).then(res => 
        {
          // console.log(res.data)
          const newSetofBooks = books.filter(book =>{
            return book.volumeInfo.infoLink != res.data.link;
          })
          // console.log(newSetofBooks);
          setBooks(newSetofBooks);
        })
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title) {
      // API.saveBook({
      //   title: formObject.title,
      //   author: formObject.author,
      //   synopsis: formObject.synopsis
      // })
      //   .then(res => loadBooks())
      //   .catch(err => console.log(err));
      GAPI.getBook(formObject.title)
      .then(res =>{
        // console.log(res.data.items);
        setBooks(res.data.items);
        console.log(books);
      })
      .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
         <Row>
         <Col size="md-3"></Col>
         <Col size="md-6">
          <Jumbotron >
              <h1>Google Books Search</h1>
              <br></br>
              <h2>Search for and Save Books of Interest</h2>
          </Jumbotron>
          </Col>
         <Col size="md-3"></Col>
         </Row> 
            <Row>
            <Col size="md-4"></Col>
            <Col size='md-4'>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <FormBtn
                disabled={!(formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Search
              </FormBtn>
            </form>
            </Col>
            <Col size="md-4"></Col>
            </Row>
          <Row>
          <Col size="md-4 sm-12"></Col>
          <Col size="md-4 sm-12">
          {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book.id}>
                    {/* NEED WORK HERE */}
                    <Link to={"/"} onClick={()=>{window.open(book.volumeInfo.previewLink)}}>
                      <strong>
                        {book.volumeInfo.title}
                      </strong>
                    </Link>
                    <SaveBtn onClick={() => saveBook(book)} name={"Save"}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-4 sm-12"></Col>
          </Row>
      </Container>
    );
  }


export default Books;
