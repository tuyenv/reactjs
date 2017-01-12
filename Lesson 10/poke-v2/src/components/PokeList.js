import React from 'react';
import { ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap/lib/';

const PokeList = ({listOfPokemon, openModal, openInfo}) => {

  let pokemon = listOfPokemon.map((creature) => {
    return (
      <Col sm={6} md={4} key={creature.name}>
        <ListGroupItem className='PokeList-item' onClick={openModal.bind(null, creature)}>{creature.name}</ListGroupItem>
        <Button bsStyle="info" onClick={openInfo.bind(null, creature)} className='btn-info-2'>Info</Button>
      </Col>
    )
  });

  return (
    <Col sm={8} md={10} smOffset={2} mdOffset={1}>
      <ListGroup>
        {pokemon}
      </ListGroup>
    </Col>
  )
}

export default PokeList;
