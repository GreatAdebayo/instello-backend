import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';




@Injectable()

export class CloudinaryService {
    async uploadAsset(
        assets: any, folder: string
    ) {
        const uploads = [];
        try {
            let uploadStr = "";
            for (const asset of assets) {
                if (asset.mediaType === "image")
                    uploadStr = 'data:image/jpg;base64,' + asset.base64

                if (asset.mediaType === "video")
                    uploadStr = 'data:video/mov;base64,' + asset.base64

                const result = await v2.uploader.upload(uploadStr,
                    {
                        resource_type: asset.mediaType,
                        chunk_size: 6000000,
                        folder,
                        quality: "auto",
                        fetch_format: "auto"

                    })


                const media = {
                    url: result.secure_url,
                    cloudinary_id: result.asset_id,
                    format: asset.mediaType
                }
                uploads.push(media)
            }

            return {
                type: 'success',
                data: uploads
            }

        } catch (error) {
            return {
                type: 'error',
                data: error.message
            }
        }


    }
}