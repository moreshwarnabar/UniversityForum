import React from 'react';
import { Nav } from 'react-bootstrap';

const links = props => (
  <Nav fill variant="tabs" defaultActiveKey="/">
    {props.links.map(({ goTo, label }) => (
      <Nav.Item>
        <Nav.Link href={`#${goTo}`}>{label}</Nav.Link>
      </Nav.Item>
    ))}
  </Nav>
);

export default links;
