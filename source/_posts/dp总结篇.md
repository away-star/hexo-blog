---
title: dp总结篇————背包问题
tags:
  - 就业
  - 背包问题
categories: 算法
keywords: 背包问题
description: 背包问题
top_img: /img/suanfa.png
comments: true
cover: /img/suanfa.png
copyright_author: xingxing
copyright_author_href: www.staraway.asia
copyright_info: 可转载哦
date: 2023-12-06 09:51:46
---





## 做题步骤
1. 确定dp数组（dp table）以及下标的含义
2. 确定递推公式
3. dp数组如何初始化
4. 确定遍历顺序
5. 举例推导dp数组


## 背包递推公式

问能否能装满背包（或者最多装多少）：dp[j] = max(dp[j], dp[j - nums[i]] + nums[i]); ，对应题目如下：
* [动态规划：416.分割等和子集](https://programmercarl.com/0416.分割等和子集.html)
* [动态规划：1049.最后一块石头的重量 II](https://programmercarl.com/1049.最后一块石头的重量II.html)

问装满背包有几种方法：dp[j] += dp[j - nums[i]] ，对应题目如下：
* [动态规划：494.目标和](https://programmercarl.com/0494.目标和.html)
* [动态规划：518. 零钱兑换 II](https://programmercarl.com/0518.零钱兑换II.html)
* [动态规划：377.组合总和Ⅳ](https://programmercarl.com/0377.组合总和Ⅳ.html)
* [动态规划：70. 爬楼梯进阶版（完全背包）](https://programmercarl.com/0070.爬楼梯完全背包版本.html)

问背包装满最大价值：dp[j] = max(dp[j], dp[j - weight[i]] + value[i]); ，对应题目如下：
* [动态规划：474.一和零](https://programmercarl.com/0474.一和零.html)

问装满背包所有物品的最小个数：dp[j] =  min(dp[j - coins[i]] + 1, dp[j]); ，对应题目如下：
* [动态规划：322.零钱兑换](https://programmercarl.com/0322.零钱兑换.html)
* [动态规划：279.完全平方数](https://programmercarl.com/0279.完全平方数.html)


## 遍历顺序

### 01背包

- 二维dp数组01背包先遍历物品还是先遍历背包都是可以的，且第二层for循环是从小到大遍历。

一维dp数组01背包只能先遍历物品再遍历背包容量，且第二层for循环是从大到小遍历。

### 完全背包

但是仅仅是纯完全背包的遍历顺序是这样的，题目稍有变化，两个for循环的先后顺序就不一样了。

**如果求组合数就是外层for循环遍历物品，内层for遍历背包**。

**如果求排列数就是外层for遍历背包，内层for循环遍历物品**。

相关题目如下：

* 求组合数：[动态规划：518.零钱兑换II](https://programmercarl.com/0518.零钱兑换II.html)
* 求排列数：[动态规划：377. 组合总和 Ⅳ](https://mp.weixin.qq.com/s/Iixw0nahJWQgbqVNk8k6gA)、[动态规划：70. 爬楼梯进阶版（完全背包）](https://programmercarl.com/0070.爬楼梯完全背包版本.html)

如果求最小数，那么两层for循环的先后顺序就无所谓了，相关题目如下：

* 求最小数：[动态规划：322. 零钱兑换](https://programmercarl.com/0322.零钱兑换.html)、[动态规划：279.完全平方数](https://programmercarl.com/0279.完全平方数.html)
