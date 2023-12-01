var posts=["2023/12/01/hello-world/","2023/12/01/umi数据流方案/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };