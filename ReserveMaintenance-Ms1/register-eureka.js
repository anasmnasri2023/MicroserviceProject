const { Eureka } = require('eureka-js-client');

// Configuration par défaut (adaptée à ton application Spring)
const eurekaHost = process.env.EUREKA_CLIENT_SERVICEURL_DEFAULTZONE || 'localhost';
const eurekaPort = process.env.PORTEUREKA || 8763;
const hostName = process.env.HOSTNAMEEUROKA || 'localhost';
const ipAddr = process.env.IPeuroka || '127.0.0.1'; // ou ton IP Docker (ex: 172.18.0.10)

exports.registerWithEureka = function(appName, PORT) {
    const client = new Eureka({
        instance: {
            app: appName,
            hostName: hostName,
            ipAddr: ipAddr,
            port: {
                '$': PORT,
                '@enabled': true,
            },
            vipAddress: appName,
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
            leaseRenewalIntervalInSeconds: 10,
            leaseExpirationDurationInSeconds: 30,
            instanceId: `${appName}:${PORT}`
        },
        eureka: {
            host: eurekaHost,
            port: parseInt(eurekaPort),
            servicePath: '/eureka/apps/',
            maxRetries: 10,
            requestRetryDelay: 2000,
        },
    });

    client.logger.level('debug');

    client.start(error => {
        console.log(error || `✅ ${appName} registered with Eureka`);
    });

    function exitHandler(options, exitCode) {
        if (exitCode || exitCode === 0) console.log(exitCode);
        if (options.exit) {
            client.stop(() => {
                console.log('🛑 Deregistered from Eureka');
                process.exit();
            });
        }
    }

    client.on('deregistered', () => {
        console.log('📤 Deregistered from Eureka');
    });

    client.on('started', () => {
        console.log(`📡 Eureka registration started → http://${eurekaHost}:${eurekaPort}`);
    });

    process.on('SIGINT', exitHandler.bind(null, { exit: true }));
};
