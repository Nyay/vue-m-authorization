// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    {
        rules: {
            'quotes': ['error', 'single'],
            'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
            'no-console': ['error', { allow: ['warn', 'error']}],
        }
    }
);
