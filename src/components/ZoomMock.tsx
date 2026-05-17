import Image from "next/image";

type Tile = {
  kind: "image";
  src: string;
  alt: string;
  nameplate?: string;
} | {
  kind: "placeholder";
  text: React.ReactNode;
};

type Props = {
  title: string;
  hostTile: Tile;
  rightTiles: [Tile, Tile];
  controls?: React.ReactNode;
};

function TileEl({ tile }: { tile: Tile }) {
  if (tile.kind === "placeholder") {
    return <div className="tile placeholder">{tile.text}</div>;
  }
  return (
    <div className="tile">
      <Image src={tile.src} alt={tile.alt} fill sizes="(max-width: 880px) 100vw, 50vw" />
      {tile.nameplate && <div className="nameplate">{tile.nameplate}</div>}
    </div>
  );
}

export default function ZoomMock({ title, hostTile, rightTiles, controls }: Props) {
  return (
    <div className="zoom-mock">
      <div className="zoom-bar">
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
        <span className="title">{title}</span>
      </div>
      <div className="zoom-grid">
        <TileEl tile={hostTile} />
        <div className="right-col">
          <TileEl tile={rightTiles[0]} />
          <TileEl tile={rightTiles[1]} />
        </div>
      </div>
      <div className="controls">
        {controls ?? (
          <>
            <span>
              <span className="pip" /> Recording
            </span>
            <span>· Mic on</span>
            <span>· Video on</span>
          </>
        )}
      </div>
    </div>
  );
}
