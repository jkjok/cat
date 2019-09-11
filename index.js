const Telegraf = require('telegraf');
const Composer = require('telegraf/composer');
const dateTime = require('node-datetime');
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const WizardScene = require('telegraf/scenes/wizard');
const webshot = require('webshot');
const fs = require('fs');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const Markup = require('telegraf/markup');
const cheerio = require("cheerio");
const Extra = require('telegraf/extra');
const Config = require('./config');

const blog = require('./categories/blog');
const emigrant = require('./categories/emigrant');
const fashion = require('./categories/fashion');
const films = require('./categories/films');
const games = require('./categories/games');
const linguistics = require('./categories/linguistics');
const literature = require('./categories/literature');
const lol = require('./categories/lol');
const medic = require('./categories/medic');
const money = require('./categories/money');
const music = require('./categories/music');
const news = require('./categories/news');
const pictures = require('./categories/pictures');
const politic = require('./categories/politic');
const quote = require('./categories/quote');
const sport = require('./categories/sport');
const technology = require('./categories/technology');
const xxx= require('./categories/xxx');

const exphbs = require('express-handlebars');
const request = require('request');
const UserService = require('./user-service');
const BotUtils = require('./utils');
const Logger = require('./logger');
const path = require('path');
const bodyParser = require('body-parser');
const MessagesService = require('./messages-service');
const users = require('./message-model');
const competition = require('./competition');
const like = require('./like');
const userbase = require('./userbase');
const UserModel = require('./user-model');
const UserBase = require('./test');
const DeleteService = require('./user-base-delete');
const MessageModel = require('./message-model');

const needle = require("needle");
const async = require("async");
const number = require('./info');
const key = require('./key');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://top:88993421q@ds022408.mlab.com:22408/top', { useNewUrlParser: true });

const db = mongoose.connection;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
}).listen(process.env.PORT || 5000);


const stepHandler = new Composer();

const tot = new WizardScene('tot',
    stepHandler,
    (ctx) => {ctx.reply('Введите текст сообщения:',{
        reply_markup:{
            keyboard:[
                ['Отмена']
            ],
            resize_keyboard: true
        }
    });
        return ctx.wizard.next()
    },
    (ctx) => {
        if (ctx.message.text === 'Отмена' || ctx.message.text === '/start') {
            bot.telegram.sendMessage(ctx.message.chat.id, '...', {
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
            return ctx.scene.leave()
        }else {
            const text = ctx.message.text;
            const html = text;


            Logger.notify('Called UserService.getAll ');

            UserModel.find({}, function (err, users) {
                var result = users.map(elem => elem.telegramId);
                var index = 1;
                var current = 1;
                var fnc = setInterval(function(){
                    console.log(result[current]);
                    bot.telegram.sendMessage(result[current], html, {
                        parse_mode: 'HTML'
                    })
                .catch(err => {
                        if (err.code == 403)
                        {
                            UserModel.remove({'telegramId': err.on.payload.chat_id}, function(err, result){
                                console.log(result)
                            })
                        }
                    });
                    current++;
                    if(current >= result.length) {current = 0}
                    else if (++index == result.length) {
                        clearInterval(fnc);
                        console.log('Stop Script');
                    }
                }, 80);
                console.log(result)
            });

            ctx.reply('Отправлено!', {
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика бота', '➕Добавить канал'],
                        ['♻️Share', '📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
            return ctx.scene.leave()
        }
    }
);

const test = new WizardScene('test',
    stepHandler,
    (ctx) => {ctx.reply('Введите текст сообщения:',{
        reply_markup:{
            keyboard:[
                ['Отмена']
            ],
            resize_keyboard: true
        }
    });
        return ctx.wizard.next()
    },
    (ctx) => {
        if (ctx.message.text === 'Отмена' || ctx.message.text === '/start') {
            bot.telegram.sendMessage(ctx.message.chat.id, '...', {
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
            return ctx.scene.leave()
        }else {
            const html = ctx.message.text;

                    ctx.reply(html, {
                        parse_mode: 'HTML',
                        disable_notification: false
                    });
                    console.log(ctx.message)
            }
            return ctx.scene.leave()
    }
);

const refusal = new WizardScene('refusal',

    stepHandler,
    (ctx) => {
        ctx.reply('Уажите айди:',{
            reply_markup:{
                keyboard:[
                    ['Отмена']
                ],
                resize_keyboard: true
            }
        });
        return ctx.wizard.next()
    },
    (ctx) => {
        if (ctx.message.text === 'Отмена' || ctx.message.text === '/start') {
            bot.telegram.sendMessage(ctx.message.chat.id, '...', {
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
            return ctx.scene.leave()

        } else {
            ctx.reply('Отправлено!', {
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
            const html = `

❌ <b>В добавление канала было отказано.</b>
        `
            ctx.telegram.sendMessage(ctx.message.chat.id = `${ctx.message.text}`, html, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Почему ?',
                                callback_data: 'refusal'
                            }
                        ]
                    ],
                },
            });
            return ctx.scene.leave()
        }
    }
);
const top = new WizardScene('top',

    stepHandler,
    (ctx) => {
        const markdown = `
➕ *Перешлите сюда любой пост с вашего канала*:
 
`;
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['Отмена']
                ],
                resize_keyboard: true
            },
        });
        console.log(typeof ctx.message.text);
        return ctx.wizard.next()
    },
    (ctx) => {
        const id = ctx.message.chat.id;
        const admin = 549073144;
        const forward = ctx.message.forward_from_chat;
        const { chat, message_id, text } = ctx.message;
        ctx.session.counter = ctx.message.text;
    if (ctx.message.text === 'Отмена' || ctx.message.text === '/start') {
        if (id === admin) {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.scene.leave()
        }
        else {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.scene.leave()
        }
    }
    else if(forward){

        const name_channel = ctx.message.forward_from_chat.title;
        const username_channel = ctx.message.forward_from_chat.username;

        const html = `
✅<b>Отлично</b>

➕<b>Ваш канал</b>:

@${username_channel} - <b>${name_channel}</b>

<code>Канал будет добавлен после проверки и выполнения условий</code>.

        `;

        ctx.telegram.sendMessage(ctx.message.chat.id, html, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    ['🔰Каталог каналов'],
                    ['📊Статистика', '➕Попасть в каталог'],
                    ['📢Help', '👍🏻Like']
                ],
                resize_keyboard: true
            },
        });

        const html_1 = `
⚠<b>Заявка на добавление канала:</b> 

Канал: @${username_channel} - <b>${name_channel}</b>

Юзернейм: @${ctx.from.username}
Чат айди: ${ctx.message.chat.id} 
        `;

        ctx.telegram.sendMessage(Config.admin, html_1, {
            parse_mode: 'HTML'
        });
        return ctx.scene.leave()
    }else {
        const markdown =`
⚠️*Что то пошло не так, попробуйте еще раз.*

*Просто перешлите сюда пост с вашего канала.*
`;

        ctx.reply( markdown,{
            parse_mode: 'Markdown'
        });
    }
    }

);

