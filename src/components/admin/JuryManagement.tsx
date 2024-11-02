import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Award, Trash2, Plus, UserCircle, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';

const jurySchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  specialization: z.string().min(2, 'La spécialisation est requise'),
  experience: z.number().min(0, 'L\'expérience doit être un nombre positif')
});

type JuryForm = z.infer<typeof jurySchema>;

interface JuryMember {
  id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
}

const JuryManagement = () => {
  const [juryMembers, setJuryMembers] = useState<JuryMember[]>([]);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<JuryForm>({
    resolver: zodResolver(jurySchema),
    defaultValues: {
      experience: 0
    }
  });

  const onSubmit = async (data: JuryForm) => {
    try {
      // Simuler un appel API pour créer un compte jury
      const newJury: JuryMember = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        specialization: data.specialization,
        experience: data.experience
      };
      
      setJuryMembers(prev => [...prev, newJury]);
      toast.success('Membre du jury ajouté avec succès');
      reset();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du membre du jury');
    }
  };

  const removeJuryMember = (juryId: string) => {
    setJuryMembers(prev => prev.filter(jury => jury.id !== juryId));
    toast.success('Membre du jury supprimé');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="font-calvera text-2xl text-primary mb-6">Gestion des Jurys</h2>

      {/* Add Jury Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                {...register('name')}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                placeholder="Entrez le nom du jury"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                {...register('email')}
                type="email"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                placeholder="Entrez l'adresse email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                {...register('password')}
                type="password"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                placeholder="Créer un mot de passe"
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Spécialisation
            </label>
            <input
              {...register('specialization')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
              placeholder="ex: Logo Design, UI/UX"
            />
            {errors.specialization && (
              <p className="mt-1 text-sm text-red-600">{errors.specialization.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Années d'expérience
            </label>
            <input
              {...register('experience', { valueAsNumber: true })}
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
              placeholder="Entrez les années d'expérience"
              min="0"
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 btn-primary flex items-center justify-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>{isSubmitting ? 'Ajout en cours...' : 'Ajouter un Jury'}</span>
        </button>
      </form>

      {/* Jury List */}
      <div className="space-y-4">
        {juryMembers.length === 0 ? (
          <p className="text-center text-gray-500 py-4">Aucun membre du jury ajouté</p>
        ) : (
          juryMembers.map((jury) => (
            <div
              key={jury.id}
              className="flex items-center justify-between border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary-light/10 p-2 rounded-full">
                  <Award className="h-6 w-6 text-primary-light" />
                </div>
                <div>
                  <h3 className="font-medium">{jury.name}</h3>
                  <p className="text-sm text-gray-600">{jury.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">{jury.specialization}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{jury.experience} ans d'expérience</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeJuryMember(jury.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                title="Supprimer le jury"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JuryManagement;