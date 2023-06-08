import styles from "./images-slide.module.css";

const ImagesSlide = ({ images, setImg, setIsShowImages }) => {
    const handleClick = (picture) => {
        setImg(picture);
        setIsShowImages(false);
    };

    return (
        <div className={styles.images_slide__container}>
            {images.map((image, index) => {
                return (
                    <img key={index} onClick={() => handleClick(image.picture)} className={styles.images__item} src={image.picture} alt="иконка категории" />
                );
            })}
        </div>
    );
};

export default ImagesSlide;
