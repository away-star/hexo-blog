---
title: 手写sql复习篇
tags:
  - sql
  - 就业
categories: 算法
keywords: sql,就业
description: sql复习篇
top_img: /img/suanfa.png
comments: true
cover: /img/suanfa.png
copyright_author: xingxing
copyright_author_href: www.staraway.asia
copyright_info: 可转载哦
date: 2023-12-07 19:20:17
---

### sql模板

```sql
select 查询结果[学号]
from 从哪张表中查找数据[成绩表：score]————此处进行left、inner、right join
where 查询条件[成绩 < 60]——————此处可进行括号内嵌查询sql
group by 分组[没有] 
having 对分组结果指定条件[没有]  ————对结果进行分组
order by 对查询结果排序[没有]
limit 从查询结果中取出指定行[没有];
```

#### having和where 的区别

- where在查询结果之前进行过滤，having在查询结果之后进行过滤

> 例如以下情况

```sql
-- having
select name, count(*) from student group by name having count(*) > 1;

-- where
select name, count(*) from student where id > 1 group by name;
```

1. 这里的count(*) > 1就是having的过滤条件，如果写在where后面，会报错，因为where是在查询结果之前进行过滤，而这里的count(*)
2. 是在查询结果之后才会出现的，所以要用having进行过滤
3. where是对表中的数据进行过滤，而having是对查询结果进行过滤
4. where后面不能跟聚合函数，having后面可以跟聚合函数
5. where后面不能跟别名，having后面可以跟别名(此处因为别名还没有生成，所以不能用别名)
6. where后面不能跟分组函数，having后面可以跟分组函数

#### group by 和 distinct 的区别

- group by是分组，distinct是去重

```sql
-- group by
select name, count(*) from student group by name;

select 课程号,max(成绩) as 最大成绩
from score 
group by 课程号;

-- distinct
select distinct name from student;

```

1. group by是分组，distinct是去重
2. GROUP BY操作中，除了需要取出每组中的一条记录外，还需要为其他聚集函数做准备工作

#### topN问题

- 求最大（小）的？

> 使用max或者min函数

```sql
-- 求最大的
select * 
from score as a 
where 成绩 = (
select max(成绩) 
from score as b 
where b.课程号 = a.课程号);


-- 求最小的
select * 
from score as a 
where 成绩 = (
select min(成绩) 
from score as b 
where b.课程号 = a.课程号);

```

- 求最大的N条记录

> 使用limit

```sql
-- 求最大的N条记录
select * 
from score 
where 课程号 = '1'
order by 成绩  desc 
limit 2;