#!/usr/bin/env bash
# Publish @roboticela/devkit (CLI + UI module only).
# Templates and catalog assets are NOT in this package — they ship on the DevKit server.
set -e

RELEASE_TYPE=${1:-patch}   # patch | minor | major

echo ""
echo "  @roboticela/devkit — Publishing (CLI + UI only)"
echo "  Release type: $RELEASE_TYPE"
echo "  Catalog/templates: https://devkit.roboticela.com (server)"
echo ""

if ! npm whoami &>/dev/null; then
  echo "  ✗ Not logged in to npm. Run: npm login"
  exit 1
fi

echo "  → Building..."
npm run build

echo "  → Checking tarball contents (must not include registry/ or templates/)..."
PACK_OUT=$(npm pack --dry-run 2>&1)
if echo "$PACK_OUT" | grep -E 'registry/|templates/' >/dev/null; then
  echo "  ✗ Tarball still contains registry/ or templates/. Aborting."
  echo "$PACK_OUT" | grep -E 'registry/|templates/' || true
  exit 1
fi
echo "  ✓ No bundled catalog/templates in package"

echo "  → Bumping version ($RELEASE_TYPE)..."
npm version $RELEASE_TYPE --no-git-tag-version

VERSION=$(node -p "require('./package.json').version")
echo "  → New version: $VERSION"

echo "  → Publishing to npm..."
npm publish --access public

echo ""
echo "  ✓ Published @roboticela/devkit@$VERSION"
echo "  → Bump server catalog component versions when UI exports change."
echo "  → Docs: https://devkit.roboticela.com"
echo ""
