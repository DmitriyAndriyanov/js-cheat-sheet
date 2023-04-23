# Starter Kit

## Quickstart & Prerequisites

### [Node.js](https://nodejs.org)

Bring up a terminal and type `$ node -v`.
Node should respond with a version at or above 12.0.x.
If you need to install Node, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.

### [Gulp](http://gulpjs.com)

Bring up a terminal and type `$ gulp -v`.
If Gulp is installed it should return a version number at or above 4.0.x.
If you need to install/upgrade Gulp, open up a terminal and type in the following:

````
$ npm install -g gulp
````

*This will install Gulp globally. Depending on your user account, you may need to [configure your system](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md) to install packages globally without administrative privileges.*

### Local dependencies

Next, install the local dependencies Starter Kit requires:

````
$ npm install
````

That's it! You should now have everything needed to use the Starter Kit.

## Build

You must work with the source files in the **"src"** folder

To compile SASS and JS, build Gulp and start watching for changes use for source files:

````
$ gulp
````

## Project Structure
````
├── src              #The folder for developers, in which all the source codes of the project are located
├── public           #A folder that contains optimized finished pages with all the necessary resources
├── gulpfile.js      #File with gulp tasks
└── package.json     #File with dependencies
````
