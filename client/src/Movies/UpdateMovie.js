import React, { useState } from 'react';
import axios from 'axios';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';


const UpdateMovie = props => {
  const { id } = props.match.params;

  const [movie, setMovie] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: []
  })

  const handleChanges = e => setMovie({ ...movie, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`/${id}`,  movie)
      .then(()=>{
        setMovie({
          title: '',
          director: '',
          metascore: ''
        })
        history.pushState('/');
        console.log(res)
      })
      .catch(err => console.log("Submit unsuccessful:", err))
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label sm={2}>Title</Label>
          <Col sm={10}>
            <Input type="text" name="title" value={movie.title} onChange={handleChanges} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Director</Label>
          <Col sm={10}>
          <Input type="text" name="director" value={movie.director} onChange={handleChanges} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Metascore</Label>
          <Col sm={10}>
          <Input type="number" name="metascore" value={movie.metascore} onChange={handleChanges} />
          </Col>
        </FormGroup>
        
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type="submit">
              Update Movie
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default UpdateMovie;