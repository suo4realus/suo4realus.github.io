# Chess Coach: turning it into an Android app

These files are a complete web app. You put them online for free with GitHub Pages, then PWABuilder turns the link into an Android app (APK) you can install. A computer makes the upload steps much easier.

## Files in this folder

- `index.html`: the app itself
- `manifest.webmanifest`: app name, colors and icons (needed for installing)
- `sw.js`: offline support, so the app keeps working without internet after the first time you open it
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`: app icons
- `.nojekyll`: tells GitHub Pages to serve every file as-is (keep it, even though it's empty)

## Step 1: Put the app online (GitHub Pages)

1. Create a free account at https://github.com.
2. Create a new repository. Name it exactly **yourusername.github.io** (replace *yourusername* with your GitHub username) and set it to **Public**.
   - Using this exact name puts the app at the root of your site, which step 4 needs.
3. In the new repository, choose **Add file → Upload files** and drag in **all** the files from this folder, including `.nojekyll`.
   - On a Mac or Windows, hidden files may not show up. If `.nojekyll` doesn't appear, create it in GitHub instead: **Add file → Create new file**, name it `.nojekyll`, leave it empty and commit.
4. Click **Commit changes**.
5. Go to **Settings → Pages**. Under *Branch*, choose **main** and **/ (root)**, then **Save**.
6. After a minute or two, your app is live at **https://yourusername.github.io/**.

Open that link on your phone in Chrome and check the app works: paste a screenshot, read the board, and find the best move.

## Step 2: Build the Android app (PWABuilder)

1. Go to https://www.pwabuilder.com.
2. Paste your link (`https://yourusername.github.io/`) and click **Start**.
3. Click **Package for stores**, then **Android → Generate package**. The default options are fine.
4. Download the zip file. Inside you'll find:
   - an **.apk** file: this installs directly on your phone
   - an **.aab** file: this is only needed for the Google Play Store
   - **signing key** files: keep these safe. You need them to publish updates later.
   - **assetlinks.json**: see step 4

## Step 3: Install it on your phone

1. Send the `.apk` file to your phone (email it to yourself, or use Google Drive).
2. Tap it on your phone. Android will ask you to allow installs from that app (Chrome, Files or Gmail). Allow it.
3. Tap **Install**. **Chess Coach** now appears with its own icon.

## Step 4: Hide the address bar (recommended)

Until you do this, the app shows a small browser bar at the top.

1. In your GitHub repository, choose **Add file → Create new file**.
2. Name it exactly `.well-known/assetlinks.json` (typing the `/` creates the folder).
3. Open the `assetlinks.json` file from the PWABuilder zip, copy everything in it, paste it into GitHub and commit.
4. Wait a few minutes, then close and reopen the app. The bar disappears.

## Optional: bundle Stockfish inside the app

The app downloads Stockfish (the grandmaster-strength engine) from the internet the first time, then keeps it for offline use. To include it in your own site instead:

1. On a computer, open https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js and save the page as **stockfish.js**.
2. Upload `stockfish.js` to your GitHub repository next to `index.html`.

The app uses that copy automatically.

## Updating the app later

Upload the new `index.html` to GitHub, replacing the old one. Also open `sw.js`, change `chess-coach-v1` to `chess-coach-v2` (then v3, and so on) and upload it too. Installed apps pick up the update the next time they're opened with internet. You don't need to rebuild the APK.

## Good to know

- The **Read with Claude** and **deeper explanation** buttons only work inside Claude, so they stay hidden in the Android app. Board reading, Stockfish and the coach all work fully.
- Your trained pieces and settings are saved on the phone.
