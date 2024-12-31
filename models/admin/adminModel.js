import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  runs: {
    type: Number,
    required: true,
  },
  wickets: {
    type: Number,
    required: true,
  },
  currentOver: {
    type: Number,
    required: true,
  },
  currentBallIndex: {
    type: Number,
    required: true,
  },
  currentOverScore: {
    type:[mongoose.Schema.Types.Mixed],
    required: true,
  },
  allOversScoreList: {
    type: [[mongoose.Schema.Types.Mixed]],
    require: true,
  },
}, {
  timestamps: true, 
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
