import React, { useContext } from 'react';
import './fav.css'; 
import { FavContext } from '../Context/Fav';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/Cart';

const Favourite = () => {
    const { favs } = useContext(FavContext); // Favorites list
    const { addToCart } = useContext(CartContext); // Cart actions

    return (
        <div className="favourite-container">
            {favs.length > 0 ? (
                favs.map((item) => (
                    <div key={item._id} className="card1">
                        <img src={item.image} alt={item.name} className="card-image" />
                        <div className="card-content">
                            <h3>{item.name}</h3>
                        </div>
                        <Link to="/cart">
                            <button className='button' onClick={() => addToCart(item)}>Buy now</button>
                        </Link>
                       
                    </div>
                ))
            ) : (
                <p>No items in your favorites list.</p>
            )}
        </div>
    );
};

export default Favourite;
