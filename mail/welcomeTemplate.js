const welcomeTemplate = link => {
  return `<div style="padding: 30px 50px 50px; text-align: center; background: #fff; max-width: 600px; margin: 0 auto 15px; box-shadow: 0 0 5px 0px rgba(0,0,0,0.4)">
            <h1 style="font-weight: bold; color: #003B46;">Välkommen till Pooff!</h1>
            <p style="margin-bottom: 50px; color: #003B46;">Klicka på knappen nedan för att aktivera ditt konto.</p>
            <a href=${"http://localhost:3000/aktivera-konto/" +
              link} style="word-wrap: none; text-decoration: none; font-size: 16px; font-weight: bold; background: #003B46; color: #fff; padding: 15px 30px; border-radius: 100px; opacity: 0.8; margin-top: 40px;">Aktivera konto</a></div>`
}

module.exports = welcomeTemplate
