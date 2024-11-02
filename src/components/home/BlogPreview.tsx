import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: Date;
  readTime: number;
  image: string;
  category: string;
}

const BlogPreview = () => {
  // Données de démonstration pour les articles
  const recentPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Maîtriser la Théorie des Couleurs en Design Graphique',
      excerpt: 'Apprenez les principes fondamentaux de la théorie des couleurs et comment les appliquer efficacement dans vos designs.',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'
      },
      date: new Date(2024, 2, 15),
      readTime: 5,
      image: 'https://images.unsplash.com/photo-1505816014357-96b5ff457e9a?auto=format&fit=crop&q=80',
      category: 'Design Tips'
    },
    {
      id: '2',
      title: 'Compétition Printemps 2024: Ce qui vous attend',
      excerpt: 'Préparez-vous pour notre plus grande compétition! Voici tout ce que vous devez savoir sur l\'événement à venir.',
      author: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
      },
      date: new Date(2024, 2, 18),
      readTime: 3,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
      category: 'Actualités'
    },
    {
      id: '3',
      title: 'De Participant à Professionnel: Une Success Story',
      excerpt: 'Comment la victoire à la Coupe des Créatifs a lancé ma carrière en design graphique.',
      author: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80'
      },
      date: new Date(2024, 2, 20),
      readTime: 4,
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80',
      category: 'Success Stories'
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="font-calvera text-4xl text-primary mb-4">Derniers Articles</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez nos derniers articles, conseils et actualités du monde du design
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.image})` }}
            />
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-primary-light/10 text-primary-light rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
              
              <h3 className="font-calvera text-xl text-primary mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600">{post.author.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>
              </div>

              <Link
                to={`/blog/${post.id}`}
                className="mt-4 btn-primary flex items-center justify-center space-x-2"
              >
                <span>Lire Plus</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/blog"
          className="btn-secondary inline-flex items-center space-x-2"
        >
          <span>Voir Tous les Articles</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default BlogPreview;