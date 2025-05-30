const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

// Scrape NBA predictions from ESPN
async function scrapeNBAPredictions() {
  const { data } = await axios.get('https://www.espn.com/nba/predictions');
  const $ = cheerio.load(data);
  
  const predictions = [];
  $('.gamePredictions').each((i, el) => {
    predictions.push({
      homeTeam: $(el).find('.home-team').text(),
      awayTeam: $(el).find('.away-team').text(),
      probability: $(el).find('.win-probability').text()
    });
  });
  
  fs.writeFileSync('data/predictions.json', JSON.stringify(predictions));
}

scrapeNBAPredictions();
