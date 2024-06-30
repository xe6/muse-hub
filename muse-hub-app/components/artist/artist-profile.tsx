import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Separator } from '@/components/shadcn-ui/separator';
import { ArtistModel } from '@/models';

type Props = { artist: ArtistModel };
export default function ArtistProfile({ artist }: Props) {
  return (
    <Card className="w-80 mx-auto mb-6">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {artist.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-md">
        <div className="grid gap-3">
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">ID</span>
              <span>{artist.id}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Genre</span>
              <span>{artist.genre}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Country</span>
              <span>{artist.country}</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <strong>Spotify URL:</strong>{' '}
          <a
            href={artist.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {artist.spotifyUrl}
          </a>
          <Separator className="my-4" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Manager ID</span>
              <span>{artist.managerId || 'N/A'}</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
