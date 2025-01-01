# marriott-famtastic-deals-finder

A chromium script that helps you log into the marriott travel agent portal with the given username and password and lands you in the Access-Famtastic homepage. 

## How to use the script
1. Clone this repo in your local repo
2. CD into this repo and create your own `.env` file with the following parameters:
    ```
    MARRIOTT_USERNAME=yourusername@gmail.com
    MARRIOTT_PASSWORD=yourpassword
    ```
3. Run the following command and a Chromium browser will pop up and it will automatically take you to the Access-Famtastic Homepage:
    ```bash
    node index.js
    ```