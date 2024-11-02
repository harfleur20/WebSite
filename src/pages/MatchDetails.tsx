import React from 'react';
import { useParams } from 'react-router-dom';
import VotingInterface from '../components/voting/VotingInterface';
import { Clock, User, Trophy } from 'lucide-react';

const MatchDetails = () => {
  const { id } = useParams();

  // Mock match data
  const match = {
    id,
    round: 'Quarter Finals',
    startTime: new Date(),
    endTime: new Date(Date.now() + 3600000), // 1 hour from now
    contestant1: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      score: 75
    },
    contestant2: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
      score: 68
    },
    totalVotes: 234,
    status: 'live'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Match Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-calvera text-3xl text-primary">Match #{id}</h1>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary-light" />
              <span className="text-gray-600">
                Time Remaining: {new Date(match.endTime).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Contestants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[match.contestant1, match.contestant2].map((contestant, index) => (
              <div key={index} className="text-center">
                <img
                  src={contestant.avatar}
                  alt={contestant.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-calvera text-xl mb-2">{contestant.name}</h3>
                {contestant.score !== undefined && (
                  <div className="text-2xl font-bold text-primary-light">
                    {contestant.score}%
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Match Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <Trophy className="h-6 w-6 text-primary-light mx-auto mb-2" />
              <div className="text-sm text-gray-600">Round</div>
              <div className="font-semibold">{match.round}</div>
            </div>
            <div className="text-center">
              <User className="h-6 w-6 text-primary-light mx-auto mb-2" />
              <div className="text-sm text-gray-600">Total Votes</div>
              <div className="font-semibold">{match.totalVotes}</div>
            </div>
            <div className="text-center">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${match.status === 'live' ? 'bg-red-100 text-red-800' :
                  match.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'}`}
              >
                {match.status.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Voting Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <VotingInterface
            matchId={id || ''}
            contestant1={match.contestant1.name}
            contestant2={match.contestant2.name}
          />
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-calvera text-2xl text-primary mb-6">Match Rules</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-primary-light">•</span>
                <span>Each vote costs 100 FCFA</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-light">•</span>
                <span>Public votes count for 60% of the final result</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-light">•</span>
                <span>Jury votes count for 40% of the final result</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-primary-light">•</span>
                <span>Results will be announced 3 hours after voting ends</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;