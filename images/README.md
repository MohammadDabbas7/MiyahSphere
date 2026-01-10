# Images Directory

Place your website images in this folder.

## Required Images

### 1. Product/Hero Images
- **miahsphere-hero.png** - Main product image for hero section (800x800px)
- **sphere-cutaway.png** - Technical diagram showing internal components (1000x1000px)
- **sphere-3d.png** - 3D render of the device (800x800px)

### 2. Team Photos
- **team-member-1.jpg** - Team member photo (300x300px, square)
- **team-member-2.jpg** - Team member photo (300x300px, square)
- **team-member-3.jpg** - Team member photo (300x300px, square)
- **team-member-4.jpg** - Team member photo (300x300px, square)

### 3. Technical Diagrams
- **component-diagram.png** - Exploded view of components (1000x1000px)
- **sensor-array.png** - Detailed sensor layout (800x800px)

### 4. Branding
- **logo.png** - MiahSphere logo (transparent background, 200x60px)
- **logo-icon.png** - Icon/favicon (512x512px, square)
- **favicon.ico** - Browser favicon (32x32px)

## Image Optimization Tips

1. **Compress images** before uploading (use TinyPNG, ImageOptim, or similar)
2. **Use appropriate formats**:
   - PNG for images requiring transparency
   - JPG for photos
   - SVG for logos and icons (if possible)
3. **Optimize for web**: 72 DPI resolution is sufficient
4. **Use descriptive filenames**: `miahsphere-device.png` instead of `img1.png`

## Current Placeholders

The website currently uses CSS-generated placeholders:
- Hero sphere: Gradient circle with animation
- Team photos: Gradient circles
- Technical diagrams: Placeholder boxes

Replace these by:
1. Adding your images to this folder
2. Updating the HTML in `index.html` to reference the images

Example:
```html
<!-- Replace this: -->
<div class="sphere-visual"></div>

<!-- With this: -->
<img src="images/miahsphere-hero.png" alt="MiahSphere Inspection Ball">
```

## Attribution

If using stock images or licensed content, document attributions here:
- [Image name] - Source: [URL] - License: [Type]
