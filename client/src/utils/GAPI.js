import axios from "axios";

export default {
  // Gets the book with the given id
  getBook: function(title, author) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q="+title+"&key=AIzaSyBCxRjVd_eA3aMmUEN25heGN1JuMif3iBc");
  }
};