import cryptojs from 'crypto-js';

export const encrypt = (data: string, key: string) => {
	if (!data) {
		return data;
	}

	return cryptojs.AES.encrypt(data, key).toString();
};

export const decrypt = (encData: string, key: string) => {
	if (!encData) {
		return encData;
	}

	return cryptojs.AES.decrypt(encData, key).toString(cryptojs.enc.Utf8);
};
