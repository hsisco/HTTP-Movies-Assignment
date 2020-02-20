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
          metascore: '',
          stars: []
        })
        props.history.push('/');
        console.log(res)
      })
      .catch(err => console.log("Submit unsuccessful:", err))
  }

  const updateStars = e => setMovie({ ...movie, stars: e.target.value })

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
          <Label sm={2}>Meta-score</Label>
          <Col sm={10}>
          <Input type="number" name="metascore" value={movie.metascore} onChange={handleChanges} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Starring</Label>
          <Col sm={10}>
          <Input type="textarea" name="stars" value={movie.stars} onChange={updateStars} />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type="submit">
              Save
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default UpdateMovie;