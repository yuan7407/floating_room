# Floating-Room

This repository contains all documents and source code for the installation "floating room"，it shows you how we build or configure an multiple AR.Drone 2.0 system from "Optitrack System" to "Tag Detection" to "Multiple Drone Fleet".


### Resources

[ARDRONE'S DEVELOPER GUIDE](http://msh-tools.com/ardrone/ARDrone_Developer_Guide.pdf)
[AutonomyLab](https://github.com/AutonomyLab/ardrone_autonomy/wiki/Multiple-AR-Drones)
[Optitrack](http://wiki.optitrack.com/index.php?title=OptiTrack_Documentation_Wiki)


###Requirements

	//* Optitrack Setup Area, At least 6 Cameras.
	//* Tags from Parrot default kit of AR.Drone.
	//* Master - Slave application setup.
	* At least one AR.Drone 2.0 drone and make sure it has charged battery.
	* A dedicated wireless router for the setup.



###Step 1:
	
	You can easily control the AR.Drone via WiFi using Node.js. The client protocol of AR.Drone is open, and Parrot publishes an SDK (signup required to download) including a good amount of documentation. Download the node.js in your PC.Turn on the ad-hoc of AR.Drone's wifi. You may find it in your WiFi and it shows like "ardrone2_******". Connect it.

	Install via Github to get the latest version:

		npm install ardrone-autonomy
		npm install ar-drone

	This repository has ready-made examples. We can try with the "hover.js" and test with the AR.Drone:

		node ./examples/hover.js

	Now the AR.Drone will take off, hover for 30 seconds and land.


###Step 2:

	Parrot AR.Drone 2.0 runs on a built-in Linux system. You may use Linux commands on the drone. The first thing we need to do is to get into the AR.drone linux system. Turn on the AR.Drone's ad-hoc wifi network and connect with your computer.
	(If you have problems with the connections, press the "Reset" button under the battery, AR.drone will clear all the settings to default.)

	We will connect to the drone through Telnet:
	1.Open the CMD/Terminal(CMD.exe has to run in administrator mode).
		PC# telnet 192.168.1.1

		Trying 192.168.1.1...
		Connected to 192.168.1.1.
		Escape character is '^]'.

		BusyBox v1.14.0 () built-in shell (ash)
		Enter 'help' for a list of built-in commands.

	2.Create a file named wifi.sh in /data/ directory on the drone:

		vi /data/wifi.sh

		//You cannot use nano or other common editor in Linux cuz the AR.Drone's linux version doesn't allow that.

	3.Configure your wireless router to create a managed wifi network without security (e.g. MRL).

	4.Type in the wifi.sh, change network SSID in line 3 and IP number in line 4 of the following code:

		killall udhcpd
		ifconfig ath0 down
		iwconfig ath0 mode managed essid MRL
		ifconfig ath0 192.168.1.10 netmask 255.255.255.0 up

		//The MRL is the name of your wireless router
		//The IP address on each drone has to be unique (e.g. 192.168.1.10 / 192.168.1.20)
		//Hint of VI:Press i in vi to go to insert mode, paste the code by pressing shift-ctrl-v, press ESC to exit insert mode. Type :wq to write and quit.

	5.Make the newly created file executable:

		chmod +x /data/wifi.sh

	6.Close the telnet connection:

		exit


###Step 3:

	//Steps 1 & 2 should only be done once for each drone, Step 3 give 2 methods to let your AR.Drones connected to your router.

	Method 1

		Connect to your drone's ad-hoc wireless network.
		Remotely execute wifi.sh: 
			PC# ./data/wifi.sh

		At this moment, your will lost your connection and the ad-hoc wifi network from drone will disappear and that means the AR.Drone has connected to the router.
		Test it with:
			ping 192.168.1.10

	Method 2
		Install "wifi-control" through node.js and npm.

			PC# npm install wifi-control

		//
		//INCOMPLETED
		//