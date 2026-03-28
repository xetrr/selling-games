# SteamGridDB API Integration & PDF Customization Guide

## 🎮 SteamGridDB API Overview

The SteamGridDB API allows you to fetch game information, artwork, and metadata from their database. This project uses it to dynamically load game data.

### API Endpoints Used

1. **Search Autocomplete**
   ```
   GET https://www.steamgriddb.com/api/v2/search/autocomplete/{query}
   ```
   - Returns game suggestions for a search query
   - No authentication required

2. **Get Game by ID**
   ```
   GET https://www.steamgriddb.com/api/v2/games/id/{steamId}
   ```
   - Get detailed game info by Steam ID
   - Returns: name, release_date, developers, etc.

3. **Get Grid Images**
   ```
   GET https://www.steamgriddb.com/api/v2/grids/game/{gameId}
   ```
   - Get grid artwork for a game
   - Returns array of image objects with URLs

4. **Get Hero Images**
   ```
   GET https://www.steamgriddb.com/api/v2/heroes/game/{gameId}
   ```
   - Get hero/banner artwork

5. **Get Logo Images**
   ```
   GET https://www.steamgriddb.com/api/v2/logos/game/{gameId}
   ```
   - Get logo artwork

## 🔧 How to Use the API in Your Project

### Step 1: Import the Service

```typescript
import { searchGamesByName, searchGameBySteamID, getPopularGames } from "@/services/steamgriddb";
```

### Step 2: Fetch Games

**Option A: Fetch by Search Query**
```typescript
const games = await searchGamesByName("Cyberpunk");
// Returns array of SteamGame objects
```

**Option B: Fetch by Steam ID**
```typescript
const game = await searchGameBySteamID(570); // Dota 2
// Returns single SteamGame object
```

**Option C: Get Popular Games**
```typescript
const games = await getPopularGames();
// Returns array of popular SteamGame objects
```

### Step 3: Use in Your Components

```typescript
import { useEffect, useState } from "react";
import { searchGamesByName } from "@/services/steamgriddb";

export default function MyComponent() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await searchGamesByName("Witcher");
        setGames(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : games.map(game => <div key={game.id}>{game.title}</div>)}
    </div>
  );
}
```

## 📄 PDF Customization

The PDF export now supports full customization via the `PDFConfig` interface.

### Available Configuration Options

```typescript
interface PDFConfig {
  companyName?: string;        // Default: "ABA PRO GAMES"
  companyEmail?: string;       // Default: "aba@abaprogames.com"
  companyPhone?: string;       // Default: "+20 121 083 8049"
  invoiceNumber?: string;      // Default: Auto-generated from timestamp
  taxRate?: number;            // Default: 0 (use 0.10 for 10% tax)
  currency?: string;           // Default: "$"
  headerImage?: string;        // URL to custom header image
  footerText?: string;         // Custom footer message
}
```

### How to Customize PDF Export

In `client/pages/Cart.tsx`, modify the `PDFConfig`:

```typescript
const pdfConfig: PDFConfig = {
  companyName: "My Game Store",
  companyEmail: "contact@mystore.com",
  companyPhone: "+1-800-GAMES",
  invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
  taxRate: 0.10,              // 10% tax
  currency: "€",              // Euro
  footerText: "For support, email us at contact@mystore.com. Thank you!",
};

await generatePDF(state.items, getTotalSize(), getTotalPrice(), pdfConfig);
```

### PDF Contents

The generated PDF includes:
- ✅ Company header with branding
- ✅ Invoice/Order number and date/time
- ✅ Company contact information
- ✅ Detailed game table with columns:
  - Game Name
  - Game ID
  - Storage Size
  - Quantity
  - Unit Price
  - Total Price
- ✅ Order Summary:
  - Subtotal
  - Tax (if applicable)
  - **TOTAL PRICE**
  - Total items count
  - Total storage size
- ✅ Custom footer message
- ✅ Professional styling with brand colors

## 📊 Common Use Cases

### Use Case 1: Search for Games When User Enters Query

```typescript
export default function SearchGames() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setLoading(true);
      const games = await searchGamesByName(value);
      setResults(games);
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        value={query} 
        onChange={handleSearch} 
        placeholder="Search games..."
      />
      {results.map(game => (
        <div key={game.id}>{game.title} - {game.size}</div>
      ))}
    </div>
  );
}
```

### Use Case 2: Custom PDF with Tax and Company Branding

