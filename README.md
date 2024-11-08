<h2><span style="text-decoration: underline;"><strong>🌤⌚ Big Clock card for home assistant</strong></span></h2>

<p><img src="example/example1.jpg" alt="" /></p>

<p><img src="example/example2.jpg" alt="" /></p>

<p>Volevo condividere una scheda che ho creato con l'aiuto delle varie community per visualizzare data, ora e anche un piccolo termometro.</p>

<p dir="auto">Instructions:</p>

da Hacs, installare:
1. button-card
2. layout-card

poi ...
1. nella cartella packeges copiate il file sensor_time_e_date.yaml
2. nella cartella www dovete andare ad incollare le immagini per gli sfondi: www\orologio\
3. in HA create una card manuale e incollate il contenuto del file: big_clock_card.yaml
4. Temperatura interna, modificare l'entità con la vostra alla riga 66 (io ho messo il sensore di temperatura del mio salone)
5. Temperatura esterna, modificare l'entità con la vostra alla riga 69 e 75 se avete un altro servizio di meteo (io ho usato weather.forecast)
6. per gli allineamenti e dimensioni dovete eventualmente modificare i parametri alle righe CARD, NAME, LABEL per i 3 blocchi: data, ora e meteo


<p>Enjoy!</p>

----------------------------------------
<p>Would you like to give me a hand?<br />The content of this page is completely free of charge and the purpose is certainly not to make money.<br />If you would like to lend me a hand to help with expenses and lost time, you have the following ways:</p>

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C713VTGJ)

[![PayPal](https://github.com/Simonz82/desktop-tutorial/blob/main/paypal.svg)](https://www.paypal.com/paypalme/simongmail)

Make your Amazon purchases from this link:

[![Amazon](https://github.com/Simonz82/desktop-tutorial/blob/main/Amazon_logo.jpg)](https://amzn.to/3XWWTgz)

Join our Telegram channel dedicated to Home Assistant news:

[![Home_Assistant_News](https://github.com/Simonz82/desktop-tutorial/blob/main/home_assistant_news.jpg)](https://t.me/Home_Assistant_News)

Join our Telegram channel dedicated to home automation products, there are lots of offers:

[![Offerte Domotica](https://github.com/Simonz82/desktop-tutorial/blob/main/offerte_domotica.jpg)](https://t.me/offerte_domotica_ita)

