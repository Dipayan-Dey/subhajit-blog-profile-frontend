import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Mail, Phone, MessageSquare, Users, TrendingUp, Clock, MoreVertical } from 'lucide-react';

function Admin() {
  const [datalist, setDatalist] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulate API call with sample data for demo
 let getData = () => {
   axios.get("http://localhost:8000/subhajit/profile/show")
      .then((res) => {
        console.log("API Response:", res.data);
        setDatalist(res.data.datalist);
      })
      .catch((err) => console.log("API Error:", err));
  };

      useEffect(() => {
      getData()
  }, []);

  useEffect(() => {
    getData()
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let filtered = datalist.filter(item =>
      item.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort data
    filtered.sort((a, b) => {
      const aValue = sortBy === 'name' ? a.fullname : a.email;
      const bValue = sortBy === 'name' ? b.fullname : b.email;
      const comparison = aValue.localeCompare(bValue);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredData(filtered);
  }, [datalist, searchTerm, sortBy, sortOrder]);

  // Utility functions
  const getInitials = (name = '') => {
    const words = name.trim().split(' ');
    const first = words[0]?.[0] || '';
    const last = words[1]?.[0] || '';
    return (first + last).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRandomColor = (name) => {
    const colors = [
      'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500', 
      'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSelectRow = (index) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map((_, index) => index)));
    }
  };

  const openModal = (userData) => {
    setSelectedUser(userData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Manage customer enquiries and communications</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">Last updated: Just now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Enquiries</p>
                  <p className="text-2xl font-bold text-white mt-1">{datalist.length}</p>
                </div>
                <div className="bg-blue-500 bg-opacity-20 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+12%</span>
                <span className="text-gray-400 ml-1">from last week</span>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-green-500 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Response Rate</p>
                  <p className="text-2xl font-bold text-white mt-1">94%</p>
                </div>
                <div className="bg-green-500 bg-opacity-20 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+5%</span>
                <span className="text-gray-400 ml-1">from last month</span>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Avg Response Time</p>
                  <p className="text-2xl font-bold text-white mt-1">2.4h</p>
                </div>
                <div className="bg-purple-500 bg-opacity-20 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">-15min</span>
                <span className="text-gray-400 ml-1">improvement</span>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Satisfaction</p>
                  <p className="text-2xl font-bold text-white mt-1">4.8/5</p>
                </div>
                <div className="bg-yellow-500 bg-opacity-20 p-3 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+0.2</span>
                <span className="text-gray-400 ml-1">this quarter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          {/* Table Header with Controls */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-white">Customer Enquiries</h2>
                {selectedRows.size > 0 && (
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedRows.size} selected
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search enquiries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64"
                  />
                </div>

                {/* Sort Options */}
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="email-asc">Email A-Z</option>
                  <option value="email-desc">Email Z-A</option>
                </select>

                <button className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg p-2 text-gray-300 hover:text-white transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-750">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    Customer
                    {sortBy === 'name' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => {
                    const globalIndex = startIndex + index;
                    return (
                      <tr 
                        key={globalIndex} 
                        className={`hover:bg-gray-750 transition-colors ${
                          selectedRows.has(globalIndex) ? 'bg-blue-900 bg-opacity-20' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(globalIndex)}
                            onChange={() => handleSelectRow(globalIndex)}
                            className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-2"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full ${getRandomColor(item.fullname)} flex items-center justify-center font-bold text-sm text-white shadow-lg`}>
                              {getInitials(item.fullname)}
                            </div>
                            <div>
                              <div className="font-semibold text-white">{item.fullname}</div>
                              <div className="text-sm text-gray-400">Customer</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">{item.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-300">{item.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-blue-500 bg-opacity-20 text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                            {item.subject || 'General Inquiry'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            <p className="text-gray-300 text-sm line-clamp-2">{item.message}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-400 text-sm">
                            {formatDate(item.timestamp)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => openModal(item)}
                              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="bg-gray-700 rounded-full p-4">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-400 font-medium">No enquiries found</p>
                        <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors text-sm"
                >
                  Previous
                </button>
                
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Customer Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* User Info Section */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-full ${getRandomColor(selectedUser.fullname)} flex items-center justify-center font-bold text-xl text-white shadow-lg`}>
                  {getInitials(selectedUser.fullname)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedUser.fullname}</h3>
                  <p className="text-gray-400">Customer</p>
                  {selectedUser.socialHandle && (
                    <p className="text-blue-400 text-sm">{selectedUser.socialHandle}</p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-400" />
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <div className="flex items-center space-x-2 text-white bg-gray-800 p-3 rounded-lg border border-gray-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{selectedUser.email}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                    <div className="flex items-center space-x-2 text-white bg-gray-800 p-3 rounded-lg border border-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{selectedUser.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Section */}
              {selectedUser.subject && (
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Subject</h4>
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                    <span className="bg-blue-500 bg-opacity-20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                      {selectedUser.subject}
                    </span>
                  </div>
                </div>
              )}

              {/* Message Section */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-green-400" />
                  Customer Message
                </h4>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <p className="text-gray-300 leading-relaxed">{selectedUser.message}</p>
                </div>
              </div>

              {/* Timestamp Section */}
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-400" />
                  Enquiry Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Submitted On</label>
                    <div className="text-white bg-gray-800 p-3 rounded-lg border border-gray-600">
                      {formatDate(selectedUser.timestamp)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                    <div className="flex items-center space-x-2">
                      <span className="bg-yellow-500 bg-opacity-20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium border border-yellow-500 border-opacity-30">
                        Pending Review
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Send Email</span>
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Customer</span>
                </button>
                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Mark as Resolved</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;