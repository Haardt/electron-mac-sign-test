// Auto detect
//             identity: "Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)",
// test without
// asar: {
//     enabled: false,
//         unpack: "**/node_modules/**/*"
// },


const config = {
    plugins: [
        // ['@electron-forge/plugin-auto-unpack-natives', {}]
    ],
    packagerConfig: {
        asar: false,
        appBundleId: "<bundleId it's replaced>",
        osxSign: {
            platform: 'darwin',
            "hardened-runtime": true,
            hardenedRuntime: true,
            'gatekeeper-assess': false,
            gatekeeperAssess: false,
            entitlements: "./static/entitlements.plist",
            "entitlements-inherit": "./static/entitlements.plist",
            "signature-flags": "library"
        },
        osxNotarize: {
            appleId: process.env.APPLE_ID,
            appleIdPassword: process.env.APPLE_ID_PASSWORD
        }
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "test_forge"
            }
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: [
                "darwin", "linux"
            ]
        }
    ]
}

module.exports = config;