import React from 'react';
import { Trophy, Calendar, User } from 'lucide-react';

interface CompetitionHistoryItem {
  id: string;
  title: string;
  date: string;
  winner: string;
  participants: number;
  prizePool: string;
}

const CompetitionHistory = () => {
  const historyItems: CompetitionHistoryItem[] = [
    {
      id: '1',
      title: 'Summer Design Challenge 2023',
      date: 'August 2023',
      winner: 'Sarah Johnson',
      participants: 64,
      prizePool: '800,000 FCFA'
    },
    {
      id: '2',
      title: 'Spring Creative Cup 2023',
      date: 'April 2023',
      winner: 'Michael Chen',
      participants: 32,
      prizePool: '500,000 FCFA'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="font-calvera text-2xl text-primary mb-6">Competition History</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {historyItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-6 hover:border-primary-light transition-colors duration-300"
          >
            <h3 className="font-calvera text-xl mb-4">{item.title}</h3>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>{item.date}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Trophy className="h-5 w-5" />
                <span>Winner: {item.winner}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-5 w-5" />
                <span>{item.participants} Participants</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="font-semibold text-primary">
                  Prize Pool: {item.prizePool}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionHistory;