import { ArtistModel } from '@/models';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CheckIcon,
  FlagIcon,
  MusicIcon,
  SquareMousePointerIcon,
  BanIcon,
} from 'lucide-react';
import { useState } from 'react';

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

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center flex-grow">
          Pick artists to manage
        </h2>
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
              <CardHeader>
                <CardTitle>{artist.name}</CardTitle>
                <CardDescription>{artist.genre}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 flex-grow">
                <div className="flex items-center">
                  <FlagIcon className="mr-2 h-4 w-4" /> <p>{artist.country}</p>
                </div>
                <div className="flex items-center">
                  <MusicIcon className="mr-2 h-4 w-4" />
                  <a
                    href={artist.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Spotify
                  </a>
                </div>
              </CardContent>
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
  );
}
