import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as dotenv from 'dotenv';

// Load .env file
dotenv.config();

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	// Load env variables
	const env = loadEnv(mode, process.cwd(), '');
	
	return {
		plugins: [react(), tsconfigPaths()],
		test: {
			env: {
				DATABASE_URL: process.env.DATABASE_URL || env.DATABASE_URL
			},
			globals: true,
			environment: 'jsdom',
			coverage: {
				include: [
					'src/components/**',
				]
			},
			server: {
				deps: {
					inline: ['next']
				}
			}
		}
	};
});