# Favicon Setup Guide

This document explains the favicon configuration for mdEditor Starblaze.

## Favicon Files

The following favicon files are located in the `public/` directory:

### Standard Favicons

- `favicon.ico` - Classic favicon (15KB)
- `favicon-16x16.png` - 16×16 PNG favicon
- `favicon-32x32.png` - 32×32 PNG favicon
- `favicon-96x96.png` - 96×96 PNG favicon
- `favicon-128.png` - 128×128 PNG favicon
- `favicon-196x196.png` - 196×196 PNG favicon (largest)

### Apple Touch Icons

- `apple-touch-icon-144x144.png` - 144×144 for iPad Retina
- `apple-touch-icon-152x152.png` - 152×152 for iPad Retina (iOS 7+)

### Microsoft Tiles

- `mstile-144x144.png` - Windows 8/10 tile icon

## HTML Configuration

The favicons are configured in `index.html`:

```html
<!-- Favicons -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="128x128" href="/favicon-128.png" />
<link rel="icon" type="image/png" sizes="196x196" href="/favicon-196x196.png" />

<!-- Apple Touch Icons -->
<link
  rel="apple-touch-icon"
  sizes="144x144"
  href="/apple-touch-icon-144x144.png"
/>
<link
  rel="apple-touch-icon"
  sizes="152x152"
  href="/apple-touch-icon-152x152.png"
/>

<!-- Microsoft Tiles -->
<meta name="msapplication-TileColor" content="#667eea" />
<meta name="msapplication-TileImage" content="/mstile-144x144.png" />

<!-- Theme Color -->
<meta name="theme-color" content="#667eea" />
```

## Browser Support

### Desktop Browsers

- **Chrome/Edge**: Uses 32×32 or 96×96
- **Firefox**: Uses 16×16, 32×32, or 96×96
- **Safari**: Uses 32×32 or larger
- **Opera**: Uses 16×16 or 32×32

### Mobile Browsers

- **iOS Safari**: Uses apple-touch-icon (152×152 recommended)
- **Android Chrome**: Uses 196×196 from manifest.json
- **Windows Phone**: Uses mstile (144×144)

## Theme Color

The theme color `#667eea` (purple) is used for:

- Browser address bar tinting (mobile)
- Task switcher background (Android)
- Microsoft tile background
- PWA splash screen background

This matches the gradient used in the app's navigation bar.

## Testing Favicons

### Local Testing

1. **Start the dev server:**

   ```bash
   npm start
   ```

2. **Visit http://localhost:4200**

3. **Check browser tab** - Should show the favicon

4. **Check browser bookmarks** - Save a bookmark to see the icon

### Browser DevTools

**Chrome DevTools:**

1. Open DevTools (F12)
2. Go to Application → Manifest
3. Verify all icons are listed
4. Check for errors

**Check Icon Loading:**

1. Open DevTools → Network tab
2. Refresh page
3. Look for favicon requests (should be 200 OK)

### Mobile Testing

**iOS:**

1. Open in Safari
2. Tap Share → Add to Home Screen
3. Check icon appearance

**Android:**

1. Open in Chrome
2. Menu → Add to Home Screen
3. Check icon appearance

## Updating Favicons

To update the favicons:

1. **Generate new icons** from your source image
   - Recommended tools: RealFaviconGenerator, Favicon.io
   - Ensure all sizes are generated

2. **Replace files** in `public/` directory:

   ```bash
   cp new-favicon.ico public/favicon.ico
   cp new-favicon-16x16.png public/favicon-16x16.png
   # ... etc
   ```

3. **Clear browser cache** to see changes:
   - Chrome: Ctrl/Cmd + Shift + R
   - Or open in incognito mode

4. **Update manifest.json** if needed

## Troubleshooting

### Favicon Not Showing

1. **Hard refresh:** Ctrl/Cmd + Shift + R
2. **Clear browser cache**
3. **Check DevTools Network tab** for 404 errors
4. **Verify file paths** in index.html
5. **Check public directory** contains files

### Wrong Icon Displayed

1. **Clear browser cache completely**
2. **Check browser is using latest version**
3. **Try incognito/private mode**

## Best Practices

✅ **Include multiple sizes** - Browsers pick the best size
✅ **Use PNG format** - Better quality than ICO for colors
✅ **Keep ICO file** - Fallback for older browsers
✅ **Optimize images** - Use tools like TinyPNG
✅ **Test on multiple devices** - iOS, Android, Desktop
✅ **Use consistent branding** - Match app theme colors

## Resources

- [Web App Manifest Spec](https://www.w3.org/TR/appmanifest/)
- [Favicon Generator](https://realfavicongenerator.net/)
- [Icon Size Guide](https://github.com/audreyfeldroy/favicon-cheat-sheet)
- [PWA Icons](https://web.dev/add-manifest/)
