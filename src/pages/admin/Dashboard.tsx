import React, { useState } from 'react';
import { Users, Award, BarChart2, AlertTriangle, Plus, DollarSign, Settings, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import JuryManagement from '../../components/admin/JuryManagement';
import UserManagement from '../../components/admin/UserManagement';
import CompetitionForm from '../../components/admin/CompetitionForm';
import AdminHeader from '../../components/admin/AdminHeader';

interface CompetitionStats {
  totalParticipants: number;
  activeCompetitions: number;
  pendingSubmissions: number;
  reportedIssues: number;
  totalVotingFees: number;
  totalPrizePool: number;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showJuryModal, setShowJuryModal] = useState(false);

  // Mock data - would come from API in production
  const stats: CompetitionStats = {
    totalParticipants: 128,
    activeCompetitions: 3,
    pendingSubmissions: 15,
    reportedIssues: 4,
    totalVotingFees: 250000,
    totalPrizePool: 1000000
  };

  const recentActivity = [
    {
      id: 1,
      type: 'submission',
      user: 'Sarah Johnson',
      action: 'submitted design for Logo Challenge',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'report',
      user: 'Michael Chen',
      action: 'reported technical issue',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'competition',
      user: 'Admin',
      action: 'created new UI/UX Competition',
      time: '1 day ago'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'jury', label: 'Gestion des Jurys' },
    { id: 'users', label: 'Utilisateurs' },
    { id: 'competitions', label: 'Compétitions' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AdminHeader 
        title="Tableau de bord Admin" 
        subtitle="Gérer les compétitions, utilisateurs et paramètres système" 
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button
          onClick={() => setActiveTab('jury')}
          className="btn-primary flex items-center justify-center space-x-2 py-3"
        >
          <Award className="h-5 w-5" />
          <span>Gérer les Jurys</span>
        </button>
        <button
          onClick={() => setActiveTab('competitions')}
          className="btn-secondary flex items-center justify-center space-x-2 py-3"
        >
          <Trophy className="h-5 w-5" />
          <span>Nouvelle Compétition</span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className="btn-secondary flex items-center justify-center space-x-2 py-3"
        >
          <Users className="h-5 w-5" />
          <span>Gérer les Utilisateurs</span>
        </button>
        <Link
          to="/admin/settings"
          className="btn-secondary flex items-center justify-center space-x-2 py-3"
        >
          <Settings className="h-5 w-5" />
          <span>Paramètres</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-primary-light text-primary-light'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'overview' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Total Participants</p>
                    <h3 className="text-2xl font-bold text-primary">{stats.totalParticipants}</h3>
                  </div>
                  <Users className="h-8 w-8 text-primary-light" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                delay={0.1}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Compétitions Actives</p>
                    <h3 className="text-2xl font-bold text-primary">{stats.activeCompetitions}</h3>
                  </div>
                  <Trophy className="h-8 w-8 text-primary-light" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                delay={0.2}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Soumissions en Attente</p>
                    <h3 className="text-2xl font-bold text-primary">{stats.pendingSubmissions}</h3>
                  </div>
                  <BarChart2 className="h-8 w-8 text-primary-light" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                delay={0.3}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 mb-1">Problèmes Signalés</p>
                    <h3 className="text-2xl font-bold text-primary">{stats.reportedIssues}</h3>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-primary-light" />
                </div>
              </motion.div>
            </div>

            {/* Finance Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              delay={0.4}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="font-calvera text-xl mb-6">Finances</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 mb-1">Total Frais de Votes</p>
                      <h3 className="text-2xl font-bold text-green-600">
                        {stats.totalVotingFees.toLocaleString()} FCFA
                      </h3>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 mb-1">Total Prix Compétitions</p>
                      <h3 className="text-2xl font-bold text-blue-600">
                        {stats.totalPrizePool.toLocaleString()} FCFA
                      </h3>
                    </div>
                    <Trophy className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              delay={0.6}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="font-calvera text-xl mb-4">Activité Récente</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between border-b border-gray-100 pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {activity.type === 'submission' && (
                          <Award className="h-5 w-5 text-blue-500" />
                        )}
                        {activity.type === 'report' && (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        {activity.type === 'competition' && (
                          <Trophy className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-gray-800">
                          <span className="font-medium">{activity.user}</span>{' '}
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <button className="text-primary-light hover:text-primary">
                      Voir Détails
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'jury' && <JuryManagement />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'competitions' && <CompetitionForm />}
      </div>
    </div>
  );
};

export default AdminDashboard;