import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ArrowRight, Star, Users, Trophy } from 'lucide-react';
import CurrentMatch from '../components/home/CurrentMatch';
import BlogPreview from '../components/home/BlogPreview';

const Home = () => {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80',
      title: 'Design Excellence',
      description: 'Join the most prestigious graphic design competition',
      cta: 'Register Now',
      link: '/competition'
    },
    {
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80',
      title: 'Showcase Your Talent',
      description: 'Get recognized by industry experts',
      cta: 'View Calendar',
      link: '/calendar'
    },
    {
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80',
      title: 'Win Amazing Prizes',
      description: 'Compete for prestigious awards and cash prizes',
      cta: 'Learn More',
      link: '/shop'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Previous Winner',
      content: 'Participating in Coupe des Créatifs was a game-changer for my career. The exposure and recognition I received were invaluable.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'Jury Member',
      content: "The level of creativity and innovation we see in this competition is outstanding. It's inspiring to be part of this journey.",
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
    }
  ];

  // Données de démonstration pour le match en cours
  const currentMatch = {
    id: '1',
    competition: 'Logo Design Championship 2024',
    round: 'Quart de finale',
    timeRemaining: '45:00',
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
    },
    votingFee: 100,
    totalVotes: 234
  };

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-[600px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-3xl px-4">
                  <h1 className="font-calvera text-5xl mb-4">{slide.title}</h1>
                  <p className="text-xl mb-8">{slide.description}</p>
                  <Link to={slide.link} className="btn-primary inline-flex items-center space-x-2">
                    <span>{slide.cta}</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-calvera text-4xl text-primary mb-4">Why Choose Coupe des Créatifs?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Join the most prestigious graphic design competition and showcase your creativity to the world.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-primary-light/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary-light" />
              </div>
              <h3 className="font-calvera text-2xl mb-4">Prestigious Awards</h3>
              <p className="text-gray-600">Compete for recognition and substantial cash prizes in every competition round.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-light/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Star className="h-8 w-8 text-primary-light" />
              </div>
              <h3 className="font-calvera text-2xl mb-4">Expert Jury</h3>
              <p className="text-gray-600">Get evaluated by industry professionals with years of experience.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-light/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-light" />
              </div>
              <h3 className="font-calvera text-2xl mb-4">Global Community</h3>
              <p className="text-gray-600">Connect with fellow designers and expand your professional network.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Match Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CurrentMatch match={currentMatch} />
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogPreview />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-calvera text-4xl text-primary text-center mb-16">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-calvera text-xl">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;