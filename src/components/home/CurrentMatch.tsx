import React from 'react';
import { Clock, User, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface CurrentMatchProps {
  match: {
    id: string;
    competition: string;
    round: string;
    timeRemaining: string;
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
    votingFee: number;
    totalVotes: number;
  };
}

const CurrentMatch = ({ match }: CurrentMatchProps) => {
  const { user } = useAuth();

  // Vérifier si l'utilisateur peut voter (public ou candidat)
  const canVote = !user || user.role === 'candidate';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="text-center mb-6">
        <h2 className="font-calvera text-2xl text-primary mb-2">Match en Cours</h2>
        <div className="flex items-center justify-center space-x-2 text-gray-600">
          <span>{match.competition}</span>
          <span>•</span>
          <span>{match.round}</span>
        </div>
        <div className="mt-2 inline-flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-800 rounded-full">
          <Clock className="h-4 w-4" />
          <span>Temps restant: {match.timeRemaining}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative mb-8">
        {/* Ligne VS au milieu */}
        <div className="hidden md:flex absolute inset-y-0 left-1/2 transform -translate-x-1/2 items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-white font-bold">
            VS
          </div>
        </div>

        {/* Contestants */}
        {[match.contestant1, match.contestant2].map((contestant, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={contestant.photo}
                alt={contestant.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-lg">{contestant.name}</h3>
                <p className="text-gray-600">Contestant #{index + 1}</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={contestant.project.image}
                alt={contestant.project.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
                <h4 className="text-white font-medium">{contestant.project.title}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Match Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-600">Frais de Vote</div>
          <div className="font-semibold">{match.votingFee} FCFA</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Votes Totaux</div>
          <div className="font-semibold">{match.totalVotes}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Status</div>
          <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            En Direct
          </div>
        </div>
      </div>

      {canVote ? (
        <Link
          to={`/match/${match.id}`}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Trophy className="h-5 w-5" />
          <span>Voter Maintenant</span>
        </Link>
      ) : (
        <div className="text-center text-gray-600 p-2 bg-gray-50 rounded-lg">
          Seul le public et les candidats peuvent voter pour ce match
        </div>
      )}
    </motion.div>
  );
};

export default CurrentMatch;