const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild.build({
  entryPoints: ['src/app.tsx'],
  bundle: true,
  minify: true,
  platform: 'neutral',
  outfile: 'dist/app.mjs',
  plugins: [nodeExternalsPlugin()],
});
