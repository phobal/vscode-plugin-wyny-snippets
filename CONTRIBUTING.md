## 贡献指南

### 如何启动

``` bash
# clone this repo
$ git clone http://172.16.11.30:3001/front-end/infra/vscode-wyny-code-snippets.git
$ cd vscode-wyny-code-snippets
# Install Dependencies
$ pnpm i
# compile
$ pnpm compile
# open file - out/src/extension.js
# press F5, start dev mode
```

### 如何新加一个代码片段

在 snippets 目录下新建一个 `xxx.tpl` 的文件，然后编辑内容，文件内容格式如下：

``` tsx
/**
 * @prefix xxx
 * @description xxxxx
 */

// the code is here
```
注意事项：

* 文件头部必须指明 prefix 和 description
* prefix 最好以 `WYNY_` 开头，这样方便使用的时候找到相关命令，也避免和其他 snippets 插件命名冲突