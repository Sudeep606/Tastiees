import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import head from '../assets/header_img.png';
import './Home.css';
import FoodDisplay from '../Pages/FoodDisplay';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <Card className="text-center">
        <Card.Header style={{fontFamily: 'cursive', fontFeatureSettings: 'inherit', fontWeight: 'bold'}}>Special Offer</Card.Header>
        <Card.Body>
          <div className="container">
            <img src={head} alt="Special Offer" />
            <div className="bottom-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ipsa dicta perferendis iure, impedit voluptatem exercitationem magnam a minima, error atque porro molestiae, laborum nemo cumque eaque voluptatibus in doloremque.
              <hr />
              <Link to='/cart'><Button>Buy Now</Button></Link>
            </div>
          </div>
        </Card.Body>
      </Card>

      <FoodDisplay/>
    </>
  );
}

export default Home;
