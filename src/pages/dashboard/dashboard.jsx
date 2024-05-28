import "./dashboard.css";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../atoms/navBar/navBar";
import Footer from "../../atoms/footer/footer";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [totalOrderValue, setTotalOrderValue] = useState(0);
    const [dailyOrderValueData, setDailyOrderValueData] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/users/");
                setUsers(res.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users. Please try again later.');
            }
        };

        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/orders/");
                setOrders(res.data);
                const totalValue = res.data.reduce((sum, order) => sum + parseFloat(order.value), 0);
                setTotalOrderValue(totalValue);
    
                const ordersByDay = calculateOrderValuePerDay(res.data);
                setDailyOrderValueData(ordersByDay);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders. Please try again later.');
            }
        };

        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/products/");
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products. Please try again later.');
            }
        };

        fetchUsers();
        fetchOrders();
        fetchProducts();
    }, []);

    const calculateOrderValuePerDay = (orders) => {
        const ordersByDay = {};
        orders.forEach(order => {
            if (order.order_date) {
                const [day, month, year] = order.order_date.split('.');
                const date = new Date(`${year}-${month}-${day}`);
                
                if (!isNaN(date.getTime())) {
                    const formattedDate = date.toISOString().split('T')[0];
                    if (!ordersByDay[formattedDate])
                        ordersByDay[formattedDate] = 0;
                    ordersByDay[formattedDate] += parseFloat(order.value);
                } else
                    console.error("Invalid date format:", order.order_date);
            } else
                console.error("Date is undefined for order:", order);
        });
        return ordersByDay;
    };

    const chartData = {
        labels: Object.keys(dailyOrderValueData),
        datasets: [
            {
                label: 'Total Order Value',
                data: Object.values(dailyOrderValueData),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div>
            <Navbar />
            <div className = "container">
                <div className = "sidebar">
                    <ul>
                        <li id = "active"><Link to = "/dashboard">Dashboard</Link></li>
                        <li><Link to = "/users_dashboard">Users</Link></li>
                        <li><Link to = "/products_dashboard">Products</Link></li>
                        <li><Link to = "/orders_dashboard">Orders</Link></li>
                        <li id = "red"><Link to = "/">Back to site</Link></li>
                        <li id = "website-name">Love4Games</li>
                    </ul>
                </div>
                <div className = "main-content">
                    <h1>Admin dashboard</h1>

                    <div className = "stats-container">
                        <div className = "stat-card">
                            <h2>Users</h2>
                            <p>{users.length}</p>
                        </div>
                        <div className = "stat-card">
                            <h2>Products</h2>
                            <p>{products.length}</p>
                        </div>
                        <div className = "stat-card">
                            <h2>Orders</h2>
                            <p>{orders.length}</p>
                        </div>
                        <div className = "stat-card">
                            <h2>Total Order Value</h2>
                            <p>${totalOrderValue.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className = "chart-container">
                        <h2>Total Order Value per Day</h2>
                        <Line data = {chartData} />
                    </div>

                    {error && <div className = "error-message">{error}</div>}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
