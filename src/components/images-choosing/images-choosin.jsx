import styles from "./images-choosing.module.css";
import { ReactComponent as CloseButton } from "../../images/close.svg";
import { register } from "swiper/element/bundle";
import { SLIDER_PARAMS } from "../../utils/constants";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import ImagesSlide from "../images-slide/images-slide";

const getImages = (store) => store.categoryReducer.images;

register();

const ImagesChoosing = ({ setIsShowImages, setImg }) => {
    const swiperRef = useRef(null);
    const images = useSelector(getImages);
    useEffect(() => {
        const swiperContainer = swiperRef.current;
        const params = { ...SLIDER_PARAMS };
        Object.assign(swiperContainer, params);
        swiperContainer.initialize();
    }, []);

    return (
        <>
            <div className={styles.images_button__container}>
                <CloseButton className={styles.images__close_icon} onClick={setIsShowImages} />
            </div>
            <div>
                <p className={styles.images__title}>Иконки</p>
            </div>
            <swiper-container space-between={30} ref={swiperRef} init="false">
                <swiper-slide>
                    <ImagesSlide setIsShowImages={setIsShowImages} setImg={setImg} images={images.slice(0, 16)} />
                </swiper-slide>
                <swiper-slide>
                    <ImagesSlide setIsShowImages={setIsShowImages} setImg={setImg} images={images.slice(16, 32)} />
                </swiper-slide>
                <swiper-slide>
                    <ImagesSlide setIsShowImages={setIsShowImages} setImg={setImg} images={images.slice(32, 48)} />
                </swiper-slide>
                <swiper-slide>
                    <ImagesSlide setIsShowImages={setIsShowImages} setImg={setImg} images={images.slice(48, 64)} />
                </swiper-slide>
            </swiper-container>
        </>
    );
};

export default ImagesChoosing;
