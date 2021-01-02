# ComputerDashboard
a simple Dashboard for the **LOCAL NETWORK**, that shows you some information about your Computer, and lets you turn it off

#### install:  
  1. make a file executable: ```chmod +x linux_json_api.sh```  
  2. install all needed node modules: ```npm install-clean```  
  3. create a "user.json" file in the "userDB" folder (there is a template for reference)  
       if you don't create that file, it will create it for you with the "user.json.template" file
  4. start server with: ```npm test``` OR ```node index.js```

### postinstall:  
in theory it is has localisation, in practice you are never asked which language you prefere xD  
so if you want custom lines in your dashboard, just edit the "en.json" file in the "locales" directory  
you can 
  1. open ```http://localhost:3000```  
  2. login with your defined login
  3. and see the IP of the computer, which you can use to open the Dashboard on anothern Device.
