# Skulptur

Decentralized Google Forms built with Ceramic.

![](screenshot.png)

## Integration with other projects

```js
import model from "@skulptur/model"

// Get all responses for all forms as a mapping: [formId]: responseId
await dataStore.get(model.definitions.formResponses, model.did)

// Get all created forms for authenticated DID
await dataStore.get(model.definitions.forms)

// Get all responses for authenticated DID
await dataStore.get(model.definitions.responses)

// Load content of Tile
await TileDocument.load(ceramic, "StreamID")
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
