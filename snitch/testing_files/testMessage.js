const accountSid = 'AC1b0d92d9ade64470cbc89a26ca700a60';
const authToken = '117ce9793066119946938d293ebb9ead';

const client = require('twilio')(accountSid, authToken);
client.messages
    .create({
        body: 'test',
        messagingServiceSid: 'MG35a98a1188d0ae130b0ea80e2050176a',
        to: '+18777804236' //sends to virtual twillio phone
    })
    .then(message => console.log(message.sid));