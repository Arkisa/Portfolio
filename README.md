Personal portfolio site. Static HTML/CSS/JS - no build tools, no
dependencies, no npm install required.

REQUIREMENTS
------------
- A web browser

INSTALLATION
------------
1. Clone or download the repo

   git clone https://github.com/<your-username>/Portfolio.git
   cd Portfolio

   Or just unzip the project folder if you downloaded it directly.

2. Check the file structure looks like this:

   Portfolio-main/
   |-- index.html
   |-- style.css
   |-- script.js
   `-- assets/
       |-- profile.jpg
       |-- mainbg.jpg
       |-- craveh.png
       `-- WeaherApp.png

RUNNING LOCALLY
---------------
Option A - just open it
  Double-click index.html, or right-click -> Open With -> your browser.

Option B - run a local server (recommended, avoids browser file://
restrictions with some assets)

  npx serve .

  or, if you have Python installed:

  python3 -m http.server 8000

  Then visit http://localhost:8000 (or whatever port is shown).
