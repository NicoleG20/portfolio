# Nicole Angela T. Gorriceta Portfolio

Production-ready static portfolio built with HTML, CSS, and JavaScript.

## Local Development

Open `index.html` directly in a browser, or run a local server:

```bash
npx serve .
```

## GitHub Setup

```bash
git init
git add .
git commit -m "Prepare portfolio for production"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## Cloudflare Pages Deployment

1. Create a GitHub repository and push this folder.
2. In Cloudflare Pages, choose **Create a project**.
3. Connect the GitHub repository.
4. Use these build settings:
   - Framework preset: `None`
   - Build command: leave blank
   - Build output directory: `/`
5. Deploy. Future pushes to `main` will trigger automatic deploys.

## Contact Form

The form posts to `/api/contact`, which is handled by `functions/api/contact.js` on Cloudflare Pages.

Create a Cloudflare Pages environment variable named `CONTACT_WEBHOOK_URL` and point it to a webhook service that can receive the message payload. If it is not configured, the frontend falls back to opening the visitor's email app with a prefilled message.

## Production Checklist

- Run Lighthouse and aim for 90+ Performance and Accessibility.
- Test on mobile, tablet, and desktop.
- Replace placeholder social links such as Facebook if needed.
- Confirm `CONTACT_WEBHOOK_URL` is configured if you want the contact form to submit without opening email.
