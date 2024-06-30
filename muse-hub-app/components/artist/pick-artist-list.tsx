import { ArtistModel } from '@/models';
import { Button } from '@/components/shadcn-ui/button';
import { Card, CardFooter } from '@/components/shadcn-ui/card';
import { CheckIcon } from 'lucide-react';
import ArtistProfile from './artist-profile';

type Props = { artists: ArtistModel[]; onPick: (artist: ArtistModel) => void };
export function PickArtistList({ artists, onPick }: Props) {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Pick your profile</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <li key={artist.id}>
            <Card className="w-full">
              <ArtistProfile artist={artist} />
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
