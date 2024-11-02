import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Globe, DollarSign, Mail, Bell, Shield, Database, Trophy } from 'lucide-react';
import { toast } from 'react-hot-toast';
import AdminHeader from '../../components/admin/AdminHeader';

const settingsSchema = z.object({
  siteName: z.string().min(2, 'Site name must be at least 2 characters'),
  siteUrl: z.string().url('Must be a valid URL'),
  votingFee: z.number().min(100, 'Minimum voting fee is 100 FCFA'),
  emailNotifications: z.boolean(),
  autoApproveSubmissions: z.boolean(),
  maintenanceMode: z.boolean(),
  backupFrequency: z.enum(['daily', 'weekly', 'monthly']),
  maxParticipants: z.number().min(8, 'Minimum 8 participants required'),
  minPrizePool: z.number().min(10000, 'Minimum prize pool is 10,000 FCFA')
});

type SettingsForm = z.infer<typeof settingsSchema>;

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: 'Coupe des Créatifs',
      siteUrl: 'https://coupedescréatifs.com',
      votingFee: 100,
      emailNotifications: true,
      autoApproveSubmissions: false,
      maintenanceMode: false,
      backupFrequency: 'daily',
      maxParticipants: 64,
      minPrizePool: 500000
    }
  });

  const tabs = [
    { id: 'general', label: 'Général', icon: Globe },
    { id: 'competition', label: 'Compétition', icon: Trophy },
    { id: 'payment', label: 'Paiement', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'backup', label: 'Sauvegarde', icon: Database }
  ];

  const onSubmit = async (data: SettingsForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings updated:', data);
      toast.success('Paramètres mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour des paramètres');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AdminHeader 
        title="Paramètres" 
        subtitle="Configurer les paramètres du système"
        showSettings={false}
      />

      {/* Settings Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 flex items-center space-x-2 border-b-2 font-medium text-sm whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-primary-light text-primary-light'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du Site
                </label>
                <input
                  {...register('siteName')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                />
                {errors.siteName && (
                  <p className="mt-1 text-sm text-red-600">{errors.siteName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL du Site
                </label>
                <input
                  {...register('siteUrl')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                />
                {errors.siteUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.siteUrl.message}</p>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('maintenanceMode')}
                    className="rounded text-primary-light focus:ring-primary-light"
                  />
                  <span className="text-sm font-medium text-gray-700">Mode Maintenance</span>
                </label>
              </div>
            </div>
          )}

          {/* Competition Settings */}
          {activeTab === 'competition' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Maximum de Participants
                </label>
                <input
                  type="number"
                  {...register('maxParticipants', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                />
                {errors.maxParticipants && (
                  <p className="mt-1 text-sm text-red-600">{errors.maxParticipants.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix Minimum (FCFA)
                </label>
                <input
                  type="number"
                  {...register('minPrizePool', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                />
                {errors.minPrizePool && (
                  <p className="mt-1 text-sm text-red-600">{errors.minPrizePool.message}</p>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('autoApproveSubmissions')}
                    className="rounded text-primary-light focus:ring-primary-light"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Approuver automatiquement les soumissions
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frais de Vote (FCFA)
                </label>
                <input
                  type="number"
                  {...register('votingFee', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                />
                {errors.votingFee && (
                  <p className="mt-1 text-sm text-red-600">{errors.votingFee.message}</p>
                )}
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800 mb-2">Configuration CinetPay</h3>
                <p className="text-sm text-yellow-600">
                  Les paramètres de paiement sont gérés via le tableau de bord CinetPay.
                </p>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('emailNotifications')}
                    className="rounded text-primary-light focus:ring-primary-light"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Activer les notifications par email
                  </span>
                </label>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="text-sm font-medium text-gray-800">Types de Notifications</h3>
                <div className="space-y-2">
                  {['Nouvelles soumissions', 'Votes reçus', 'Résultats', 'Rapports'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded text-primary-light focus:ring-primary-light"
                      />
                      <span className="text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="text-sm font-medium text-gray-800">Sécurité du Compte</h3>
                <div className="space-y-2">
                  <button
                    type="button"
                    className="btn-secondary w-full justify-center"
                  >
                    Changer le mot de passe
                  </button>
                  <button
                    type="button"
                    className="btn-secondary w-full justify-center"
                  >
                    Configurer l'authentification à deux facteurs
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="text-sm font-medium text-gray-800">Journal d'Activité</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Dernière connexion: Aujourd'hui à 10:30</p>
                  <p>Dernier changement de paramètres: Hier à 15:45</p>
                  <button
                    type="button"
                    className="text-primary-light hover:text-primary"
                  >
                    Voir l'historique complet
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Backup Settings */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fréquence de Sauvegarde
                </label>
                <select
                  {...register('backupFrequency')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
                >
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <h3 className="text-sm font-medium text-gray-800">Dernières Sauvegardes</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Dernière sauvegarde: 2024-03-15 10:30</p>
                  <p>Taille: 256 MB</p>
                  <button
                    type="button"
                    className="btn-secondary w-full justify-center mt-4"
                  >
                    Lancer une sauvegarde manuelle
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>{isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;