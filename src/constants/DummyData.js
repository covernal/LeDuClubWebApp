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
      reviews: 4.5,
      pages: 24,
      datetime: "2016-02-26 14:00",
      type: "取书"
    }, {
      id: 2,
      bookId: 2,
      postmanId: '',
      image: "/assets/images/4.jpg",
      title: "That's Not My Snowman - 4",
      ISBN: "XXXXXXXXXXXXXX",
      address: "XXXXXXXXXXXXXXXXXX",
      store: "青岛",
      reviews: 5,
      pages: 30,
      datetime: "2016-02-26 14:00",
      type: "取书"
    }
  ],

  POSTMAN_TASKS: [
    {
      bookId: 1,
      image: "/assets/images/1.jpg",
      title: "That's Not My Snowman - 1",
      ISBN: "0375827781",
      address: "青岛彰化路32号2单元601",
      member: "王鹏",
      phone: "13899990000",
      type: "取书",
      date: "2017-04-19"
    }, {
      bookId: 2,
      image: "/assets/images/2.jpg",
      title: "That's Not My Snowman - 2",
      ISBN: "0375827782",
      address: "青岛彰化路12号3单元603",
      member: "王鹏",
      phone: "13899990321",
      type: "送书",
      date: "2017-03-29"      
    }
  ],

  MEMBERS: [
    {
      
    }
  ]
};