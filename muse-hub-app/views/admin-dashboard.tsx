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
} from '@/components/shadcn-ui/table';
import { ArtistModel } from '@/models';

import { CreateArtistDialog } from '@/components/admin/create-artist-dialog';
import { Input } from '@/components/shadcn-ui/input';
import ArtistProfile from '@/components/artist/artist-profile';

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
    setSelectedArtist(newArtist);
  };

  const handleRowClick = (artist: ArtistModel) => {
    setSelectedArtist(artist);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = artists.filter((artist) =>
      artist.name.toLowerCase().includes(query),
    );
    setFilteredArtists(filtered);
  };

  return loading ? (
    'Loading...'
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Admin Dashboard</h1>
      <div className="flex flex-row w-full max-w-6xl">
        <div className="flex-1 p-8 max-w-xlg">
          {' '}
          <CreateArtistDialog onAddArtist={handleAddArtist} />
          <div className="mt-4 relative flex items-center">
            {/* Could be debounced BE search here */}
            <Input
              type="search"
              placeholder="Search by name..."
              className="pl-10 w-full rounded-xlg"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="mt-4 overflow-auto">
            <Table className="min-w-full">
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
                      className="border-t border-gray-700 cursor-pointer"
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
                          className="text-blue-400 underline break-all max-w-xs"
                        >
                          {artist.spotifyUrl}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No artists found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="p-6 border border-gray-700 rounded-lg h-full">
            {selectedArtist ? (
              <ArtistProfile artist={selectedArtist} />
            ) : (
              <p className="text-center">Click on an artist to see details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
