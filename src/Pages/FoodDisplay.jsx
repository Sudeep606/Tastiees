import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { menu_list, food_list } from '../assets/assets';
import { Button } from 'react-bootstrap';
import { CartContext } from '../Context/Cart';
import { FavContext } from '../Context/Fav';

function FoodDisplay() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Handle category selection
    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const Categories = () => {
        return (
            <div className="categories-container">
                {menu_list.map((category, index) => (
                    <div
                        key={index}
                        className={`category-card ${selectedCategory === category.menu_name ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category.menu_name)}
                    >
                        <img src={category.menu_image} alt={category.menu_name} className='category-image' />
                        <p className='category-name'>{category.menu_name}</p>
                    </div>
                ))}
            </div>
        );
    };

    const FoodItems = () => {
        // Filter food items based on the selected category
        const filteredFoodList = selectedCategory
            ? food_list.filter(item => item.category === selectedCategory)
            : food_list;

        return (
            <div className="food-items">
                {filteredFoodList.map((item) => (
                    <div key={item._id} className="food-item-card">
                        <img src={item.image} alt={item.name} className='image-fluid' />
                        <h3 className='food-item-title'>{item.name}</h3>
                        <p className='food-item-description'>{item.description}</p>
                        <p className='food-item-price'>Price: ${item.price}</p>
                        <p className='food-category'>Category: {item.category}</p>
                        <div className='d-flex'>
                            <Button onClick={() => addToCart(item)}>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Button>
                            <Button onClick={()=>addToFav(item)}>
                                <i className="fa-regular fa-heart"></i>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const { addToCart } = useContext(CartContext); // Get addToCart from CartContext
  const { addToFav } = useContext(FavContext);
    return (
        <div>
            <h1 className="title">Categories</h1>
            <hr />
            <Categories />
            <h1 className="title">Menu</h1>
            <hr />
            <FoodItems />
        </div>
    );
}

export default FoodDisplay;