const forw = new WizardScene('forw',

    stepHandler,
    (ctx) => {ctx.reply('Перешлите сюда ссобщение',{
        reply_markup:{
            keyboard:[
                ['Отмена']
            ],
            resize_keyboard: true
        }
    });
        return ctx.wizard.next()
    },
    (ctx) => {
        const forward1 = ctx.message.forward_from_chat;
        if (ctx.message.text === 'Отмена' || ctx.message.text === '/start') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.scene.leave()
        }
        else if (forward1){
            UserService.getAll(function (err, users) {
                if (err) {
                    Logger.notify('Some error!' + err.message);
                    return;
                }
                users.forEach(function (user) {
                    ctx.telegram.forwardMessage(user.telegramId, ctx.message.chat.id, ctx.message.message_id, ctx.message.text);
                    console.log(ctx.message)
                });
            });
            ctx.reply('Отправлено!', {
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
        }else{ctx.reply('Попробуй еще раз:')}
    }

);
const teh = new WizardScene('teh',

    stepHandler,
    (ctx) => {
    const markdown = `
📢 *Help*:

\`Свои вопросы и предложениями можете писать сюда\`.
`
    ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [
                ['Отмена']
            ],
            resize_keyboard: true
        },
    });
    console.log(typeof ctx.message.text);
    return ctx.wizard.next()
},
    (ctx) => {

        const id = ctx.message.chat.id;
        const admin = 549073144;
        const txt = ctx.message.text;

    if (txt === 'Отмена' || txt === '/start') {
        if(id === admin){
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.scene.leave()
        }else {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like']
                    ],
                    resize_keyboard: true
                },
            });
            return ctx.scene.leave();
        }
    }else{
        const html1 = `
📢 <b>Сообщение было успешно отправлено</b> ✔️

<code>В скором времени на него ответит модератор.</code>`;
        ctx.telegram.sendMessage(ctx.message.chat.id, html1,{
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    ['🔰Каталог каналов'],
                    ['📊Статистика', '➕Попасть в каталог'],
                    ['📢Help', '👍🏻Like']
                ],
                resize_keyboard: true
            },
        });
        const { chat, message_id, text } = ctx.message;

        ctx.telegram.forwardMessage(Config.admin, chat.id, message_id);
        return ctx.scene.leave()
    }
}

);

const ttt = new WizardScene('ttt',

    stepHandler,
    (ctx) => {
        ctx.reply('Уажите айди:',{
            reply_markup:{
                keyboard:[
                    ['Отмена']
                ],
                resize_keyboard: true
            }
        });
        return ctx.wizard.next()
    },
    (ctx) => {
        if (ctx.message.text === 'Отмена' || ctx.message.text === '/start') {
            bot.telegram.sendMessage(ctx.message.chat.id, '...', {
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
            return ctx.scene.leave()
        }
            else {
                ctx.reply('Введите текст сообщения:');
                ctx.session.counter = ctx.message.text;

                return ctx.wizard.next()
            }
    },
    (ctx) => {
        if (ctx.message.text === 'Отмена' || ctx.message.text === '/start') {
            bot.telegram.sendMessage(ctx.message.chat.id, '...', {
                parse_mode: 'Markdown',
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
            return ctx.scene.leave()
        } else {
            ctx.reply('Отправлено!', {
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика', '➕Попасть в каталог'],
                        ['📢Help', '👍🏻Like'],
                        ['🔑Админка']
                    ],
                    resize_keyboard: true
                },
                disable_notification: false
            });
            const html = `
${ctx.message.text}

<b>Так же вам доступны рекламные функции за отдельную плату.</b>
        `;
            ctx.telegram.sendMessage(ctx.message.chat.id = `${ctx.session.counter}`, html, {
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Функции ₽',
                                callback_data: 'many'
                            }
                        ]
                    ],
                },
            });
            return ctx.scene.leave()
        }
    }
);

const say999 = new WizardScene('say999',

    stepHandler,
    (ctx) => {
        const markdown = `
*Напишите рекламный текст для рассылки, или пишем сюда по поводу рассылки* ➡️ @bokkke:
 
`;
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['Отмена']
                ],
                resize_keyboard: true
            },
        });
        console.log(typeof ctx.message.text);
        return ctx.wizard.next()
    },
    (ctx) => {
        if (ctx.message.text === 'Отмена') {
            ctx.telegram.sendMessage(ctx.message.chat.id, '...', {
                reply_markup: {
                    keyboard: [
                        ['🔰Каталог каналов'],
                        ['📊Статистика бота', '➕Добавить канал'],
                        ['♻️Share', '📢Help']
                    ],
                    resize_keyboard: true
                },
            })
            return ctx.scene.leave()
        }else {
            const html = `
⚠️<b>Заявка на рассылку:</b> 

Рекламный текст: ${ctx.message.text}
Юзер: ${ctx.from.first_name}
Юзернейм: @${ctx.from.username}
Message id: ${ctx.message.message_id}
Чат айди: ${ctx.message.chat.id}`;
            const markdown = `
💳*Оплата*:

➡️ \`Рассылка по подписчикам бота\`  

➡️ Ваш текст: "*${ctx.message.text}*"

➡️ Стоимость: *699 ₽*       
`
            ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
                parse_mode: 'Markdown',
                reply_markup: {

                    inline_keyboard: [
                        [
                            {
                                text: 'Продолжить ₽',
                                callback_data: '1'
                            }
                        ]
                    ]
                },
            });
            ctx.telegram.sendMessage(ctx.message.chat.id=549073144, html,{
                parse_mode: 'HTML'
            });
            return ctx.scene.leave()
        }
    },
);
const say299 = new WizardScene('say299',

    stepHandler,
    (ctx) => {
        const markdown = `
💳*Оплата*:

➡️ \`В топ 10\`
      
➡️ Стоимость:  *299 ₽*       
`
        ctx.reply(`⬇️`,{
            reply_markup: {
                keyboard: [
                    ['Отмена']
                ],
                resize_keyboard: true
            }
        });
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
             inline_keyboard: [
                    [
                        {
                            text: 'Продолжить ₽',
                            callback_data: '2'
                        }
                    ]
                ],
            },

        });
        return ctx.scene.leave()
    },
);
const say399 = new WizardScene('say399',

    stepHandler,
    (ctx) => {
        const markdown = `
💳*Оплата*:

➡️ \`На первое место в топ 10\`
      
➡️ Стоимость:  *399 ₽*       
`
        ctx.reply(`⬇️`,{
            reply_markup: {
                keyboard: [
                    ['Отмена']
                ],
                resize_keyboard: true
            }
        })
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Продолжить ₽',
                            callback_data: '3'
                        }
                    ]
                ],
            },

        });
        return ctx.scene.leave()
    },
);
const say199 = new WizardScene('say199',

    stepHandler,
    (ctx) => {
        const markdown = `
💳*Оплата*:

➡️ \`На первое место в каталоге\`
      
➡️ Стоимость:  *199 ₽*       
`
        ctx.reply(`⬇️`,{
            reply_markup: {
                keyboard: [
                    ['Отмена']
                ],
                resize_keyboard: true
            }
        })
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Продолжить ₽',
                            callback_data: '4'
                        }
                    ]
                ],
            },

        });
        return ctx.scene.leave()
    },
);
const say99 = new WizardScene('say99',

    stepHandler,
    (ctx) => {
        const markdown = `
💳*Оплата*:

➡️ \`Жирный шрифт\`
      
➡️ Стоимость:  *99 ₽*       
`
        ctx.reply(`⬇️`,{
            reply_markup: {
                keyboard: [
                    ['🔵Назад']
                ],
                resize_keyboard: true
            }
        })
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Продолжить ₽',
                            callback_data: '5'
                        }
                    ]
                ],
            },

        });
        return ctx.scene.leave()
    },
);
const say149 = new WizardScene('say149',

    stepHandler,
    (ctx) => {
        const markdown = `
💳*Оплата*:

➡️ \`Метка '🔸' возле канала\`
      
➡️ Стоимость:  *149 ₽*       
`
        ctx.reply(`⬇️`,{
            reply_markup: {
                keyboard: [
                    ['🔵Назад']
                ],
                resize_keyboard: true
            }
        })
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Продолжить ₽',
                            callback_data: '6'
                        }
                    ]
                ],
            },

        });
        return ctx.scene.leave()
    },
);


const bot = new Telegraf(Config.token);

const stage = new Stage();

const clientMessage = new RegExp('\/start');

var r = 0;

stage.register(top, refusal, tot, say999, say299, say399, say199, say99, say149, teh, ttt, forw, test );
bot.use(session());
bot.use(stage.middleware());
bot.hears('Подать заявку', (ctx) => {

    ctx.scene.enter('top');
});
bot.hears('📢Help', (ctx) => {
    ctx.scene.enter('teh');
});
bot.command('Help', (ctx) => {
    ctx.scene.enter('teh');
});
bot.hears('➕Попасть в каталог', (ctx) => {
    const markdown = `
➕*Условия*:

Для бесплатного размещения требуется наличие как минимум *1000* подписчиков на вашем канале,  перед тем как подать заявку, нужно разместить на своем канале ссылку на наш бот-каталог, ссылка должна находиться минимум *24* часа на вашем канале, не обязательно держать ее в *ТОП*е.

\`Для каналов с подписчиками от\` *100* \`до\` *1000* \`размещение платное, вопросы по размещению писать в\` /Help📢

*Ссылка на бот*: t.me/catalogthebot
`

    ctx.reply(markdown,
        Extra.markup()
            .markdown()
            .webPreview(false)
            .markup((m) =>
                m.keyboard([
                    ['Подать заявку'],
                    ['Отмена']
                ])
                    .resize()
            )
    )

});
bot.hears('💳 1', (ctx) => {
    ctx.scene.enter('say999');
});
bot.hears('✅Подтверждение', (ctx) => {
    const id = ctx.message.chat.id;
    const admin = 549073144;

    if(id === admin) {
        ctx.scene.enter('ttt')
    };
});
bot.hears('🔰Каталог каналов', (ctx) => {
    const markdown = `🔰 *Выберите интересующий вас раздел*:`;
    ctx.reply(markdown, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Технологии',
                        switch_inline_query_current_chat: 'Технологии'
                    },
                    {
                        text: 'Новости и СМИ',
                        switch_inline_query_current_chat: 'Новости и СМИ'
                    }
                ],
                [
                    {
                        text: 'Политика и Экономика',
                        switch_inline_query_current_chat: 'Политика и Экономика'
                    },
                    {
                        text: 'Юмор и Развлечения',
                        switch_inline_query_current_chat: 'Юмор и Развлечения'
                    }
                ],
                [
                    {
                        text: 'Путешествия и Эмиграция',
                        switch_inline_query_current_chat: 'Путешествия и Эмиграция'
                    },
                    {
                        text: 'Мода и Красота',
                        switch_inline_query_current_chat: 'Мода и Красота'
                    }
                ],
                [
                    {
                        text: 'Фильмы и Сериалы',
                        switch_inline_query_current_chat: 'Фильмы и Сериалы'
                    },
                    {
                        text: 'Игры и Приложения',
                        switch_inline_query_current_chat: 'Игры и Приложения'
                    }
                ],
                [
                    {
                        text: 'Лингвистика',
                        switch_inline_query_current_chat: 'Лингвистика'
                    },
                    {
                        text: 'Литература',
                        switch_inline_query_current_chat: 'Литература'
                    }
                ],
                [
                    {
                        text: '➡️',
                        callback_data: 'next'
                    }
                ]

            ],


        },

    })
});
bot.hears('♻️Share', (ctx) => {

});
bot.hears('/money', (ctx) => {
    const markdown = `
💳 *Платные услуги*

\`Рассылка по подписчикам бота\` - *699* ₽.
`;

    bot.telegram.sendMessage(ctx.message.chat.id, markdown, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Заказать ₽',
                        callback_data: 'many'
                    }
                ],

            ]
        }
    })
});
bot.hears('🔑Админка', (ctx) => {

    const id = ctx.message.chat.id;
    const admin = 549073144;

    if(id === admin) {
        const markdown = `
\`Число нажатий на '/start'\` *${r}* \`раз(а).\`        
        `;
        ctx.telegram.sendMessage(ctx.message.chat.id, markdown, {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['🔄Рассылка', '🔄Forward'],
                    ['✅Подтверждение', 'Тест', '❌Отказ'],
                    ['Назад']

                ],
                resize_keyboard: true
            }
        })
    }
});
bot.hears('🔄Рассылка', stepHandler, (ctx) => {
    const id = ctx.message.chat.id;
    const admin = 549073144;

    if(id === admin) {
        ctx.scene.enter('tot')
    };
});
bot.hears('🔄Forward', stepHandler, (ctx) => {
    const id = ctx.message.chat.id;
    const admin = 549073144;

    if(id === admin) {
        ctx.scene.enter('forw')
    };
});
bot.hears('Тест', stepHandler, (ctx) => {
    const id = ctx.message.chat.id;
    const admin = 549073144;

    if(id === admin) {
        ctx.scene.enter('test')
    }
});
bot.hears('❌Отказ', (ctx) => {
    const id = ctx.message.chat.id;
    const admin = 549073144;

    if(id === admin) {
        ctx.scene.enter('refusal')
    }
});
bot.hears('Назад', stepHandler, (ctx) => {

    const id = ctx.message.chat.id;
    const admin = 549073144;

    if(id === admin) {
        ctx.telegram.sendMessage(ctx.message.chat.id, `...`, {
            reply_markup: {
                keyboard: [
                    ['🔰Каталог каналов'],
                    ['📊Статистика', '➕Попасть в каталог'],
                    ['📢Help', '👍🏻Like'],
                    ['🔑Админка']
                ],
                resize_keyboard: true
            },
            disable_notification: false
        })
    }else{
        ctx.telegram.sendMessage(ctx.message.chat.id, `...`, {
            reply_markup: {
                keyboard: [
                    ['🔰Каталог каналов'],
                    ['📊Статистика', '➕Попасть в каталог'],
                    ['📢Help', '👍🏻Like']
                ],
                resize_keyboard: true
            },
            disable_notification: false
        })
    }
});
bot.hears('Отмена', stepHandler, (ctx) => {

    const id = ctx.message.chat.id;
    const admin = 549073144;

    if(id === admin) {
        ctx.telegram.sendMessage(ctx.message.chat.id, `...`, {
            reply_markup: {
                keyboard: [
                    ['🔰Каталог каналов'],
                    ['📊Статистика', '➕Попасть в каталог'],
                    ['📢Help', '👍🏻Like'],
                    ['🔑Админка']
                ],
                resize_keyboard: true
            },
            disable_notification: false
        })
    }else{
        ctx.telegram.sendMessage(ctx.message.chat.id, `...`, {
            reply_markup: {
                keyboard: [
                    ['🔰Каталог каналов'],
                    ['📊Статистика', '➕Попасть в каталог'],
                    ['📢Help', '👍🏻Like']
                ],
                resize_keyboard: true
            },
            disable_notification: false
        })
    }
});
bot.hears('📊Статистика', (ctx) => {
    like.findById("5c5848083fcd5f1d4492670d", function (err, s) {

    const markdown =
        `
\`Аудитория каталога\`:  *${s.number}* подписчиков.

🔼\`Средний прирост в сутки\`:  *+0.24%*
🔽\`Средний отток в сутки\`:  *-0.11%*
        `;
    ctx.reply(markdown,{
        parse_mode: 'Markdown'
    })
    });
});
bot.hears('👍🏻Like', stepHandler, (ctx) => {

    like.findById('5c5848083fcd5f1d4492610d' ,function(err, doc) {
        const markdown = `
🤖 *Дайте оценку нашему бот-каталогу!*

\`Мы будем вам очень благодарны!\`

       
        `;
        ctx.reply(markdown,{
            parse_mode:'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: `👍🏻 ${doc.like1}`,
                            callback_data: 'one'
                        },
                        {
                            text: `👎🏻 ${doc.like2}`,
                            callback_data: 'two'
                        }
                    ],
                ]
            }
        })
    });

});
db.on('error', err => {
    console.log('error', err)
});

db.once('open', () => {
    console.log('we are connected')
});

bot.hears('3', stepHandler, (ctx) => {


    const user = userbase({
        id_user: ctx.message.chat.id,
        nameChannel: 3});

    user.save(() => {
        ctx.reply('This channel saved');

    })



});
bot.hears(clientMessage, (message) => {


    r++;
    const id = message.chat.id;

    if(id === Config.admin){
        const markdown = `
Добро пожаловать *${message.from.first_name}*!
`;

        bot.telegram.sendMessage(message.chat.id, markdown, {
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['🔰Каталог каналов'],
                    ['📊Статистика', '➕Попасть в каталог'],
                    ['📢Help', '👍🏻Like'],
                    ['🔑Админка']
                ],
                resize_keyboard: true
            },
        })
    }
    else{
        Logger.notify('Sending message from the default handler ');
        const clientInfo = BotUtils.getClientInfo(message);


        UserService.saveUser(clientInfo, function (saveErr,) {
            if (saveErr) {
                bot.telegram.sendMessage(clientInfo.telegramId, 'Some error! Sorry',);
                return;
            }
                const markdown = `
*Добро пожаловать*, ${clientInfo.userName}!
`;

                bot.telegram.sendMessage(clientInfo.telegramId, markdown, {
                    parse_mode: 'Markdown',
                    reply_markup: {
                        keyboard: [
                            ['🔰Каталог каналов'],
                            ['📊Статистика', '➕Попасть в каталог'],
                            ['📢Help', '👍🏻Like']
                        ],
                        resize_keyboard: true
                    },
                });
        });
    }
});
bot.on('message', ctx => {

    const id = ctx.message.chat.id;
    const admin = 549073144;

    const forward = ctx.message.reply_to_message;

    if (forward && id === Config.admin) {
        const text1 = ctx.message.reply_to_message.text;
        const text = ctx.message.text;
        const markdown =`
📥*Ответ на ваш вопрос*:

"\`${text1}\`"

▪️ ${text}
`;

        const id = ctx.message.reply_to_message.forward_from.id;

        ctx.telegram.sendMessage(ctx.message.chat.id=`${id}`, markdown,{
            parse_mode: 'Markdown'
        });
        console.log(ctx.message.reply_to_message.text)
    }
    console.log(ctx.message)

});
bot.on('inline_query', (ctx) => {

    // function memberUpdate() {
    //     user_base.getAll(function (err, users) {
    //
    //         users.forEach(function (user) {
    //
    //             var regular = /@/g;
    //             var sign = '';
    //
    //             needle.get(`t.me/${user.channel.replace(regular, sign)}`, function(err, res) {
    //
    //                 if (err) throw err;
    //                 var $ = cheerio.load(res.body);
    //                 var member = $('.tgme_page_extra').text().replace(/\D+/g, "");
    //
    //                 SaveChannel.updateMany({members: user.members}, {members: member}, function (err, doc) {
    //                     console.log(doc)
    //                 });
    //             });
    //         });
    //     });
    // }

    const query = ctx.update.inline_query.query;
    const offset = ctx.inlineQuery.offset || 0;



    if(query == 'Технологии'){categories(technology)}
    else if(query == 'Новости и СМИ'){categories(news)}
    else if(query == 'Юмор и Развлечения'){categories(lol)}
    else if(query == 'Путешествия и Эмиграция'){categories(emigrant)}
    else if(query == 'Мода и Красота'){categories(fashion)}
    else if(query == 'Фильмы и Сериалы'){categories(films)}
    else if(query == 'Игры и Приложения'){categories(games)}
    else if(query == 'Лингвистика'){categories(linguistics)}
    else if(query == 'Литература'){categories(literature)}
    else if(query == 'Медицина'){categories(medic)}
    else if(query == 'Блоги'){categories(blog)}
    else if(query == 'Цитаты'){categories(quote)}
    else if(query == 'Искусство и Фото'){categories(pictures)}
    else if(query == 'Музыка'){categories(music)}
    else if(query == 'Здоровье и Спорт'){categories(sport)}
    else if(query == 'Для взрослых'){categories(xxx)}
    else if(query == 'Бизнес и стартапы'){categories(money)}
    else if(query == 'Политика и Экономика'){categories(politic)}

    function categories(code) {
        const results = [];
        const results1 = [];
        code.find({}, function (err, doc) {
            var channel = doc.map(elem => elem.channel);
            var name_channel = doc.map(elem => elem.name_channel);
            var info = doc.map(elem => elem.info);
            var members = doc.map(elem => elem.members);
            var regular = /@/g;
            var sign = '';
            console.log(channel);
            for (let sok = 0; sok < info.length; sok++) {

                results1.push({
                    type: 'article',
                    id: sok.toString(),
                    title: `✔️${channel[sok]}`,
                    description: `${channel[sok]}`,
                    input_message_content: {
                        message_text: `
⛔️*Переходя в канал Вы соглашаетесь что вам есть 18 лет!*

[${channel[sok]}](t.me/${channel[sok].replace(regular, sign)})`,
                        parse_mode: 'Markdown',
                    },
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: `↩️Обратно в раздел ${query}`,
                                    switch_inline_query_current_chat: `${query}`
                                }
                            ],
                            [
                                {
                                    text: '🔰В Каталог',
                                    callback_data: 'catalogs'
                                }
                            ]
                        ],
                    }
                });


                results.push({
                    type: 'article',
                    id: sok.toString(),
                    title: `✔️${name_channel[sok]}[${members[sok]}]members`,
                    description: `${info[sok]}`,
                    input_message_content: {
                        message_text: `[${name_channel[sok]}](t.me/${channel[sok].replace(regular, sign)})`,
                        parse_mode: 'Markdown',
                    },
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: `↩️Обратно в раздел ${query}`,
                                    switch_inline_query_current_chat: `${query}`
                                }
                            ],
                            [
                                {
                                    text: '🔰В Каталог',
                                    callback_data: 'catalogs'
                                }
                            ]
                        ],
                    }
                });
            }
            ctx.answerInlineQuery(results.slice(+offset, +offset + 30),  {
                cache_time: 60,
                next_offset: +offset + 30,
                switch_pm_text: `Количество каналов: ${info.length}шт.`,
                switch_pm_parameter: '1234'
            }).catch(err =>{
                if(err.code == 400){
                    ctx.answerInlineQuery(results1.slice(+offset, +offset + 30),  {
                        cache_time: 60,
                        next_offset: +offset + 30,
                        switch_pm_text: `Количество каналов: ${info.length}шт.`,
                        switch_pm_parameter: '1234'
                    })
                }
            });
        }).sort({members: -1});
    }
    console.log(ctx.update)
});
bot.on('callback_query', ctx => {

    const s = ctx.update.callback_query.from.id;
    const query = ctx.callbackQuery.data;

    if (query === 'catalogs') {
        const markdown = `🔰 *Выберите интересующий вас раздел*:`;
        bot.telegram.sendMessage(s, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Технологии',
                            switch_inline_query_current_chat: 'Технологии'
                        },
                        {
                            text: 'Новости и СМИ',
                            switch_inline_query_current_chat: 'Новости и СМИ'
                        }
                    ],
                    [
                        {
                            text: 'Политика и Экономика',
                            switch_inline_query_current_chat: 'Политика и Экономика'
                        },
                        {
                            text: 'Юмор и Развлечения',
                            switch_inline_query_current_chat: 'Юмор и Развлечения'
                        }
                    ],
                    [
                        {
                            text: 'Путешествия и Эмиграция',
                            switch_inline_query_current_chat: 'Путешествия и Эмиграция'
                        },
                        {
                            text: 'Мода и Красота',
                            switch_inline_query_current_chat: 'Мода и Красота'
                        }
                    ],
                    [
                        {
                            text: 'Фильмы и Сериалы',
                            switch_inline_query_current_chat: 'Фильмы и Сериалы'
                        },
                        {
                            text: 'Игры и Приложения',
                            switch_inline_query_current_chat: 'Игры и Приложения'
                        }
                    ],
                    [
                        {
                            text: 'Лингвистика',
                            switch_inline_query_current_chat: 'Лингвистика'
                        },
                        {
                            text: 'Литература',
                            switch_inline_query_current_chat: 'Литература'
                        }
                    ],
                    [
                        {
                            text: '➡️',
                            callback_data: 'next'
                        }
                    ]
                ],

            }
        })
    }
    else if (query === 'backward') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `🔰 *Выберите интересующий вас раздел*:`;
        ctx.editMessageText(markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Технологии',
                            switch_inline_query_current_chat: 'Технологии'
                        },
                        {
                            text: 'Новости и СМИ',
                            switch_inline_query_current_chat: 'Новости и СМИ'
                        }
                    ],
                    [
                        {
                            text: 'Политика и Экономика',
                            switch_inline_query_current_chat: 'Политика и Экономика'
                        },
                        {
                            text: 'Юмор и Развлечения',
                            switch_inline_query_current_chat: 'Юмор и Развлечения'
                        }
                    ],
                    [
                        {
                            text: 'Путешествия и Эмиграция',
                            switch_inline_query_current_chat: 'Путешествия и Эмиграция'
                        },
                        {
                            text: 'Мода и Красота',
                            switch_inline_query_current_chat: 'Мода и Красота'
                        }
                    ],
                    [
                        {
                            text: 'Фильмы и Сериалы',
                            switch_inline_query_current_chat: 'Фильмы и Сериалы'
                        },
                        {
                            text: 'Игры и Приложения',
                            switch_inline_query_current_chat: 'Игры и Приложения'
                        }
                    ],
                    [
                        {
                            text: 'Лингвистика',
                            switch_inline_query_current_chat: 'Лингвистика'
                        },
                        {
                            text: 'Литература',
                            switch_inline_query_current_chat: 'Литература'
                        }
                    ],
                    [
                        {
                            text: '➡️',
                            callback_data: 'next'
                        }
                    ]
                ],
                resize_keyboard:true
            }
        })
    }
    else if (query === 'next') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `🔰 *Выберите интересующий вас раздел*:`;
        ctx.editMessageText(markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Медицина',
                            switch_inline_query_current_chat: 'Медицина'
                        },
                        {
                            text: 'Блоги',
                            switch_inline_query_current_chat: 'Блоги'
                        }
                    ],
                    [
                        {
                            text: 'Цитаты',
                            switch_inline_query_current_chat: 'Цитаты'
                        },
                        {
                            text: 'Искусство и Фото',
                            switch_inline_query_current_chat: 'Искусство и Фото'
                        }
                    ],
                    [
                        {
                            text: 'Музыка',
                            switch_inline_query_current_chat: 'Музыка'
                        },
                        {
                            text: 'Здоровье и Спорт',
                            switch_inline_query_current_chat: 'Здоровье и Спорт'
                        }
                    ],
                    [
                        {
                            text: 'Бизнес и стартапы',
                            switch_inline_query_current_chat: 'Бизнес и стартапы'
                        },
                        {
                            text: 'Для взрослых',
                            switch_inline_query_current_chat: 'Для взрослых'
                        }
                    ],
                    [
                        {
                            text: '⬅️',
                            callback_data: 'backward'
                        }
                    ]
                ],
                resize_keyboard:true
            }
        })
    }

    else if (query === 'many') {
        const markdown = `
            *💳Выберите интересующую Вас функцию:*
            
*1* ➡️\`Рассылка по подписчикам бота\` - *699* ₽.
`;

        ctx.telegram.sendMessage(ctx.chat.id, markdown,{
            parse_mode: 'Markdown',
            reply_markup: {
                keyboard: [
                    ['💳 1'],
                    ['Отмена']
                ],
                resize_keyboard: true
            }
        })

    }

    else if (query === '1') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
            *💳Выберите способ оплаты:*           
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'QIWI.Кошелек',
                            callback_data: 'QIWI1'
                        },
                        {
                            text: 'Яндекс.Деньги',
                            callback_data: 'yandex1'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === '2') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
            *💳Выберите способ оплаты:*
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'QIWI.Кошелек',
                            callback_data: 'QIWI2'
                        },
                        {
                            text: 'Яндекс.Деньги',
                            callback_data: 'yandex2'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === '3') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
            *💳Выберите способ оплаты:*
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'QIWI.Кошелек',
                            callback_data: 'QIWI3'
                        },
                        {
                            text: 'Яндекс.Деньги',
                            callback_data: 'yandex3'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === '4') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
            *💳Выберите способ оплаты:*
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'QIWI.Кошелек',
                            callback_data: 'QIWI4'
                        },
                        {
                            text: 'Яндекс.Деньги',
                            callback_data: 'yandex4'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === '5') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
            *💳Выберите способ оплаты:*
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'QIWI.Кошелек',
                            callback_data: 'QIWI5'
                        },
                        {
                            text: 'Яндекс.Деньги',
                            callback_data: 'yandex5'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === '6') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
            *💳Выберите способ оплаты:*
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'QIWI.Кошелек',
                            callback_data: 'QIWI6'
                        },
                        {
                            text: 'Яндекс.Деньги',
                            callback_data: 'yandex6'
                        }
                    ],
                ]
            }
        })

    }

    else if (query === 'QIWI1') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".

Так же укажите сумму: *699* ₽.
`;

        ctx.editMessageText(markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {

                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=699'
                        }
                        ],
                    [
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === 'QIWI2') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".

Так же укажите сумму: *299* ₽.
`;

        ctx.editMessageText(markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {

                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=299'
                        }
                    ],
                    [
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === 'QIWI3') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".

Так же укажите сумму: *399* ₽.
`;

        ctx.editMessageText(markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {

                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=399'
                        }
                    ],
                    [
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === 'QIWI4') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".

Так же укажите сумму: *199* ₽.
`;

        ctx.editMessageText(markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {

                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=199'
                        }
                    ],
                    [
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === 'QIWI5') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".

Так же укажите сумму: *99* ₽.
`;

        ctx.editMessageText(markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {

                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=99'
                        }
                    ],
                    [
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === 'QIWI6') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".

Так же укажите сумму: *149* ₽.
`;

        ctx.editMessageText(markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {

                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=79872132562&amountInteger=149'
                        }
                    ],
                    [
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }

    else if (query === 'yandex1') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://money.yandex.ru/to/410014917439508/699'
                        },
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === 'yandex2') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://money.yandex.ru/to/410014917439508/299'
                        },
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === 'yandex3') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://money.yandex.ru/to/410014917439508/399'
                        },
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === 'yandex4') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://money.yandex.ru/to/410014917439508/199'
                        },
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === 'yandex5') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://money.yandex.ru/to/410014917439508/99'
                        },
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }
    else if (query === 'yandex6') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
*💳Оплата*:

Воизбежания проблем в графе "*комментарии к платежу*" укажите Ваш канал в формате "\`@name_channel\`".
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Оплатить ₽',
                            url: 'https://money.yandex.ru/to/410014917439508/149'
                        },
                        {
                            text: 'Оплачено ₽',
                            callback_data: 'say'
                        }
                    ],
                ]
            }
        })

    }

    else if (query === 'refusal') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
          
\`Если Вы получили отказ, то на вашем канале явно минимум\` *1000* \`подписчиков, или же Вы просто не выполнили условия для размещения. 

⚠️Выполните все условия для размещения и заново подайте заявку.\`
`;

        ctx.editMessageText( markdown,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown'
        })

    }

    else if (query === 'one') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const id = chatId;

        const user = like({name: id });

        like.findOne({'name': id },function(err, doc) {

            if(doc != null)
            {
                if(doc.name == id) {
                    ctx.answerCbQuery('Вы уже голосовали')
                }else {
                    ctx.reply('окей');
                }

                console.log(doc.name)
            }
            else if (doc == null) {
                user.save((err, user) => {
                    console.log('good', user)
                });
                like.findById('5c5848083fcd5f1d4492610d' ,function(err, docs) {
                    like.updateOne({'like1': docs.like1}, {'like1': ++docs.like1},function(err, doc) {
                        ctx.editMessageText( `
🤖 *Дайте оценку нашему бот-каталогу!*

\`Спасибо за голос!\``,{
                            parse_mode: 'Markdown',
                            chat_id: chatId,
                            message_id: messageId,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: `👍🏻 ${docs.like1}`,
                                            callback_data: 'on'
                                        },
                                        {
                                            text: `👎🏻 ${docs.like2}`,
                                            callback_data: 'on'
                                        }
                                    ],
                                ]
                            }
                        });
                    });
                });
            }
        });



    }
    else if (query === 'two') {
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const id = chatId;

        const user = like({name: id });

        like.findOne({'name': id },function(err, doc) {

            if(doc != null)
            {
                if(doc.name == id) {
                    ctx.answerCbQuery('Вы уже голосовали')
                }else {
                    ctx.reply('окей');
                }

                console.log(doc.name)
            }
            else if (doc == null) {
                user.save((err, user) => {
                    console.log('good', user)
                });
                like.findById('5c5848083fcd5f1d4492610d' ,function(err, docs) {
                    like.updateOne({'like2': docs.like2}, {'like2': ++docs.like2},function(err, doc) {
                        ctx.editMessageText( `
🤖 *Дайте оценку нашему бот-каталогу!*

\`Спасибо за голос!\``,{
                            parse_mode: 'Markdown',
                            chat_id: chatId,
                            message_id: messageId,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            text: `👍🏻 ${docs.like1}`,
                                            callback_data: 'on'
                                        },
                                        {
                                            text: `👎🏻 ${docs.like2}`,
                                            callback_data: 'on'
                                        }
                                    ],
                                ]
                            }
                        });
                        console.log('no', doc.like)
                    });
                });
            }
        });



    }
    else if(query === 'on') {

        ctx.answerCbQuery('Вы уже голосовали')
    }
    // else if (query === 'stats') {
    //
    //     const id = chatId;
    //
    //     competition.find({'number': {$lt : 100000}}, function(err, doc) {
    //
    //         competition.findOne({'number': doc.number < 40} ,function(err, docs) {
    //             ctx.reply('good');
    //             console.log('вaaaaaat', docs)
    //         }).limit(4);
    //         const sak = doc;
    //         const text = sak.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    //         console.log('вот', text)
    //     }).limit(4).sort({number: -1})
    //
    // }


    else{
        const chatId = ctx.callbackQuery.from.id;
        const messageId = ctx.callbackQuery.message.message_id;
        const markdown = `
💳*После проверки платежа модератором, активируется выбранная Вами функция*.
        
\`Проверка длиться в течение 2-ух часов.\``;
        ctx.editMessageText( markdown ,{
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown'
        })}

console.log(ctx.update)
});

bot.on('message', ctx => {
    const id = number.getChatId(ctx);
    var photo = ctx.message.photo;
    const text = ctx.message.text;

        userbase.find({}, function (err, users) {
            users.forEach(function (user) {
                const forward = ctx.message.reply_to_message;
            if (text) {
                    ctx.tg.sendMessage(user.name,  text)
                        .then(function(msg) {
                            // 'msg' is the sent message
                            console.log(msg);
                        })
                        .catch(err => {
                            if (err.code == 403) {
                                userbase.remove({'name': err.on.payload.chat_id}, function (err, result) {
                                })

                            }
                        })
                }
                else if(forward) {
                    const text = ctx.message.text;
                    ctx.tg.sendMessage(user.name, text, {
                        reply_to_message_id: ctx.message.reply_to_message.message_id
                    }).catch(err => {
                        if (err.code == 400) {
                            console.log(err)
                        }
                    });

                }

                });
        });

});

bot.startPolling();

