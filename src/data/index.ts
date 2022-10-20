import { faker } from '@faker-js/faker';

export const users = {
  admin: {
    email: 'admin@gmail.com',
    username: 'Admin',
  },
  manager: {
    email: 'manager1@gmail.com',
    username: 'Aslam Naseer',
  },
  user: {
    email: 'ahmad1@gmail.com',
    username: 'Ahmad',
  },
};

export const Project = {
  title: 'Workload Accessories Ltd.',
  description: faker.lorem.paragraph(5),
  startDate: '01 Jan 2022',
  deadline: '01 July 2023',
  assignedTo: 'user1',
};

export const LoremIpsum =
  'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.';

export const shortVersion = 'Contrary to popular belief';

export const loremShort = faker.lorem.lines(1);
export const loremlong = faker.lorem.paragraph(5);

export const products = [...Array(45)].map((_, index) => ({
  dummyId: 123,
  _id: faker.datatype.uuid(),
  title: faker.commerce.productName(),
  price: faker.datatype.number({ min: 80, max: 160 }),
  rating: faker.datatype.number(120),
  description: faker.commerce.productAdjective(),
  isFavourite: faker.datatype.boolean(),
  image: `assets/prod${index + 1}.jpg`,
  type: 'product',
}));

export const teamMembers = [...Array(5)].map((_, ind) => ({
  _id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  image: `/Assets/user_${ind + 1}.jpg`,
  email: `${faker.name.fullName()}@gmail.com`,
}));

export const projFiles = [...Array(3)].map((_, ind) => ({
  _id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  image: `/Assets/file_${ind + 1}.svg`,
}));

// export const reviews = [...Array(4)].map((_, index) => ({
//   user: {
//     _id: faker.datatype.uuid(),
//     name: `${faker.name.findName()}`,
//     image: userImg,
//   },
//   comment: faker.lorem.paragraph(1),
//   rating: faker.datatype.number({ min: 0, max: 5 }),
//   createdAt: faker.date.recent(3, new Date()),
// }));

export const dropDownNumbers = [...Array(10)].map((_, index) => index + 1);
