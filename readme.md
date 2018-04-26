# Frontend Boilerplate

## Dependency management

We are using NPM [Node Package Manager](https://www.npmjs.com/) to manage dependencies. NPM is the package manager for JavaScript and the world’s largest software registry.

Run the following to update all necessary dependencies.

 ```bash
npm install
```

## Compiling your code

We are using a gulp task to compile and optimize our code and assets. 

```bash
gulp watch
```
```bash
gulp build
```

## Building Pages
The pages folder represents collections of components and global includes that makeup each page on the site. The components are injected into these HTML pages using 

```bash
gulp fileinclude
```
This outputs compiled pages to the app directory with all of the components you have included.

## Includes
The includes folder contains all the markup for the top & bottom of the page, including meta data, global JS & CSS file references. The header & footer should be added at the top and bottom with a file include on every page.

## generator-client-component 

Yeoman is used to generate new components for the project through a custom component generator, first you will need to install Yeoman with npm

It is highly recommended that you manage your node/npm installations with
the [Node Version Manager](https://github.com/creationix/nvm).

```bash
npm install -g yo
npm link generator-client-component
```

Finally, initiate the generator:

```bash
yo client-component
```

Follow the prompts and your HTML/SCSS/JS files for your new component will be generated in the respective component folder under /components

For global SCSS please use the /styles folder.

For global JS please use the /scripts folder.