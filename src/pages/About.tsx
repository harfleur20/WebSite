import React from 'react';
import { Users, Award, Trophy, Target } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      bio: 'With over 15 years of experience in graphic design, Sarah founded Coupe des Créatifs to celebrate creative excellence.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Competitions',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
      bio: 'Michael ensures our competitions maintain the highest standards while fostering innovation and creativity.'
    }
  ];

  const values = [
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'We celebrate and reward outstanding creative achievements.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive network of creative professionals.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Pushing the boundaries of creative design.'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Providing a platform for talented designers to shine.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-calvera text-5xl mb-6">About Us</h1>
            <p className="text-xl text-secondary-light max-w-2xl mx-auto">
              Empowering creative excellence through competition and community
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="font-calvera text-4xl text-primary mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Coupe des Créatifs was founded with a singular vision: to create a platform where graphic designers can showcase their talent, compete with peers, and gain recognition for their creative excellence.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="bg-primary-light/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <value.icon className="h-8 w-8 text-primary-light" />
              </div>
              <h3 className="font-calvera text-xl text-primary mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="font-calvera text-4xl text-primary text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="font-calvera text-2xl text-primary mb-2">{member.name}</h3>
                    <p className="text-primary-light font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;