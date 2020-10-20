let map = new Map();

let bot = new Bot('bot');

bot.give_purpose(100);

map.add(bot);

setInterval('map.render()', 10);
