import fs from "fs";
import path from "path";
import glob from "glob";
import lineReader from "line-reader";
import bluebird from "bluebird";

// @ts-ignore
const eachLine = bluebird.promisify(lineReader.eachLine);
// 最终的 snippets 对象
let snippets: {
  [key: string]: {
    prefix: string;
    description: string;
    body: string[];
  };
} = {};
let prefixDone = false;
let descriptionDone = false;

const generator = () => {
  // 1、读取 snippets 下的所有 tsx 文件
  // 2、解析 tsx 文件，取出 prefix、description、body
  // 3、写 json 文件，拿到上面的数据拼装 json 文件
  findSnippetsFiles();
};

const findSnippetsFiles = () => {
  glob(path.resolve(__dirname, "../snippets/*.tsx"), {}, async (err, files) => {
    // console.log("---files", files);
    await makeFile(files);
  });
};

const makeFile = (files: string[]) => {
  return files.map(async (file, index) => {
    prefixDone = false;
    descriptionDone = false;
    let prefix = "";
    let description = "";
    // @ts-ignore
    let current: {
      prefix: string;
      description: string;
      body: string[];
    } = {};
    await eachLine(file, (line: string, last: boolean) => {
      // console.log('line', line);
      if (!prefixDone) {
        prefix = makePrefix(line) as string;
        if (prefix) {
          current = {
            prefix,
            description: "",
            body: [],
          };
        }
      }
      if (!descriptionDone) {
        description = makeDescription(line) as string;
        if (description && prefixDone) {
          current["description"] = description;
        }
      }
      const body = makeBody(line);
      if (prefixDone && descriptionDone) {
        if (body) {
          current["body"].push(body);
        } else {
          // 如果当前是空行的话就在上一行文本末尾添加换行符 \n
          current["body"][current["body"].length - 1] = `${current["body"].at(
            -1
          )}\n`;
        }
      }
      if (last) {
        snippets = {
          ...snippets,
          [prefix]: current,
        };
      }
    });
    if (index === files.length - 1) {
      writeSnippetsJsonFile(JSON.stringify(snippets));
    }
  });
};

const makePrefix = (str: string) => {
  if (str.includes("@prefix")) {
    prefixDone = true;
    return str.split("@prefix ")[1];
  }
};

const makeDescription = (str: string) => {
  if (str.includes("@description")) {
    descriptionDone = true;
    return str.split("@description ")[1];
  }
};

const makeBody = (str: string) => {
  if (!str.includes("*")) {
    // @ts-ignore
    return str.replaceAll("  ", "\t");
  }
};

const writeSnippetsJsonFile = (text: string) => {
  fs.writeFile(
    path.resolve(__dirname, "../snippets/snippets.json"),
    text,
    (err) => {}
  );
};

generator();
