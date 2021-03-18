import React from 'react';
import './Block.css';
import { Card } from 'react-bootstrap';

const category = ({ categoryName, click }) => (
  <div className="d-flex p-3 justify-content-around">
    <Card
      className="text-info bg-gradient-white"
      style={{ height: 100, width: 250 }}
    >
      <Card.Body
        style={{ cursor: 'pointer' }}
        onClick={() => click(categoryName)}
      >
        <Card.Text className="text-center mt-2">
          <h4>{categoryName}</h4>
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
);
export default category;
