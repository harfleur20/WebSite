import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Share2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  participants: number;
  image: string;
  registrationOpen: boolean;
}

const Calendar = () => {
  const events: Event[] = [
    {
      id: '1',
      title: 'Logo Design Championship',
      date: new Date(2024, 2, 25),
      time: '14:00',
      participants: 32,
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80',
      registrationOpen: true
    },
    {
      id: '2',
      title: 'UI/UX Battle Royale',
      date: new Date(2024, 2, 28),
      time: '15:30',
      participants: 16,
      image: 'https://images.unsplash.com/photo-1613479205646-c0dc1ee8511f?auto=format&fit=crop&q=80',
      registrationOpen: true
    },
    {
      id: '3',
      title: 'Illustration Masters',
      date: new Date(2024, 3, 5),
      time: '13:00',
      participants: 24,
      image: 'https://images.unsplash.com/photo-1618004912476-29818d81ae2e?auto=format&fit=crop&q=80',
      registrationOpen: false
    }
  ];

  const shareEvent = (eventId: string) => {
    // Implement social media sharing
    console.log('Sharing event:', eventId);
  };

  const registerForEvent = (eventId: string) => {
    // Implement event registration
    console.log('Registering for event:', eventId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-calvera text-5xl mb-6">Upcoming Events</h1>
            <p className="text-xl text-secondary-light max-w-2xl mx-auto">
              Join our upcoming design competitions and showcase your talent
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Swiper
          modules={[Navigation, Grid]}
          navigation
          grid={{
            rows: 2,
            fill: 'row'
          }}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            320: {
              slidesPerView: 1,
              grid: { rows: 1 }
            },
            768: {
              slidesPerView: 2,
              grid: { rows: 2 }
            },
            1024: {
              slidesPerView: 3,
              grid: { rows: 2 }
            }
          }}
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden h-full"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="p-6">
                  <h3 className="font-calvera text-xl text-primary mb-4">{event.title}</h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <CalendarIcon className="h-5 w-5" />
                      <span>{format(event.date, 'MMMM d, yyyy')} at {event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="h-5 w-5" />
                      <span>{event.participants} Participants</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => registerForEvent(event.id)}
                      className={`btn-primary flex-1 mr-2 ${!event.registrationOpen && 'opacity-50 cursor-not-allowed'}`}
                      disabled={!event.registrationOpen}
                    >
                      {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                    </button>
                    <button
                      onClick={() => shareEvent(event.id)}
                      className="p-2 text-gray-600 hover:text-primary-light transition-colors"
                      title="Share Event"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Calendar;