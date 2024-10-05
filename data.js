const beachData = [
  {
    id: 1,
    name: "Palolem Beach, Goa",
    location: "South Goa, India",
    activities: [
      "Swimming",
      "Kayaking",
      "Dolphin watching",
      "Sunset yoga",
      "Beach volleyball",
      "Parasailing"
    ],
    photos: {
      beach: ["/images/beaches/pbeach.jpg"],
    },
    seafood: [
      {
        name: "Dropadi Restaurant",
        photo: "/images/seafood/pbeach_seafood1.jpg"
      },
      {
        name: "Art Resort",
        photo: "/images/seafood/pbeach_seafood2.jpg"
      }
    ],
    stays: [
      {
        name: "kings Villa Restaurant",
        photo: "/images/stays/kingsvilla.jpg"
      },
      {
        name: "sobit",
        photo: "/images/stays/sobit.jpg"
      }
    ],
    attractions: [
      {
        name: "Butterfly Island",
        photo: "/images/attractions/piland.jpg"
      },
    ],
    bestTimeToVisit: "November to March",
    weatherInfo: {
      summer: "30-35°C",
      winter: "20-28°C",
      monsoon: "25-30°C"
    }
  }
  // Add more beach objects here
];

module.exports = beachData;
