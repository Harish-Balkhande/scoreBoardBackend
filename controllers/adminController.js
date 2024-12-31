import Admin from "../models/admin/adminModel.js";
import { sendScoreUpdate } from "../app.js";

export const saveLiveData = async (req, res) => {
    try {
        const { runs, wickets, over, currentBallIndex, ballScores, rec_id } = req.body;
        console.log("req body : ", req.body);

        // Check if none of the values in ballScores are 0
        const isValidBallScores = ballScores.every(score => score !== 0);

        if (rec_id === 0) {
            // Create new document if rec_id is 0
            const newData = new Admin({
                runs,
                wickets,
                currentOver: over-1,
                currentBallIndex,
                currentOverScore: ballScores, // array
            });

            const isSaved = await newData.save(); // Wait for the document to be saved
            console.log(isSaved);

            if (isSaved) {
                res.status(200).json({ status: "success", rec_id: isSaved._id });
            } else {
                res.status(500).json({ status: "failed", message: "Failed to save new data" });
            }
        } else {
            // Update existing document if rec_id is provided
            const updateData = await Admin.findById(rec_id); // Find the existing document
            if (!updateData) {
                return res.status(404).json({ status: "failed", message: "Record not found" });
            }

            // Update the current values
            updateData.runs = runs;
            updateData.wickets = wickets;
            updateData.currentOver = over-1;
            updateData.currentBallIndex = currentBallIndex;
            updateData.currentOverScore = ballScores;

            // Append the ballScores for the current over to allOversScoreList only if valid
            if (isValidBallScores) {
                updateData.allOversScoreList.push(ballScores);
            }

            // Save the updated document
            const updatedData = await updateData.save();

            if (updatedData) {
                // Emit the updated score to all connected clients via WebSocket
                sendScoreUpdate(updatedData);
                res.status(200).json({ status: "success", rec_id: updatedData._id });
            } else {
                res.status(500).json({ status: "failed", message: "Failed to update data" });
            }
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ status: "failed", message: error.message });
    }
};




// // CREATE a new user
// export const createUser = async (req, res) => {
//   try {
//     const { name, email, age } = req.body;
//     const newUser = new User({
//       name,
//       email,
//       age,
//     });

//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // READ all users
// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // READ a single user by ID
// export const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // UPDATE user by ID
// export const updateUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // DELETE user by ID
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ message: "User deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
