import { ArtistModel } from '@/models';
import { Button } from '@/components/shadcn-ui/button';
import { Card, CardFooter } from '@/components/shadcn-ui/card';
import { CheckIcon, SquareMousePointerIcon, BanIcon } from 'lucide-react';
import { useState } from 'react';
import ArtistProfile from '../artist/artist-profile';

type Props = {
  artists: ArtistModel[];
  onSubmit: (artists: ArtistModel[]) => void;
};
export function SelectArtistsList({ artists, onSubmit }: Props) {
  const [selectedArtists, setSelectedArtists] = useState<Array<ArtistModel>>(
    [],
  );

  const appendSelection = (artist: ArtistModel) => {
    setSelectedArtists([...selectedArtists, artist]);
  };

  const removeSelection = (artist: ArtistModel) => {
    setSelectedArtists(selectedArtists.filter((a) => a.id !== artist.id));
  };

  return artists.length > 0 ? (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center flex-grow">
        Pick artists to manage
      </h2>
      <div className="flex justify-between items-center mb-6">
        <Button
          disabled={selectedArtists.length === 0}
          onClick={() => onSubmit(selectedArtists)}
        >
          Submit
        </Button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <li key={artist.id} className="flex flex-col">
            <Card className="w-full max-w-xs mx-auto flex flex-col flex-grow">
              <ArtistProfile artist={artist}></ArtistProfile>
              <CardFooter>
                {selectedArtists.includes(artist) ? (
                  <>
                    <Button className="w-full" disabled={true}>
                      <CheckIcon className="mr-2 h-4 w-4" /> Picked
                    </Button>
                    <Button
                      onClick={() => removeSelection(artist)}
                      className="ml-2"
                    >
                      <BanIcon className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => appendSelection(artist)}
                  >
                    <SquareMousePointerIcon className="mr-2 h-4 w-4" /> Pick
                  </Button>
                )}
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>No artists available now. Check back later</p>
  );
}
