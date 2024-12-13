const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

(async () => {
  // const quotingEntryPoints = ['./src/actions/quoting/single-chain-quote-action.ts'];
  const quotingEntryPoints = [];
  const otherEntryPoints = [
    './src/auth/create-wallet-lit.ts',
    './src/agent/runtime-lit.ts',
  ];

  // Function to get the output file name
  const getOutputFileName = (inputPath) => {
    const baseName = path.basename(inputPath, path.extname(inputPath));
    return `minified/${baseName}.js`;
  };


  const otherResult = await esbuild.build({
    entryPoints: otherEntryPoints,
    bundle: true,
    minify: true,
    sourcemap: false,
    outdir: 'minified',
    entryNames: '[name]',
    metafile: true,
  });

  console.log('creating meta.json');
  // Merge metafiles
  const mergedMetafile = {
    inputs: {
      ...otherResult.metafile.outputs,
    },
    outputs: {
      ...otherResult.metafile.outputs,
    },
  };

  // Write merged metafile to disk
  fs.writeFileSync('meta.json', JSON.stringify(mergedMetafile, null, 2));

  console.log(
    `[esbuild] built ${quotingEntryPoints.length + otherEntryPoints.length} actions in ./minified`
  );
  console.log('Metadata written to meta.json');
})();
