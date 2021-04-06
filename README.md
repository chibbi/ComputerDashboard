# ComputerDashboard [![](https://tokei.rs/b1/github/chibbi/ComputerDashboard)](https://tokei.rs/b1/github/chibbi/ComputerDashboard)
a simple dashboard for the **LOCAL NETWORK**, that shows you some information about your computer, and lets you turn it off  
The dashboard gives you information about your server, and let's you turn it off, put it to sleep, or other stuff.  
You can easily [create your own actions](https://github.com/chibbi/ComputerDashboard/wiki/Create-your-own-Action)  
The whole Folder is 3,1MB big, and  2,4MB without github-files.


##### This dashboard requires nodejs 15.0 or higher.

## Uses pug (unecessarily so i should just remove it) which seems to contain vulnerabilites

#### Picture, of the full website:
![website](https://github.com/chibbi/ComputerDashboard/blob/main/Screenshot_2021-01-06%20Main%20Desktop%20Dashboard.png)

#### install:  
  1. install sensors (for cpu temp): ```apt install lm-sensors```
  1. make a file executable: ```chmod +x linux_json_api.sh```  
  2. install all needed node modules: ```npm install-clean```  
  3. create a "user.json" file in the "userDB" folder (there is a template for reference)  
       if you don't create that file, it will create it for you with the "user.json.template" file
  4. make a file executable: ```chmod +x startServer.sh```
  5. start server with: ```./startServer.sh```  
       ```./startServer.sh``` uses [screen](https://www.gnu.org/software/screen/), if you wish not to use it, just start the server manually with ```npm start``` OR ```node index.js```

### postinstall:  
  1. open ```http://localhost:8080```  
  2. login with your defined login
  3. and see the IP of the computer, which you can use to open the Dashboard on anothern Device.
