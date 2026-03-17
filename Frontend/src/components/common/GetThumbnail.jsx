import defaultThumbnail from "../../assets/defaultThumbnail.webp"
export const GetThumbnail = (videoUrl) => {
  if (!videoUrl) {
    return "/defaultThumbnail.webp"; // 👈 fallback image (public folder me daal dena)
  }

  return videoUrl
    .replace("/video/upload/", "/video/upload/so_2,w_320,h_180,c_fill/")
    .replace(".mp4", ".jpg");
};