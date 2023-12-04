---
title: hexo-anzhiyu学习
date: 2023-9-01 20:12:32
tags: 就业
categories: 后端
keywords: 回溯，二刷 
description: 回溯，二刷
top_img: /img/houduan.png
comments: true
cover: /img/houduan.png
toc: 
toc_number:
toc_style_simple:
copyright: 
copyright_author: xingxing
copyright_author_href: www.staraway.asia
copyright_url:
copyright_info: 可转载哦
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
swiper_index: 1
top_group_index: 1
background: "#fff"
---


## 

Post Front-matter


| _**写法**_            | _**解释**_                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------- |
| title                 | 【必需】文章标题                                                                            |
| date                  | 【必需】文章创建日期                                                                        |
| updated               | 【可选】文章更新日期                                                                        |
| tags                  | 【可选】文章标签                                                                            |
| categories            | 【可选】文章分类                                                                            |
| keywords              | 【可选】文章关键字                                                                          |
| description           | 【可选】文章描述                                                                            |
| top_img               | 【可选】文章顶部图片                                                                        |
| cover                 | 【可选】文章缩略图(如果没有设置 top_img,文章页顶部将显示缩略图，可设为 false/图片地址/留空) |
| comments              | 【可选】显示文章评论模块(默认 true)                                                         |
| toc                   | 【可选】显示文章 TOC(默认为设置中 toc 的 enable 配置)                                       |
| toc_number            | 【可选】显示 toc_number(默认为设置中 toc 的 number 配置)                                    |
| toc_style_simple      | 【可选】显示 toc 简洁模式                                                                   |
| copyright             | 【可选】显示文章版权模块(默认为设置中 post_copyright 的 enable 配置)                        |
| copyright_author      | 【可选】文章版权模块的`文章作者`                                                            |
| copyright_author_href | 【可选】文章版权模块的`文章作者`链接                                                        |
| copyright_url         | 【可选】文章版权模块的`文章链接`链接                                                        |
| copyright_info        | 【可选】文章版权模块的版权声明文字                                                          |
| mathjax               | 【可选】显示 mathjax(当设置 mathjax 的 per_page: false 时，才需要配置，默认 false)          |
| katex                 | 【可选】显示 katex(当设置 katex 的 per_page: false 时，才需要配置，默认 false)              |
| aplayer               | 【可选】在需要的页面加载 aplayer 的 js 和 css,请参考文章下面的`音乐` 配置                   |
| highlight_shrink      | 【可选】配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)                |
| aside                 | 【可选】显示侧边栏 (默认 true)                                                              |
| swiper_index          | 【可选】首页轮播图配置 index 索引，数字越小越靠前                                           |
| top_group_index       | 【可选】首页右侧卡片组配置, 数字越小越靠前                                                  |
| ai                    | 【可选】文章ai摘要                                                                          |
| main_color            | 【可选】文章主色，必须是16进制颜色且有6位，不可缩减，例如#ffffff 不可写成#fff               |

1. 首页轮播图配置: `swiper_index`, 数字越小越靠前
2. 首页卡片配置: `top_group_index`, 数字越小越靠前
3. page 中`top_single_background`, 可配置部分页面的顶部背景图片
