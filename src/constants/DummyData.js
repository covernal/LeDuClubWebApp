module.exports = {
  BOOKS: [
    {
      id: 1,
      image: "/assets/images/1.jpg",
      recommendAges: [3, 5],
      title: "That's Not My Snowman1",
      pages: 24,
      reviews: 5,
      status: true
    }, {
      id: 2,
      image: "/assets/images/2.jpg",
      recommendAges: [7, 15],
      title: "That's Not My Snowman2",
      pages: 40,
      reviews: 4.5,
      status: true
    }, {
      id: 3,
      image: "/assets/images/3.jpg",
      recommendAges: [13, 25],
      title: "That's Not My Snowman3",
      pages: 130,
      reviews: 3.5,
      status: false
    }, {
      id: 4,
      image: "/assets/images/4.jpg",
      recommendAges: [33, 50],
      title: "That's Not My Snowman4",
      pages: 214,
      reviews: 2,
      status: true
    }
  ],

  REQUESTS: [
    {
      id: 1,
      bookId: 1,
      postmanId: '',
      image: "/assets/images/3.jpg",
      title: "That's Not My Snowman - 3",
      ISBN: "XXXXXXX",
      address: "XXXXXXXXXXXXXX",
      store: "青岛",
      type: "取书"
    },
    {
      id: 2,
      bookId: 2,
      postmanId: '',
      image: "/assets/images/4.jpg",
      title: "That's Not My Snowman - 4",
      ISBN: "XXXXXXXXXXXXXX",
      address: "XXXXXXXXXXXXXXXXXX",
      store: "青岛",
      type: "取书"
    }
  ],

  MEMBERS: [
    {
      
    }
  ]
};