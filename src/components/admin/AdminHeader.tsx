import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  showSettings?: boolean;
}

const AdminHeader = ({ title, subtitle, showSettings = true }: AdminHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Retour"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="font-calvera text-3xl text-primary">{title}</h1>
        </div>
        {showSettings && (
          <Link
            to="/admin/settings"
            className="btn-secondary flex items-center space-x-2"
          >
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </Link>
        )}
      </div>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default AdminHeader;