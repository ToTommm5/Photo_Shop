import { PanierItem } from './PanierItem';

export class Panier {
  items: PanierItem[] = [];
  totalPrice: number = 0;
  totalCount: number = 0;
}
