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
import { CheckIcon, FlagIcon, MusicIcon } from 'lucide-react';

type Props = { artists: ArtistModel[]; onPick: (artist: ArtistModel) => void };
export function PickArtistList({ artists, onPick }: Props) {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Pick you profile</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <li key={artist.id}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{artist.name}</CardTitle>
                <CardDescription>{artist.genre}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
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
                <Button className="w-full" onClick={() => onPick(artist)}>
                  <CheckIcon className="mr-2 h-4 w-4" /> This is my Profile
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
