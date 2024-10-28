// Profile.js (Frontend)
import React, { useEffect, useState } from 'react';
import api from '../../services/apiService';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const customerID = localStorage.getItem('customerID') || '1';

      try {
        // Use `api` to make the request, automatically handling auth headers
        const response = await api.get(`/profile`, {
          params: { customerID },
        });

        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data. Please try again.');
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfileData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">

      <h1>Profile</h1>
      <p>Username: {userData.Username}</p>
      <p>Name: {userData.Name}</p>
      <p>Address: {userData.Address}</p>
      <p>Contact: {userData.Contact}</p>
      <p>City: {userData.City}</p>
    </div>
  );
};

export default Profile;