```typescript
const handleCheckout = async () => {
  const pdfConfig: PDFConfig = {
    companyName: "Your Company Name",
    companyEmail: "info@yourcompany.com",
    companyPhone: "+1-123-456-7890",
    taxRate: 0.08,  // 8% sales tax
    currency: "$",
    footerText: "Visit us at www.yourcompany.com | All prices in USD",
  };

  await generatePDF(items, totalSize, totalPrice, pdfConfig);
};
```

### Use Case 3: Fetch Popular Games on App Load

```typescript
useEffect(() => {
  const loadPopularGames = async () => {
    try {
      const games = await getPopularGames();
      setFeaturedGames(games);
    } catch (error) {
      console.error("Failed to load games:", error);
    }
  };

  loadPopularGames();
}, []);
```

## 🚨 Common Issues & Solutions

### Issue 1: API Returns No Results
**Solution:** The API might be rate-limited or the game might not exist. Implement retry logic:

```typescript
const searchWithRetry = async (query: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const results = await searchGamesByName(query);
      if (results.length > 0) return results;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  return [];
};
```

### Issue 2: Images Not Loading
**Solution:** The API returns placeholder images if no custom art exists. Use fallback:

```typescript
const imageUrl = game.image || `https://via.placeholder.com/400x225?text=${game.title}`;
```

### Issue 3: Slow Game Loading
**Solution:** Implement pagination or lazy loading:

```typescript
const [page, setPage] = useState(1);
const itemsPerPage = 12;

const paginatedGames = games.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);
```

## 🔗 API Rate Limiting

- **No authentication required**
- **Rate limit:** ~60 requests per minute per IP
- **Best practice:** Cache results locally to avoid repeated API calls

Example caching:
```typescript
const cache = new Map();

export const searchGamesCached = async (query: string) => {
  if (cache.has(query)) {
    return cache.get(query);
  }
  
  const results = await searchGamesByName(query);
  cache.set(query, results);
  return results;
};
```

## 📝 Modifying the PDF File

To further customize the PDF, edit `client/lib/pdf-export.ts`:

### Change Colors
```typescript
// Change primary color (bronze)
const primaryColor = [180, 95, 39]; // [R, G, B]

// To custom color:
const primaryColor = [255, 0, 0];   // Red
```

### Add Company Logo
```typescript
// Add this after the header section:
if (config.headerImage) {
  pdf.addImage(config.headerImage, "PNG", 15, 5, 30, 20);
}
```

### Change Table Styling
```typescript
// Edit table header colors
pdf.setFillColor(180, 95, 39); // Change to your color

// Change row background
pdf.setFillColor(245, 245, 245); // Lighter/darker gray
```

### Add Bank Details or Address
```typescript
// Add to order details section:
const bankInfo = "Bank: ABC Bank | Account: 1234567890";
pdf.text(bankInfo, 15, yPosition);
yPosition += 6;
```

## 🌐 Complete Example

Here's a complete example integrating everything:

```typescript
// pages/CheckoutWithCustomPDF.tsx
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { generatePDF, PDFConfig } from "@/lib/pdf-export";

export default function Checkout() {
  const { state, getTotalSize, getTotalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleFinalCheckout = async () => {
    setLoading(true);

    try {
      // Custom PDF configuration
      const pdfConfig: PDFConfig = {
        companyName: "Premium Game Store",
        companyEmail: "support@gamestores.com",
        companyPhone: "+1-800-PREMIUM",
        invoiceNumber: `INV-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9)}`,
        taxRate: 0.08,
        currency: "$",
        footerText: "Thank you for your purchase! Download links sent to email.",
      };

      // Generate PDF
      await generatePDF(
        state.items,
        getTotalSize(),
        getTotalPrice(),
        pdfConfig
      );

      // Clear cart after successful checkout
      clearCart();
      alert("Checkout successful! Check your downloads.");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleFinalCheckout} disabled={loading}>
      {loading ? "Processing..." : "Complete Checkout"}
    </button>
  );
}
```

## 🎯 Next Steps

1. **Test the API** by navigating to `/games` and watching games load
2. **Add your company details** in the PDF config
3. **Implement search** on the Games page
4. **Add filtering** by genre, price, size
5. **Connect to a backend database** for persistent game data
6. **Add user accounts** to save purchase history

---

For more information on the SteamGridDB API, visit: https://www.steamgriddb.com/api/v2
