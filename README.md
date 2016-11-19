# Syncrypt GUI

Syncrypt is a fully encrypted file storage service for groups and private
backups. This is a platform independent GUI for the [Syncrypt
client](https://github.com/syncrypt/client). Based on
[electron-react-boilerplate](https://github.com/chentsulin).

## Download

Download Syncrypt from our [official releases
page](http://alpha.syncrypt.space/releases/). Note that Syncrypt is currently
in closed alpha. You can get your alpha invite at [the homepage](https://syncrypt.space).

## License

The source code for this desktop client is released under the GNU General Public
License Version 3. For more information have a look at the `LICENSE` file in this
directory. Additional information on the GNU GPLv3 can be found here:
http://www.gnu.org/licenses/quick-guide-gplv3.html

## Install

Clone this repository and run:

```bash
$ npm install
```

Also, install the Syncrypt CLI client.

## Run

Run this to start Syncrypt GUI:

```bash
$ npm run dev
```

Simultaneously start the Syncrypt daemon:

```bash
$ syncrypt_daemon
```

## Package

```bash
$ npm run package
```

To package apps for all platforms:

```bash
$ npm run package-all
```

#### Options

- --name, -n: Application name (default: ElectronReact)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms

Use `electron-packager` to pack your app with `--all` options for darwin (osx), linux and win32 (windows) platform. After build, you will find them in `release` folder. Otherwise, you will only find one for your os.

`test`, `tools`, `release` folder and devDependencies in `package.json` will be ignored by default.

#### Default Ignore modules

We add some module's `peerDependencies` to ignore option as default for application size reduction.

- `babel-core` is required by `babel-loader` and its size is ~19 MB
- `node-libs-browser` is required by `webpack` and its size is ~3MB.

> **Note:** If you want to use any above modules in runtime, for example: `require('babel/register')`, you should move them from `devDependencies` to `dependencies`.

#### Building windows apps from non-windows platforms

Please checkout [Building windows apps from non-windows platforms](https://github.com/maxogden/electron-packager#building-windows-apps-from-non-windows-platforms).
