API Depencies:

npm install cors
npm install express --save
npm install mongodb@4.1.0 --save
npm install multer --save
#Use this to add material UI to module to help with styling
ng add @angular/material
#to run commands concurrently
npm install concurrently --save-dev

Errors:

- Mongodb database not connecting. Solution: The setting on mongodb was that it would only connect in certain IP addresses so we changed that setting to make the IP address 0.0.0.0/0 so it can use any IP address.