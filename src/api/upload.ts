import { apiClient } from './client';

export interface UploadImagesResponse {
	urls: string[];
}

export async function uploadImages(files: File[]): Promise<UploadImagesResponse> {
	const formData = new FormData();
	files.forEach((file) => {
		formData.append('files', file);
	});
	const res = await apiClient.post<UploadImagesResponse>('/upload/images', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return res.data;
}

