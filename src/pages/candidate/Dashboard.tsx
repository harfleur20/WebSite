import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Award, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Competition, Submission } from '../../types/roles';

const CandidateDashboard = () => {
  const submissions: Submission[] = [
    {
      id: '1',
      title: 'Modern Logo Design',
      description: 'A minimalist approach to brand identity',
      imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80',
      candidateId: '1',
      competitionId: '1',
      createdAt: new Date(),
      status: 'pending'
    }
  ];

  const activeCompetitions: Competition[] = [
    {
      id: '1',
      title: 'Logo Design Championship',
      description: 'Create a memorable brand identity',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'active',
      prizePool: 500000,
      category: 'Logo Design'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-calvera text-3xl text-primary mb-2">Candidate Dashboard</h1>
        <p className="text-gray-600">Manage your submissions and track your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="font-calvera text-xl mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/submit" className="btn-primary flex items-center justify-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>New Submission</span>
              </Link>
              <Link to="/competitions" className="btn-secondary flex items-center justify-center space-x-2">
                <Award className="h-5 w-5" />
                <span>View Competitions</span>
              </Link>
            </div>
          </div>

          {/* Active Competitions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="font-calvera text-xl mb-4">Active Competitions</h2>
            <div className="space-y-4">
              {activeCompetitions.map((competition) => (
                <motion.div
                  key={competition.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{competition.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{competition.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-primary-light">
                          Prize: {competition.prizePool.toLocaleString()} FCFA
                        </span>
                        <span className="text-gray-500">
                          Category: {competition.category}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/competitions/${competition.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Participate
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="font-calvera text-xl mb-4">Recent Submissions</h2>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={submission.imageUrl}
                      alt={submission.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{submission.title}</h3>
                      <p className="text-sm text-gray-600">{submission.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                            submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'}`}
                        >
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;