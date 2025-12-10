# PWA Icons Setup Guide

This application requires PWA (Progressive Web App) icons for installation on mobile devices and desktop. The manifest file references these icons, but they need to be created and added to the `public` directory.

## Required Icons

Based on `app/manifest.ts`, you need to create the following icons:

### Icon Files

1. **icon-192x192.png** (192x192 pixels)
   - Used for: Android home screen, maskable icon
   - Purpose: `maskable` and `any`

2. **icon-512x512.png** (512x512 pixels)
   - Used for: Android splash screen, high-resolution displays
   - Purpose: `any`

### Screenshot Files (Optional but recommended)

1. **screenshot-wide.png** (1280x720 pixels)
   - Used for: PWA installation prompts on desktop/wide screens
   - Form factor: `wide`

2. **screenshot-narrow.png** (750x1334 pixels)
   - Used for: PWA installation prompts on mobile devices
   - Form factor: `narrow`

## How to Create Icons

### Option 1: Using Online Tools

1. **PWA Asset Generator** (Recommended)
   - Visit: https://www.pwabuilder.com/imageGenerator
   - Upload a 512x512 source image
   - Download the generated icons
   - Extract `icon-192x192.png` and `icon-512x512.png`

2. **Favicon.io**
   - Visit: https://favicon.io/favicon-generator/
   - Create icons from text or upload an image
   - Download and resize as needed

### Option 2: Using Design Software

1. Create a 512x512 pixel square image with your app logo/icon
2. Export as PNG with transparent background (if applicable)
3. Resize to create the 192x192 version
4. Save both files to the `public` directory

### Option 3: Using Command Line (ImageMagick)

```bash
# If you have a source image (source.png)
convert source.png -resize 512x512 public/icon-512x512.png
convert source.png -resize 192x192 public/icon-192x192.png
```

## Icon Design Guidelines

- **Use a simple, recognizable design** that works at small sizes
- **Ensure good contrast** for visibility on various backgrounds
- **Follow platform guidelines**:
  - iOS: Rounded corners are handled automatically
  - Android: Use safe zone (keep important content in center 80%)
- **Test on actual devices** to ensure icons look good

## Screenshot Guidelines

- **screenshot-wide.png**: Show the app in a desktop/tablet layout
- **screenshot-narrow.png**: Show the app in a mobile/phone layout
- Use actual app screenshots, not mockups
- Ensure screenshots are clear and showcase key features

## File Placement

Once created, place all files in the `public` directory:

```
public/
  ├── icon-192x192.png
  ├── icon-512x512.png
  ├── screenshot-wide.png (optional)
  └── screenshot-narrow.png (optional)
```

## Verification

After adding the icons:

1. Run `npm run build` to ensure no build errors
2. Test PWA installation on:
   - Chrome/Edge (desktop)
   - Chrome (Android)
   - Safari (iOS)
3. Check that icons appear correctly in:
   - Browser installation prompts
   - Home screen icons
   - App switcher

## Quick Start (Temporary Placeholder)

If you need to test the app immediately, you can create simple placeholder icons:

1. Create a 512x512 solid color PNG (e.g., blue background with white cloud icon)
2. Save as `icon-512x512.png` in `public/`
3. Resize to 192x192 and save as `icon-192x192.png` in `public/`

**Note**: Replace these with proper branded icons before production deployment.

