const Ajv = require('Ajv');
const schema = require('./schema.json');
const data = require('./learners/SonyaSims.json');
const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) {
  console.log(validate.errors);
}
