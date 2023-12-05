var posts=["2023/09/01/hexo-anzhiyu学习/","2023/12/04/docker常用命令合集/","2023/12/04/CSS之At-rules/","2023/12/04/回溯——flood-fill、字符串/","2023/12/04/umi-max的简易数据流方案/","2023/12/04/回溯——排列、组合、子集/","2023/12/05/mysql小记/","2023/12/05/next-js实战/","2023/12/05/redis在springboot项目中的使用/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };