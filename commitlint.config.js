const fs = require('fs')

module.exports = {
  extends: [ '@commitlint/config-conventional' ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      fs.readdirSync('./packages') 
    ]
  }
}