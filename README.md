<h1>SBOL Web Viewer</h1>

Doulix’s SBOL viewer is a [SBOL 2.0](https://sbolstandard.org) interactive visualizer.
It can be directly embedded in your webpage to display SBOL file and allow your visitors to navigate and interact with your latest piece of research. It’s a perfect addon for your blog, wiki or website.

Technically speaking this a web component that gives the possibility to include and visualize a Synthetic Biology Open Language (SBOL) sequence in any webpage using the modern web component approach.

Once you add the necessary script to your page you could use Sbol Visualizer as a normal HTML node.


[Explore the docs »](https://www.npmjs.com/package/sbolviewer)

## Table of Contents
1. [Built Wit](#built-with)
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

Copyright 2021 Explora Biotech SRL. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list
   of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation and/or
   other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may
   be used to endorse or promote products derived from this software without specific
   prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

As we use to say at Doulix, there is no fun without funding. DDL was partially supported by Bioroboost (Grant Agreement no 814650), MA was partially funded by the EU project SYNBIO4FLAV (Grant Agreement no 814650) and SKF and AF was supported by MIAMI (Grant Agreement 814645).

We are immensely thankful to James McLaughlin for visbol-js importer that we slightly  adapted from: https://github.com/udp/visbol-js.

We would like to thank Prof. Chris J. Myers (University of Utah & Synbiohub) and Jacob Beal (Raytheon BBN Technologies & SBOL Industrial consortium) for help and support.

Also

* [SBOL Comunity](https://sbolstandard.org)
* [Symbiohub](https://synbiohub.org/)


