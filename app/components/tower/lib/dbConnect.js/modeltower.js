import mongoose from 'mongoose';

const TowerSchema = new mongoose.Schema({
  towerType: String,
  width: Number,
  collarDepth: Number,
  collarHeight: Number,
});

export default mongoose.models.Tower || mongoose.model('Tower', TowerSchema);
