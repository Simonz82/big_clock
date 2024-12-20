<h2><span style="text-decoration: underline;"><strong>⌚ Big Clock card for home assistant</strong></span></h2>

<p><img src="example/example1.jpg" alt="" /></p>

<p>Volevo condividere una card che ho creato con l'aiuto delle varie community per visualizzare data, ora e anche un piccolo termometro.</p>

<p dir="auto">Istruzioni:</p>

1. nella cartella packeges copiate il file sensor_time_e_date.yaml
2. nel file sensor.yaml, copiate il contenuto del file sensor.txt modificato in base al nome del vostro paese e il sensore meteo che utilizzate
3. nella cartella www dovete andare ad incollare le immagini per gli sfondi che vi sceglierete voi nel mio caso sono qua: www\orologio\
4. nella card, sicuramente cambiate   - entity: sensor.temp_motta con quello che avete inserito nel file sensor, se volete invece modificare dimensioni, e spostamenti delle varie scritte (date, ora ecc.) modificate queste righe: font-size: 800%, left: 50%, top: 64% per ogni entità.
5. il parametro font-family: dovete andare a personalizzarlo con un font a vostra scelta, io ho scelto questo: Days One, per abilitarlo seguire questa guida: https://www.youtube.com/watch?v=p6HAxsEGe9M
6. in HA create una card manuale e incollate il contenuto del file: big_clock_card.txt
7. se non interessa la temperatura esterna, eliminare da riga 37 a riga 46

Risultato finale:

<p><img src="example/example1.jpg" alt="" /></p>

<p><img src="example/example2.jpg" alt="" /></p>

<p><img src="example/example3.jpg" alt="" /></p>


Avendo un Tablet da 15.6" (questo in particolare: https://amzn.to/40ofjsl)
ho utilizzato FULLY KIOSK BROWSER per abilitare lo screen saver con link a una della dashboard di HA, questa dashboard è stata disegnata così a tutto schermo:
1. creare nuova dashboard, tipo di visualizzione: SEZIONI, Titolo: Orologio, Icona: mdi:clock-check-outline, URL: orologio, numero massimo di colonne 8, salvare
2. copiare e incollare le cartelle con le immagini animate e sfondo nero: www/images, www/orologio, www/weather_icons
3. in HA create una card manuale e incollate il contenuto del file: big_clock_card full screen.txt
4. riaprire la modifica della card, nella sezione LAYOUT andare a flagare: Scheda a tutta larghezza
5. adattare le entità temperature alle vostre personali, e nel caso anche le misure dei vari oggetti in base alle dimensioni del vostro tablet


Risultato finale:

<p><img src="example/example4.gif" alt="" /></p>


<p>Enjoy!</p>

----------------------------------------
<p>Would you like to give me a hand?<br />The content of this page is completely free of charge and the purpose is certainly not to make money.<br />If you would like to lend me a hand to help with expenses and lost time, you have the following ways:</p>

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/C0C713VTGJ)

[![PayPal](https://github.com/Simonz82/desktop-tutorial/blob/main/paypal.svg)](https://www.paypal.com/paypalme/simongmail)

Make your Amazon purchases from this link:

[![Amazon](https://github.com/Simonz82/desktop-tutorial/blob/main/Amazon_logo.png)](https://amzn.to/3XWWTgz)

Join our Telegram channel dedicated to Home Assistant news:

[![Home_Assistant_News](https://github.com/Simonz82/desktop-tutorial/blob/main/home_assistant_news.jpg)](https://t.me/Home_Assistant_News)

Join our Telegram channel dedicated to home automation products, there are lots of offers:

[![Offerte Domotica](https://github.com/Simonz82/desktop-tutorial/blob/main/offerte_domotica.jpg)](https://t.me/offerte_domotica_ita)

