# 🔥 UNDER IT ALL: Report Cards Printer 🔥

> A bespoke Shopify Admin Extension to generate and print line-item report cards, crafted with precision by Responsive Web Solutions.

---

## 🎯 The Mission

Client **UNDER IT ALL** needed a way to streamline their order fulfillment process. The goal was to eliminate manual data entry by creating a tool that could instantly generate custom printable labels—or "Report Cards"—for each line item directly from the Shopify order page.

## ✨ The Solution

We engineered a slick, lightweight **Shopify Admin UI Extension** that integrates flawlessly into the native Shopify workflow. With a single click from the "Print" menu, staff can now fire up a modal, get a live preview, and print beautiful, data-rich labels for every item in an order.

This isn't just an app; it's a workflow revolution, powered by a serverless backend for maximum speed and security.

## 🚀 Core Stack

- **Shopify UI Extension:** For a seamless frontend experience inside the admin.
- **Preact:** For a lightweight, high-performance UI component.
- **Cloudflare Worker:** As the serverless backend function handling API requests.
- **Shopify Admin API:** The source of truth for all order data.
- **Shopify CLI:** For a world-class development and deployment workflow.

## 🛠️ Ignition Sequence: Getting Started

### 1. System Prerequisites

Ensure you have the essentials installed:
- [Node.js](https://nodejs.org/en/download/) (LTS)
- [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)

### 2. Clone & Install

Get the code and install dependencies.

```bash
# Clone the repository
git clone <your-repo-url>
cd underitall-report-cards

# Install dependencies
npm install
```

### 3. Configure Your Environment

This project uses a `.env` file for all your secrets. Create it in the project root.

**File: `.env`**
```env
# Your Shopify Store
SHOPIFY_STORE_DOMAIN="underitall-2.myshopify.com"

# Your Custom App Credentials
SHOPIFY_API_KEY="your-app-api-key"
SHOPIFY_API_SECRET="your-app-api-secret"

# The Holy Grail: Your Admin API Access Token
SHOPIFY_ACCESS_TOKEN="shpat_..."

# API Scopes
SCOPES="read_orders,read_customers,read_products,read_fulfillments,read_inventory"
```

> **Where to find credentials?** Create a **Custom App** in your Shopify Partner account, set the **API Scopes**, and install it on your dev store. You'll find the keys and the all-important **Admin API Access Token** in the "API credentials" tab.

## 💻 Development Mode

Spin up the development server with one command:

```bash
shopify app dev
```

The CLI will give you a preview link to test your extension live. Changes to your code will hot-reload automatically. ✨

> **Stuck?** If the CLI ever feels confused about your app configuration, a quick `--reset` will set it straight:
> `shopify app dev --reset`

## 🚀 Go Live: Deployment

Ready to ship it? Deploy your extension to Shopify with:

```bash
shopify app deploy
```

This command bundles and pushes your work to your live app in the Shopify Partner Dashboard.

## 📂 Code Blueprint

- `shopify.app.toml`: The master plan for your app.
- `.env`: Your secret stash. Don't commit it!
- `package.json`: The list of dependencies and scripts.
- `/extensions/report-cards/`: The heart of the UI extension.
  - `src/PrintActionExtension.jsx`: The Preact component that merchants see.
  - `shopify.extension.toml`: The extension's configuration file.
- `/functions/`: The serverless backend.
  - `print-report-card.js`: The Cloudflare Worker that does the heavy lifting: fetching data and rendering HTML.

---

*Built with ❤️ by **Responsive Web Solutions** for **UNDER IT ALL**.*
