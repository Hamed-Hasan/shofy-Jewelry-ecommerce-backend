const bcrypt = require('bcryptjs');
const admins = [
  {
    name:'Dorothy R. Brown',
    image: "https://i.ibb.co/wpjNftS/user-2.jpg",
    email: "dorothy@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "708-628-3122",
    role: "Admin",
    joiningData: new Date()
  },
  {
    name:'Alice B. Porter',
    image: "https://i.ibb.co/wpjNftS/user-2.jpg",
    email: "porter@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "708-628-3122",
    role: "Admin",
    joiningData: new Date()
  },
  {
    name:'Corrie H. Cates',
    image: "https://i.ibb.co/wpjNftS/user-2.jpg",
    email: "corrie@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "708-628-3122",
    role: "Admin",
    joiningData: new Date()
  },
  {
    name:'Shawn E. Palmer',
    image: "https://i.ibb.co/wpjNftS/user-2.jpg",
    email: "palmer@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "902-628-3122",
    role: "CEO",
    joiningData: new Date()
  },
  {
    name:'Stacey J. Meikle',
    image: "https://i.ibb.co/wpjNftS/user-2.jpg",
    email: "meikle@gmail.com",
    password: bcrypt.hashSync("123456"),
    phone: "102-628-3122",
    role: "Manager",
    joiningData: new Date()
  }
];

module.exports = admins;
