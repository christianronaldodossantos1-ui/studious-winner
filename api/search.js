import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Parâmetro de busca "q" é obrigatório' });
  }

  try {
    const { data } = await axios.get(`https://visioncine-2.com/?s=${q}`);
    const $ = cheerio.load(data);
    const results = [];

    $('.movie-item').each((i, el) => {
      const title = $(el).find('.movie-title').text().trim();
      const link = $(el).find('a').attr('href');
      const thumb = $(el).find('img').attr('src');
      const year = $(el).find('.movie-year').text().trim();
      const category = $(el).find('.movie-category').text().trim();

      results.push({ title, link, thumb, year, category });
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar resultados' });
  }
}
