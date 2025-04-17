
<!-- Logo -->
<p align="center">
  <a href="#">
   <h1 align="center">Rent a Bike Microservices
  </a>
</p>



<!-- Badges -->
<p align="center">
  
</p>



## :wrench: Installation & Usage
<br /> 
- Clone the Master branch <br />
- Make sure to clean and install all the spring projects for the Mongo projects run npm install <br />
- Run "docker compose up" <br />
- Go to http://localhost:8051/ to get the getway and Enjoy ;) <br /><br />

## :mega: Micro services :

In this application we have a total of 9 microServices :<br />
MicroService     Description <br />
Api-Gateway     API management tool that sits between a client and a collection of backend services<br />
Eureka-Server-MS     This micro service is Our discovery Server <br />
User-Service             This micro service is designed to manage users and implement Authentication and Authorisation <br />
Event-Service            This micro service is designed to manage all the events and Feedbacks <br />
Association-Service    This micro service is designed to manage all the Associations and Complaints <br />
Maintenance_Service     This micro service is designed to manage Bikes Maintenance <br />
Velo_Service            This micro service is designed to manage Bikes <br />
Velorent_Service        This micro service is designed to manage Bikes Rental <br />
Program_Service         This micro service is designed to manage Tours and Events Schedule <br />
Balade_Service          This micro service is designed to manage Tours and Deals <br />
MSs & their PORTS <br />
MicroService     local PORT <br />
Api-Gateway     8051 <br />
Eureka-Server     8761 <br />
User-MS     8098 <br />
Event-MS     8088 <br />
Association-MS     8081 <br />
Maintenance_MS     3001 <br />
Velo_MS     3000 <br />
Velorent_MS     8090 <br />
Program_MS     8099 <br />
Balade_MS     8086 <br />
how to run this application :<br /><br />

1- download the code of this repo 2- install all the dependencies 3- run maven clean install to all the micro services 4- go to the root folder then run docker compose up
## :bulb: Devoloped With



- Spring boot
- Node Js 
- Express Js 
- Mongo Db 
- Mysql db


