import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://www.visioncine-1.com/movies');
    const $ = cheerio.load(data);
    const categories = [];

    $('.category-item').each((i, el) => {
      const category = $(el).text().trim();
      categories.push(category);
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao buscar categorias' });
  }
}
