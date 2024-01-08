"use strict"

module.exports = {
    extends: "@istanbuljs/nyc-config-typescript",
    extension: [
        ".ts"
    ],
    exclude: [
        "**/*.d.ts",
        "**/test/**/*",
        "**/*.js",
        "**/config.ts",
        "./coverage"
    ],
    excludeNodeModules: true,
    reporter: [
        "text",
        "lcov"
    ],
    all: true,
    branches: 100,
    functions: 100,
    lines: 100,
    statements: 100
}