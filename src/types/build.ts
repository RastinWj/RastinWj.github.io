export interface Build {
  id: string;
  name: {
    en: string;
    fa: string;
  };
  image: string;
  specs: {
    en: string;
    fa: string;
  };
  description: {
    en: string;
    fa: string;
  };
  price: number;
  features: {
    en: string[];
    fa: string[];
  };
}