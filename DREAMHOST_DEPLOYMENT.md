# Deploying to DreamHost at candybros.app/shop

## ⚠️ **IMPORTANT: DreamHost Requirements**

Next.js requires **Node.js runtime** which is NOT available on DreamHost **shared hosting** plans. You need one of these:

1. **DreamHost VPS** (Virtual Private Server)
2. **DreamHost Dedicated Server**
3. Or use **Passenger** (if enabled on your account)

If you only have shared hosting, **this deployment won't work**. Consider:
- Using the subdomain approach (shop.candybros.app) - SSL will provision eventually
- Using Vercel (free, optimized for Next.js) with custom domain

---

## 📋 **Prerequisites**

Before deploying, verify your DreamHost account has:

1. ✅ SSH access
2. ✅ Node.js support (version 18+)
3. ✅ Ability to run persistent Node.js processes
4. ✅ Git access

### Check Node.js Support

SSH into your DreamHost server:

```bash
ssh wp_877e5u@candybros.app
node --version  # Should be v18 or higher
npm --version
```

If Node.js is not installed or version is too old, you'll need to install it or enable Passenger.

---

## 🚀 **Deployment Steps**

### 1. Configure Production Environment

On your **DreamHost server**, create `.env.production.local`:

```bash
cd ~/candybros.app/shop  # Or your deployment directory
nano .env.production.local
```

Copy the contents from `.env.production` and update:
- Change Stripe keys to **LIVE keys** (not test keys!)
- Generate new NEXTAUTH_SECRET: `openssl rand -base64 32`
- Verify all URLs point to `https://candybros.app/shop`

### 2. Push Code to DreamHost

From your local machine:

```bash
# Build the production version
npm run build

# Push to DreamHost git remote
git push dreamhost-shop main
```

### 3. Install Dependencies on Server

SSH into DreamHost:

```bash
ssh wp_877e5u@candybros.app
cd ~/git/shop.git  # Or wherever you deployed
npm ci --production
```

### 4. Run Database Migrations

```bash
# On the server
npx drizzle-kit push
```

### 5. Start the Next.js Server

You have two options:

#### Option A: Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the app
cd ~/candybros.app/shop
pm2 start npm --name "candybros-shop" -- start
pm2 save
pm2 startup  # Follow the instructions it gives you
```

#### Option B: Using Passenger (if available)

Create a `passenger_wsgi.py` file in your app directory - consult DreamHost docs.

### 6. Configure Apache/Nginx Reverse Proxy

You need to configure your web server to proxy `/shop` to your Node.js app.

**For Apache** (create `.htaccess` in `/candybros.app/shop/`):

```apache
RewriteEngine On
RewriteCond %{REQUEST_URI} ^/shop
RewriteRule ^shop/(.*)$ http://localhost:3000/shop/$1 [P,L]
ProxyPassReverse /shop http://localhost:3000/shop
```

**For Nginx** (edit your server block):

```nginx
location /shop {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### 7. Configure Stripe Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://candybros.app/shop/api/webhooks/stripe`
4. Events: Select `checkout.session.completed`
5. Copy the **Webhook signing secret**
6. Add it to your `.env.production.local` as `STRIPE_WEBHOOK_SECRET`
7. Restart the Node.js app

### 8. Test the Deployment

Visit:
- https://candybros.app/shop
- https://candybros.app/shop/products
- Test a purchase with a live card (or test card if still in test mode)

---

## 🔧 **Alternative: Easier Deployment Options**

If the above is too complex or DreamHost doesn't support Node.js:

### Option 1: Use Subdomain (Recommended)
- Deploy to `shop.candybros.app` instead of `/shop`
- SSL will eventually provision (usually within 24 hours)
- Much simpler setup on DreamHost

### Option 2: Use Vercel (Free & Easy)
- Deploy to Vercel: `vercel --prod`
- Configure custom domain: `shop.candybros.app` or even `candybros.app`
- Free tier includes everything you need
- Automatic SSL, CDN, and optimizations

---

## 🆘 **Troubleshooting**

**"Node.js not found"**
- Your DreamHost plan doesn't support Node.js
- Upgrade to VPS or use Vercel

**"Port 3000 already in use"**
- Another process is using port 3000
- Change port in package.json: `"start": "next start -p 3001"`

**"502 Bad Gateway"**
- Node.js app isn't running
- Check: `pm2 status` or restart the app

**"Module not found"**
- Run `npm ci` again
- Make sure you're in the right directory

**Stripe webhook failing**
- Verify webhook URL is correct
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Check server logs for errors

---

## 📞 **Need Help?**

DreamHost Node.js support varies by plan. Contact DreamHost support to verify:
1. Do you have Node.js support?
2. Can you run persistent Node.js processes?
3. Can you configure reverse proxies?

If not, **I strongly recommend using Vercel** - it's free, optimized for Next.js, and much easier.
