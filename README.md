<div id="top"></div>

<!-- PROJECT ARC -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AUSTlNC/arc-art-critique">
    <img src="arc-frontend/public/img/logoblue.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">ARC Art Critique</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/AUSTlNC/arc-art-critique"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/AUSTlNC/arc-art-critique/issues">Report Bug</a>
    ·
    <a href="https://github.com/AUSTlNC/arc-art-critique/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
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
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](localhost:9999)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `twitter_handle`, `linkedin_username`, `email`, `email_client`, `project_title`, `project_description`

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* [MongoDB Atlas](https://www.mongodb.com/atlas/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Now let's get you ready to access ARC!

### Prerequisites

You need to have the latest version of npm installed

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AUSTlNC/arc-art-critique.git
   ```
2. Install NPM packages inside both backend and frontend folders
   ```sh
   cd arc-frontend
   npm install
   cd ../arc-backend
   npm install
   cd ../
   ```
3. Start frontend and backend servers

   First start the frontend server
   ```sh
   cd arc-frontend
   npm start
   ```
   Open up a new terminal window and cd into arc-art-critique directory then:
   ```sh
   cd arc-backend
   nodemon server.js
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

After installing, go to http://localhost:9999 to access ARC

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Login/Logout
    - [x] Login with Google
    - [ ] Change password
    - [ ] Delete user
- [x] Browse artwork posts in a gallery window
    - [x] Apply artwork type filter
    - [x] Search based on keyword(s)
    - [x] Find all artworks commented
    - [x] Find all artworks created by yourself
    - [ ] Get recommendations
- [x] Comment on others' artwork posts anonymously
    - [x] Comment spam filter
    - [ ] Delete comments
- [x] Post your own artwork posts
    - [x] Delete your own artwork posts
    - [x] Review the comments from other users
- [ ] Report post feature

See the [open issues](https://github.com/AUSTlNC/arc-art-critique/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Austin Cai - [@twitter_handle](https://twitter.com/twitter_handle) - austincc319@gmail.com

Project Link: [https://github.com/AUSTlNC/arc-art-critique](https://github.com/AUSTlNC/arc-art-critique)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/AUSTlNC/arc-art-critique.svg?style=for-the-badge
[contributors-url]: https://github.com/AUSTlNC/arc-art-critique/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AUSTlNC/arc-art-critique.svg?style=for-the-badge
[forks-url]: https://github.com/AUSTlNC/arc-art-critique/network/members
[stars-shield]: https://img.shields.io/github/stars/AUSTlNC/arc-art-critique.svg?style=for-the-badge
[stars-url]: https://github.com/AUSTlNC/arc-art-critique/stargazers
[issues-shield]: https://img.shields.io/github/issues/AUSTlNC/arc-art-critique.svg?style=for-the-badge
[issues-url]: https://github.com/AUSTlNC/arc-art-critique/issues
[license-shield]: https://img.shields.io/github/license/AUSTlNC/arc-art-critique.svg?style=for-the-badge
[license-url]: https://github.com/AUSTlNC/arc-art-critique/blob/master/LICENSE.txt
[product-screenshot]: arc-frontend/public/img/screenshot.png
