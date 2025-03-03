import Design from '../models/Design.js'; // Import the Design model

// Save a design
export const saveDesign = async (req, res) => {
  try {
    const { userEmail, designName, layout, bodyColor, keycapsColor, switchType, keycapBrand, keyboardImage } = req.body;

    const imageBuffer = Buffer.from(keyboardImage, 'base64');

    const newDesign = new Design({
      userEmail: userEmail,
      designName: designName,
      layout: layout,
      bodyColor: bodyColor,
      keycapsColor: keycapsColor,
      switchType: switchType,
      keycapBrand: keycapBrand,
      keyboardImage: {
        data: imageBuffer, // Store the binary data
        contentType: 'image/png', // Set the MIME type
      },
    });

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

// Load a specific design by ID
export const loadDesignById = async (req, res) => {
  try {
    const { designId } = req.params;

    // Find the design by ID
    const design = await Design.findById(designId);

    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }

    res.status(200).json({ design });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};