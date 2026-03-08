import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const IndustryDetails = () => {
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchIndustryDetails();
  }, [id, isAuthenticated, navigate]);

  const fetchIndustryDetails = async () => {
    try {
      setLoading(true);
const response = await API.get(`/industries/${id}`);      setIndustry(response.data);
    } catch (error) {
      setError('Failed to fetch industry details');
      console.error('Error fetching industry details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">Industry not found</div>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Industry Details</h2>
        <div>
          <Link to="/add-industry" className="btn btn-primary">
            Add New Industry
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h4>{industry.industryName}</h4>
          <small className="text-muted">ID: {industry._id}</small>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h5>Basic Information</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td><strong>Industry Name:</strong></td>
                    <td>{industry.industryName}</td>
                  </tr>
                  <tr>
                    <td><strong>Industry Type:</strong></td>
                    <td>{industry.industryType}</td>
                  </tr>
                  <tr>
                    <td><strong>Contact Person:</strong></td>
                    <td>{industry.contactPerson}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>
                      <a href={`mailto:${industry.email}`}>{industry.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Phone:</strong></td>
                    <td>{industry.phoneNumber}</td>
                  </tr>
                  {industry.phone2 && (
                    <tr>
                      <td><strong>Phone 2:</strong></td>
                      <td>{industry.phone2}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <h5>Location Information</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td><strong>Address:</strong></td>
                    <td>{industry.address}</td>
                  </tr>
                  <tr>
                    <td><strong>City:</strong></td>
                    <td>{industry.city}</td>
                  </tr>
                  <tr>
                    <td><strong>State:</strong></td>
                    <td>{industry.state}</td>
                  </tr>
                  <tr>
                    <td><strong>Country:</strong></td>
                    <td>{industry.country}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col-md-6">
              <h5>Additional Information</h5>
              <table className="table table-borderless">
                <tbody>
                  {industry.website && (
                    <tr>
                      <td><strong>Website:</strong></td>
                      <td>
                        <a href={industry.website} target="_blank" rel="noopener noreferrer">
                          {industry.website}
                        </a>
                      </td>
                    </tr>
                  )}
                  {industry.url && (
                    <tr>
                      <td><strong>URL:</strong></td>
                      <td>
                        <a href={industry.url} target="_blank" rel="noopener noreferrer">
                          {industry.url}
                        </a>
                      </td>
                    </tr>
                  )}
                  {industry.industryLogo && (
                    <tr>
                      <td><strong>Logo:</strong></td>
                      <td>
                        <a href={industry.industryLogo} target="_blank" rel="noopener noreferrer">
                          View Logo
                        </a>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td><strong>Created Date:</strong></td>
                    <td>{formatDate(industry.createdDate)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              {industry.industryDescription && (
                <>
                  <h5>Description</h5>
                  <p>{industry.industryDescription}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryDetails;