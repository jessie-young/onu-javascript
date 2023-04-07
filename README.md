# Calling Cakework
Note: the handler.js file to write, which implements the RestRequestHandler interface, is the same as the handler.ts in https://github.com/jessie-young/onu-typescript/blob/main/handler.ts, except with the types removed and the `import` statements replaced with `require` statements. The module.exports statement at the end is used to export the taskHandler function so that it can be used by other parts of the application.

To call Cakework to build and deploy a function, you'll need to do the following:
1.  When the user calls `onu deploy`, send their code (minus the node_modules library) to an Onu backend server
2. On the backend server, unzip the user's code and add 2 files to the directory: a Dockerfile, and a handler.js. 
3. Create a tar.gz archive of the directory, excluding any non-relevant files. Sample command:
```
tar --exclude='node_modules' --exclude='.git' -cvzf ~/onu-typescript.tar.gz .
```

4. Call Cakework `deployFunctionFromArchive` using the REST API and your cakework API key. 

Sample request using `curl`: 
```
curl --location --request POST 'https://api.cakework.com/v1/function/deploy/archive' \
--header 'X-Api-Key: REDACTED' \
--form 'archive=@"/Users/jessieyoung/onu-typescript.tar.gz"' \
--form 'runtime="nodejs18.x"' \
--form 'platform="lambda"' \
--form 'handlerFile="handler.js"' \
--form 'handlerFunction="taskHandler"'
```

Sample request using Javascript using the NodeJS Axios library:
```
var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('archive', fs.createReadStream('/Users/jessieyoung/onu-typescript.tar.gz'));
data.append('runtime', 'nodejs18.x');
data.append('platform', 'lambda');
data.append('handlerFile', 'handler.js');
data.append('handlerFunction', 'taskHandler');

var config = {
  method: 'post',
  headers: { 
    'X-Api-Key': 'REDACTED', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

5. The `deployFunctionFromArchive` call will return a function id, as well as an endpoint you can use to now call your function.

Sample request using Javascript's fetch, using an endpoint which was returned by a `deploy` call:
```
var axios = require('axios');
var data = '{\n    "email": "jessie@cakework.com",\n    "accountType": "basic"\n}';

var config = {
  method: 'post',
  url: 'https://le2bipucx7.execute-api.us-west-2.amazonaws.com/f7169cda-accc-4640-8bcb-e2b6c4938e11',
  headers: { 
    'X-Api-Key': 'REDACTED', 
    'Content-Type': 'text/plain'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```



