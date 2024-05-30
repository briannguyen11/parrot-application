import os
import boto3


def get_presigned_s3_url(obj):
    if not obj:
        return None
    
    s3_client = boto3.client("s3")        
    presigned_url = s3_client.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": os.getenv("AWS_STORAGE_BUCKET_NAME"),
            "Key": obj,
        },
        ExpiresIn=604800
    )
    return presigned_url
