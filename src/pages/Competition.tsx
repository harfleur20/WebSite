import React from 'react';
import { Trophy, Calendar, Users, Award } from 'lucide-react';
import CompetitionBracket from '../components/competition/CompetitionBracket';
import CompetitionRegistration from '../components/competition/CompetitionRegistration';
import CompetitionHistory from '../components/competition/CompetitionHistory';

const Competition = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-calvera text-5xl mb-6">Creative Competition</h1>
            <p className="text-xl text-secondary-light max-w-2xl mx-auto">
              Showcase your design skills, compete with talented creators, and win amazing prizes
            </p>
          </div>
        </div>
      </div>

      {/* Competition Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Trophy, label: 'Prize Pool', value: '1,000,000 FCFA' },
            { icon: Calendar, label: 'Duration', value: '4 Weeks' },
            { icon: Users, label: 'Participants', value: '64 Designers' },
            { icon: Award, label: 'Categories', value: '4 Awards' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <stat.icon className="h-8 w-8 text-primary-light mx-auto mb-4" />
              <h3 className="font-calvera text-xl mb-2">{stat.label}</h3>
              <p className="text-gray-600">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Section */}
          <div className="lg:col-span-1">
            <CompetitionRegistration />
          </div>

          {/* Tournament Bracket */}
          <div className="lg:col-span-2">
            <CompetitionBracket />
          </div>
        </div>

        {/* Competition History */}
        <div className="mt-12">
          <CompetitionHistory />
        </div>
      </div>
    </div>
  );
};

export default Competition;