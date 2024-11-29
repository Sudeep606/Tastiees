import React, { useContext, useState } from "react";
import { CartContext } from "../Context/Cart";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./cart.css";

const DeliveryModal = ({ show, handleClose, onConfirm, item }) => {
  const [deliveryDetails, setDeliveryDetails] = useState({
    house: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails({ ...deliveryDetails, [name]: value });
  };

  const validateForm = () => {
    const { house, street, city, pincode, phone } = deliveryDetails;
    if (!house || !street || !city || !pincode || !phone) {
      alert("All fields are required!");
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6-digit Pin Code");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      onConfirm(item, deliveryDetails);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delivery Details for {item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {["house", "street", "city", "pincode", "phone"].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type="text"
              name={field}
              className="form-control"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={deliveryDetails[field]}
              onChange={handleChange}
            />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function Cart() {
  const {
    cartItems = [],
    addToCart = () => {},
    removeFromCart = () => {},
    getCartTotal = () => 0,
  } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleOrderConfirmation = (item, deliveryDetails) => {
    console.log(`Order Placed for ${item.name} with details:`, deliveryDetails);
    alert(`Order Confirmed for ${item.name}!`);
    // Optionally remove the item from the cart after placing the order
    removeFromCart(item);
  };

  return (
    <div
      style={{ margin: "30px", padding: "40px" }}
      className="flex-col flex items-center bg-gray-900 gap-15 p-50 text-gray-100 text-sm rounded-lg shadow-lg"
    >
      <h1
        style={{ textAlign: "center" }}
        className="text-2xl font-bold text-yellow-400"
      >
        Your Shopping Cart
      </h1>
      <div className="flex flex-col gap-6 w-full">
        {cartItems.map((item) => (
         <div className="box">
            <div className="class-container d-flex align-items-center justify-content-between" key={item._id}>
              <div className="d-flex align-items-center">
                <img
                  id="image"
                  src={item.image}
                  alt={item.name || "Product Image"}
                  className="rounded-md h-32 w-32 object-cover"
                />
                <div className="ml-4">
                  <h1 className="text-xl font-bold text-yellow-300">{item.name}</h1>
                  <p
                    style={{ fontWeight: "600" }}
                    className="text-blue-400 mb-2 fw-600"
                  >
                    ${(item.price ?? 0).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                    <p className="text-gray-200">{item.quantity}</p>
                    <button
                      className="btn btn-dark"
                      onClick={() => removeFromCart(item)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
              <div className="button-container-vertical">
                <button
                style={{marginBottom:'10px'}}
                  className="btn btn-warning mr-2"
                  onClick={() => handleShowModal(item)}
                >
                  Place Order
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </div>
            </div>
         </div>
        ))}
      </div>

      {cartItems.length > 0 ? (
        <h1 className="text-lg font-bold text-yellow-400 mt-4">
          Total: ${(getCartTotal() ?? 0).toFixed(2)}
        </h1>
      ) : (
        <h1 className="text-lg font-bold text-gray-400">Your cart is empty</h1>
      )}

      {selectedItem && (
        <DeliveryModal
          show={showModal}
          handleClose={handleCloseModal}
          onConfirm={handleOrderConfirmation}
          item={selectedItem}
        />
      )}
    </div>
  );
}
