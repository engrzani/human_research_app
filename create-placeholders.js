// Simple script to create placeholder PNG files for Expo assets
const fs = require('fs');
const path = require('path');

// Minimal 1x1 PNG (dark blue pixel) - will be used as placeholder
// This is a valid minimal PNG file
const minimalPNG = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
  0x00, 0x00, 0x00, 0x0D, // IHDR length
  0x49, 0x48, 0x44, 0x52, // IHDR
  0x00, 0x00, 0x00, 0x01, // width = 1
  0x00, 0x00, 0x00, 0x01, // height = 1
  0x08, // bit depth = 8
  0x02, // color type = RGB
  0x00, 0x00, 0x00, // compression, filter, interlace
  0x90, 0x77, 0x53, 0xDE, // IHDR CRC
  0x00, 0x00, 0x00, 0x0C, // IDAT length
  0x49, 0x44, 0x41, 0x54, // IDAT
  0x08, 0xD7, 0x63, 0x28, 0x39, 0x60, 0x00, 0x00, 0x00, 0x83, 0x00, 0x81, // compressed data (dark blue pixel)
  0x3C, 0x2C, 0x4A, 0xF5, // IDAT CRC
  0x00, 0x00, 0x00, 0x00, // IEND length
  0x49, 0x45, 0x4E, 0x44, // IEND
  0xAE, 0x42, 0x60, 0x82  // IEND CRC
]);

const assetsDir = path.join(__dirname, 'assets');

// Create placeholder images
const files = ['icon.png', 'splash.png', 'adaptive-icon.png', 'favicon.png'];

files.forEach(file => {
  const filePath = path.join(assetsDir, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, minimalPNG);
    console.log(`Created: ${file}`);
  } else {
    console.log(`Already exists: ${file}`);
  }
});

console.log('Done! Placeholder images created.');
