// Profile.js (Frontend)
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      // Set customerID from local storage or use default value of 1
      const customerID = localStorage.getItem('customerID') || '1';

      try {
        const response = await fetch(`/api/profile?customerID=${customerID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
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
      {/* Add more fields as necessary */}
    </div>
  );
};

export default Profile;
