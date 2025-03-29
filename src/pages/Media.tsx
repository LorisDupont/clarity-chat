
import React, { useState } from 'react';
import { useCourses } from '@/context/CoursesContext';
import MediaCard from '@/components/MediaCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Media: React.FC = () => {
  const { courses } = useCourses();
  const [selectedFile, setSelectedFile] = useState<{title: string, url: string} | null>(null);
  
  // Aggregate all materials from all courses
  const allMaterials = courses.flatMap(course => 
    course.materials.map(material => ({
      ...material,
      courseName: course.title
    }))
  );
  
  const pdfMaterials = allMaterials.filter(m => m.type === 'pdf');
  const videoMaterials = allMaterials.filter(m => m.type === 'video');
  
  const handleOpenFile = (title: string, url: string) => {
    setSelectedFile({ title, url });
  };
  
  const handleCloseFile = () => {
    setSelectedFile(null);
  };
  
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Médiathèque</h1>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tous ({allMaterials.length})</TabsTrigger>
          <TabsTrigger value="docs">Documents ({pdfMaterials.length})</TabsTrigger>
          <TabsTrigger value="videos">Vidéos ({videoMaterials.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allMaterials.map((material) => (
              <MediaCard
                key={material.id}
                title={material.title}
                type={material.type}
                date={new Date(material.date)}
                onClick={() => handleOpenFile(material.title, material.url)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="docs">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pdfMaterials.map((material) => (
              <MediaCard
                key={material.id}
                title={material.title}
                type={material.type}
                date={new Date(material.date)}
                onClick={() => handleOpenFile(material.title, material.url)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videoMaterials.map((material) => (
              <MediaCard
                key={material.id}
                title={material.title}
                type={material.type}
                date={new Date(material.date)}
                onClick={() => handleOpenFile(material.title, material.url)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* File viewer dialog */}
      <Dialog open={!!selectedFile} onOpenChange={handleCloseFile}>
        <DialogContent className="max-w-5xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>{selectedFile?.title}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 h-full">
            <iframe
              src={selectedFile?.url}
              title={selectedFile?.title}
              className="w-full h-full"
              style={{ minHeight: "500px" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Media;
