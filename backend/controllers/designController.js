import Design from '../models/Design.js'; // Import the Design model

// Save a design
export const saveDesign = async (req, res) => {
  try {
    const { userEmail, designName, layout, bodyColor, keycapsColor, switchType, keycapBrand, keyboardImage } = req.body;

    const newDesign = new Design({
      userEmail: userEmail,
      designName: designName,
      layout: layout,
      bodyColor: bodyColor,
      keycapsColor: keycapsColor,
      switchType: switchType,
      keycapBrand: keycapBrand,
      keyboardImage: keyboardImage},
    );

    // Save the design to the database
    await newDesign.save();

    res.status(201).json({ message: 'Design saved successfully', newDesign });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Load all designs for a user
export const loadDesigns = async (req, res) => {
  try {
    const { userEmail } = req.params;

    // Find all designs for the user
    const designs = await Design.find({ userEmail });

    res.status(200).json({ designs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDesign = async (req, res) => {
  try {
    const { designId } = req.params;

    // Find and delete the design by ID
    const deletedDesign = await Design.findByIdAndDelete(designId);

    if (!deletedDesign) {
      return res.status(404).json({ message: 'Design not found' });
    }

    res.status(200).json({ message: 'Design deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
