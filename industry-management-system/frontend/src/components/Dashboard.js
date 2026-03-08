import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    search: '',
    industryType: '',
    city: '',
    email: '',
    contactPerson: '',
    page: 1,
    limit: 10,
    sortBy: 'createdDate',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({});
  const [error, setError] = useState('');

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchIndustries();
  }, [isAuthenticated, navigate, searchParams]);
     
  const fetchIndustries = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(searchParams).toString();
      const response = await axios.get(`http://localhost:5000/api/industries?${queryParams}`);
      setIndustries(response.data.industries);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalIndustries: response.data.totalIndustries
      });
    } catch (error) {
      setError('Failed to fetch industries');
      console.error('Error fetching industries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
      page: 1 // Reset to first page when searching
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({
      ...searchParams,
      page: newPage
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this industry?')) {
      try {
        await axios.delete(`http://localhost:5000/api/industries/${id}`);
        fetchIndustries(); // Refresh the list
      } catch (error) {
        setError('Failed to delete industry');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mt-4">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="container">
          <h2 className="dashboard-title">Industry Dashboard</h2>
          <p className="dashboard-subtitle">Manage and monitor all registered industries in your system</p>
        </div>
      </div>

      

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {/* Search Filters */}
      <div className="card search-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="search-title mb-0"><i className="fas fa-search me-2"></i>Search & Filter Industries</h5>
            <Link to="/add-industry" className="btn btn-primary btn-sm">
              <i className="fas fa-plus me-2"></i>Add Industry
            </Link>
          </div>
          <div className="help-text">
            <small><i className="fas fa-info-circle me-1"></i>Use the fields below to search and filter industries. You can combine multiple filters for precise results.</small>
          </div>
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, type, city..."
                name="search"
                value={searchParams.search}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Industry Type"
                name="industryType"
                value={searchParams.industryType}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                value={searchParams.city}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="email"
                value={searchParams.email}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Contact Person"
                name="contactPerson"
                value={searchParams.contactPerson}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Industries Table */}
      <div className="card table-card">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="loading-spinner"></div>
              <p className="mt-3 text-muted">Loading industries...</p>
            </div>
          ) : industries.length === 0 ? (
            <div className="empty-state">
              <h5>No industries found</h5>
              <p>
                {searchParams.search || searchParams.industryType || searchParams.city || searchParams.email || searchParams.contactPerson 
                  ? "Try adjusting your search criteria or clear the filters to see all industries."
                  : "Get started by adding your first industry using the 'Add New Industry' button above."}
              </p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th><i className="fas fa-building me-1"></i>Industry Name</th>
                      <th><i className="fas fa-industry me-1"></i>Type</th>
                      <th><i className="fas fa-user me-1"></i>Contact Person</th>
                      <th><i className="fas fa-envelope me-1"></i>Email</th>
                      <th><i className="fas fa-phone me-1"></i>Phone</th>
                      <th><i className="fas fa-city me-1"></i>City</th>
                      <th><i className="fas fa-calendar me-1"></i>Created</th>
                      <th><i className="fas fa-bolt me-1"></i>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industries.map((industry) => (
                      <tr key={industry._id}>
                        <td>
                          <code className="text-muted">{industry._id.slice(-6)}</code>
                        </td>
                        <td>
                          <strong>{industry.industryName}</strong>
                        </td>
                        <td>
                          <span className="badge bg-secondary">{industry.industryType}</span>
                        </td>
                        <td>{industry.contactPerson}</td>
                        <td>
                          <a href={`mailto:${industry.email}`} className="text-decoration-none">
                            {industry.email}
                          </a>
                        </td>
                        <td>
                          <a href={`tel:${industry.phoneNumber}`} className="text-decoration-none">
                            {industry.phoneNumber}
                          </a>
                        </td>
                        <td>{industry.city}</td>
                        <td>{formatDate(industry.createdDate)}</td>
                        <td className="d-flex gap-2">
                          <Link
                            to={`/industry/${industry._id}`}
                            className="btn btn-sm btn-info"
                          >
                            <i className="fas fa-eye me-1"></i>View
                          </Link>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(industry._id)}
                          >
                            <i className="fas fa-trash me-1"></i>Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                      >
                        ← Previous
                      </button>
                    </li>
                    {[...Array(pagination.totalPages)].map((_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${pagination.currentPage === index + 1 ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                      >
                        Next →
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;