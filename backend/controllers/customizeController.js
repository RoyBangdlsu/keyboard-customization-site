export const customizeKeyboard = async (req, res) => {
    try {
      const { keycaps, switches, layout } = req.body;
      res.status(201).json({ message: "Customization saved", keycaps, switches, layout });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  