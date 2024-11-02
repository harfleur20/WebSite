import React from 'react';
import { User, Star, BarChart2 } from 'lucide-react';
import VotingInterface from '../voting/VotingInterface';

interface JuryMember {
  id: string;
  name: string;
  photo: string;
  experience: number;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

const JuryDashboard = () => {
  const juryMember: JuryMember = {
    id: '1',
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    experience: 8,
    socialLinks: {
      twitter: 'https://twitter.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      portfolio: 'https://sarahjohnson.design'
    }
  };

  const currentMatches = [
    {
      id: 'match1',
      contestant1: 'Michael Chen',
      contestant2: 'Emma Wilson',
      round: 'Quarter Finals',
      endTime: new Date(Date.now() + 3600000) // 1 hour from now
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Jury Profile */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={juryMember.photo}
            alt={juryMember.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="font-calvera text-2xl text-primary mb-2">{juryMember.name}</h2>
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <User className="h-5 w-5" />
              <span>Jury Member</span>
              <span className="text-primary-light">•</span>
              <span>{juryMember.experience} years experience</span>
            </div>
            <div className="flex space-x-4">
              {Object.entries(juryMember.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-light transition-colors"
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="font-calvera text-2xl text-primary mb-6">Current Matches</h3>
          {currentMatches.map((match) => (
            <div key={match.id} className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">{match.round}</span>
                <span className="text-sm text-primary-light">
                  Ends in: {new Date(match.endTime).toLocaleTimeString()}
                </span>
              </div>
              <VotingInterface
                matchId={match.id}
                contestant1={match.contestant1}
                contestant2={match.contestant2}
                isJury={true}
              />
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div>
          <h3 className="font-calvera text-2xl text-primary mb-6">Your Voting Statistics</h3>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <Star className="h-8 w-8 text-primary-light mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-gray-600">Average Score Given</div>
              </div>
              <div className="text-center">
                <BarChart2 className="h-8 w-8 text-primary-light mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">15</div>
                <div className="text-sm text-gray-600">Matches Judged</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JuryDashboard;