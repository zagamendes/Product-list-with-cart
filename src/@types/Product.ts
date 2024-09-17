export interface Product {
  image: Image;
  name: string;
  category: string;
  price: number;
}

interface Image {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}
