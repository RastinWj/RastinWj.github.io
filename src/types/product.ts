export interface Product {
  id: string;
  name: {
    en: string;
    fa: string;
  };
  image: string;
  shortDescription: {
    en: string;
    fa: string;
  };
  price: number;
  category: {
    en: string;
    fa: string;
  };
  specs: {
    processor: string;
    gpu: string;
    ram: string;
    storage: string;
  };
}