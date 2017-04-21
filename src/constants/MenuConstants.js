module.exports = {
  admin: [{
    "name": "图书管理",
    "url": "",
    "sub_menus": [
      {
        "name": "添加新书", 
        "url": "/admin/book"
      },
      {
        "name": "浏览图书", 
        "url": "/browsebooks"
      }
    ]
  },{
    "name": "会员管理",
    "url": "/admin/members"
  }],

  postman: [{
    "name": "我的配送任务",
    "url": "/postman/my-request"
  }],

  member: [{
    "name": "本周阅读",
    "url": "/thisweek"
  }, {
    "name": "账户管理",
    "url": "/my-profile"
  }],

  public: [{
    "name": "关于乐读",
    "url": "/"
  },{
    "name": "常见问题",
    "url": "/"
  },{
    "name": "加入会员",
    "url": "/signup"
  },{
    "name": "会员登录",
    "url": "/login"
  }]
};
