import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Save, X } from 'lucide-react';
import { Movie } from './MovieCard';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
  onSave: (movieId: number, rating: number, notes: string) => void;
}

export const ReviewModal = ({ isOpen, onClose, movie, onSave }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    if (movie) {
      setRating(movie.personalRating || 0);
      setNotes(movie.personalNotes || '');
    }
  }, [movie]);

  const handleSave = () => {
    if (movie) {
      onSave(movie.id, rating, notes);
      onClose();
    }
  };

  const handleClose = () => {
    setRating(0);
    setNotes('');
    setHoveredRating(0);
    onClose();
  };

  if (!movie) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-cyber-dark border-cyber-light max-w-md">
        <DialogHeader>
          <DialogTitle className="text-neon flex items-center">
            <Star className="mr-2" size={20} />
            Review: {movie.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Movie Info */}
          <div className="flex items-center space-x-4">
            <img 
              src={movie.poster}
              alt={movie.title}
              className="w-16 h-24 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{movie.title}</h3>
              <p className="text-sm text-muted-foreground">{movie.year} • {movie.language}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star size={12} className="mr-1 text-yellow-400" />
                {movie.rating} • {movie.duration}
              </div>
            </div>
          </div>

          {/* Personal Rating */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">My Rating</Label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    className={`cursor-pointer transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-400 hover:text-yellow-300'
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                {rating > 0 ? `${rating}/5 stars` : 'No rating'}
              </span>
            </div>
          </div>

          {/* Personal Notes */}
          <div className="space-y-3">
            <Label htmlFor="notes" className="text-foreground font-medium">
              My Review & Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="What did you think about this movie? Share your thoughts, favorite scenes, or anything else..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-cyber-grey border-cyber-light min-h-[120px] text-foreground placeholder:text-muted-foreground resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {notes.length}/500 characters
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button
            variant="ghost"
            onClick={handleClose}
            className="hover:bg-cyber-grey"
          >
            <X size={16} className="mr-1" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="btn-neon"
            disabled={rating === 0 && notes.trim() === ''}
          >
            <Save size={16} className="mr-1" />
            Save Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};