type BrandType = "Barbie" | "Pullip" | "Blythe" | "Iplehouse" | "Other";
type OutfitType = "full" | "only makeup" | "wig and makeup" | "none";
type DollType = "OOAK" | "BJD" | "antique" | "play" | "collection";

export interface Doll {
  id: number;
  name: string;
  rare: boolean;
  brand: BrandType;
  year: number;
  type: DollType;
  outfit: OutfitType;
  hight: number;
  img: string;
}

export type SliderValues = (string | number)[];

export interface FilterList {
  search: string | null;
  sort: string | null;
  brand: number[] | undefined;
  year: number[];
  type: number | null;
  outfit: number[] | undefined;
  height: number[];
  rare: boolean;
}
