#!/bin/sh

appPath="release/darwin-x64/Syncrypt-darwin-x64"
installerName="Syncrypt-Installer.dmg"
pushd $appPath

test -f ./$installerName && rm ./$installerName

rm -f version LICENSE LICENSES.chromium.html

create-dmg \
--volname "Syncrypt Installer" \
--volicon "../../../app/app.icns" \
--window-pos 200 120 \
--window-size 800 400 \
--icon-size 100 \
--icon Syncrypt.app 200 190 \
--hide-extension Syncrypt.app \
--app-drop-link 600 185 \
$installerName \
.

popd
