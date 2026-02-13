# App Navigation Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          HOME SCREEN                                 │
│                                                                      │
│                   [Interactive Body Diagram]                         │
│                                                                      │
│     🧠 Brain (popping)      💇 Hair (popping)                       │
│     ❤️ Heart (beating)      ✨ Skin Glow (chest center)             │
│     🔥 Stomach (popping)    💪 Bicep (flexing)                      │
│     💕 Pelvic Glow                                                  │
│                                                                      │
│                    [Browse All Products Button]                      │
│                    [Cart Badge: 🛒 (0)]                             │
└──────────────┬──────────────────────────────────────────────────────┘
               │
               │ User taps body part
               │
               ▼
       ┌───────┴────────┐
       │                │
       │ Has            │ No Subcategories
       │ Subcategories? │─────────────────┐
       │                │                 │
       └────┬───────────┘                 │
            │ Yes                         │
            ▼                             ▼
┌────────────────────────┐    ┌──────────────────────┐
│  SUBCATEGORY SCREEN    │    │    SHOP SCREEN       │
│                        │    │                      │
│  Category: Brain       │    │  Category: Hair      │
│                        │    │                      │
│  📚 Focus/Learning     │    │  💇 PP-405           │
│  😌 Mood/Stress        │    │  💆 GHK-Cu           │
│  🛡️ Neuroprotection    │    │  🧴 AHK-Cu           │
│                        │    │                      │
│  [View All Products]   │    │  [Search Bar]        │
└────────┬───────────────┘    └──────┬───────────────┘
         │                           │
         │ User selects subcategory  │
         │                           │
         ▼                           │
┌────────────────────────┐           │
│    SHOP SCREEN         │◄──────────┘
│                        │
│  Brain > Focus/Learning│
│                        │
│  🧠 Semax - $89.99     │
│  🧠 NA-Semax - $99.99  │
│  🧠 Noopept - $79.99   │
│  🧠 Dihexa - $149.99   │
│  🧠 P21 - $129.99      │
│                        │
│  [Search] [Cart: 0]    │
└────────┬───────────────┘
         │
         │ User taps product
         │
         ▼
┌────────────────────────┐
│  PRODUCT DETAIL        │
│                        │
│  Semax                 │
│  ★★★★☆ (4.8/5.0)       │
│                        │
│  BRAIN • FOCUSLEARNING │
│  ✓ In Stock            │
│                        │
│  $89.99                │
│                        │
│  [Description]         │
│  The most popular      │
│  cognitive peptide...  │
│                        │
│  [Quantity: - 1 +]     │
│                        │
│  Total: $89.99         │
│                        │
│  [Add to Cart]         │
└────────┬───────────────┘
         │
         │ User adds to cart
         │
         ▼
┌────────────────────────┐
│    CART SCREEN         │
│                        │
│  🧠 Semax              │
│  $89.99   [- 1 +] 🗑️   │
│                        │
│  Subtotal: $89.99      │
│  Tax: $7.20            │
│  ─────────────────     │
│  Total: $97.19         │
│                        │
│  [Proceed to Secure    │
│   Payment] 🔒          │
│                        │
│  ↓ Redirects to        │
│  External Payment Site │
└────────────────────────┘
```

---

## Subcategory Structure

### Categories WITH Subcategories:

```
🧠 BRAIN
 ├── Focus/Learning (5 products)
 ├── Mood/Stress (3 products)
 └── Neuroprotection/Longevity (7 products)

💪 MUSCLE  
 ├── Growth Hormone Peptides (10 products)
 ├── Muscle Recovery & Repair (5 products)
 └── Direct Muscle Growth (7 products)

❤️ HEART
 ├── Endurance (6 products)
 └── Longevity (4 products)

✨ SKIN
 ├── Skin Health (3 products)
 └── Tanning (2 products)
```

### Categories WITHOUT Subcategories:

```
💇 HAIR (3 products) → Direct to Shop
🔥 STOMACH/FAT LOSS (12 products) → Direct to Shop  
💕 SEXUAL HEALTH (6 products) → Direct to Shop
```

---

## Data Flow

```
products.js
    │
    ├─→ PRODUCTS array (all 73 products)
    │
    ├─→ CATEGORIES object (category info + subcategories)
    │
    ├─→ getProductsByCategory(category, subcategory)
    │   Returns filtered products
    │
    ├─→ getProductById(id)
    │   Returns single product
    │
    └─→ getCategoryInfo(category)
        Returns category metadata
```

---

## Animation System

```javascript
// In InteractiveBodySVG.js

useEffect(() => {
  // Brain: Pop! → Hold → Pop!
  Animated.loop(
    scale: 1 → 1.15 → 1 (400ms) → pause 800ms
  )
  
  // Hair: Pop! → Hold → Pop!  
  Animated.loop(
    scale: 1 → 1.1 → 1 (500ms) → pause 1000ms
  )
  
  // Stomach: Pop! → Pop! (continuous)
  Animated.loop(
    scale: 1 → 1.12 → 1 (600ms)
  )
  
  // Bicep: Flex! → Relax! (continuous)
  Animated.loop(
    scale: 1 → 1.08 → 1 (700ms)
  )
  
  // Heart: Beat-beat! → Pause
  Animated.loop(
    scale: 1 → 1.2 → 1 → 1.15 → 1 (300ms each) → pause 500ms
  )
  
  // Skin: Glow... fade... glow...
  Animated.loop(
    opacity: 0.3 → 1 → 0.3 (1500ms)
  )
  
  // Pelvic: Glow... fade... glow...
  Animated.loop(
    opacity: 0.3 → 1 → 0.3 (2000ms)
  )
})
```

---

## State Management

```javascript
CartContext
    │
    ├─→ cartItems[]
    │   Array of products with quantities
    │
    ├─→ addToCart(product)
    │   Adds or increments quantity
    │
    ├─→ removeFromCart(productId)
    │   Removes product completely
    │
    ├─→ updateQuantity(productId, quantity)
    │   Changes quantity
    │
    ├─→ getCartTotal()
    │   Returns total price
    │
    ├─→ clearCart()
    │   Empties cart
    │
    └─→ cartItemCount
        Total items in cart (with quantities)
```

---

## Screen Responsibilities

| Screen | Purpose | Key Features |
|--------|---------|--------------|
| **HomeScreen** | Landing page | Interactive body, cart badge, browse button |
| **SubcategoryScreen** | Category breakdown | Shows subcategories when available |
| **ShopScreen** | Product listing | Search, filter, category banner, product cards |
| **ProductDetailScreen** | Product info | Ratings, stock, quantity selector, add to cart |
| **CartScreen** | Shopping cart | Quantity adjust, remove items, checkout |

---

## Product Data Structure

```javascript
{
  id: 'brain_focus_001',
  name: 'Semax',
  category: 'brain',
  subcategory: 'focusLearning',
  price: 89.99,
  description: 'The most popular cognitive peptide...',
  image: '🧠',
  rating: 4.8,
  inStock: true
}
```

---

## Color Scheme

```css
Primary: #3498db (Blue)
Success: #27ae60 (Green)  
Danger: #e74c3c (Red)
Dark: #2c3e50 (Navy)
Light: #ecf0f1 (Off-white)
Gold: #f39c12 (Orange-gold)
Text: #7f8c8d (Gray)
```

---

**Everything is connected and working together!** 🎉
