import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from '@/components/shadcn-ui/dialog';
import { Input } from '../shadcn-ui/input';
import { Button } from '../shadcn-ui/button';
import { Label } from '../shadcn-ui/label';
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
      clearForm();
      toast.success(`${name} artist entry created successfully`);
    } catch (error) {
      toast.error(
        'Failed to create artist. Looks like this one already exists.',
      );
    }
  };

  const clearForm = () => {
    setName('');
    setGenre('');
    setCountry('');
    setSpotifyUrl('');
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
          <DialogClose asChild>
            <Button type="submit" className="w-full">
              Create Artist
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
