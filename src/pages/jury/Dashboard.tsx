import React, { useState } from 'react';
import { Star, User, Edit, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface Match {
  id: string;
  competition: string;
  round: string;
  date: Date;
  status: 'upcoming' | 'live' | 'completed';
  contestant1: {
    name: string;
    photo: string;
    project: {
      title: string;
      image: string;
    }
  };
  contestant2: {
    name: string;
    photo: string;
    project: {
      title: string;
      image: string;
    }
  };
}

const JuryDashboard = () => {
  const { user } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Données de démonstration
  const currentMatches: Match[] = [
    {
      id: '1',
      competition: 'Logo Design Championship 2024',
      round: 'Quart de finale',
      date: new Date(),
      status: 'live',
      contestant1: {
        name: 'Sarah Johnson',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
        project: {
          title: 'Modern Brand Identity',
          image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80'
        }
      },
      contestant2: {
        name: 'Michael Chen',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
        project: {
          title: 'Minimalist Logo Design',
          image: 'https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?auto=format&fit=crop&q=80'
        }
      }
    }
  ];

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simuler la mise à jour du profil
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profil mis à jour avec succès');
      setShowProfileModal(false);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* En-tête du jury */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user?.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'}
                alt={user?.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <button
                onClick={() => setShowProfileModal(true)}
                className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full hover:bg-primary-light transition-colors"
                title="Modifier le profil"
              >
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h1 className="font-calvera text-2xl text-primary mb-1">
                Bienvenue, {user?.name}
              </h1>
              <p className="text-gray-600">Membre du Jury</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compétitions en cours */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="font-calvera text-xl mb-6">Compétitions en Cours</h2>
        <div className="space-y-6">
          {currentMatches.map((match) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="mb-4">
                <h3 className="font-calvera text-lg text-primary">{match.competition}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{match.round}</span>
                  <span>•</span>
                  <span>{match.date.toLocaleDateString()}</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    En Direct
                  </span>
                </div>
              </div>

              {/* Affichage VS des contestants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                {[match.contestant1, match.contestant2].map((contestant, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={contestant.photo}
                      alt={contestant.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h4 className="font-medium mb-2">{contestant.name}</h4>
                    <div className="relative">
                      <img
                        src={contestant.project.image}
                        alt={contestant.project.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4 rounded-b-lg">
                        <p className="text-white text-sm">{contestant.project.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => window.location.href = `/jury/match/${match.id}`}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Évaluer ce Match</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de modification du profil */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="font-calvera text-2xl text-primary mb-6">Modifier le Profil</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="password"
                    value={profileData.currentPassword}
                    onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="password"
                    value={profileData.newPassword}
                    onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="btn-secondary flex-1"
                >
                  Annuler
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JuryDashboard;