import { isImageFile, isVideoFile } from "@/utils/video_or_image";
import Image from "next/image";
import React, { useState, useCallback, useEffect, useRef } from "react";
import loadingImage from "../../../public/images/blurDataURL.png";

type PropType = {
  fileSrc: string;
  inView: boolean;
  index: number;
  playVideo?: boolean[];
};

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { fileSrc, inView, index, playVideo } = props;
  const [hasLoaded, setHasLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true);
  }, [inView, setHasLoaded]);

  useEffect(() => {
    if (videoRef.current && playVideo) {
      if (playVideo[index]) videoRef.current.play();
      else videoRef.current.pause();
    }
  }, [playVideo]);

  return (
    <div className="embla__slide">
      <div
        className={"embla__lazy-load".concat(
          hasLoaded ? " embla__lazy-load--has-loaded" : ""
        )}
      >
        {!hasLoaded && <span className="embla__lazy-load__spinner" />}
        <div className="embla__slide__number">
          <span>{index + 1}</span>
        </div>

        {isImageFile(fileSrc) ? (
          <Image
            className="embla__slide__img embla__lazy-load__img loading-container rounded"
            alt="unable to load image"
            src={inView ? fileSrc : loadingImage}
            onLoad={setLoaded}
            width={500}
            height={500}
            placeholder="blur"
            loading="lazy"
            blurDataURL={"public/images/blurDataURL.png"}
          />
        ) : null}

        {isVideoFile(fileSrc) ? (
          <video
            src={inView ? fileSrc : ""}
            controls={false}
            onLoad={setLoaded}
            muted={false}
            className="embla__slide__img embla__lazy-load__img loading-container rounded"
            width={500}
            height={undefined}
            ref={videoRef}
          ></video>
        ) : null}
      </div>
    </div>
  );
};
