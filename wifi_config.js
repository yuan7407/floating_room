var exec = require('child_process').exec;
var WiFiControl = require("wifi-control");

var cmd = 'echo "./data/wifi.sh" | telnet 192.168.1.1';

console.log("Connecting to ssid: " + process.argv[2]);

if (process.argv[2] == null) {
    console.log("please give ssid flag:");
    console.log("node wifi_config.js ssidNameHere");
} else {
    
    WiFiControl.resetWiFi(function() {

        WiFiControl.init({
            debug: true,
            connectionTimeout: 2000,
            iface: 'wlp2s0'
        });

        console.log(WiFiControl.getIfaceState());

        WiFiControl.scanForWiFi(function(error, response) {
            if (error) console.log(error);
            console.log(response);
        });

        var open_ap = {
            ssid: process.argv[2]
        };

        WiFiControl.connectToAP(open_ap, function(error, response) {
            if (error) {
                console.log(error);
            }
            console.log(response);
            exec(cmd, function(error, stdout, stderr) {
                if (error) {
                    //console.log(error);
                }
            }, 3000);
        });
    });
}
