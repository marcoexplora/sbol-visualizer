[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/doulix/sbol-web-visualizer">
    <img src="public/logo.png" alt="Logo" width="140" height="130">
  </a>

<h3 align="center">SBOL Web Viewer</h3>

  <p align="center">
   Doulix’s SBOL viewer is a <a href="https://sbolstandard.org">SBOL 2.0</a> interactive visualizer.
   It can be directly embedded in your webpage to display SBOL file and allow your visitors to navigate and interact with your latest piece of research. It’s a perfect addon for your blog, wiki or website. 

Technically speaking this a web component that gives the possibility to include and visualise a Synthetic Biology Open Language (SBOL) sequence in any webpage using the modern web component approach.

Once you add the necessary script to your page you will call Sbol Visualizer as a normal HTML node.
</p>
 <br/>

<a href="https://github.com/doulix/sbol-web-visualizer"><strong>Explore the docs »</strong></a>
<br />
<br />
<a href="https://getstarted.doulix.com/sbol-viewer-lets-get-visual/">View Demo</a>
·
<a href="https://github.com/doulix/sbol-web-visualizer/issues">Report Bug</a>
·
<a href="https://github.com/doulix/sbol-web-visualizer/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<div style="text-align:center;padding-top:3em">
 <img src="public/sbol_viewer_demo.gif" alt="screenshot" width="90%">
</div>


### Built With

* [VueJS](https://vuejs.org)
* [SbolJS](https://github.com/doulix/sbol-web-visualizer)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- [Node](https://nodejs.org/en/)


### Installation

1. Clone the repo
```sh
git clone https://github.com/doulix/sbol-web-visualizer.git
```
2. Install NPM packages
```sh
cd sbol-web-visualizer
npm install
```

<!-- USAGE EXAMPLES -->
## Usage

1. Run in developer mode

  ```sh
   npm run serve
   ```
and visit the page suggested by your console (i.e. http://localhost:8080/ )

2. Add in your HTML page with the web component installed :


```
<sbol-viewer dropafile="true"></sbol-viewer>  
```
Sbol Web viewer  will show in your page and you will be able to interact, drop a file and rewiew


```
<sbol-viewer  source="/BBa_C0510.xml"></sbol-viewer>  
```
Sbol Web viewer will try to load the file in the "/BBa_C0510.xml" and display it

## Compile Web Component

1. Run in developer mode

  ```sh
   npm run build-wc
   ```

This will create a javascript file that will allow you to use the Web component in

  ```sh
   cd dist
   ls
   ```

   ```sh
   sbol-viewer.js.map	sbol-viewer.min.js.map
	sbol-viewer.js		sbol-viewer.min.js
   ```

Now include this files in your web project for example :

**Note the script tag**

 ```xml
    <html>
    <header>
    	...
    <script src="./sbol-viewer.min.js"></script> 
    </header>	
    ...
    </html>
 ```

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/doulix/sbol-web-visualizer/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the BSD License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/doulix/sbol-web-visualizer](https://github.com/doulix/sbol-web-visualizer)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

As we use to say at Doulix, there is no fun without funding. DDL was partially supported by Bioroboost (Grant Agreement no 814650), MA was partially funded by the EU project SYNBIO4FLAV (Grant Agreement no 814650) and SKF and AF was supported by MIAMI (Grant Agreement 814645).

We are immensely thankful to James McLaughlin for visbol-js importer that we slighly adapted from: https://github.com/udp/visbol-js.

We would like to thank Prof. Chris J. Myers (University of Utah & Synbiohub) and Jacob Beal (Raytheon BBN Technologies & SBOL Industrial consortium) for help and support.

Also

* [SBOL Comunity](https://sbolstandard.org)
* [Symbiohub](https://synbiohub.org/)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/doulix/sbol-web-visualizer.svg?style=for-the-badge
[contributors-url]: https://github.com/doulix/sbol-web-visualizer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/doulix/sbol-web-visualizer.svg?style=for-the-badge
[forks-url]: https://github.com/doulix/sbol-web-visualizer/network/members
[stars-shield]: https://img.shields.io/github/stars/doulix/sbol-web-visualizer.svg?style=for-the-badge
[stars-url]: https://github.com/doulix/sbol-web-visualizer/stargazers
[issues-shield]: https://img.shields.io/github/issues/doulix/sbol-web-visualizer.svg?style=for-the-badge
[issues-url]: https://github.com/doulix/sbol-web-visualizer/issues
[license-shield]: https://img.shields.io/github/license/doulix/sbol-web-visualizer.svg?style=for-the-badge
[license-url]: https://github.com/doulix/sbol-web-visualizer/master/LICENSE.txt
[product-screenshot]: images/screenshot.png

