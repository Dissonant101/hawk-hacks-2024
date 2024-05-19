interface CardSwiperRibbonsProps {
  ribbonColors?: {
    bgLike?: string;
    bgDislike?: string;
    textColor?: string;
  };
  likeRibbonText?: string;
  dislikeRibbonText?: string;
}

function CardSwiperRibbons({
  ribbonColors,
  dislikeRibbonText,
  likeRibbonText,
}: CardSwiperRibbonsProps) {
  return (
    <div
      className="swipe-card__ribbons-container"
      id="swipe-card__ribbons-container"
    >
      <div
        id="swipe-card__ribbon-like"
        className="relative swipe-card__ribbon-like"
        style={{
          color: ribbonColors?.textColor,
          // backgroundColor: ribbonColors?.bgLike,
        }}
      >
        {/* <img src="/heart.png" className="absolute scale-50 -translate-x-0" /> */}
        <img
          src="/heart.png"
          className="absolute -translate-x-24 -translate-y-8 scale-[40%] -rotate-12"
        />
        <img
          src="/heart.png"
          className="absolute scale-[30%] -translate-x-2 -translate-y-20"
        />
        <img src="/heart.png" className="absolute scale-75" />
        {/* <img src="/heart.png" className="absolute scale-50 -translate-x-0" />
        <img src="/heart.png" className="absolute scale-50 -translate-x-0" /> */}
        <span className="z-10">{likeRibbonText || 'LIKE'}</span>
      </div>
      <div
        id="swipe-card__ribbon-dislike"
        className="swipe-card__ribbon-dislike"
        style={{
          color: ribbonColors?.textColor,
          backgroundColor: ribbonColors?.bgDislike,
        }}
      >
        {dislikeRibbonText || 'PASS'}
      </div>
    </div>
  );
}

export default CardSwiperRibbons;
