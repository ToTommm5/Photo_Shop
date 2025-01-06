import photos from "./data.json";

export const sample_users: any[] = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: "12345",
    address: "Toronto On",
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    password: "12345",
    address: "Shanghai",
    isAdmin: false,
  },
];

export const sample_photos = [
  {
    id: 1,
    name: "Photo 1",
    imgUrl: "/photos/photo1.jpg",
    size: "4*5",
    favorite: false,
    price: 8,
  },
];

export default photos;
