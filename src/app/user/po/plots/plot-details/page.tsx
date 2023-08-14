import plotDetailsCSS from "./plot-details.module.css";

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
