import { useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [totalQty, setTotalQty] = useState(0);
    const [cartArr, setCartArr] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || qty < 1) return;

        setCartArr((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: name.trim(),
                quantity: qty,
            },
        ]);

        setTotalQty((prev) => prev + Number(qty));
        setName("");
        setQty("");
    };

    const removeItem = (id) => {
        setTotalQty(totalQty - Number(cartArr.find((i) => i.id == id).quantity));
        setCartArr(cartArr.filter((i) => i.id != id));
    };

    return (
        <div className="shopping-cart">
            <h1>Shopping Cart</h1>
            <div className="container">
                <h2>Add Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Item Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter item name"
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            min="1"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            placeholder="Enter quantity"
                        />
                    </div>

                    <button type="submit" className="add-btn">
                        Add to Cart
                    </button>
                </form>
            </div>

            <div className="container">
                <h2>Cart Items</h2>

                <div className="total-bar">
                    Total Items:{" "}
                    <span className="total-number">{totalQty}</span>
                </div>

                {cartArr.length == 0 ? (
                    <p className="cart-items-empty">Your cart is empty</p>
                ) : (
                    <ul>
                        {cartArr.map((i) => (
                            <li key={i.id} className="cart-item">
                                <span>
                                    <div className="cart-item-name">
                                        {i.name}
                                    </div>
                                    <div className="cart-item-qty">
                                        Qty: {i.quantity}
                                    </div>
                                </span>
                                <button
                                    onClick={() => removeItem(i.id)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;
