import buildDynamics from './scripts/build-dynamics.mjs';

buildDynamics();

const basePath = process.env.BASE_PATH || '';

const CHAINS = {
	Wallaby: 31415,
  Hyperspace: 3141,
}

const apiProviderUrls = {
  [CHAINS.Wallaby]: process.env[`API_PROVIDER_URL_${CHAINS.Wallaby}`],
  [CHAINS.Hyperspace]: process.env[`API_PROVIDER_URL_${CHAINS.Hyperspace}`],
};

const cspTrustedHosts = process.env.CSP_TRUSTED_HOSTS;
const cspReportOnly = process.env.CSP_REPORT_ONLY;
const cspReportUri = process.env.CSP_REPORT_URI;

export default {
  basePath,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // WARNING: Vulnerability fix, don't remove until default Next.js image loader is patched
  // images: {
  //   loader: 'custom',
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
  serverRuntimeConfig: {
    basePath,
    apiProviderUrls,
    cspTrustedHosts,
    cspReportOnly,
    cspReportUri,
  },
};
