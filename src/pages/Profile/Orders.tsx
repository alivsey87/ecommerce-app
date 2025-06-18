import { useEffect, useState } from "react";
import type { Order } from "../../types/types";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const products = useSelector((state: RootState) => state.products.products);
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/profile", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      setOrders(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            userId: data.userId,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
          };
        }) as Order[]
      );
    };
    fetchOrders();
  }, [user]);

  return (
    <div id="orders-section">
      <h2>Your Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}
      {orders.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                  padding: "8px",
                }}
              >
                Order Date
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                  padding: "8px",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ padding: "8px" }}>
                  {order.createdAt ? order.createdAt.toLocaleString() : ""}
                </td>
                <td style={{ padding: "8px" }}>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsModalOpen(true);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedOrder && (
          <div>
            <h3>Order Details</h3>
            <div>
              <strong>Order ID:</strong> {selectedOrder.id}
            </div>
            <div>
              <strong>Order Date:</strong>{" "}
              {selectedOrder.createdAt
                ? selectedOrder.createdAt.toLocaleString()
                : ""}
            </div>
            <div>
              <strong>Total:</strong> ${selectedOrder.total?.toFixed(2)}
            </div>
            <div>
              <strong>Items:</strong>
              <ul>
                {selectedOrder.items.map((item, idx) => {
                  const product = products.find(
                    (p) => String(p.id) === String(item.productId)
                  );
                  return (
                    <li key={idx}>
                      {product
                        ? `${product.title} x ${item.quantity}`
                        : `Product (ID: ${item.productId}) x ${item.quantity}`}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
