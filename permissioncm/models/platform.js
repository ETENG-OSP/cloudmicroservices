module.exports = {

  identity: 'platform',

  schema: true,

  attributes: {

    name: 'string',

    code: {
      type: 'string',
      unique: true
    }

  }

};
