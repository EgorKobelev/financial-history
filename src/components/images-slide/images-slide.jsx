import styles from "./images-slide.module.css";

const ImagesSlide = ({ images }) => {
    return (
        <div className={styles.images_slide__container}>
            {images.map((image) => {
                console.log(image);
                return <img className={styles.images__item} src={image.picture} alt="иконка категории" />;
            })}
        </div>
    );
};

export default ImagesSlide;
