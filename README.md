# Skin Science Research Lab — independent deployment

This is the clean Next.js version for deployment from your own GitHub and Vercel accounts. It contains no ChatGPT Sites configuration.

## Run it locally

Install Node.js 22 or newer. Then open Terminal in this folder and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and stop the server with `Control+C`.

## Publish it yourself

### 1. Create a GitHub repository

1. Create a free account at `github.com` if needed.
2. Click **New repository**.
3. Name it `skin-science-research-lab`.
4. Choose **Public** so colleges can inspect your project history.
5. Do not initialize it with a README because this folder already has one.

### 2. Upload with GitHub Desktop — easiest method

1. Install and open GitHub Desktop.
2. Choose **File → Add Local Repository** and select this folder.
3. If asked, choose **Create a repository here**.
4. Write `Initial independent release` as the commit message and commit.
5. Click **Publish repository** and confirm that it is public.

### 3. Deploy through Vercel

1. Create a Vercel account using **Continue with GitHub**.
2. Click **Add New → Project**.
3. Import `skin-science-research-lab`.
4. Vercel should recognize **Next.js** automatically.
5. Leave build settings at their defaults and click **Deploy**.
6. Vercel gives you a temporary `vercel.app` address.

### 4. Attach your domain

1. Buy a domain that you control, such as `elsaskinscience.com` or a name-based portfolio domain.
2. In Vercel, open the project and go to **Settings → Domains**.
3. Enter the domain and click **Add**.
4. Follow the exact DNS instructions Vercel displays.
5. After DNS verification, Vercel provisions HTTPS automatically.

## How updates work

Edit the code, test with `npm run dev`, commit the change in GitHub Desktop, and click **Push origin**. Vercel automatically publishes the new commit.

## Important research note

The current seed dataset is source-linked but not yet a systematic or expert-reviewed evidence synthesis. Keep that disclosure visible. Credibility comes from transparent limitations, not stronger-sounding claims.
