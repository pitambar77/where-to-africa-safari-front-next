const blogs = [
  {
    _id: "1",

    title: "A Taste of Japan & South Korea",

    slug: "japan-south-korea",

    image:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200",

    publishedDate: "2026-07-30",

    excerpt:
      "Discover the incredible flavors, culture, and traditions of Japan and South Korea on an unforgettable culinary journey.",

    category: {
      name: "Safari",
    },

    author: {
      name: "Tauck",
      image: "https://i.pravatar.cc/150?img=1",
    },

    content: [
      // Section 1
      {
        type: "textImage",
        layout: "right",
        title: "Tokyo – Where Tradition Meets Tomorrow",
        text: [
          "Tokyo is a city where ancient temples stand beside futuristic skyscrapers. Every street offers a unique blend of history, innovation, and unforgettable cuisine.",
          "From the peaceful Meiji Shrine to the vibrant streets of Shibuya, travelers experience both tranquility and excitement in a single day.",
          "Tokyo perfectly blends modern architecture with centuries-old traditions.",
        ],
        image:
          "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200",
      },

      // Full Width Image
      {
        type: "image",
        image:
          "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=1200",
      },

      {
        type: "paragraph",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },

      // Main Heading
      {
        type: "heading",
        text: "Travel Documents And Entry Requirements",
      },

      {
        type: "paragraph",
        text: "Documentation is extremely important. Always check entry requirements before departure as regulations may change without notice.",
      },

      // H3
      {
        type: "heading3",
        text: "You will need:",
      },

      // Checklist
      {
        type: "checkList",
        items: [
          "A passport valid for at least six months.",
          "At least three blank passport pages.",
          "A valid travel insurance policy.",
          "Required visas for your destination.",
        ],
      },

      {
        type: "paragraph",
        text: "Many travelers from Europe, the United States, Canada, Australia and New Zealand do not require a visa for short stays, but requirements may change.",
      },

      {
        type: "heading3",
        text: "You must also carry:",
      },

      {
        type: "checkList",
        items: [
          "Return or onward flight ticket.",
          "Hotel reservation.",
          "Proof of sufficient funds.",
          "Emergency contact details.",
        ],
      },

      {
        type: "heading4",
        text: "Helpful Tips",
      },

      {
        type: "list",
        items: [
          "Keep digital copies of your passport.",
          "Store emergency contacts separately.",
          "Carry local currency for small purchases.",
          "Check airport transfer details before arrival.",
        ],
      },

      // Section 2
      {
        type: "textImage",
        layout: "left",
        title: "Kyoto's Timeless Beauty",
        text: [
          "Kyoto is famous for its bamboo forests, traditional tea houses and centuries-old temples. Walking through the Arashiyama Bamboo Grove creates unforgettable memories. Walking through the Arashiyama Bamboo Grove creates unforgettable memories.",
          "Walking through the Arashiyama Bamboo Grove creates unforgettable memories.",
          "Kyoto is famous for its bamboo forests, traditional tea houses and centuries-old temples Walking through the Arashiyama Bamboo Grove creates unforgettable memories."
        ],
        image:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200",
      },

      // Gallery
      {
        type: "gallery",
        images: [
          "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800",
          "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800",
          "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800",
        ],
        descriptionLeft:
          "Japan's hidden villages and local markets provide authentic cultural experiences unlike anywhere else. The friendships made, meals shared and breathtaking scenery ensured this adventure would never be forgotten.",
        descriptionRight:
          "Whether you're enjoying fresh sushi or admiring Mount Fuji, every day offers unforgettable moments.",
      },

      // Quote
      {
        type: "quote",
        text: "Travel isn't just about seeing new places—it's about experiencing new cultures and creating lifelong memories.",
      },

      // Final Section
      {
        type: "textImage",
        layout: "right",
        title: "The Journey Home",
        text: [
          "From Tokyo to Kyoto and finally Seoul, every destination offered something unique. From Tokyo to Kyoto and finally Seoul, every destination offered something unique. From Tokyo to Kyoto and finally Seoul, every destination offered something unique.",
          "The friendships made, meals shared and breathtaking scenery ensured this adventure would never be forgotten. The friendships made, meals shared and breathtaking scenery ensured this adventure would never be forgotten.",
        ],
        image:
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200",
      },
    ],
  },

  {
    _id: "2",

    title: "Luxury Safari in Tanzania",

    slug: "luxury-safari",

    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200",

    publishedDate: "2026-07-28",

    excerpt:
      "Experience Tanzania's breathtaking wildlife with luxurious lodges and unforgettable game drives.",

    category: {
      name: "Safari",
    },

    author: {
      name: "John",
    },

    content: [
      {
        type: "paragraph",
        text: "The Serengeti and Ngorongoro Crater offer some of Africa's best wildlife experiences.",
      },

      {
        type: "image",
        image:
          "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200",
        caption: "Serengeti National Park",
      },

      {
        type: "paragraph",
        text: "Watch lions, elephants, giraffes, zebras and witness the Great Migration in luxury.",
      },

      {
        type: "gallery",
        images: [
          "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800",
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800",
          "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800",
        ],
      },
    ],
  },

  {
    _id: "3",

    title: "Best European River Cruises",

    slug: "river-cruises",

    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800",

    publishedDate: "2026-07-18",

    excerpt:
      "Cruise through the heart of Europe while exploring charming villages and iconic cities.",

    category: {
      name: "Cruises",
    },

    author: {
      name: "Sarah",
    },

    content: [
      {
        type: "paragraph",
        text: "River cruises are one of the most relaxing ways to explore Europe.",
      },

      {
        type: "image",
        image:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200",
      },

      {
        type: "paragraph",
        text: "Visit Germany, Austria, Hungary and the Netherlands from the comfort of a luxury ship.",
      },
    ],
  },

  {
    _id: "4",
    title: "Ultimate African Safari Guide",
    slug: "african-safari-guide",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200",
    publishedDate: "2026-06-10",
    excerpt:
      "Everything you need to know before planning your first African safari.",
    category: {
      name: "Safari",
    },
    author: {
      name: "Michael",
    },
    content: [
      {
        type: "paragraph",
        text: "A safari is one of the greatest adventures you can experience.",
      },
    ],
  },

  {
    _id: "5",
    title: "Hidden Beaches Around the World",
    slug: "hidden-beaches",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200",
    publishedDate: "2026-05-15",
    excerpt:
      "Escape the crowds and discover secluded beaches across the globe.",
    category: {
      name: "Beach",
    },
    author: {
      name: "Emily",
    },
    content: [
      {
        type: "paragraph",
        text: "From the Maldives to Seychelles, these beaches are paradise.",
      },
    ],
  },

  {
    _id: "6",
    title: "Wildlife Photography Tips",
    slug: "wildlife-photography",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200",
    publishedDate: "2026-04-20",
    excerpt: "Improve your wildlife photography with these expert tips.",
    category: {
      name: "Photography",
    },
    author: {
      name: "Alex",
    },
    content: [
      {
        type: "paragraph",
        text: "Capturing wildlife requires patience, timing, and the right equipment.",
      },
    ],
  },
  {
    _id: "7",

    title: "Best European River Cruises",

    slug: "river-cruisess",

    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800",

    publishedDate: "2026-07-18",

    excerpt:
      "Cruise through the heart of Europe while exploring charming villages and iconic cities.",

    category: {
      name: "Cruises",
    },

    author: {
      name: "Sarah",
    },

    content: [
      {
        type: "paragraph",
        text: "River cruises are one of the most relaxing ways to explore Europe.",
      },

      {
        type: "image",
        image:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200",
      },

      {
        type: "paragraph",
        text: "Visit Germany, Austria, Hungary and the Netherlands from the comfort of a luxury ship.",
      },
    ],
  },

  {
    _id: "8",
    title: "Ultimate African Safari Guide",
    slug: "african-safari-guideee",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200",
    publishedDate: "2026-06-10",
    excerpt:
      "Everything you need to know before planning your first African safari.",
    category: {
      name: "Safari",
    },
    author: {
      name: "Michael",
    },
    content: [
      {
        type: "paragraph",
        text: "A safari is one of the greatest adventures you can experience.",
      },
    ],
  },

  {
    _id: "9",
    title: "Hidden Beaches Around the World",
    slug: "hidden-beachesss",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200",
    publishedDate: "2026-05-15",
    excerpt:
      "Escape the crowds and discover secluded beaches across the globe.",
    category: {
      name: "Beach",
    },
    author: {
      name: "Emily",
    },
    content: [
      {
        type: "paragraph",
        text: "From the Maldives to Seychelles, these beaches are paradise.",
      },
    ],
  },

  {
    _id: "10",
    title: "Wildlife Photography Tips",
    slug: "wildlife-photography",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200",
    publishedDate: "2026-04-20",
    excerpt: "Improve your wildlife photography with these expert tips.",
    category: {
      name: "Photography",
    },
    author: {
      name: "Alex",
    },
    content: [
      {
        type: "paragraph",
        text: "Capturing wildlife requires patience, timing, and the right equipment.",
      },
    ],
  },
  {
    _id: "11",
    title: "Wildlife Photography Tips",
    slug: "wildlife-photographyy",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200",
    publishedDate: "2026-04-20",
    excerpt: "Improve your wildlife photography with these expert tips.",
    category: {
      name: "Photography",
    },
    author: {
      name: "Alex",
    },
    content: [
      {
        type: "paragraph",
        text: "Capturing wildlife requires patience, timing, and the right equipment.",
      },
    ],
  },
  {
    _id: "12",

    title: "Best European River Cruises",

    slug: "river-cruisessee",

    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800",

    publishedDate: "2026-07-18",

    excerpt:
      "Cruise through the heart of Europe while exploring charming villages and iconic cities.",

    category: {
      name: "Cruises",
    },

    author: {
      name: "Sarah",
    },

    content: [
      {
        type: "paragraph",
        text: "River cruises are one of the most relaxing ways to explore Europe.",
      },

      {
        type: "image",
        image:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200",
      },

      {
        type: "paragraph",
        text: "Visit Germany, Austria, Hungary and the Netherlands from the comfort of a luxury ship.",
      },
    ],
  },

  {
    _id: "13",
    title: "Ultimate African Safari Guide",
    slug: "african-safari-guideees",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200",
    publishedDate: "2026-06-10",
    excerpt:
      "Everything you need to know before planning your first African safari.",
    category: {
      name: "Safari",
    },
    author: {
      name: "Michael",
    },
    content: [
      {
        type: "paragraph",
        text: "A safari is one of the greatest adventures you can experience.",
      },
    ],
  },

  {
    _id: "14",
    title: "Hidden Beaches Around the World",
    slug: "hidden-beachesssd",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200",
    publishedDate: "2026-05-15",
    excerpt:
      "Escape the crowds and discover secluded beaches across the globe.",
    category: {
      name: "Beach",
    },
    author: {
      name: "Emily",
    },
    content: [
      {
        type: "paragraph",
        text: "From the Maldives to Seychelles, these beaches are paradise.",
      },
    ],
  },

  {
    _id: "15",
    title: "Wildlife Photography Tips",
    slug: "wildlife-photographyye",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200",
    publishedDate: "2026-04-20",
    excerpt: "Improve your wildlife photography with these expert tips.",
    category: {
      name: "Photography",
    },
    author: {
      name: "Alex",
    },
    content: [
      {
        type: "paragraph",
        text: "Capturing wildlife requires patience, timing, and the right equipment.",
      },
    ],
  },
];

export default blogs;
