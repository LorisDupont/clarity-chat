
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface MediaCardProps {
  title: string;
  type: 'pdf' | 'video';
  date: Date;
  onClick: () => void;
}

const MediaCard: React.FC<MediaCardProps> = ({ title, type, date, onClick }) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-all" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-clarity-blue-light p-2 rounded-md">
            <FileText className="text-clarity-blue" />
          </div>
          
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {type === 'pdf' ? 'Document PDF' : 'Vidéo'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {date.toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
