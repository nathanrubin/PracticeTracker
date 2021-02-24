// ------------------------------------------- IMPORTANT -------------------------------------------
// This is a development file to be minified using https://javascript-minifier.com/ and inlined in
// the index.html file. This file is not compiled or processed by webpack so it should be treated as
// low-level precompiled es5-compatible javascript. The code here is not meant to be clean, it's
// meant to be as light and fast as possible since it runs in the head tag.

// HACK: This file a hack to ensure that home-screen apps on mobile devices gets refreshed when they
// start. It works by forcing a load of the service-worker.js file and use the precache-manifest
// file name as an application version, just like a desktop browser like chrome would do. When
// when it detects a change in the application version, it reloads the page and bypass the browser's
// cache. This should force mobile devices to reload the new version of the app even if they cached
// an older version of the site.
(function () {
    var r = new XMLHttpRequest();
    r.onload = function () {
      var t = r.responseText;
      var versionStart = t.indexOf('"/precache-manifest.') + 20;
      var versionEnd = t.indexOf('.js"', versionStart);
  
      if (versionEnd - versionStart === 32) {
        var ls = localStorage;
        var oldPrecacheManifestVersion = ls.getItem('pmv');
        var newPrecacheManifestVersion = t.substring(versionStart, versionEnd);
  
        if (newPrecacheManifestVersion !== oldPrecacheManifestVersion) {
          ls.setItem('pmv', newPrecacheManifestVersion);
          return window.location.reload(true);
        }
      }
    };
    r.open('GET', '/service-worker.js?c=' + new Date().getTime());
    r.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    r.send();
  }());