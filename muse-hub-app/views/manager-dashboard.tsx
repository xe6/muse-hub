import { ArtistModel } from '@/models';
import axiosInstance from '@/utils/axios-instance';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ArtistProfile from '@/components/artist/artist-profile';
import { SelectArtistsList } from '@/components/manager/select-artists-list';

export function ManagerDashboard() {
  const [managedArtists, setManagedArtists] = useState<ArtistModel[]>([]);
  const [unmanagedArtists, setUnmanagedArtists] = useState<ArtistModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const managedArtistsResponse =
          await axiosInstance.get('/artists/managed');
        setManagedArtists(managedArtistsResponse.data);

        if (
          !managedArtistsResponse.data ||
          managedArtistsResponse.data.length === 0
        ) {
          const unmanagedArtistsResponse =
            await axiosInstance.get('/artists/unmanaged');
          setUnmanagedArtists(unmanagedArtistsResponse.data);
        }
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleOnSaveSelection = async (artists: ArtistModel[]) => {
    try {
      const managedArtistsResponse = await axiosInstance.post(
        '/artists/managed',
        {
          artistIds: artists.map((a) => a.id),
        },
      );
      setManagedArtists(managedArtistsResponse.data);
      setUnmanagedArtists([]);
    } catch (error) {
      toast.error('Failed to save selection');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-6">Manager Dashboard</h1>

      {managedArtists.length === 0 && (
        <SelectArtistsList
          artists={unmanagedArtists}
          onSubmit={handleOnSaveSelection}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {managedArtists.length > 0 &&
          managedArtists.map((artist: ArtistModel) => (
            <ArtistProfile key={artist.id} artist={artist} />
          ))}
      </div>
    </div>
  );
}
