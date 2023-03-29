//=== Google Social Icons ===

// source https://famepilot.com/how-to-add-social-media-links-to-google-my-business-listing-in-serp/#:~:text=To%20add%20Social%20Media%20Profiles,That's%20it!
export const googleBusinessSocialLinksAttach = () => {
  return {
    __html: `{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "inamwebsolutions",
  "image": "https://res.cloudinary.com/inam6530/image/upload/v1667486202/inamwebsolutions/Inam_n9s4i4.svg",
  "@id": "",
  "url": "www.inamwebsolutions.com",
  "telephone": "4165606790",
  "priceRange": "1000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "86 cedar street",
    "addressLocality": "kitchener",
    "addressRegion": "ON",
    "postalCode": "n2g 3l8",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.4451227,
    "longitude": -80.4859651
  } ,
  "sameAs": [
    "https://www.facebook.com/inamwebsolutions",
    "https://twitter.com/Inamulrehmn",
    "https://www.instagram.com/inamwebsolutions/",
    "https://www.linkedin.com/in/Inamwebsolutions/",
    "https://www.inamwebsolutions.com/"
  ] 
}
  `,
  }
}

//=== Single Product ====

// https://nextjs.org/learn/seo/rendering-and-ranking/metadata

export const productInformationJson = () => {
  return {
    __html: `{
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Executive Anvil",
      "image": [
        "https://example.com/photos/1x1/photo.jpg",
        "https://example.com/photos/4x3/photo.jpg",
        "https://example.com/photos/16x9/photo.jpg"
       ],
      "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
      "sku": "0446310786",
      "mpn": "925872",
      "brand": {
        "@type": "Brand",
        "name": "ACME"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Fred Benson"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.4",
        "reviewCount": "89"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://example.com/anvil",
        "priceCurrency": "USD",
        "price": "119.99",
        "priceValidUntil": "2020-11-20",
        "itemCondition": "https://schema.org/UsedCondition",
        "availability": "https://schema.org/InStock"
      }
    }
  `,
  }
}
