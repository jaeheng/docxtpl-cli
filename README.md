# docxtemplater cli

docxtemplater is a mail merging tool that is used programmatically and handles conditions, loops, and can be extended to insert anything (tables, html, images).

docxtemplater uses JSON (Javascript objects) as data input, so it can also be used easily from other languages. It handles docx but also pptx templates.

It works in the same way as a templating engine.

官方自带的cli不可用，至少我这里运行不了。所以自己写了一个，需要的可以试试。

## install

```bash
> npm i -g docxtpl-cli
```

## useage

```bash
> docxtpl // 可查看使用说明和版本号
> docxtpl input.docx data.json output.docx 将input.docx模版，根据data.json的数据，转换成output.docx
```

## license
MIT