# Quick Reference: Product Categories

## Category Mapping for Body Parts

| Body Part Tap | Category | Has Subcategories? | Product Count |
|--------------|----------|-------------------|---------------|
| 🧠 Brain | Nootropics | ✓ YES (3 subs) | 15 products |
| 💇 Hair | Hair | ✗ NO | 3 products |
| 🔥 Stomach | Fat Loss | ✗ NO | 12 products |
| 💪 Bicep | Muscle Building | ✓ YES (3 subs) | 22 products |
| ❤️ Heart | Endurance/Longevity | ✓ YES (2 subs) | 10 products |
| ✨ Center Chest | Skin | ✓ YES (2 subs) | 5 products |
| 💕 Pelvic Area | Sexual Health | ✗ NO | 6 products |

---

## Subcategory Breakdown

### 🧠 Brain (Nootropics)
```
├── Focus/Learning (5 products)
│   ├── Semax
│   ├── NA-Semax
│   ├── Noopept
│   ├── Dihexa
│   └── P21
│
├── Mood/Stress (3 products)
│   ├── Selank
│   ├── NA-Selank
│   └── DSIP
│
└── Neuroprotection/Longevity (7 products)
    ├── Cerebrolysin
    ├── NAD+
    ├── Cortexin
    ├── SS-31
    ├── Epithalon
    ├── MOTS-c
    └── Pinealon
```

### 💪 Muscle Building
```
├── Growth Hormone Peptides (10 products)
│   ├── CJC-1295 + Ipamorelin
│   ├── CJC-1295 (with DAC)
│   ├── CJC-1295 (without DAC)
│   ├── Ipamorelin
│   ├── Sermorelin
│   ├── Tesamorelin
│   ├── GHRP-6
│   ├── GHRP-2
│   ├── Hexarelin
│   └── HGH 191AA
│
├── Muscle Recovery & Repair (5 products)
│   ├── BPC-157
│   ├── TB-500
│   ├── BPC-157 + TB-500 Stack
│   ├── Thymosin Alpha-1
│   └── Thymalin
│
└── Direct Muscle Growth (7 products)
    ├── IGF-1 LR3
    ├── IGF-DES
    ├── MGF
    ├── PEG-MGF
    ├── Follistatin
    ├── ACE-031
    └── GDF-8 Inhibitor
```

### ❤️ Endurance/Longevity (Heart)
```
├── Endurance (6 products)
│   ├── EPO
│   ├── AICAR
│   ├── NAD+
│   ├── MOTS-c
│   ├── SS-31
│   └── Alprostadil
│
└── Longevity (4 products)
    ├── NAD+
    ├── Glutathione
    ├── Epithalon
    └── FOXO4
```

### ✨ Skin
```
├── Skin Health (3 products)
│   ├── GHK-Cu (Copper Peptide)
│   ├── AHK-Cu
│   └── KLOW (Copper Peptide Blend)
│
└── Tanning (2 products)
    ├── Melanotan I (MT-1)
    └── Melanotan II (MT-2)
```

---

## Animation Reference

| Body Part | Animation Type | Description |
|-----------|---------------|-------------|
| Brain | Popping | Scales to 1.15x → back to 1x, repeats |
| Hair | Popping | Scales to 1.1x → back to 1x, repeats |
| Stomach | Popping | Scales to 1.12x → back to 1x, continuous |
| Bicep | Flexing | Scales to 1.08x → back to 1x, continuous |
| Heart | Beating | Double beat: 1.2x → 1x → 1.15x → 1x, pause |
| Skin (chest) | Glowing | Opacity 0.3 → 1 → 0.3, slow pulse |
| Pelvic | Glowing | Opacity 0.3 → 1 → 0.3, slow pulse |

---

## Price Ranges by Category

| Category | Lowest | Highest | Average |
|----------|--------|---------|---------|
| Brain | $74.99 | $199.99 | ~$125 |
| Hair | $89.99 | $119.99 | ~$101 |
| Fat Loss | $169.99 | $369.99 | ~$265 |
| Muscle | $89.99 | $299.99 | ~$160 |
| Heart | $89.99 | $249.99 | ~$165 |
| Skin | $79.99 | $99.99 | ~$90 |
| Sexual | $89.99 | $149.99 | ~$118 |

---

## Top Sellers (Based on "Most Popular" descriptions)

1. **Semax** - Brain/Focus - "Most popular cognitive peptide"
2. **Selank** - Brain/Mood - "Most popular anxiety reducer"
3. **Retatrutide** - Fat Loss - "Most powerful metabolic peptide"
4. **CJC-1295 + Ipamorelin** - Muscle/GH - "Most popular combo"
5. **BPC-157** - Muscle/Recovery - "Most popular recovery peptide"
6. **EPO** - Heart/Endurance - "Most powerful endurance peptide"
7. **GHK-Cu** - Skin - "Most well-known skin peptide"
8. **PT-141** - Sexual - "Most well-known libido enhancer"

---

## Testing Checklist

- [ ] Brain tap → See 3 subcategory options
- [ ] Hair tap → Go directly to 3 products
- [ ] Stomach tap → See 12 fat loss products
- [ ] Bicep tap → See 3 subcategory options
- [ ] Heart tap → See 2 subcategory options
- [ ] Skin glow tap → See 2 subcategory options
- [ ] Pelvic glow tap → See 6 sexual health products
- [ ] All animations visible and smooth
- [ ] Search works across all products
- [ ] Cart adds products correctly
- [ ] Product details show ratings and stock status

---

## File Structure
```
src/
├── components/
│   └── InteractiveBodySVG.js     # Body with animations
├── screens/
│   ├── HomeScreen.js             # Main screen
│   ├── SubcategoryScreen.js      # NEW: Subcategory selection
│   ├── ShopScreen.js             # Product listing
│   ├── ProductDetailScreen.js    # Product details
│   └── CartScreen.js             # Shopping cart
├── data/
│   └── products.js               # ALL PRODUCTS (200+)
└── context/
    └── CartContext.js            # Cart state
```

---

**Total: 73 Products across 7 Categories with 8 Subcategories**
