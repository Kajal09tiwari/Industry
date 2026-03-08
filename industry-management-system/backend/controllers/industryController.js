const Industry = require('../models/Industry');

// Get all industries with pagination, sorting, and search
exports.getAllIndustries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'createdDate';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const search = req.query.search || '';
    const industryType = req.query.industryType || '';
    const city = req.query.city || '';
    const email = req.query.email || '';
    const contactPerson = req.query.contactPerson || '';

    let query = {};

    if (search) {
      query.$or = [
        { industryName: { $regex: search, $options: 'i' } },
        { industryType: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { contactPerson: { $regex: search, $options: 'i' } }
      ];
    }

    if (industryType) {
      query.industryType = { $regex: industryType, $options: 'i' };
    }
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }
    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }
    if (contactPerson) {
      query.contactPerson = { $regex: contactPerson, $options: 'i' };
    }

    const industries = await Industry.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Industry.countDocuments(query);

    res.status(200).json({
      industries,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalIndustries: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single industry by ID
exports.getIndustryById = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }
    res.status(200).json(industry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new industry
exports.createIndustry = async (req, res) => {
  try {
    const industry = new Industry(req.body);
    const savedIndustry = await industry.save();
    res.status(201).json({ message: 'Industry created successfully', industry: savedIndustry });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Validation Error', errors: error.errors });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Update industry
exports.updateIndustry = async (req, res) => {
  try {
    const industry = await Industry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }
    res.status(200).json({ message: 'Industry updated successfully', industry });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Validation Error', errors: error.errors });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Delete industry
exports.deleteIndustry = async (req, res) => {
  try {
    const industry = await Industry.findByIdAndDelete(req.params.id);
    if (!industry) {
      return res.status(404).json({ message: 'Industry not found' });
    }
    res.status(200).json({ message: 'Industry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};