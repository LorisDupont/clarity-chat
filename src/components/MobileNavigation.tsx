
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, BookOpen, User } from 'lucide-react';

const MobileNavigation: React.FC = () => {
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
