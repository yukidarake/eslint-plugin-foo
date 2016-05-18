'use strict';
var eslint = require('eslint');

var alternativeCLIEngine = new eslint.CLIEngine({
  configFile: './.eslintrc2.yml',
});

function preprocess(text, filename) {
  if (!/eslint-plugin-foo/.test(text)) {
    return [text];
  }

  var config = alternativeCLIEngine.getConfigForFile(filename);

  var eslintRules = '/*eslint ' + Object.keys(config.rules).map(function(rule) {
    return rule + ':' + JSON.stringify(config.rules[rule]);
  }).join(',') + '*/';

  return [eslintRules + text];
}

function postprocess(messages) {
  return messages[0];
}

module.exports = {
  processors: {
    '.js': {
      preprocess: preprocess,
      postprocess: postprocess,
    },
  },
};
