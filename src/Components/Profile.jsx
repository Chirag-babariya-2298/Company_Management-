import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Profile.css'; 
import { useNavigate } from 'react-router-dom'; 

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [originalData, setOriginalData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); 

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://employee-system-nodejs.vercel.app/api/company/getYourDetail', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.isSuccess) {
        setProfileData(response.data.data);
        setOriginalData(response.data.data); 
      } else {
        throw new Error('Failed to fetch profile data');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData(); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://employee-system-nodejs.vercel.app/api/company/update', profileData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.isSuccess) {
        setIsEditing(false); 
        fetchProfileData(); 
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      setError(err);
    }
  };

  const handleCancelClick = () => {
    setProfileData(originalData); 
    setIsEditing(false); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!profileData) return <div>No data available</div>;

  const {
    companyName,
    companyAddress1,
    companyAddress2,
    companyStartedDate,
    companyEmail,
    companyMobileNumber,
    city,
    state,
    country,
    companyLogo,
  } = profileData;

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="profile-container">
      <div className="logo-section">
        <div className="logo-container">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt="Company Logo"
              className="company-logo"
            />
          ) : (
            <p>No company logo available</p>
          )}
        </div>
        <h2 className="company-name">{companyName || 'Company Name'}</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="form-section">
        <div className="profile-header">
          <h1 className="profile-title">PROFILE</h1>
          {!isEditing && (
            <button className="edit-button" onClick={handleEditClick}>Update Profile</button>
          )}
        </div>
        <hr />
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={companyName || ''}
            readOnly={!isEditing}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyAddress1">Company Address 1</label>
          <input
            type="text"
            id="companyAddress1"
            name="companyAddress1"
            value={companyAddress1 || ''}
            readOnly={!isEditing}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyAddress2">Company Address 2</label>
          <input
            type="text"
            id="companyAddress2"
            name="companyAddress2"
            value={companyAddress2 || ''}
            readOnly={!isEditing}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyStartedDate">Company Started Date</label>
          <input
            type="text"
            id="companyStartedDate"
            value={new Date(companyStartedDate).toLocaleDateString() || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyEmail">Email Address</label>
          <input
            type="email"
            id="companyEmail"
            value={companyEmail || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyMobileNumber">Mobile Number</label>
          <input
            type="text"
            id="companyMobileNumber"
            name="companyMobileNumber"
            value={companyMobileNumber || ''}
            readOnly={!isEditing}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city || ''}
            readOnly={!isEditing}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={state || ''}
            readOnly={!isEditing}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={country || ''}
            readOnly={!isEditing}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          {isEditing && (
            <>
              <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
              <button className="save-button" onClick={handleSaveClick}>Save</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
