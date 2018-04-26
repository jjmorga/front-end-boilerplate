'use strict';

/**
 * Yeoman generator that creates all starter files for new Lions Clubs components.
 *
 * This includes:
 * - HTML File
 * - Browserified JavaScript file
 * - Sass file
 * - Wiring up JavaScript and Sass
 */

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var wiring = require('html-wiring');
var pathExists = require('path-exists');
var find = require('find');

var jsModuleIndexFilePath = 'pagelibs.components.js';
var sassIndexFilePath = 'pagelibs.components.scss';

module.exports = yeoman.Base.extend({

  initializing: function() {
    if (!pathExists.sync(jsModuleIndexFilePath)) {
      this.env.error('ERROR: Are you running this command from the right location? Could not find ' + jsModuleIndexFilePath);
    }
    if (!pathExists.sync(sassIndexFilePath)) {
      this.env.error('ERROR: Are you running this command from the right location? Could not find ' + sassIndexFilePath);
    }
  },

  prompting: function() {
    var done = this.async();
    var generator = this;

    this.log(yosay(
      'Welcome to the ' + chalk.red('client-component') + ' generator! \nI create stub files for new Client components.'
    ));

    var prompts = [{
      type: 'input',
      name: 'componentNameDashed',
      message: 'What is the name of the component (with-dashes-all-lowercase)?',
      validate: function(componentNameDashed) {
        if (!/^[a-z\-]+$/.exec(componentNameDashed)) {
          return 'Invalid name [' + componentNameDashed + '], all lowercase and dashes.';
        }
        return true;
      }
    }];

    this.prompt(prompts).then(function(props) {
      this.props = props;

      this.log(chalk.cyan('Will use the the following configurations:'));

      this.props.folderName = this.props.componentNameDashed;
      this.log('folderName:\t\t' + chalk.blue(this.props.folderName));

      this.props.sassName = this.props.componentNameDashed;
      this.props.sassFileName = this.props.componentNameDashed;
      this.log('sassName:\t\t' + chalk.blue(this.props.sassName));
      this.log('sassFileName:\t\t' + chalk.blue(this.props.sassFileName));

      this.props.jsModuleName = this.props.componentNameDashed;

      var componentNameCamel = this.props.componentNameDashed.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
      this.props.jsObjectName = capitalizeFirstLetter(componentNameCamel);
      this.props.jsFileName = this.props.componentNameDashed;
      this.log('jsModuleName:\t\t' + chalk.blue(this.props.jsModuleName));
      this.log('jsObjectName:\t\t' + chalk.blue(this.props.jsObjectName));
      this.log('jsFileName:\t\t' + chalk.blue(this.props.jsFileName));

      this.props.htmlName = this.props.componentNameDashed;
      this.props.htmlFileName = this.props.componentNameDashed;

      // Final confirmation prompt
      this.prompt([{
        type    : 'confirm',
        name    : 'continue',
        default : false,
        message : 'Does this look correct?'
      }]).then(function(props) {
        if (!props.continue) {
          this.log(chalk.yellow('Exiting: Please re-run with correct inputs.'));
          process.exit(1);
        }
        done();
      }.bind(this));

    }.bind(this));
  },

  writing: function() {

    /*
     * SASS FILE
     */
    this.fs.copyTpl(
      this.templatePath('componentSass.scss'),
      this.destinationPath(path.join('components/', this.props.folderName, this.props.sassFileName + '.scss')),
      this.props
    );

    /*
     * JS FILE
     */
    this.fs.copyTpl(
      this.templatePath('componentJavaScript.js'),
      this.destinationPath(path.join('components/', this.props.folderName, this.props.jsFileName + '.js')),
      this.props
    );

    /*
     * HTML FILE
     */
    this.fs.copyTpl(
      this.templatePath('html.html'),
      this.destinationPath(path.join('components/', this.props.folderName, this.props.htmlFileName + '.html')),
      this.props
    );

 /*
     * UPDATE JS COMPONENT INDEX
     */
    var jsToAdd = 'require(\'components/' + this.props.jsFileName + '\');\n';
    var jsContent = wiring.readFileAsString(jsModuleIndexFilePath);
    if (!jsContent.includes(jsToAdd)) {
      this.log(chalk.yellow('Updating ') + jsModuleIndexFilePath);

      jsContent = jsContent + jsToAdd;
      wiring.writeFileFromString(jsContent, jsModuleIndexFilePath);
    } else {
      this.log(chalk.cyan('Skipping ') + jsModuleIndexFilePath + ' update');
    }

    /*
     * UPDATE SASS COMPONENT INDEX
     */
    var sassToAdd = '@import "components/' + this.props.folderName + '/' + this.props.sassFileName + '";\n';
    var sassContent = wiring.readFileAsString(sassIndexFilePath);
    if (!sassContent.includes(sassToAdd)) {
      this.log(chalk.yellow('Updating ') + sassIndexFilePath);

      sassContent = sassContent + sassToAdd;
      wiring.writeFileFromString(sassContent, sassIndexFilePath);
    } else {
      this.log(chalk.cyan('Skipping ') + sassIndexFilePath + ' update');
    }
  }
});

/*
 * START HELPER FUNCTIONS
 */

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
