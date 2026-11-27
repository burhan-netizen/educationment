# EducationMent website

Static marketing site for EducationMent: homepage, 9 service pages, 10 subject pages, About, Contact, Privacy and Terms.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Homepage (hand written; header and footer are injected by the build) |
| `services.html`, `services/*.html` | Services overview and one page per service (generated) |
| `subjects.html`, `subjects/*.html` | Subjects overview and one page per subject (generated) |
| `about.html`, `contact.html`, `privacy.html`, `terms.html` | Company pages (generated) |
| `assets/site.css` | All styles |
| `assets/site.js` | All interactivity: animations, globe, menus, quote forms |
| `assets/img/` | Photos (Unsplash, no people). Credits in `assets/img/CREDITS.json` |
| `build/build.js` | Page generator: all page copy, menus and footer live here |
| `build/pages.css` | Inner page styles, copied into `assets/site.css` on every build |

## Editing

1. Change copy, services or subjects in `build/build.js` (or styles in `build/pages.css`).
2. Rebuild every page:

   ```
   node build/build.js
   ```

3. Commit and push. Vercel redeploys automatically.

Contact details (WhatsApp number, email) are set at the top of `build/build.js` and in `assets/site.js` (`CONTACT`).

## Quote forms

Forms send each brief to the inbox through Web3Forms (access key in `assets/site.js`). If sending fails, visitors can send it on WhatsApp or by email instead. The Web3Forms access key is public by design and only allows sending to the account's inbox.

## Deploying

No build step is needed on Vercel: deploy the repository root as a static site. `vercel.json` enables clean URLs (`/about` instead of `/about.html`).
