export interface IService {
  title: string;
  description: string;
  price: number;
  duration: number; // in minutes
  doctor: string; // Reference to Doctor's _id
}
