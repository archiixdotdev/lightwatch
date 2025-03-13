const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateOGImage() {
  try {
    await sharp(path.join(__dirname, '../public/og-image.svg'))
      .resize(1200, 630)
      .png()
      .toFile(path.join(__dirname, '../public/og-image.png'));
    console.log('OG image generated successfully!');
  } catch (error) {
    console.error('Error generating OG image:', error);
  }
}

generateOGImage(); 