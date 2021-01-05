# electron-mac-sign-test
This is a test project to test signing and notarization.

The electron app is bootstrapped with:
- npx create-electron-app test-forge
- an additional plugin (not active): "@electron-forge/plugin-auto-unpack-natives": "^6.0.0-beta.54",


The forge configuration is in the file:
 - forge.config.js

with the following options:

#### OsxSign:

- platform: 'darwin' => Force the use of the Developer Apple-ID
- hardenedRuntime: true => Mandatory
- 'gatekeeper-assess': false => Disabled for the signing and notarize process
- entitlements: "./static/entitlements.plist" => OS-Functions
- "entitlements-inherit": "./static/entitlements.plist" => OS-Functions
- "signature-flags": "library" => ?

#### osxNotarize:
- appleId: process.env.APPLE_ID,
- appleIdPassword: process.env.APPLE_ID_PASSWORD

The Build-System (Mac-Mini) use has only one certificate in the keychain.

#### Logs:

*Apple notarize logs:*

`
{
"logFormatVersion": 1,
"jobId": "c004e4ac-043c-42a2-aebe-ada2618b030f",
"status": "Accepted",
"statusSummary": "Ready for distribution",
"statusCode": 0,
"archiveFilename": "test-forge.zip",
"uploadDate": "2021-01-05T11:44:33Z",
"sha256": "698df1bf7860e69926be5292ad7e5f94c4759da0645f99d5318fe8386250c454",
"ticketContents": [
{
"path": "test-forge.zip/test-forge.app/Contents/Frameworks/Mantle.framework/Versions/Current",
"digestAlgorithm": "SHA-256",
"cdhash": "1c23ed09c937efec4f03c1d09ebde33d365bed50",
"arch": "x86_64"
},
{
"path": "test-forge.zip/test-forge.app/Contents/Frameworks/Electron Framework.framework/Versions/Current",
"digestAlgorithm": "SHA-256",
"cdhash": "1d0efa2755beb6d7b850a3968867adf321b173e3",
"arch": "x86_64"
},

...

{
"path": "test-forge.zip/test-forge.app/Contents/Frameworks/test-forge Helper (GPU).app/Contents/MacOS/test-forge Helper (GPU)",
"digestAlgorithm": "SHA-256",
"cdhash": "4167809247bbecfbdc9bc716bc20a79df407095c",
"arch": "x86_64"
}
],
"issues": null
}
`

*Build-Log:*

