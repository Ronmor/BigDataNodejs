# BigDataNodejs
final project for Big data course Ariel university 2020

This project simulates an operational call ceter for emergencies for various topics.

The architecture combines three sub systems that allows monitoring of call, in near real time aproach.

The whole solution uses the microservice architecture which is highly maintainable and testable.

![Flow](https://user-images.githubusercontent.com/44743734/91653742-05c08900-eaac-11ea-8797-64ddb93b51ab.png)




# Sub-system A:


This subsystem shows the calls center UI.
Allows users To set type of a recived call, caller's location, gender, age and such. 
Behind the scenes calls are produced to the Kafka cloud for further proccesing.


![A](https://user-images.githubusercontent.com/44743734/91653778-43251680-eaac-11ea-8dc3-671dd4420f18.png)

# Sub-system B:

This sub system contains a Redis instance.
This database provides the abillity of restarting every 24 hours.

combined with a socket connection we provide communication between Redis and real time updated statistic analysis of today.

# example of viewer :

![B](https://user-images.githubusercontent.com/44743734/91653943-8c299a80-eaad-11ea-9f23-439d5bb1aceb.png)


# Sub-system C:

This sub system contains a MongoDB instance.
This instance uses to save all data for future data investigation and analysis.
This base can be extended in the near future in order to implement machine learning techniques. 




# demo instructions:
In order to run the system you will need to have the following:
Docker, Nodejs.

We chose to use the libraries node-rdkafka , express , socket.io , charts.js , redis , mongodb.
It is essential before building to run this command:
npm install --save / all libraries names that you want to include /

How to run:

1) Clone this repository.
2) open a terminal/command line/power shell in the cloned repository folder.
3) run docker-compose up --build -d.
4) use the system at http://localhost:3000/ .


