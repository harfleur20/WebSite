import React, { useState } from 'react';
import { Star, Award, ThumbsUp } from 'lucide-react';

interface VotingProps {
  matchId: string;
  contestant1: string;
  contestant2: string;
  isJury?: boolean;
}

const VotingInterface: React.FC<VotingProps> = ({
  matchId,
  contestant1,
  contestant2,
  isJury = false
}) => {
  const [selectedContestant, setSelectedContestant] = useState<string>('');
  const [juryScores, setJuryScores] = useState({
    clarity: 0,
    creativity: 0,
    technique: 0
  });

  const handlePublicVote = async () => {
    // Implement CinetPay integration
    const paymentData = {
      amount: 100, // 100 FCFA
      currency: 'XOF',
      description: `Vote for ${selectedContestant}`,
      return_url: window.location.href,
    };

    try {
      // Initialize CinetPay payment
      console.log('Processing payment:', paymentData);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const handleJuryVote = async () => {
    const totalScore = Object.values(juryScores).reduce((a, b) => a + b, 0);
    const average = totalScore / 3;

    try {
      // Submit jury vote
      console.log('Submitting jury vote:', {
        matchId,
        scores: juryScores,
        average
      });
    } catch (error) {
      console.error('Failed to submit jury vote:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="font-calvera text-2xl text-primary mb-6">
        {isJury ? 'Jury Voting Panel' : 'Public Voting'}
      </h3>

      {isJury ? (
        <div className="space-y-6">
          {/* Jury Scoring Interface */}
          {['clarity', 'creativity', 'technique'].map((criterion) => (
            <div key={criterion} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {criterion} (0-5)
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() => setJuryScores(prev => ({
                      ...prev,
                      [criterion]: score
                    }))}
                    className={`p-2 rounded-full ${
                      juryScores[criterion as keyof typeof juryScores] >= score
                        ? 'bg-primary-light text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Star className="h-6 w-6" />
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleJuryVote}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <Award className="h-5 w-5" />
            <span>Submit Scores</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Public Voting Interface */}
          <div className="grid grid-cols-2 gap-4">
            {[contestant1, contestant2].map((contestant) => (
              <button
                key={contestant}
                onClick={() => setSelectedContestant(contestant)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedContestant === contestant
                    ? 'border-primary-light bg-primary-light/10'
                    : 'border-gray-200 hover:border-primary-light/50'
                }`}
              >
                <h4 className="font-calvera text-lg mb-2">{contestant}</h4>
                <p className="text-sm text-gray-600">Click to vote</p>
              </button>
            ))}
          </div>

          <button
            onClick={handlePublicVote}
            disabled={!selectedContestant}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <ThumbsUp className="h-5 w-5" />
            <span>Vote (100 FCFA)</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default VotingInterface;