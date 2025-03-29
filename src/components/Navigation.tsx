
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, BookOpen, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Navigation: React.FC = () => {
  const { user, logout, isTeacher } = useAuth();

  return (
    <div className="desktop-nav w-64">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-clarity-blue-dark">Clarity</h1>
          <div className="mt-1 text-sm text-muted-foreground">Votre assistant d'études</div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 mb-6">
          <div className="w-10 h-10 bg-clarity-blue rounded-full flex items-center justify-center text-white font-semibold">
            {user?.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs text-muted-foreground capitalize">{user?.role}</div>
          </div>
        </div>

        <nav className="space-y-1 px-2">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-clarity-blue text-white' 
                  : 'text-foreground hover:bg-muted'
              }`
            }
            end
          >
            <MessageSquare size={18} />
            <span>Messages</span>
          </NavLink>

          <NavLink 
            to="/media" 
            className={({isActive}) => 
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-clarity-blue text-white' 
                  : 'text-foreground hover:bg-muted'
              }`
            }
          >
            <BookOpen size={18} />
            <span>Médiathèque</span>
          </NavLink>

          <NavLink 
            to="/profile" 
            className={({isActive}) => 
              `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive 
                  ? 'bg-clarity-blue text-white' 
                  : 'text-foreground hover:bg-muted'
              }`
            }
          >
            <User size={18} />
            <span>Profil</span>
          </NavLink>
        </nav>

        {isTeacher && (
          <div className="mt-6 px-4">
            <NavLink 
              to="/upload"
              className={({isActive}) => 
                `flex items-center justify-center w-full px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-clarity-orange text-white' 
                    : 'bg-clarity-orange-light text-clarity-orange-dark hover:bg-clarity-orange hover:text-white'
                }`
              }
            >
              Déposer un document
            </NavLink>
          </div>
        )}

        <div className="mt-auto px-4 pb-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={logout}
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
