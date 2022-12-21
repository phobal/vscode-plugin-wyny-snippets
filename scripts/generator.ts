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
  glob(path.resolve(__dirname, "../snippets/*.tpl"), {}, async (err, files) => {
    // console.log("---files", files);
    await makeFile(files);
  });
};

const makeFile = async (files: string[]) => {
  let length = 0;
  async function readFile(file: string) {
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
    await eachLine(file, async (line: string, last: boolean) => {
      if (!prefixDone) {
        prefix = makePrefix(line) as string;
        if (prefix) {
          current = {
            prefix,
            description: "",
            body: [],
          };
          return;
        }
      }
      if (!descriptionDone) {
        description = makeDescription(line) as string;
        if (description && prefixDone) {
          current["description"] = description;
          return;
        }
      }
      if (prefixDone && descriptionDone) {
        const body = makeBody(line);
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
        if (length < files.length - 1) {
          length = length + 1;
          await readFile(files[length]);
        }
        if (length === files.length -1) {
          writeSnippetsJsonFile(JSON.stringify(snippets));
        }
      }
    });
  }
  await readFile(files[length]);
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
  if (!str.includes("*/")) {
    // @ts-ignore
    return str.replaceAll("  ", "\t");
  }
};

const writeSnippetsJsonFile = (text: string) => {
  fs.writeFile(
    path.resolve(__dirname, "../snippets/snippets-ts.json"),
    text,
    (err) => {}
  );
};

generator();
