const express = require('express');
const path = require('path');
const beachData = require('./data.js');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 3000;

// Static route to serve images
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
// Helper function to generate full URLs for image paths
const generateFullImageUrl = (req, imagePath) => `${req.protocol}://${req.get('host')}${imagePath}`;

// Get all beaches
app.get('/api/beaches', (req, res) => {
  const updatedBeachData = beachData.map(beach => ({
    ...beach,
    photos: {
      beach: beach.photos.beach.map(photo => generateFullImageUrl(req, photo)),
    },
    seafood: beach.seafood.map(item => ({
      ...item,
      photo: generateFullImageUrl(req, item.photo),
    })),
    stays: beach.stays.map(stay => ({
      ...stay,
      photo: generateFullImageUrl(req, stay.photo),
    })),
    attractions: beach.attractions.map(attraction => ({
      ...attraction,
      photo: generateFullImageUrl(req, attraction.photo),
    }))
  }));

  res.json(updatedBeachData);
});

// Search for beaches by name
app.get('/api/beaches/search/:name', (req, res) => {
  const searchTerm = req.params.name.toLowerCase();
  const matchingBeaches = beachData.filter(beach =>
    beach.name.toLowerCase().includes(searchTerm)
  );

  if (matchingBeaches.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No beaches found matching your search'
    });
  }

  const structuredResponse = {
    success: true,
    count: matchingBeaches.length,
    results: matchingBeaches.map(beach => ({
      id: beach.id,
      name: beach.name,
      location: beach.location,
      activities: beach.activities,
      beachPhotos: beach.photos.beach.map(photo => generateFullImageUrl(req, photo)),
      seafood: beach.seafood.map(item => ({
        ...item,
        photo: generateFullImageUrl(req, item.photo),
      })),
      stays: beach.stays.map(stay => ({
        ...stay,
        photo: generateFullImageUrl(req, stay.photo),
      })),
      attractions: beach.attractions.map(attraction => ({
        ...attraction,
        photo: generateFullImageUrl(req, attraction.photo),
      })),
      bestTimeToVisit: beach.bestTimeToVisit,
      weatherInfo: beach.weatherInfo
    }))
  };

  res.json(structuredResponse);
});

// Get a beach by ID
app.get('/api/beaches/:id', (req, res) => {
  const beach = beachData.find(b => b.id === parseInt(req.params.id));
  if (!beach) {
    return res.status(404).json({ message: 'Beach not found' });
  }

  const formattedBeach = {
    id: beach.id,
    name: beach.name,
    location: beach.location,
    activities: beach.activities,
    beachPhotos: beach.photos.beach.map(photo => generateFullImageUrl(req, photo)),
    seafood: beach.seafood.map(item => ({
      ...item,
      photo: generateFullImageUrl(req, item.photo),
    })),
    stays: beach.stays.map(stay => ({
      ...stay,
      photo: generateFullImageUrl(req, stay.photo),
    })),
    attractions: beach.attractions.map(attraction => ({
      ...attraction,
      photo: generateFullImageUrl(req, attraction.photo),
    })),
    bestTimeToVisit: beach.bestTimeToVisit,
    weatherInfo: beach.weatherInfo
  };

  res.json(formattedBeach);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
