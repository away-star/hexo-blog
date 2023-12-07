---
title: redis在springboot项目中的使用
tags: 
    - springboot
    - redis
categories: 后端
keywords: springboot, redis
description: redis二次回忆
top_img: /img/suanfa.png
comments: true
cover: /img/suanfa.png
copyright_author: xingxing
copyright_author_href: www.staraway.asia
copyright_info: 本文章转载自我的掘金
date: 2023-8-13 10:38:38
---


### Spring-data-redis简介
​Spring-data-redis提供了在Spring应用中通过简单的配置访问redis服务，对reids底层开发包(Jedis, JRedis, and RJC)进行了高度封装，封装了 RedisTemplate 对象来进行对Redis的各种操作、异常处理及序列化，支持发布订阅，并对Spring 3.1 cache进行了实现，它支持所有的Redis原生的 API。

### Spring-data-redis 针对 Jedis 提供的功能
1. 连接池自动管理，提供了一个高度封装的“RedisTemplate”类
2. 针对jedis客户端中大量api进行了归类封装,将同一类型操作封装为operation接口

-   ValueOperations：简单的K-V操作
-   SetOperations：set类型数据操作
-   ZSetOperations：zset类型数据操作
-   HashOperations：针对map类型的数据操作
-   ListOperations：针对list类型的数据操作

### 加入依赖整合redis
```xml
<!-- redis依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- fastjson -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.76</version>
</dependency>
```

### 增加配置类，提供序列化方式
```Java
/**
 * @author star
 */
@Configuration
public class RedisConfig {

    @Bean
    @ConditionalOnMissingBean(name = "redisTemplate")
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory redisConnectionFactory)
            throws UnknownHostException {
        Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<Object>(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);

        RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
        template.setConnectionFactory(redisConnectionFactory);
        template.setKeySerializer(jackson2JsonRedisSerializer);
        template.setValueSerializer(jackson2JsonRedisSerializer);
        template.setHashKeySerializer(jackson2JsonRedisSerializer);
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        template.afterPropertiesSet();
        return template;
    }


    @Bean
    @ConditionalOnMissingBean(StringRedisTemplate.class)
    public StringRedisTemplate stringRedisTemplate(
            RedisConnectionFactory redisConnectionFactory)
            throws UnknownHostException {
        StringRedisTemplate template = new StringRedisTemplate();
        template.setConnectionFactory(redisConnectionFactory);
        return template;
    }

    @Bean
    public HashOperations<String, String, Object> hashOperations(RedisTemplate<String, Object> redisTemplate) {
        return redisTemplate.opsForHash();
    }
}
```

### redisTemplate针对redis中五种数据类型的操作详解
- string类型-------opsForSet和opsForValue


```java
   //最简单操作
    public void set(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }
    
    //常用操作可以设置多久后过期
   public void setWithExpire(String key, Object value, Long seconds, TimeUnit timeUnit) {
        redisTemplate.opsForValue().set(key, value, seconds, timeUnit);
    }
    
    //获取值
    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }
    
    //是否有值
    public Boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }
    
    
    public Boolean del(String key) {
        return redisTemplate.delete(key);
    }
    
    public Long batchDel(Collection<String> keys) {
        return redisTemplate.delete(keys);
    }
    
    //重新设置过期时间，作刷新用
    public Boolean expire(String key, long seconds) {
        return redisTemplate.expire(key, seconds, TimeUnit.SECONDS);
    }
    
    //重新设置过期的日期，作刷新用
    public Boolean expireAt(String key, Date date) {
        return redisTemplate.expireAt(key, date);
    }
    
    //根据新的 key的名称修改 redis中老的 key的名称
    public Boolean renameIfAbsent(String oldKey, String newKey) {
        return redisTemplate.renameIfAbsent(oldKey, newKey);
    }
    
    //获取key值的类型
    public DataType type(String key) {
        return redisTemplate.type(key);
    }
    
    //从当前redis的key中国随机取一个
    public String randomKey() {
        return redisTemplate.randomKey();
    }
    
    //获取当前key的过期时间（可以设置时间单位）
    public Long getExpire(String key, TimeUnit timeUnit) {
        return redisTemplate.getExpire(key, timeUnit);
    }
    
    //让当前key的值++  （此处多用数字。类型为long值）
    public Long increment(String key) {
        return redisTemplate.opsForValue().increment(key,1);
    }
    
    //重新设置 key对应的值，如果存在返回 false，否则返回 true
    public Boolean setIfAbsent(String key, Object value) {
        return redisTemplate.opsForValue().setIfAbsent(key, value);
    }
    

    
```

- map类型-------opsForHash

