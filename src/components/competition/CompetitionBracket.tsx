import React from 'react';
import { motion } from 'framer-motion';

interface Match {
  id: string;
  round: number;
  player1: string;
  player2: string;
  score1?: number;
  score2?: number;
  status: 'upcoming' | 'live' | 'completed';
}

const CompetitionBracket = () => {
  const matches: Match[] = [
    {
      id: '1',
      round: 1,
      player1: 'Sarah Johnson',
      player2: 'Michael Chen',
      score1: 75,
      score2: 68,
      status: 'completed'
    },
    {
      id: '2',
      round: 1,
      player1: 'Emma Wilson',
      player2: 'David Lee',
      status: 'live'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="font-calvera text-2xl text-primary mb-6">Tournament Bracket</h2>
      
      <div className="space-y-4">
        {matches.map((match) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{match.player1}</span>
                  {match.score1 !== undefined && (
                    <span className="text-primary-light font-bold">{match.score1}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">{match.player2}</span>
                  {match.score2 !== undefined && (
                    <span className="text-primary-light font-bold">{match.score2}</span>
                  )}
                </div>
              </div>
              
              <div className="ml-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${match.status === 'live' ? 'bg-red-100 text-red-800' :
                    match.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'}`}
                >
                  {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionBracket;