import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data),
        console.log("Movie to edit:", movie))
      .catch(err => console.log("Movie not found:", err))
  }, [id])

  const handleChanges = e => setMovie({ ...movie, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(()=>{
        setMovie({
          title: '',
          director: '',
          metascore: '',
          stars: []
        })
        props.history.push('/');
        console.log("Updated Movie:", movie)
      })
      .catch(err => console.log("Submit unsuccessful:", err))
  }

  const editStars = e => setMovie({ ...movie, stars: e.target.value })

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        props.history.push('/');
        console.log("Deleted Movie:", movie)
      })
      .catch(err => console.log("Delete unsuccessful:", err))
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
          <Label sm={2}>Meta-score</Label>
          <Col sm={10}>
          <Input type="number" name="metascore" value={movie.metascore} onChange={handleChanges} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Starring</Label>
          <Col sm={10}>
          <Input type="textarea" name="stars" value={movie.stars} onChange={editStars} />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type="submit">
              Save
            </Button>
            <Button type="button" onClick={deleteMovie}>Delete</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default UpdateMovie;