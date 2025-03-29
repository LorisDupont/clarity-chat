
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, BookOpen, User, Upload } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const MobileNavigation: React.FC = () => {
  const { isTeacher } = useAuth();

  return (
    <div className="mobile-nav flex justify-around items-center">
      <NavLink 
        to="/" 
        className={({isActive}) => 
          `flex flex-col items-center p-2 ${
            isActive ? 'text-clarity-blue' : 'text-muted-foreground'
          }`
        }
        end
      >
        <MessageSquare size={24} />
        <span className="text-xs mt-1">Messages</span>
      </NavLink>

      <NavLink 
        to="/media" 
        className={({isActive}) => 
          `flex flex-col items-center p-2 ${
            isActive ? 'text-clarity-blue' : 'text-muted-foreground'
          }`
        }
      >
        <BookOpen size={24} />
        <span className="text-xs mt-1">Médiathèque</span>
      </NavLink>

      {isTeacher && (
        <NavLink 
          to="/upload" 
          className={({isActive}) => 
            `flex flex-col items-center p-2 ${
              isActive ? 'text-clarity-orange' : 'text-muted-foreground'
            }`
          }
        >
          <Upload size={24} />
          <span className="text-xs mt-1">Ajouter</span>
        </NavLink>
      )}

      <NavLink 
        to="/profile" 
        className={({isActive}) => 
          `flex flex-col items-center p-2 ${
            isActive ? 'text-clarity-blue' : 'text-muted-foreground'
          }`
        }
      >
        <User size={24} />
        <span className="text-xs mt-1">Profil</span>
      </NavLink>
    </div>
  );
};

export default MobileNavigation;
