# enterprise-node

企业用户系统，具有权限。nodejs 实现，使用 jwt。

## 使用方法

### 配置

使用之前需要配置登录服务器和权限服务器的路径，在

### Directives

#### login

构造一个登录表单

```html
<div login="partials/my-awesome-login.html"></div>
```

模板里使用 `$etd.login()` 方法登录，例如：

```html
<form ng-submit="$etd.login(credentials)">

  <input type="text" ng-model="credentials.username">
  <input type="password" ng-model="credentials.password">

  <button>登录</button>

</form>
```

#### permissions

列出当前用户可以打开的全部功能节点

可以自行指定展示用的模板，例如：

```html
<div permissions="partials/my-fancy-permission-list.html">
```

在模板里可以用 `permissions` 变量，这个变量是一个数组，存储了当前用户拥有的全部功能节点信息。

例如：
```html
<!-- in file: partials/my-fancy-permission-list.html -->
<ul>
  <li ng-repeat="fun in permissions">
    <a ng-href="{{fun.url}}" ng-bind="fun.name"></a>
  </li>
</ul>
```

### RESTFul 接口

#### 登录服务器

* __POST /app/:appId/auth/login__

用户登录，路径中的 `appId` 是应用的 ID

参数（json）

名称      | 类型    | 描述
-------- | ------ | ------------
username | string | 用户登录用的名称
password | string | 密码

返回值（json）：

名称      | 类型    | 描述
-------- | ------ | ------------
token    | string | 用户已登录的凭证

* __POST /app/:appId/auth/signup__

用户注册，路径中的 `appId` 是应用的 ID

参数（json）

名称      | 类型    | 描述
-------- | ------ | ------------
username | string | 用户登录用的名称
password | string | 密码

### 权限服务器

* __GET /api/users__
获取全部用户

* __GET /api/roles__
获取全部角色

* __GET /api/permissions__
获取全部功能节点

* __GET /api/permissions/usable__
获取当前用户可用的全部功能节点，必需经过授权才可以调用

# Roadmap

* 组织结构
* device
* 图片存储
* 消息
