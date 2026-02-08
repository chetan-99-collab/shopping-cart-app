import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // 🛒 Add product to cart
  const addToCart = async (id) => {
    await fetch("http://localhost:5000/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ itemId: id }),
    });

    window.alert("Item added to cart");
  };

  // 🛒 View cart
  const viewCart = async () => {
    const res = await fetch("http://localhost:5000/carts", {
      headers: { Authorization: token },
    });
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      window.alert("Cart is empty");
      return;
    }

    const items = data.items
      .map((item) => `Item ID: ${item._id}`)
      .join("\n");

    window.alert(`🛒 Cart Items:\n${items}`);
  };

  // 📜 Order history
  const viewOrders = async () => {
    const res = await fetch("http://localhost:5000/orders", {
      headers: { Authorization: token },
    });
    const orders = await res.json();

    if (orders.length === 0) {
      window.alert("No orders yet");
      return;
    }

    const orderIds = orders.map((o) => o._id).join("\n");
    window.alert(`📜 Order History:\n${orderIds}`);
  };

  // ✅ Checkout
  const checkout = async () => {
    await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { Authorization: token },
    });

    window.alert("✅ Order successful");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Shopping Cart</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={checkout}>Checkout</button>{" "}
        <button onClick={viewCart}>Cart</button>{" "}
        <button onClick={viewOrders}>Order History</button>
      </div>

      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => addToCart(product._id)}
          style={{
            border: "1px solid #ccc",
            margin: 10,
            padding: 10,
            cursor: "pointer",
          }}
        >
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
