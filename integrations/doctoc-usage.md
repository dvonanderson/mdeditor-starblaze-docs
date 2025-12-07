# DocToc Usage Guide

This project uses [doctoc](https://github.com/thlorenz/doctoc) to automatically generate table of contents for Markdown files.

## What is DocToc?

DocToc is a Node.js tool that automatically generates and updates table of contents (TOC) in Markdown files based on their heading structure.

## Generating Table of Contents

To generate/update the table of contents:

```bash
npm run doc:toc
```

This will update the TOC in:

- `README.md`
- `QUICK_START.md`

## How It Works

### 1. TOC Markers

Files with TOC must have these special HTML comments:

```markdown
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
```

DocToc will automatically insert the TOC between these markers.

### 2. Running DocToc

When you run `npm run doc:toc`, doctoc:

1. Scans the specified Markdown files
2. Extracts all headings (`##`, `###`, etc.)
3. Generates anchor links
4. Creates nested lists based on heading levels
5. Updates the content between the TOC markers

### 3. Example Output

For a file with these headings:

```markdown
## Installation

## Features

### Feature 1

### Feature 2

## Usage
```

DocToc generates:

```markdown
**Table of Contents**

- [Installation](#installation)
- [Features](#features)
  - [Feature 1](#feature-1)
  - [Feature 2](#feature-2)
- [Usage](#usage)
```

## When to Run DocToc

Run `npm run doc:toc` whenever you:

- Add new sections to README.md or QUICK_START.md
- Change section headings
- Reorganize document structure
- Want to ensure TOC is up-to-date

## Configuration

Current configuration in `package.json`:

```json
{
  "scripts": {
    "doc:toc": "doctoc --title '**Table of Contents**' README.md QUICK_START.md"
  }
}
```

**Options used:**

- `--title '**Table of Contents**'` - Sets the TOC title
- `README.md QUICK_START.md` - Files to process

## Adding TOC to New Files

To add TOC support to a new Markdown file:

1. **Add TOC markers** at the desired location:

   ```markdown
   # My Document

   Some intro text...

   <!-- START doctoc generated TOC please keep comment here to allow auto update -->
   <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
   <!-- END doctoc generated TOC please keep comment here to allow auto update -->

   ## Section 1
   ```

2. **Update the npm script** in `package.json`:

   ```json
   {
     "doc:toc": "doctoc --title '**Table of Contents**' README.md QUICK_START.md NEW_FILE.md"
   }
   ```

3. **Run doctoc**:
   ```bash
   npm run doc:toc
   ```

## Advanced Options

DocToc supports many options:

```bash
# Update specific files
npx doctoc README.md

# Update all markdown files in a directory
npx doctoc docs/

# Set custom title
npx doctoc --title 'Contents' README.md

# Set max heading depth
npx doctoc --maxlevel 3 README.md

# Use different mode (github, bitbucket, gitlab, etc.)
npx doctoc --mode gitlab README.md

# Don't add title
npx doctoc --notitle README.md
```

## Troubleshooting

### TOC Not Updating

Make sure:

1. TOC markers are present in the file
2. There's content between START and END markers (can be empty)
3. File path in npm script is correct

### Duplicate Headings

If you have duplicate heading text, doctoc will append `-1`, `-2`, etc. to anchor links:

```markdown
- [Features](#features)
- [Features](#features-1)
```

Consider making heading text unique to avoid this.

## Resources

- [DocToc GitHub Repository](https://github.com/thlorenz/doctoc)
- [DocToc Documentation](https://github.com/thlorenz/doctoc#readme)

---

**Remember:** Always run `npm run doc:toc` after updating document structure!
