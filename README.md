# pi-media-center-automation

`npm install` should bring all dependencies.

`App/Config.js.example` should be copied to `App/Config.js` and the appropriate settings should be set.
Transmission must be running.

Run server-side with `pm2 start app.json` and client-side with `gulp dev`.

Continuous build for server-side dev can be run with `npm run build`.

This is supposed to run on a Raspberry PI 2. For production the UI is served by the server-side application, not `gulp dev`.

# TODO:
- improve torrent download status UI
- improve torrent download management
- notify Kodi when adding/removing shows
- notify Kodi when a download is completed
- scan existing locations for already downloaded episodes
- automate aquisition of new episodes in series
