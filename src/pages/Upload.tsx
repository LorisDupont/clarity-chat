
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCourses } from '@/context/CoursesContext';
import { useToast } from '@/hooks/use-toast';

const Upload: React.FC = () => {
  const { isTeacher } = useAuth();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [fileType, setFileType] = useState<'pdf' | 'video'>('pdf');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Redirect non-teachers away
  React.useEffect(() => {
    if (!isTeacher) {
      navigate('/');
    }
  }, [isTeacher, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !courseId || !file) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);

    // Simulate upload
    setTimeout(() => {
      toast({
        title: "Succès",
        description: "Document déposé avec succès",
      });
      setUploading(false);
      
      // Reset form
      setTitle('');
      setCourseId('');
      setFile(null);
      
      // Navigate back to media
      navigate('/media');
    }, 1500);
  };

  if (!isTeacher) {
    return null;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Déposer un document</h1>

      <Card>
        <CardHeader>
          <CardTitle>Nouveau document</CardTitle>
          <CardDescription>
            Déposez un document PDF ou une vidéo pour vos étudiants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du document</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Introduction à l'algèbre"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Cours associé</Label>
              <Select
                value={courseId}
                onValueChange={setCourseId}
              >
                <SelectTrigger id="course">
                  <SelectValue placeholder="Sélectionnez un cours" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type de document</Label>
              <Select
                value={fileType}
                onValueChange={(value) => setFileType(value as 'pdf' | 'video')}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">Document PDF</SelectItem>
                  <SelectItem value="video">Vidéo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Fichier</Label>
              <Input
                id="file"
                type="file"
                accept={fileType === 'pdf' ? '.pdf' : 'video/*'}
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/media')}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? 'Dépôt en cours...' : 'Déposer'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;
