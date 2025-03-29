
import React, { useState } from 'react';
import { useCourses } from '@/context/CoursesContext';
import MediaCard from '@/components/MediaCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Media: React.FC = () => {
  const { courses } = useCourses();
  const { isTeacher } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<{title: string, url: string, type: 'pdf' | 'video'} | null>(null);
  
  // Aggregate all materials from all courses
  const allMaterials = courses.flatMap(course => 
    course.materials.map(material => ({
      ...material,
      courseName: course.title
    }))
  );

  const pdfMaterials = allMaterials.filter(m => m.type === 'pdf');
  const videoMaterials = allMaterials.filter(m => m.type === 'video');
  
  const handleOpenFile = (title: string, url: string, type: 'pdf' | 'video') => {
    setSelectedFile({ title, url, type });
  };
  
  const handleCloseFile = () => {
    setSelectedFile(null);
  };

  const handleFileError = () => {
    toast({
      title: "Erreur",
      description: "Échec de chargement du document. Veuillez réessayer.",
      variant: "destructive",
    });
  };
  
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Médiathèque</h1>
        {isTeacher && (
          <Button 
            onClick={() => navigate('/upload')}
            className="bg-clarity-orange hover:bg-clarity-orange-dark text-white"
          >
            <Upload className="mr-2 h-4 w-4" />
            Ajouter un document
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="all" className="border-b border-clarity-orange-light">
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-clarity-orange data-[state=active]:text-white">
            Tous ({allMaterials.length})
          </TabsTrigger>
          <TabsTrigger value="docs" className="data-[state=active]:bg-clarity-orange data-[state=active]:text-white">
            Documents ({pdfMaterials.length})
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-clarity-orange data-[state=active]:text-white">
            Vidéos ({videoMaterials.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allMaterials.map((material) => (
              <MediaCard
                key={`${material.courseName}-${material.id}`}
                title={material.title}
                type={material.type}
                date={new Date(material.date)}
                onClick={() => handleOpenFile(material.title, material.url, material.type)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="docs">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pdfMaterials.map((material) => (
              <MediaCard
                key={`${material.courseName}-${material.id}`}
                title={material.title}
                type={material.type}
                date={new Date(material.date)}
                onClick={() => handleOpenFile(material.title, material.url, material.type)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videoMaterials.map((material) => (
              <MediaCard
                key={`${material.courseName}-${material.id}`}
                title={material.title}
                type={material.type}
                date={new Date(material.date)}
                onClick={() => handleOpenFile(material.title, material.url, material.type)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* File viewer dialog */}
      <Dialog open={!!selectedFile} onOpenChange={handleCloseFile}>
        <DialogContent className="max-w-5xl h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-clarity-orange">{selectedFile?.title}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-full">
            {selectedFile?.type === 'pdf' ? (
              <object
                data={selectedFile.url}
                type="application/pdf"
                className="w-full h-full"
                style={{ minHeight: "500px" }}
                onError={handleFileError}
              >
                <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-6 rounded">
                  <p className="text-red-500 font-medium mb-2">Erreur de chargement du document PDF</p>
                  <p className="text-sm text-gray-600 mb-4">Le navigateur ne peut pas afficher ce PDF directement.</p>
                  <Button 
                    onClick={() => window.open(selectedFile.url, '_blank')}
                    className="bg-clarity-orange hover:bg-clarity-orange-dark text-white"
                  >
                    Ouvrir dans un nouvel onglet
                  </Button>
                </div>
              </object>
            ) : (
              <iframe
                src={selectedFile?.url}
                title={selectedFile?.title}
                className="w-full h-full"
                style={{ minHeight: "500px" }}
                onError={handleFileError}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Media;
