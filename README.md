# Dlink

## 简介

Dlink 为 Apache Flink 而生。它是一个 FlinkSQL Studio，可以在线开发、预览、调试 FlinkSQL，支持 Flink 官方所有语法及其增强语法，并且可以远程提交 Sql 作业到集群，无打包过程。

需要注意的是，Dlink 它更专注于 FlinkSQL 的应用，而不是 DataStream。在开发过程中您不会看到任何一句 java、scala 或者 python。所以，它的目标是基于 FlinkSQL 来实现批流一体的实时计算平台。

与此同时，Dlink 也是 DataLink 数据中台生态的核心组件。

DataLink 开源项目及社区正在建设，希望本项目可以帮助你更快发展。

## 原理

![](https://mmbiz.qpic.cn/mmbiz_png/dyicwnSlTFTo5cwuZy7GSLibw5J7Lx6cicx0vXaDHqn5VrrDJ9d3hcEicbEVO77NcP6bOylC9bOpuibM08JJ8bh8XQQ/0?wx_fmt=png)

## 功能

注意：已完成只表明核心功能完成，不包括细节优化。

|     域     |         概要          |   进展   |
| :--------: | :-------------------: | :------: |
|   Studio   |   FlinkSQL 作业管理   |  已完成  |
|            |    FlinkSQL 编辑器    |  已完成  |
|            |       运行信息        |  已完成  |
|            |       查询结果        |  已完成  |
|            |       历史记录        |  已完成  |
|            |       函数浏览        |  已完成  |
|            |       执行配置        |  已完成  |
|            |    会话创建与共享     |  已完成  |
|            |      连接器管理       |  已完成  |
|            |       同步执行        |  已完成  |
|            |       异步提交        |  已完成  |
|            |     函数自动补全      | 敬请期待 |
|            |       任务详情        | 敬请期待 |
|            |       任务审计        | 敬请期待 |
|            |       集群总览        | 敬请期待 |
|            |       集群任务        | 敬请期待 |
|            |      元数据查询       | 敬请期待 |
|            |   FlinkSQL 运行指标   | 敬请期待 |
|            |     表级血缘分析      | 敬请期待 |
|            |    字段级血缘分析     | 敬请期待 |
|            |       任务进程        | 敬请期待 |
|            |    示例与技巧文档     | 敬请期待 |
|            |    FlinkSQL 执行图    | 敬请期待 |
|            |     远程任务停止      | 敬请期待 |
|            |       任务恢复        | 敬请期待 |
|            |        UDF注册        | 敬请期待 |
|            |       更改对比        | 敬请期待 |
|            |   Create Table 生成   | 敬请期待 |
|            |      Insert 生成      | 敬请期待 |
|            |     AGGTABLE 语法     | 敬请期待 |
|            |       SQL 翻译        | 敬请期待 |
|            |   智能 Select 模式    | 敬请期待 |
|            |    自动补全元数据     | 敬请期待 |
|            |  任务反压和倾斜提示   | 敬请期待 |
|            |    流任务数据预览     | 敬请期待 |
|            |          ...          | 欢迎提议 |
|  集群中心  |    集群注册与管理     |  已完成  |
|            |       心跳检测        |  已完成  |
|            |    修改与删除审计     | 敬请期待 |
|            |       集群信息        | 敬请期待 |
|            |     历史任务检索      | 敬请期待 |
|            |      启动与停止       | 敬请期待 |
|  文档中心  | FlinkSQL 函数文档管理 |  已完成  |
|            |   FlinkSQL 示例文档   | 敬请期待 |
|            |   FlinkSQL 调优文档   | 敬请期待 |
|  用户中心  |       用户管理        | 敬请期待 |
|            |       角色管理        | 敬请期待 |
|            |       登录授权        | 敬请期待 |
| 数据源中心 |   数据源注册与管理    | 敬请期待 |
|            |       心跳检测        | 敬请期待 |
|            |      元数据查询       | 敬请期待 |
|            |       数据查询        | 敬请期待 |
|            |       质量分析        | 敬请期待 |
|  调度中心  |   定时调度任务管理    | 敬请期待 |
|            | 依赖血缘调度任务管理  | 敬请期待 |
|            |       调度日志        | 敬请期待 |
|  监控中心  |     Flink任务监控     | 敬请期待 |
|            |       集群监控        | 敬请期待 |
|            |       每日报表        | 敬请期待 |
|  数据地图  |       检索中心        | 敬请期待 |
|            |       任务总览        | 敬请期待 |
|            |       血缘总览        | 敬请期待 |
|            |    元数据应用总览     | 敬请期待 |
|            |       集群总览        | 敬请期待 |
|  数据分析  |       简易图表        | 敬请期待 |
|            |       导入导出        | 敬请期待 |
|  Open API  |          ...          | 欢迎梳理 |
|    其他    |          ...          | 欢迎提议 |

## 部署

### 从安装包开始

```
config/ -- 配置文件
|- application.yml
lib/ --外部依赖及Connector
sql/ --Mysql初始化脚本
|- auto.sh --启动停止脚本
|- dlink-admin.jar --程序包
```

解压后结构如上所示，修改配置文件内容。

在Mysql数据库中创建数据库并执行初始化脚本。

执行以下命令管理应用。

```shell
sh auto.sh start
sh auto.sh stop
sh auto.sh restart
sh auto.sh status
```

### 从源码编译

#### 项目目录

```java
dlink -- 父项目
|-dlink-admin -- 管理中心
|-dlink-connector -- Connector 中心
|-dlink-core -- 执行中心
|-dlink-doc -- 文档
|-dlink-web -- React 前端
```

#### 前端打包

```shell
npm run build
```

前端打包后的 dlink-web/dist 目录下的内容放到  dlink-admin 的 static 下或者使用 Nginx 代理。

#### 后台编译

```shell
maven clean install -Dmaven.test.skip=true
```

#### 扩展Connector

当前版本扩展 FlinkSQL Connector 需要在源码中的 dlink-connector 的 pom 中引用依赖并重新编译打包进行扩展。后续版本将优化。

#### 扩展其他版本的Flink

当前版本默认为 Flink 1.12.4 API。如要扩展其他版本的 Flink ，需要在 dlink-connector 和 dlink-core 的 pom 中修改 flink.version 配置，编译时如出现类或方法找不到等异常则需要修改对应代码为对应版本的逻辑。

#### 源码质量较差问题

利用一个周写的项目所有代码，而且React从零边学边写，还请海涵~（> ^ <）~后续版本将优化代码逻辑。

## 使用手册

### 基础使用

#### 登录

当前版本用户名和密码在配置文件中配置。

#### 集群中心

注册Flink集群地址，格式为 host:port ，用英文逗号分隔。

新增和修改的等待时间较长，是因为需要重新计算最新的 JM 地址。

心跳检测为手动触发，会更新集群状态与 JM 地址。

#### Studio

1.	在左侧目录区域创建文件夹或任务。右键打开任务。

2. 在中间编辑区编写FlinkSQL。
3. 在右侧配置执行参数。
4. Fragment开启后，可以这样写，为了您方便：

```sql
sf:=select * from;tb:=student;
${sf} ${tb}
##效果等同于
select * from student
```

5. MaxRowNum 为预览的最大集合长度，默认100，最大9999，当前版本防止您作死。
6. SavePointPath 当前版本暂不可用。
7. Flink集群与共享会话构成了唯一的 Catalogue ,即您可以通过自定义一个会话 key，然后将当前会话 key 告诉您的战友，那他可以用该 key 访问您在集群上的 Catalogue信息与缓存。当然会话数量有限制，最大256*0.75，未来版本会开放设置。
8. 连接器为 Catalogue 里的表信息，清除会销毁当前会话。
9. Local 模式请使用少量测试数据，真实数据请使用远程集群。
10. 执行 SQL 时，如果您选中了部分SQL，则会执行选中的内容，否则执行全部内容。
11. 小火箭的提交功能是异步提交当前任务保存的FlinkSQL及配置到集群。无法提交草稿。
12. 执行信息或者历史中那个很长很长的就是集群上的 JobId。

#### 使用技巧

（=。=）~ 敬请期待。

#### 常见问题及解决

（=。=）~ 敬请期待。

## 技术栈

[Apache Flink](https://github.com/apache/flink)

[Mybatis Plus](https://github.com/baomidou/mybatis-plus)

[ant-design-pro](https://github.com/aiwenmo/ant-design-pro)

[Monaco Editor](https://github.com/Microsoft/monaco-editor)

[SpringBoot]()

## 交流与贡献

欢迎您加入社区交流分享，也欢迎您为社区贡献自己的力量。

QQ社区群：**543709668**，申请备注 “ Dlink ”，不写不批哦

微信社区群：添加微信号 wenmo_ai 邀请进群，申请备注 “ Dlink ”，不写不批哦

公众号：[DataLink数据中台](https://mmbiz.qpic.cn/mmbiz_jpg/dyicwnSlTFTp6w4PuJruFaLV6uShCJDkzqwtnbQJrQ90yKDuuIC8tyMU5DK69XZibibx7EPPBRQ3ic81se5UQYs21g/0?wx_fmt=jpeg)

邮箱：aiwenmo@163.com

## 运行截图

> 登录页

![](https://mmbiz.qpic.cn/mmbiz_png/dyicwnSlTFTo5cwuZy7GSLibw5J7Lx6cicxd9xkibGuLQiahOhU9ncGTamPViaIeRNlmH5rMmDgDaaLkXl9ibjDjBECwA/0?wx_fmt=png)

> 首页

![](https://mmbiz.qpic.cn/mmbiz_png/dyicwnSlTFTo5cwuZy7GSLibw5J7Lx6cicxiaq9zE4rRqczh3Xjt7YLZohOmTqbDytj1K8qmrjmjcRuyRzdWD9opeA/0?wx_fmt=png)

> Studio 执行信息

![](https://mmbiz.qpic.cn/mmbiz_png/dyicwnSlTFTo5cwuZy7GSLibw5J7Lx6cicxbb59bxUA0XKUQbQoCS2drUO5uCQk8JYJrBexL4fFwk5wltMweLiczibg/0?wx_fmt=png)

> Studio 数据预览

![](https://mmbiz.qpic.cn/mmbiz_png/dyicwnSlTFTo5cwuZy7GSLibw5J7Lx6cicxk5PnuQl5j81VOQWCcDquOaje1uR3wKvKPp3HPm1A8iaibpzCnmSJM2OQ/0?wx_fmt=png)

> Studio 异常反馈

![](https://mmbiz.qpic.cn/mmbiz_png/dyicwnSlTFTo5cwuZy7GSLibw5J7Lx6cicxTGIh7fibBgd45wqjSY3WOK1xqA4dE6XfaOjCeUmib9y4sKqYI0rylrsg/0?wx_fmt=png)

> Studio 执行提示

![](https://mmbiz.qpic.cn/mmbiz_png/dyicwnSlTFTo5cwuZy7GSLibw5J7Lx6cicx9vFRcB0JaETyjXqdgeMRGB0ycWV0wYo9tsNlMicv4ww48zAHxUy4d2A/0?wx_fmt=png)

> Studio 执行历史

![](https://mmbiz.qpic.cn/mmbiz_png/dyicwnSlTFTo5cwuZy7GSLibw5J7Lx6cicxoxk9PcDibbr8vxyvU4Mvib6259bwkPUAVWO7j1HzNPxBE5lPlnpWMDIw/0?wx_fmt=png)

> Studio 函数浏览

![](https://mmbiz.qpic.cn/mmbiz_png/dyicwnSlTFTo5cwuZy7GSLibw5J7Lx6cicxU4Enla8scGnuNb8gVEic9c0mJLPxSDEt7U6I5P4xB73bLMt5iaqfKrVA/0?wx_fmt=png)

> 集群中心

![](https://mmbiz.qpic.cn/mmbiz_png/dyicwnSlTFTo5cwuZy7GSLibw5J7Lx6cicxep8XicicrZPQcY1q8ehTIH2eTibH0KR0vpF0srhkFMBTcxgmJTzp8tia8Q/0?wx_fmt=png)

> 文档中心

![](https://mmbiz.qpic.cn/mmbiz_png/dyicwnSlTFTo5cwuZy7GSLibw5J7Lx6cicxh70BibdyHicHopaBsWlp0g3WLHpEKPAl0obonjxhKHtdlWjRslVekbIg/0?wx_fmt=png)

