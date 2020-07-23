import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Search() {

  

  return (
    <Form className="my-3 mx-auto w-50">
      <Form.Group controlId="pokeSearch">
        <Form.Control placeholder="Search Pokemon"></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
       Submit
      </Button>
    </Form>
  );
}
