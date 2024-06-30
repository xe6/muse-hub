import { ArtistModel } from '@/models';
import axiosInstance from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ArtistProfile from '@/components/artist/artist-profile';
import { PickArtistList } from '@/components/artist/pick-artist-list';

export function ArtistDashboard() {
  const [myProfile, setMyProfile] = useState<ArtistModel | null>(null);
  const [unassignedArtists, setUnassignedArtists] = useState<ArtistModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axiosInstance.get('/artists/my-profile');
        setMyProfile(profileResponse.data);

        if (!profileResponse.data) {
          const unassignedArtistsResponse = await axiosInstance.get(
            '/artists/unassigned',
          );
          setUnassignedArtists(unassignedArtistsResponse.data);
        }
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleArtistPick = (artist: ArtistModel) => {
    axiosInstance
      .post('/artists/my-profile', { artistId: artist.id })
      .then(() => setMyProfile(artist));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Aritst Dashboard</h1>
      {myProfile ? (
        <ArtistProfile artist={myProfile} />
      ) : (
        <PickArtistList artists={unassignedArtists} onPick={handleArtistPick} />
      )}
    </div>
  );
}
