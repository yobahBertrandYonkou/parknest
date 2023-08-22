'use client';

import plotDetailsCSS from "./plot-details.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function PlotDetails() {
  return (
    <>
      <div className={ plotDetailsCSS.mainContainer }>
        {/* First row */}
      <div className={plotDetailsCSS.firstRow}>
        <div>Plot Details</div>
        <div className={plotDetailsCSS.bookBtn}>Book now</div>
      </div>

      {/* Plot details */}
      <div className={plotDetailsCSS.plotDetails}>
        <div className={plotDetailsCSS.plotName}>Plot name</div>
        <div className={plotDetailsCSS.row}>
          <div className={plotDetailsCSS.location}>Plot location here</div>
          <div className={plotDetailsCSS.price}>Price per hour</div>
        </div>

        {/* Photo carousel */}
        <div className={ plotDetailsCSS.photoCarouselContainer }>
        <Carousel showArrows={true} autoPlay={true} interval={5} showThumbs={false}>
        {/* <Carousel showArrows={true} > */}
          <div className={plotDetailsCSS.imageContainer}>
            <img className={plotDetailsCSS.images} src="https://images.freeimages.com/images/large-previews/636/holding-a-dot-com-iii-1411477.jpg" alt="image1" />
          </div>
          <div className={plotDetailsCSS.imageContainer}>
            <img className={plotDetailsCSS.images} src="https://images.freeimages.com/images/large-previews/d4f/www-1242368.jpg" alt="image2" />
          </div>
        </Carousel>
        </div>

        {/* Plot description */}
        <div className={ plotDetailsCSS.description}>
        <div className={ plotDetailsCSS.descriptionTitle }>Plot description</div>
        <div className={ plotDetailsCSS.descriptionText }>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div>
        </div>
      </div>
      </div>
    </>
  );
}
