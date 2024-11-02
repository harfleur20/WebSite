import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Versus } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface EvaluationCriteria {
  id: string;
  name: string;
  description: string;
  score: number;
}

const MatchEvaluation = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [criteria, setCriteria] = useState<EvaluationCriteria[]>([
    {
      id: 'creativity',
      name: 'Créativité',
      description: 'Originalité et innovation dans le design',
      score: 0
    },
    {
      id: 'technique',
      name: 'Technique',
      description: 'Qualité d\'exécution et maîtrise des outils',
      score: 0
    },
    {
      id: 'presentation',
      name: 'Présentation',
      description: 'Clarté et impact visuel du projet',
      score: 0
    }
  ]);

  // Données de démonstration pour le match
  const matchData = {
    id: matchId,
    competition: 'Logo Design Championship 2024',
    round: 'Quart de finale',
    timeRemaining: '45:00',
    contestant1: {
      name: 'Sarah Johnson',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      project: {
        title: 'Modern Brand Identity',
        description: 'Une approche minimaliste et moderne du design de marque',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80'
      }
    },
    contestant2: {
      name: 'Michael Chen',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
      project: {
        title: 'Minimalist Logo Design',
        description: 'Un design épuré qui capture l\'essence de la marque',
        image: 'https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?auto=format&fit=crop&q=80'
      }
    }
  };

  const handleScoreChange = (criteriaId: string, score: number) => {
    setCriteria(prev =>
      prev.map(c =>
        c.id === criteriaId ? { ...c, score } : c
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (criteria.some(c => c.score === 0)) {
      toast.error('Veuillez noter tous les critères');
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Évaluation soumise avec succès');
      navigate('/jury');
    } catch (error) {
      toast.error('Erreur lors de la soumission de l\'évaluation');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/jury')}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Retour au tableau de bord</span>
      </button>

      {/* En-tête du match */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="text-center mb-6">
          <h2 className="font-calvera text-2xl text-primary mb-2">{matchData.competition}</h2>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span>{matchData.round}</span>
            <span>•</span>
            <span>Temps restant: {matchData.timeRemaining}</span>
          </div>
        </div>

        {/* Affichage VS des contestants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Ligne VS au milieu */}
          <div className="hidden md:flex absolute inset-y-0 left-1/2 transform -translate-x-1/2 items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-white font-bold">
              VS
            </div>
          </div>

          {/* Contestant 1 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={matchData.contestant1.photo}
                alt={matchData.contestant1.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-lg">{matchData.contestant1.name}</h3>
                <p className="text-gray-600">Contestant #1</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={matchData.contestant1.project.image}
                alt={matchData.contestant1.project.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
                <h4 className="text-white font-medium">{matchData.contestant1.project.title}</h4>
                <p className="text-white/80 text-sm">{matchData.contestant1.project.description}</p>
              </div>
            </div>
          </div>

          {/* Contestant 2 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={matchData.contestant2.photo}
                alt={matchData.contestant2.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-lg">{matchData.contestant2.name}</h3>
                <p className="text-gray-600">Contestant #2</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={matchData.contestant2.project.image}
                alt={matchData.contestant2.project.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
                <h4 className="text-white font-medium">{matchData.contestant2.project.title}</h4>
                <p className="text-white/80 text-sm">{matchData.contestant2.project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire d'évaluation */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-calvera text-xl text-primary mb-6">Critères d'Évaluation</h3>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{criterion.name}</h4>
                    <p className="text-sm text-gray-600">{criterion.description}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => handleScoreChange(criterion.id, score)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            score <= criterion.score
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commentaire (optionnel)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
              placeholder="Ajoutez un commentaire sur votre évaluation..."
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Soumettre l'Évaluation
          </button>
        </form>
      </div>
    </div>
  );
};

export default MatchEvaluation;