const mongoose = require('mongoose');
const Industry = require('./models/Industry');
require('dotenv').config();

const sampleIndustries = [
  {
    industryName: "Garment Exporters Rajasthan",
    industryType: "Textile Manufacturing",
    contactPerson: "Rajesh Kumar",
    email: "exporj@gmail.com",
    phoneNumber: "+91-141-2224380",
    phone2: "",
    address: "718, 5th Floor, Anchor Mall, Ajmer Road, Jaipur - 302006",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    website: "https://garment-india.com",
    industryDescription: "Leading garment exporters specializing in traditional and contemporary designs",
    industryLogo: "https://garment-india.com/images/logo.png",
    url: "https://garment-india.com/contact-us.php"
  },
  {
    industryName: "Tech Solutions India",
    industryType: "Information Technology",
    contactPerson: "Priya Sharma",
    email: "contact@techsolutions.in",
    phoneNumber: "+91-11-45678901",
    phone2: "+91-11-45678902",
    address: "B-45, Sector 62, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    country: "India",
    website: "https://techsolutions.in",
    industryDescription: "Providing comprehensive IT solutions and software development services",
    industryLogo: "",
    url: "https://techsolutions.in/about"
  },
  {
    industryName: "Green Energy Corp",
    industryType: "Renewable Energy",
    contactPerson: "Amit Patel",
    email: "info@greenenergy.in",
    phoneNumber: "+91-22-33445566",
    phone2: "",
    address: "Plot 123, MIDC Industrial Area, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    website: "https://greenenergy.in",
    industryDescription: "Specializing in solar and wind energy solutions for sustainable development",
    industryLogo: "",
    url: "https://greenenergy.in/contact"
  },
  {
    industryName: "AgriTech Innovations",
    industryType: "Agriculture Technology",
    contactPerson: "Sunita Reddy",
    email: "support@agritech.com",
    phoneNumber: "+91-40-56789012",
    phone2: "+91-40-56789013",
    address: "Hitech City, Hyderabad - 500081",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    website: "https://agritech.com",
    industryDescription: "Developing innovative agricultural technologies for modern farming",
    industryLogo: "",
    url: "https://agritech.com/contact-us"
  },
  {
    industryName: "PharmaCare Laboratories",
    industryType: "Pharmaceuticals",
    contactPerson: "Dr. Vikram Singh",
    email: "vikram@pharmacare.in",
    phoneNumber: "+91-33-44556677",
    phone2: "",
    address: "Salt Lake City, Kolkata - 700091",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    website: "https://pharmacare.in",
    industryDescription: "Research and development of pharmaceutical products and medicines",
    industryLogo: "",
    url: "https://pharmacare.in/careers"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/industry-management');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Industry.deleteMany({});
    console.log('Cleared existing industries');

    // Insert sample data
    const industries = await Industry.insertMany(sampleIndustries);
    console.log(`Inserted ${industries.length} sample industries`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedDatabase();