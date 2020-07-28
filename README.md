# sbolviewer

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### how to create library
replace current code in src/main.js in 

    import App from './views/Viewer.vue'
    export default App;

and execute (terminal)
    npm run build-lib
# Welcome to SBOLvisualizer project

## Important files:

/public/inc/SBOL-visual ..
        Needs to host PNG images provided by
        https://sbolstandard.org/visual/glyphs/ 
        actual github is https://github.com/SynBioDex/SBOL-visual
        
SBOLcomponets.json
    We use this file to 1:1 map of annotations with SBOL symbols
    - Any components need to be configured here in order to be visible on the visualizer





## install
    1) copy 
    npm install
    npm run serve