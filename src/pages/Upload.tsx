
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
import { FileText, Video, Upload as UploadIcon } from 'lucide-react';

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

    // Simulate upload with API call
    setTimeout(() => {
      toast({
        title: "Succès",
        description: "Document déposé avec succès",
        className: "bg-clarity-orange border-clarity-orange-dark",
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

      <Card className="border-t-4 border-t-clarity-orange">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadIcon className="text-clarity-orange" />
            Nouveau document
          </CardTitle>
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
                className="border-clarity-blue-light focus:border-clarity-blue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Cours associé</Label>
              <Select
                value={courseId}
                onValueChange={setCourseId}
              >
                <SelectTrigger id="course" className="border-clarity-blue-light">
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
                <SelectTrigger id="type" className="border-clarity-blue-light">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-clarity-blue" />
                      Document PDF
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-clarity-orange" />
                      Vidéo
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Fichier</Label>
              <div className="border-2 border-dashed border-clarity-orange-light rounded-md p-6 text-center hover:border-clarity-orange transition-colors">
                <Input
                  id="file"
                  type="file"
                  accept={fileType === 'pdf' ? '.pdf' : 'video/*'}
                  onChange={handleFileChange}
                  required
                  className="hidden"
                />
                <label htmlFor="file" className="cursor-pointer flex flex-col items-center">
                  <UploadIcon className="h-8 w-8 text-clarity-orange mb-2" />
                  <span className="text-sm text-muted-foreground">
                    {file ? file.name : `Cliquez pour sélectionner un ${fileType === 'pdf' ? 'PDF' : 'fichier vidéo'}`}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/media')}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={uploading}
                className="bg-clarity-orange hover:bg-clarity-orange-dark text-white"
              >
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
