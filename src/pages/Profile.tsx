
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout, isTeacher } = useAuth();

  if (!user) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mon profil</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Vos informations de compte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-clarity-blue-light rounded-full flex items-center justify-center mb-4">
                <User size={40} className="text-clarity-blue-dark" />
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-muted-foreground capitalize">{user.role}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">ID</label>
                <p>{user.id}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p>{user.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Rôle</label>
                <p className="capitalize">{user.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Gérer votre compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isTeacher && (
                <Button variant="outline" className="w-full">
                  Gérer mes cours
                </Button>
              )}
              
              <Button variant="outline" className="w-full" onClick={logout}>
                Déconnexion
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>À propos de Clarity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Clarity est une application d'aide aux études qui permet aux étudiants
                de poser des questions sur leurs cours et d'accéder à des ressources
                pédagogiques partagées par leurs professeurs.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Version 1.0.0
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
