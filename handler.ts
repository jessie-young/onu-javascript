const { RestRequestHandler } = require('@cakework/adapters/lib/restRequestHandler');
const task = require('./onu/demoTask');

const taskHandler = (req) => {
  try {
    console.log("Running task with name: " + task.name);
    
    task.run(req.body, {"executionId": "some_execution_id"}); // TODO get execution id from request

    const response = {
      statusCode: 200,
      body: 'ran job with name: ' + task.name + ' , email: ' + req.body['email']
      + ' , and accountType: ' + req.body['accountType']
    };
    return response;
  } catch (error) {
    console.error(error);
    const response = {
      statusCode: 500,
      body: 'Error', // TODO print out error details
    };
    return response;
  }
};

module.exports = { taskHandler };