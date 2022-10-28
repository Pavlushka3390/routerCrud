
const names = [
  "Иван Иванов",
  "Петр Петров",
  "Павел Павлов",
  "Ирина Иринова",
  "Галина Галинова",
  "АЛина Алинова",
];

const cities = [
  { city: "Москва", country: "Россия" },
  { city: "Калуга", country: "Россия" },
  { city: "Зеленоград", country: "Россия" },
  { city: "Даллас", country: "США" },
  { city: "Филадельфия", country: "США" },
  { city: "Бруклин", country: "США" }
];

const generateProfile = () => {
  const uuid = window.crypto.randomUUID();
  return {
    id: uuid,
    avatar: "https://i.pravatar.cc/150?img=65" + uuid,
    name: names[parseInt(Math.random() * 6)],
    place: cities[parseInt(Math.random() * 6)]
  };
};

export default generateProfile;