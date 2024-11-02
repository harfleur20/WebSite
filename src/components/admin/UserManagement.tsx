import React, { useState } from 'react';
import { Search, UserCheck, UserX, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import type { User } from '../../types/roles';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data - replace with API call
  const users: (User & { status: string })[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'candidate',
      status: 'pending',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@example.com',
      role: 'jury',
      status: 'active',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
    }
  ];

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update UI
      }
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="font-calvera text-2xl text-primary mb-6">User Management</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-light focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="candidate">Candidates</option>
              <option value="jury">Jury Members</option>
              <option value="admin">Admins</option>
            </select>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-light focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.photo}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'jury' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'}`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {user.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusChange(user.id, 'active')}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                    title="Approve User"
                  >
                    <UserCheck className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleStatusChange(user.id, 'rejected')}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Reject User"
                  >
                    <UserX className="h-5 w-5" />
                  </button>
                </>
              )}
              {user.status === 'active' && (
                <button
                  onClick={() => handleStatusChange(user.id, 'suspended')}
                  className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                >
                  Suspend
                </button>
              )}
              {user.status === 'suspended' && (
                <button
                  onClick={() => handleStatusChange(user.id, 'active')}
                  className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm"
                >
                  Reactivate
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-500 py-4">No users found matching your criteria</p>
        )}
      </div>
    </div>
  );
};

export default UserManagement;