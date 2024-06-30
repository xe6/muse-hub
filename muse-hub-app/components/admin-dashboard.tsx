import axiosInstance from '@/utils/axios-instance';
import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';
import { ArtistModel } from '@/models';

import { CreateArtistDialog } from './create-artist-dialog';
import { Input } from './ui/input';

export function AdminDashboard() {
  const [artists, setArtists] = useState<ArtistModel[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<ArtistModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtist, setSelectedArtist] = useState<ArtistModel | null>(
    null,
  );

  useEffect(() => {
    axiosInstance.get('/artists').then((res) => {
      setArtists(res.data);
      setFilteredArtists(res.data);
      setLoading(false);
    });
  }, []);

  const handleAddArtist = (newArtist: ArtistModel) => {
    const updatedArtists = [...artists, newArtist];
    setArtists(updatedArtists);
    setFilteredArtists(updatedArtists);
  };

  const handleRowClick = (artist: ArtistModel) => {
    setSelectedArtist(artist);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = artists.filter(
      (artist) =>
        artist.name.toLowerCase().includes(query) ||
        artist.genre.toLowerCase().includes(query) ||
        artist.country.toLowerCase().includes(query) ||
        artist.spotifyUrl.toLowerCase().includes(query),
    );
    setFilteredArtists(filtered);
  };

  return loading ? (
    'Loading...'
  ) : (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="container mx-auto p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-6">
            Admin Dashboard
          </h1>
          <CreateArtistDialog onAddArtist={handleAddArtist} />
          <div className="mt-4 relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="w-[800px] mt-4 overflow-auto">
            <Table className="min-w-full border border-zinc-700">
              <TableCaption>A list of all artists</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Spotify URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArtists.length > 0 ? (
                  filteredArtists.map((artist) => (
                    <TableRow
                      key={artist.id}
                      className="border-t border-gray-700"
                      onClick={() => handleRowClick(artist)}
                    >
                      <TableCell className="font-medium">{artist.id}</TableCell>
                      <TableCell>{artist.name}</TableCell>
                      <TableCell>{artist.genre}</TableCell>
                      <TableCell>{artist.country}</TableCell>
                      <TableCell>
                        <a
                          href={artist.spotifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline"
                        >
                          {artist.spotifyUrl}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-center">
                      No artists found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div
            className={`mt-6 p-6 border border-gray-700 rounded-lg w-[800px] h-[300px] transition-height duration-300 ease-in-out`}
          >
            {selectedArtist ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Artist Details</h2>
                <p>
                  <strong>ID:</strong> {selectedArtist.id}
                </p>
                <p>
                  <strong>Name:</strong> {selectedArtist.name}
                </p>
                <p>
                  <strong>Genre:</strong> {selectedArtist.genre}
                </p>
                <p>
                  <strong>Country:</strong> {selectedArtist.country}
                </p>
                <p>
                  <strong>Spotify URL:</strong>{' '}
                  <a
                    href={selectedArtist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    {selectedArtist.spotifyUrl}
                  </a>
                </p>
                {selectedArtist.userId && (
                  <p>
                    <strong>Artist User ID:</strong> {selectedArtist.userId}
                  </p>
                )}
                {selectedArtist.managerId && (
                  <p>
                    <strong>Manager User ID:</strong> {selectedArtist.managerId}
                  </p>
                )}
              </>
            ) : (
              <p className="text-center">Click on an artist to see details</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