```JAVA
    //新增map值，key为键  field+value是map
    public void put(String key, Object field, Object value) {
        redisTemplate.opsForHash().put(key, field, value);
    }
    
    //用map的形式添加
    public void putAll(String key, Map<Object, Object> map) {
        redisTemplate.opsForHash().putAll(key, map);
    }
    
    //获取 map中指定的 key值，如果存在则返回值，没有就返回null
    public Object getMapValue(String key, String field) {
        return redisTemplate.opsForHash().get(key, field);
    }
    
    //根据 key获取 Map对象
    public Map<Object, Object> getMap(String key) {
        return redisTemplate.opsForHash().entries(key);
    }
    
    //当 hashKey不存在的时候，进行设置 map的值
    public Boolean putIfAbsent(String key, Object hashKey, Object value) {
        return redisTemplate.opsForHash().putIfAbsent(key, hashKey, value);
    }
    
    //此处用法和opsForValue相同
    public Long incrementLong(String key, Object field, long increment) {
        return redisTemplate.opsForHash().increment(key, field, increment);
    }
    
    //获取 map中的所有字段
    public Set<Object> keys(String key) {
        return redisTemplate.opsForHash().keys(key);
    }
    
```

- list类型-------opsForList

``` java
    //把值添加在list的前面，可以是单个值也可以多个值（也可以是List<Object> value类型）
    //注意此处的left就是从前面插入，right就是插入到末尾
    public Long leftPush(String key, Object... values) {
        return redisTemplate.opsForList().leftPushAll(key, values);
    }
    
    //根据索引获取list中的值
    public Object index(String key, long index) {
        return redisTemplate.opsForList().index(key, index);
    }
    
    //从一个队列的右边弹出一个元素并将这个元素放入另一个指定队列的最左边
    public Object rightPopAndLeftPush(String sourceKey, String destinationKey) {
        return redisTemplate.opsForList().rightPopAndLeftPush(sourceKey, destinationKey);
    }
    
    //从存储在键中的列表中删除等于值的元素的第一个计数事件。count> 0：删除等于从左到右移动的值的第一个元素；count< 0：删除等于从右到左移动的值的第一个元素；count = 0：删除等于value的所有元素。
    //index从第几个值开始去进行删除，返回值是删除元素的数量
    public Long remove(String key, long index, Object value) {
        return redisTemplate.opsForList().remove(key, index, value);
    }
    
```


- set类型-------opsForSet

``` java
    //添加元素到 set中
    public Long add(String key, Collection<Object> values) {
        return redisTemplate.opsForSet().add(key, values);
    }
    
    //从 set中删除一个随机元素，并返回该元素
    public Object pop(String key) {
        return redisTemplate.opsForSet().pop(key);
    }
    
    //判断 set集合中是否存在value值
    public Boolean isMember(String key, Object value) {
        return redisTemplate.opsForSet().isMember(key, value);
    }
    
    
    //以下多个方法均为获取两个集合的交集或者并集或者差集并返回一个集合，其中一个可以是自定义的集合，也可以是redis中的集合
    //交集
    public Set<Object> intersect(String key, String otherKey) {
        return redisTemplate.opsForSet().intersect(key, otherKey);
    }
    public Set<Object> intersect(String key, Collection<String> collection) {
        return redisTemplate.opsForSet().intersect(key, collection);
    }
    //并集
    public Set<Object> union(String key, String key1) {
        return redisTemplate.opsForSet().union(key, key1);
    }
    //差集
    public Set<Object> difference(String key, String key1) {
        return redisTemplate.opsForSet().difference(key, key1);
    }
    
    //获取集合中的所有元素
    public Set<Object> members(String key) {
        return redisTemplate.opsForSet().members(key);
    }
    
    //移除集合中某个元素
    public Long remove(String key, Collection<Object> objects) {
        return redisTemplate.opsForSet().remove(key, objects);
    }
```

- set类型-------opsForZSet(相比于set为元素增加了score，默认安装score从小到大排序)
    
``` java
    //添加元素到 zset，从小到大排序
    public Boolean add(String key, Object value, double score) {
        return redisTemplate.opsForZSet().add(key, value, score);
    }
    
    //增加元素的 score值同时返回增加后的 score值
    public Double incrementScore(String key, Object value, double score) {
        return redisTemplate.opsForZSet().incrementScore(key, value, score);
    }
    
    //返回 zset元素在集合的从大到小排名
    public Long rank(String key, Object object) {
        return redisTemplate.opsForZSet().rank(key, object);
    }
    //返回 zset元素在集合的从大到小排名
    public Long reverseRank(String key, Object object) {
        return redisTemplate.opsForZSet().reverseRank(key, object);
    }
    
    //获取集合中 key、value元素的 score值
    public Double score(String key, Object value) {
        return redisTemplate.opsForZSet().score(key, value);
    }

    //删除多个value的值
    public Long remove(String key, Object... values) {
        return redisTemplate.opsForZSet().remove(key, values);
    }
```