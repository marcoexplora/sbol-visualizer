<h1>SBOL Web Viewer</h1>

Doulix’s SBOL viewer is a [SBOL 2.0](https://sbolstandard.org) interactive visualizer.
It can be directly embedded in your webpage to display SBOL file and allow your visitors to navigate and interact with your latest piece of research. It’s a perfect addon for your blog, wiki or website.

Technically speaking this a web component that gives the possibility to include and visualize a Synthetic Biology Open Language (SBOL) sequence in any webpage using the modern web component approach.

Once you add the necessary script to your page you could use Sbol Visualizer as a normal HTML node.


[Explore the docs »](https://www.npmjs.com/package/sbolviewer)

## Table of Contents
1. [Built With](#built-with)
2. [Getting Started](#getting-started)
3. [Installation for Dev](#installation-for-dev)
4. [License](#license)
5. [Acknowledgements](#acknowledgements)

## Built With

* [VueJS](https://vuejs.org)
* [SbolJS](https://github.com/doulix/sbol-web-visualizer)

<!-- GETTING STARTED -->
## Getting Started

- Register the web component by adding the follow script tag on your HTML header element:

  ```
  <script src="https://cdn.jsdelivr.net/npm/sbolviewer@0.0.12/dist/sbol-viewer.min.js"></script>
  ```
  in your web page.

- Add in your HTML page with the web component installed:

  ```
  <sbol-viewer dropafile="true"></sbol-viewer>  
  ```
- Sbol Web viewer  will show in your page and you will be able to interact, drop a file and review

  ```
  <sbol-viewer  source="/BBa_C0510.xml"></sbol-viewer>  
  ```
Sbol Web viewer will try to load the file hosted in the "/BBa_C0510.xml" and display it

## Installation for Dev

#### Prerequisites

- [Node](https://nodejs.org/en/)

Install sbolviewer as library:

```
npm install sbolviewer 
```


<!-- LICENSE -->
## License
Distributed under the BSD License. See LICENSE.txt for more information.

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

As we use to say at Doulix, there is no fun without funding. DDL was partially supported by Bioroboost (Grant Agreement no 814650), MA was partially funded by the EU project SYNBIO4FLAV (Grant Agreement no 814650) and SKF and AF was supported by MIAMI (Grant Agreement 814645).

We are immensely thankful to James McLaughlin for visbol-js importer that we slightly  adapted from: https://github.com/udp/visbol-js.

We would like to thank Prof. Chris J. Myers (University of Utah & Synbiohub) and Jacob Beal (Raytheon BBN Technologies & SBOL Industrial consortium) for help and support.

Also

* [SBOL Comunity](https://sbolstandard.org)
* [Symbiohub](https://synbiohub.org/)


