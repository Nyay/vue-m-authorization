import CryptoJS from 'crypto-js';

const runtimeConfig = useRuntimeConfig();

export const encryptString = (input: string): string => {
	const encryptedString = CryptoJS.AES.encrypt(
		input,
		runtimeConfig.encryptionKey,
	);

	return encryptedString.toString();
};

export const decryptString = (encryptedString: string): string => {
	const bytes = CryptoJS.AES.decrypt(
		encryptedString,
		runtimeConfig.encryptionKey,
	);

	return bytes.toString(CryptoJS.enc.Utf8);
};