`
> electron-forge package

- Checking your system
  ✔ Checking your system
- Preparing to Package Application for arch: x64
  ✔ Preparing to Package Application for arch: x64
- Preparing native dependencies
  ✔ Preparing native dependencies
- Packaging Application
  Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign electron-osx-sign@0.5.0
  Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign:warn No `identity` passed in arguments...
  Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign Finding `Developer ID Application` certificate for distribution outside the Mac App Store...
  Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign Executing... security find-identity -v
  Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign Identity:
> Name: Developer ID Application: XX (XXX)
> Hash: XX
Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign Found 1 identity.
Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign Pre-sign operation enabled for provisioning profile:
* Disable by setting `pre-embed-provisioning-profile` to `false`.
  Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign Pre-sign operation enabled for entitlements automation with versions >= `1.1.1`:
* Disable by setting `pre-auto-entitlements` to `false`.
  Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign No `provisioning-profile` passed in arguments, will find in current working directory and in user library...
  Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign No provisioning profile found, will not embed profile in app contents.
  Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign Automating entitlement app group...
> Info.plist: /var/folders/zd/tx5d10fd2vq1cws7z4y9qncc0000gn/T/electron-packager/darwin-x64/test-forge-darwin-x64/test-forge.app/Contents/Info.plist
> Entitlements: ./static/entitlements.plist
Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign:warn No `entitlements-loginhelper` passed in arguments:
* Entitlements file for login helper is default to: ./static/entitlements.plist
  Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign Signing application...
> Application: /var/folders/zd/tx5d10fd2vq1cws7z4y9qncc0000gn/T/electron-packager/darwin-x64/test-forge-darwin-x64/test-forge.app
> Platform: darwin
> Entitlements: ./static/entitlements.plist
> Child entitlements: ./static/entitlements.plist
> Login helper entitlements: ./static/entitlements.plist
> Additional binaries: undefined
> Identity: {
name: 'Developer ID Application: XX (XXX)',
hash: 'XXX'
}
Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign Walking... /var/folders/zd/tx5d10fd2vq1cws7z4y9qncc0000gn/T/electron-packager/darwin-x64/test-forge-darwin-x64/test-forge.app/Contents
Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign Signing... /var/folders/zd/tx5d10fd2vq1cws7z4y9qncc0000gn/T/electron-packager/darwin-x64/test-forge-darwin-x64/test-forge.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Resources/am.lproj/locale.pak
Tue, 05 Jan 2021 13:08:05 GMT electron-osx-sign Executing... codesign --sign 9D4A5701E19D48E4855579F98C34772A300F183B --force --timestamp --options library,runtime --entitlements ./static/entitlements.plist /var/folders/zd/tx5d10fd2vq1cws7z4y9qncc0000gn/T/electron-packager/darwin-x64/test-forge-darwin-x64/test-forge.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Resources/am.lproj/locale.pak
Tue, 05 Jan 2021 13:08:06 GMT electron-osx-sign Signing... /var/folders/zd/tx5d10fd2vq1cws7z4y9qncc0000gn/T/electron-packager/darwin-x64/test-forge-darwin-x64/test-forge.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Resources/ar.lproj/locale.pak

Tue, 05 Jan 2021 13:08:31 GMT electron-osx-sign Signing... /var/folders/zd/tx5d10fd2vq1cws7z4y9qncc0000gn/T/electron-packager/darwin-x64/test-forge-darwin-x64/test-forge.app
Tue, 05 Jan 2021 13:08:31 GMT electron-osx-sign Executing... codesign --sign 9D4A5701E19D48E4855579F98C34772A300F183B --force --timestamp --options library,runtime --entitlements ./static/entitlements.plist /var/folders/zd/tx5d10fd2vq1cws7z4y9qncc0000gn/T/electron-packager/darwin-x64/test-forge-darwin-x64/test-forge.app
Tue, 05 Jan 2021 13:08:32 GMT electron-osx-sign Verifying...
Tue, 05 Jan 2021 13:08:32 GMT electron-osx-sign Verifying application bundle with codesign...
Tue, 05 Jan 2021 13:08:32 GMT electron-osx-sign Executing... codesign --verify --deep --strict --verbose=2 /var/folders/zd/tx5d10fd2vq1cws7z4y9qncc0000gn/T/electron-packager/darwin-x64/test-forge-darwin-x64/test-forge.app

... more signing...

Tue, 05 Jan 2021 13:08:33 GMT electron-osx-sign Verified.
Tue, 05 Jan 2021 13:08:33 GMT electron-osx-sign Displaying entitlements...
Tue, 05 Jan 2021 13:08:33 GMT electron-osx-sign Executing... codesign --display --entitlements :- /var/folders/zd/tx5d10fd2vq1cws7z4y9qncc0000gn/T/electron-packager/darwin-x64/test-forge-darwin-x64/test-forge.app
Tue, 05 Jan 2021 13:08:33 GMT electron-osx-sign Entitlements:
 <?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
    <key>com.apple.security.device.audio-input</key>
    <true/>
    <key>com.apple.security.device.camera</key>
    <true/>
  </dict>
</plist>

Tue, 05 Jan 2021 13:08:33 GMT electron-osx-sign Application signed.
✔ Packaging Application
`


#### Results:

The application cannot be launched on Big Sur. The error messages:

- rejected (bundle format is ambiguous (could be app or framework))
- The OS-UI-Dialog says: 'The application can't be open'

