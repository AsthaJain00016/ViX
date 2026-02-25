export const GetThumbnail = (videoUrl) => {
  return videoUrl
    .replace("/video/upload/", "/video/upload/so_2,w_320,h_180,c_fill/")
    .replace(".mp4", ".jpg");
};