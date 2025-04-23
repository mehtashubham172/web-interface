import dbConnect from '../../lib/dbConnect';
import Tower from '../../models/Tower';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const tower = new Tower(req.body);
      await tower.save();
      res.status(201).json({ message: 'Tower saved successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
