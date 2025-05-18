import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) return;

            try {
                const res = await axios.get('http://192.168.0.151:5000/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(res.data);
                console.log(res.data)
            } catch (err) {
                console.log(err)
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Dashboard;