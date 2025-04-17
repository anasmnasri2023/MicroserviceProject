🔧 Installation & Usage

- Clone the Master branch
- Make sure to clean and install all the spring projects for the Mongo projects run npm install
- Run "docker compose up"
- Go to http://localhost:8051/ to get the getway and Enjoy ;)

📣 Micro services :
In this application we have a total of 9 microServices :
MicroService Description
Api-Gateway API management tool that sits between a client and a collection of backend services
Eureka-Server-MS This micro service is Our discovery Server
User-Service This micro service is designed to manage users and implement Authentication and Authorisation
Event-Service This micro service is designed to manage all the events and Feedbacks
Association-Service This micro service is designed to manage all the Associations and Complaints
Maintenance_Service This micro service is designed to manage Bikes Maintenance
Velo_Service This micro service is designed to manage Bikes
Velorent_Service This micro service is designed to manage Bikes Rental
Program_Service This micro service is designed to manage Tours and Events Schedule
Balade_Service This micro service is designed to manage Tours and Deals
MSs & their PORTS
MicroService local PORT
Api-Gateway 8051
Eureka-Server 8761
User-MS 8098
Event-MS 8088
Association-MS 8081
Maintenance_MS 3001
Velo_MS 3000
Velorent_MS 8090
Program_MS 8099
Balade_MS 8086
how to run this application :


1- download the code of this repo 2- install all the dependencies 3- run maven clean install to all the micro services 4- go to the root folder then run docker compose up

💡 Devoloped With
Spring boot
Node Js
Express Js
Mongo Db
Mysql db
