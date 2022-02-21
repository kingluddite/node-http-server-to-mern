stopped at 1hr
https://www.youtube.com/watch?v=qwfE7fSVaZM&t=1384s
use lsa gmail for mongo atlas
lp server notes lsa conn info

# MongoDB
* https://docs.atlas.mongodb.com/getting-started/
* At bottom of Mongodb free setup rename the cluster to something pertaining to your app
* Takes 5 minutes to provision

## Database Access
* Click Add New Database User
* Go with Password
* enter username and password
* copy username and password to save location
* User can read and write to any database
* Add User

## Network Access
* All Access from anywhere (0.0.0.0/0)
* Confirm

## Database
* Connect > Connect Your App > 4.0 or later Node.js > copy string

new folder
db/connect.js
(no .env yet)

## Dev vs Production
* When working locally you can use any of these options (either access from anywhere or our actual IP address)
* But once in production you have to use access from anywhere (once we deploy our app to heroku) otherwise you will get an error and you won't be able to connect your app to mongodb (this is heroku specific)
* but if you were using DigitalOcean (another popular option for hosting your node apps) if you using your local address while developing once the project gets hosted you just swap the IP address from local to production

## Explore Data 
* Click on Database
* I added sample dataset

