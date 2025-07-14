import supabase from "../config/supabase.js";

export const uploadImage = async (file, bucketName, id) => {
  const filePath = `profile-pic/${Date.now()}-${file.originalname}`;

  const uniqueFileName = `${Date.now()}-${file.originalname}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload failed:", uploadError.message);
    return { data: null, error: uploadError.message };
  }

  const { data: publicUrlData, error: urlError } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);
  if (urlError) {
    console.error("Public URL generation failed:", urlError.message);
    return { data: null, error: urlError.message };
  }
  return {
    data: publicUrlData?.publicUrl || null,
    error: null,
  };
};
