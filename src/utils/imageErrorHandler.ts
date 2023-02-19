import newsCard from "assets/newsCard.jpg";

export const handleImageError = (e: React.BaseSyntheticEvent) => {
  e.target.onerror = null;
  e.target.src = newsCard;
};