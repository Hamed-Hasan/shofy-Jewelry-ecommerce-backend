const bcrypt = require('bcryptjs');

const users = [
  {
    _id: "645f7e130ba9d3c3ea50555a",
    email: "paul@gmail.com",
    role: "user",
    name: "Paul R. Bruns",
    status: "active",
    password:bcrypt.hashSync('123456'),
    reviews: [
      "6461c46a9154b65448da799f",
      "6461c5b99154b65448da7a38",
      "6461c5c19154b65448da7a43",
      "6463026f9eb7e8a0fc8b3457",
      "646893f7d1f8b988a8f7be68",
      "646895be5058260f55efbfa6"
    ]
  },
  {
    _id: "6461f490aae01ae021285ecb",
    email: "linda@gmail.com",
    role: "user",
    name: "Linda",
    status: "active",
    password:bcrypt.hashSync('123456'),
    reviews: [
      "6461f6098a8552beef539317",
      "64620cef8a8552beef5394ba",
      "64620d3b8a8552beef5394ca",
      "64620d528a8552beef5394da"
    ]
  },
  {
    _id: "6465ac4d3322f9425ac8f444",
    email: "james@gmail.com",
    password: "223366",
    role: "user",
    name: "James J. Allen",
    status: "active",
    password:bcrypt.hashSync('223355'),
    reviews: [
      "646851914edd5c5271092b1d",
      "646851be4edd5c5271092be3",
      "646851df4edd5c5271092caa",
      "646861ee4edd5c5271092f1d",
      "6468630e4edd5c527109310d",
      "6468633f4edd5c5271093118",
      "6468636b4edd5c527109318f",
      "646863a14edd5c5271093199"
    ]
  }
]

module.exports = users;