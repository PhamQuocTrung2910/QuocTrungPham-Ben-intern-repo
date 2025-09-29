import { getSentryExpoConfig } from "@sentry/react-native/metro";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const config = getSentryExpoConfig(__dirname);

export default config;
