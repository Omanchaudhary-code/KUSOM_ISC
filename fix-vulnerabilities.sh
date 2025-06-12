#!/bin/bash

echo "🔍 Running npm audit..."
npm audit --audit-level=moderate

echo "🛠️ Attempting to fix vulnerabilities automatically..."
npm audit fix

echo "📦 Updating all packages to latest minor/patch versions..."
npm update

echo "🔁 Re-running audit after updates..."
npm audit --audit-level=moderate

echo "✅ Done. Please review any remaining issues manually."

