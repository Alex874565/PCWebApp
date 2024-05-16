import "./dashboard.css";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../atoms/navBar/navBar";
import Footer from "../../atoms/footer/footer";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

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

        fetchUsers();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="sidebar">
                    <ul>
                        <li id="active"><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/users_dashboard">Users</Link></li>
                        <li><Link to="/products_dashboard">Products</Link></li>
                        <li><Link to="/orders_dashboard">Orders</Link></li>
                        <li id="red"><Link to="/">Back to site</Link></li>
                        <li id="website-name">Love4Games</li>
                    </ul>
                </div>
                <div className="main-content">
                    <h1>Admin dashboard</h1>
                    
                    <div className="stats-container">
                        <div className="stat-card">
                            <h2>Users</h2>
                            <p>{users.length}</p>
                        </div>
                        <div className="stat-card">
                            <h2>Orders</h2>
                            <p>0</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
