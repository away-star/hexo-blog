var posts=["2023/12/01/hello-world/","2023/12/01/hexo-anzhiyu学习/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };