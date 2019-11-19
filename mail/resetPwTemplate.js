const resetPwTemplate = link => `<div style="padding: 30px 50px 50px; text-align: center; background: #fff; max-width: 600px; margin: 0 auto 15px; box-shadow: 0 0 5px 0px rgba(0,0,0,0.4)">
                                  <a href=${"http://localhost:3000/nytt-losenord/" +
                                    link} style="word-wrap: none; text-decoration: none; font-size: 16px; font-weight: bold; background: #6C80C5; color: #fff; padding: 15px 30px; border-radius: 100px; opacity: 0.8; margin-top: 40px;">Klicka här för att återställa lösenord</a></div>`

module.exports = resetPwTemplate
