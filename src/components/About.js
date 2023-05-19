import React from "react";
import "../styles/About.scss";

function About() {
  return (
    <div className="about-container">
      <img id="Yahya" src="Yahya-img.jpg" alt="Pic of Syed Yahya Salman" />
      <div id="about-text">
        <div>
        As a MERN Stack developer, I'm excited to introduce myself and my blog.
        My name is Syed Yahya Salman, and I'm passionate about web development.
        I created this blog to showcase my MERN Stack skills and share my
        knowledge with others. One of the unique features of my blog is the
        image lab section, where I added an additional feature for Editing
        Images.
        </div>
        <ul>
          Here are some features of this Blog App.
          <li>
          User Authentication: Sign and Login features are provided
          </li>
          <li>
            Encryption: Used Bcrypt JS to Encrypt the passwords. 
          </li>
          <li>
          Search Functionality: A search bar is provided to help users quickly find relevant content
          </li>
          <li>
          Categories and Tags: Organizing blog posts into categories and tags can help users find related content
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
