import "dotenv/config";

export default {
  name: "rate-repository-app",
  slug: "rate-repository-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: "https://u.expo.dev/48476a22-0896-455c-bb9c-dab56e666137",
  },
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    apolloUri: process.env.APOLLO_URI,
    eas: {
      projectId: "48476a22-0896-455c-bb9c-dab56e666137",
    },
  },
};
