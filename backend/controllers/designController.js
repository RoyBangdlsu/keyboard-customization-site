import Design from '../models/Design.js'; // Import the Design model

// Save a design
export const saveDesign = async (req, res) => {
  try {
    const { 
      userEmail, 
      designName, 
      layout, 
      bodyColor, 
      keycapsColor, 
      switchType, 
      keycapBrand, 
      keyboardImage,
      keyAddOns,
      caseFoam,
      PEFoam,
      numTapeLayer
    } = req.body;

    const newDesign = new Design({
      userEmail,
      designName,
      layout,
      bodyColor,
      keycapsColor,
      switchType,
      keycapBrand,
      keyboardImage,
      keyAddOns: keyAddOns || "{}", // Default empty object if not provided
      caseFoam: caseFoam || "No", // Default "No" if not provided
      PEFoam: PEFoam || "No", // Default "No" if not provided
      numTapeLayer: numTapeLayer || 0 // Default 0 if not provided
    });

    // Save the design to the database
    await newDesign.save();

    res.status(201).json({ 
      message: 'Design saved successfully', 
      design: newDesign 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to save design',
      error: error.message 
    });
  }
};

// Load all designs for a user
export const loadDesigns = async (req, res) => {
  try {
    const { userEmail } = req.params;

    // Find all designs for the user
    const designs = await Design.find({ userEmail });

    // Ensure backward compatibility by adding default values for new fields
    const processedDesigns = designs.map(design => ({
      ...design._doc,
      keyAddOns: design.keyAddOns || "{}",
      caseFoam: design.caseFoam || "No",
      PEFoam: design.PEFoam || "No",
      numTapeLayer: design.numTapeLayer || 0
    }));

    res.status(200).json({ 
      designs: processedDesigns 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to load designs',
      error: error.message 
    });
  }
};

export const deleteDesign = async (req, res) => {
  try {
    const { designId } = req.params;

    // Find and delete the design by ID
    const deletedDesign = await Design.findByIdAndDelete(designId);

    if (!deletedDesign) {
      return res.status(404).json({ 
        message: 'Design not found' 
      });
    }

    res.status(200).json({ 
      message: 'Design deleted successfully',
      deletedDesign 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to delete design',
      error: error.message 
    });
  }
};