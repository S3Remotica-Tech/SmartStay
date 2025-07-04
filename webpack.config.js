import webpack from "webpack";
import { resolve as resolveCrypto } from "crypto-browserify";
import { resolve as resolveStream } from "stream-browserify";
import { resolve as resolveBuffer } from "buffer";

export default {
  resolve: {
    fallback: {
      crypto: resolveCrypto(),
      stream: resolveStream(),
      buffer: resolveBuffer(),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ],
};
