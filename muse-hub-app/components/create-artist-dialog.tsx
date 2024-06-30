import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import axiosInstance from '@/utils/axios-instance';
import { toast } from 'react-toastify';
import { ArtistModel } from '@/models';

export function CreateArtistDialog({
  onAddArtist,
}: {
  onAddArtist: (artist: ArtistModel) => void;
}) {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [country, setCountry] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/artists', {
        name,
        genre,
        country,
        spotifyUrl,
      });
      onAddArtist(response.data);
      toast.success(`${name} artist entry created successfully`);
    } catch (error) {
      toast.error('Failed to create artist');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Artist</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create Artist</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Artist Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="genre">Genre</Label>
            <Input
              id="genre"
              type="text"
              placeholder="Genre"
              required
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              placeholder="Country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="spotifyUrl">Spotify URL</Label>
            <Input
              id="spotifyUrl"
              type="url"
              placeholder="Spotify URL"
              required
              value={spotifyUrl}
              onChange={(e) => setSpotifyUrl(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Create Artist
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
