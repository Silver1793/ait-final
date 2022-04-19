import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

function Trial() {
  const [x, setX] = useState([]);
  const [words, setWords] = useState([]);
  const [input, setInput] = useState([]);
  const [post, setPost] = useState("");
  useEffect(() => {
    axios.get("http://localhost:6001/dictionary").then(function (response) {
      const temp = response.data;
      setX(temp);
      setWords(temp);
    });
  }, [post, setPost]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setInput("");
    setX(
      words.filter((elem) => {
        return elem.startsWith(input);
      })
    );
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleChangePost = (e) => {
    setPost(e.target.value);
  };
  const handleSubmitPost = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:6001/add", post)
      .then((res) => {
        console.log("Success");
        setPost("");
      })
      .catch((err) => {
        console.log("FAIL" + err);
      });
  };
  return (
    <div>
      <div className="centered">
        <form onSubmit={handleSubmit}>
          <input placeholder="Search" onChange={handleChange} value={input} />
          <input type="submit" value="Submit" />
        </form>
        <form onSubmit={handleSubmitPost}>
          <input placeholder="Post" onChange={handleChangePost} value={post} />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <Table striped bordered hover className="align-items-center">
        <thead>
          <tr>
            <th>Words</th>
          </tr>
        </thead>
        <tbody>
          {x.map((elem, index) => (
            <tr key={index}>
              <td>{elem}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Trial;