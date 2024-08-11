export interface Booking {
  id: string;
  date: Date;
  createdAt: Date;
  service: {
    id: string;
    name: string;
    barbershop: {
      id: string;
      name: string;
      imageUrl: string;
    };
  };
}
