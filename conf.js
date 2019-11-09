const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 5; // timeout to send the message 5 min

const AutoDM = () => {
    const stream = T.stream("user");
    console.log("Start Sending Auto Direct Message 🚀🚀🚀");
    stream.on("follow", SendMessage);
};

const SendMessage = user => {
    const { screen_name, name } = user.source;

    const obj = {
        screen_name,
        text: GenerateMessage(name)
    };
    // the follow stream track if I follow author person too.
    if (screen_name != my_user_name) {
        console.log(" 🎉🎉🎉🎉 New Follower  🎉🎉🎉🎉🎉 ");
        setTimeout(() => {
            T.post("direct_messages/new", obj)
                .catch(err => {
                    console.error("error", err.stack);
                })
                .then(result => {
                    console.log(`Message sent successfully To  ${screen_name}  💪💪`);
                });
        }, timeout);
    }
};
const GenerateMessage = name => {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const d = new Date();
    const dayName = days[d.getDay()];
    //return `Hi ${name} Thanks for .... \n Happy ${dayName} 😊😊 `; // your message
    return `Hi ${name} Thanks for being a part of my social media network. I am the @bti_trading founder, a new technology company with the goal to help traders improving their performance.\n
   My goal is to provide reliable tools and analytics - fighting the known trader best enemy i.e.himself / herself (understand here psychology😊)\n
   We offer a 3 weeks free trial for you to evaluate our offering. You can cancel any time free of charge.\n
   My website: https://best-trading-indicator.com\n
   My public Open - Source TradingView repository: https: //www.tradingview.com/u/Daveatt/#published-scripts\n
   Happy to discuss anytime 😊😊 `;
};

module.exports = AutoDM;
