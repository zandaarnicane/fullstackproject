import { Product, Category } from '../types';

export const mockProducts: Product[] = [
  {
    id: "huarache-x-stussy-le",
    name: "Nike Air Huarache Le",
    inStock: true,
    gallery: [
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087"
    ],
    description: "Great sneakers for everyday use!",
    category: "clothes",
    attributes: [
      {
        id: "Size",
        name: "Size",
        type: "text",
        items: [
          { displayValue: "40", value: "40", id: "40" },
          { displayValue: "41", value: "41", id: "41" },
          { displayValue: "42", value: "42", id: "42" },
          { displayValue: "43", value: "43", id: "43" }
        ]
      },
      {
        id: "Color",
        name: "Color",
        type: "swatch",
        items: [
          { displayValue: "Green", value: "#44FF03", id: "Green" },
          { displayValue: "Cyan", value: "#03FFF7", id: "Cyan" },
          { displayValue: "Blue", value: "#030BFF", id: "Blue" }
        ]
      }
    ],
    prices: [{ currency: "USD", amount: 144.69 }],
    brand: "Nike x Stussy"
  },
  {
    id: "jacket-canada-goosee",
    name: "Jacket",
    inStock: true,
    gallery: [
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg",
      "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png",
      "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png"
    ],
    description: "Awesome winter jacket",
    category: "clothes",
    attributes: [
      {
        id: "Size",
        name: "Size",
        type: "text",
        items: [
          { displayValue: "Small", value: "S", id: "Small" },
          { displayValue: "Medium", value: "M", id: "Medium" },
          { displayValue: "Large", value: "L", id: "Large" },
          { displayValue: "Extra Large", value: "XL", id: "Extra Large" }
        ]
      }
    ],
    prices: [{ currency: "USD", amount: 518.47 }],
    brand: "Canada Goose"
  },
  {
    id: "ps-5",
    name: "PlayStation 5",
    inStock: false,
    gallery: [
      "https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg"
    ],
    description: "A good gaming console. Plays games of PS4! Enjoy!",
    category: "tech",
    attributes: [
      {
        id: "Color",
        name: "Color",
        type: "swatch",
        items: [
          { displayValue: "Green", value: "#44FF03", id: "Green" },
          { displayValue: "Cyan", value: "#03FFF7", id: "Cyan" },
          { displayValue: "Blue", value: "#030BFF", id: "Blue" },
          { displayValue: "Black", value: "#000000", id: "Black" },
          { displayValue: "White", value: "#FFFFFF", id: "White" }
        ]
      },
      {
        id: "Capacity",
        name: "Capacity",
        type: "text",
        items: [
          { displayValue: "512G", value: "512G", id: "512G" },
          { displayValue: "1T", value: "1T", id: "1T" }
        ]
      }
    ],
    prices: [{ currency: "USD", amount: 844.02 }],
    brand: "Sony"
  },
  {
    id: "xbox-series-s",
    name: "Xbox Series S 512GB",
    inStock: true,
    gallery: [
      "https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg"
    ],
    description: "<div>\n    <ul>\n        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>       <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>       <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>       <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>\n        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>       <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li>       <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li>    </ul></div>",
    category: "tech",
    attributes: [
      {
        id: "Color",
        name: "Color",
        type: "swatch",
        items: [
          { displayValue: "Green", value: "#44FF03", id: "Green" },
          { displayValue: "Cyan", value: "#03FFF7", id: "Cyan" },
          { displayValue: "Blue", value: "#030BFF", id: "Blue" },
          { displayValue: "Black", value: "#000000", id: "Black" },
          { displayValue: "White", value: "#FFFFFF", id: "White" }
        ]
      },
      {
        id: "Capacity",
        name: "Capacity",
        type: "text",
        items: [
          { displayValue: "512G", value: "512G", id: "512G" },
          { displayValue: "1T", value: "1T", id: "1T" }
        ]
      }
    ],
    prices: [{ currency: "USD", amount: 333.99 }],
    brand: "Microsoft"
  },
  {
    id: "apple-imac-2021",
    name: "iMac 2021",
    inStock: true,
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000"
    ],
    description: "The new iMac!",
    category: "tech",
    attributes: [
      {
        id: "Capacity",
        name: "Capacity",
        type: "text",
        items: [
          { displayValue: "256GB", value: "256GB", id: "256GB" },
          { displayValue: "512GB", value: "512GB", id: "512GB" }
        ]
      },
      {
        id: "With USB 3 ports",
        name: "With USB 3 ports",
        type: "text",
        items: [
          { displayValue: "Yes", value: "Yes", id: "Yes" },
          { displayValue: "No", value: "No", id: "No" }
        ]
      },
      {
        id: "Touch ID in keyboard",
        name: "Touch ID in keyboard",
        type: "text",
        items: [
          { displayValue: "Yes", value: "Yes", id: "Yes" },
          { displayValue: "No", value: "No", id: "No" }
        ]
      }
    ],
    prices: [{ currency: "USD", amount: 1688.03 }],
    brand: "Apple"
  },
  {
    id: "apple-iphone-12-pro",
    name: "iPhone 12 Pro",
    inStock: true,
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1604021663000"
    ],
    description: "This is iPhone 12. Nothing else to say.",
    category: "tech",
    attributes: [
      {
        id: "Capacity",
        name: "Capacity",
        type: "text",
        items: [
          { displayValue: "512G", value: "512G", id: "512G" },
          { displayValue: "1T", value: "1T", id: "1T" }
        ]
      },
      {
        id: "Color",
        name: "Color",
        type: "swatch",
        items: [
          { displayValue: "Green", value: "#44FF03", id: "Green" },
          { displayValue: "Cyan", value: "#03FFF7", id: "Cyan" },
          { displayValue: "Blue", value: "#030BFF", id: "Blue" },
          { displayValue: "Black", value: "#000000", id: "Black" },
          { displayValue: "White", value: "#FFFFFF", id: "White" }
        ]
      }
    ],
    prices: [{ currency: "USD", amount: 1000.76 }],
    brand: "Apple"
  },
  {
    id: "apple-airpods-pro",
    name: "AirPods Pro",
    inStock: false,
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000"
    ],
    description: "<h3>Magic like you've never heard</h3>\n  <p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they're ready to use right out of the case.</p>\n\n  <h3>Active Noise Cancellation</h3>\n  <p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you're listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.</p>\n\n  <h3>Transparency mode</h3>\n  <p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you're talking to people around you.</p>\n\n  <h3>All-new design</h3>\n  <p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>\n\n  <h3>Amazing audio quality</h3>\n  <p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>\n\n  <h3>Even more magical</h3>\n  <p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>",
    category: "tech",
    attributes: [],
    prices: [{ currency: "USD", amount: 300.23 }],
    brand: "Apple"
  },
  {
    id: "apple-airtag",
    name: "AirTag",
    inStock: true,
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000"
    ],
    description: "Lose your knack for losing things. AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack.",
    category: "tech",
    attributes: [],
    prices: [{ currency: "USD", amount: 120.57 }],
    brand: "Apple"
  }
];

export const categories: Category[] = [
  {
    name: "all",
    products: mockProducts
  },
  {
    name: "clothes",
    products: mockProducts.filter(p => p.category === "clothes")
  },
  {
    name: "tech", 
    products: mockProducts.filter(p => p.category === "tech")
  }
];
