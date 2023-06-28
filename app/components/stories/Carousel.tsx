import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import Image from "next/image";
import { Story } from "../../../utils/Interfaces";
import { isImageFile, isVideoFile } from "@/utils/video_or_image";
import { flushSync } from "react-dom";

const TWEEN_FACTOR = 1.5;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

/**
 * The `EmblaCarousel` component.
 *
 * This component uses the `useEmblaCarousel` hook to create a carousel.
 * The `onScroll` function is used to calculate the opacity of all slides
 * and update the state.
 */
type PropType = {
    stories: Story[];
    options?: EmblaOptionsType;
  };
  
const EmblaCarousel: React.FC<PropType> = (props) => {
  const { stories, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [tweenValues, setTweenValues] = useState<number[]>([]);

  /**
   * Calculates the opacity of all slides and updates the state.
   */
  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const scrollProgress = emblaApi.scrollProgress();

    // Calculate the opacity of each slide.
    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR);
      return numberWithinRange(tweenValue, 0, 1);
    });

    // Update the state with the new opacity values.
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;

    // Call the `onScroll` function once to initialize the state.
    onScroll();

    // Add an event listener to the `scroll` event.
    emblaApi.on("scroll", () => {
      flushSync(() => onScroll());
    });

    // Add an event listener to the `reInit` event.
    emblaApi.on("reInit", onScroll);
  }, [emblaApi, onScroll]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {stories.map((story, index) => (
            <div
              className="embla__slide"
              key={index}
              style={{
                // Set the opacity of the slide to the value from the state.
                opacity: tweenValues.length ? tweenValues[index] : undefined,
              }}
            >
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>

              {isImageFile(story.file) ? (
                <Image
                  className="embla__slide__img"
                  alt="unable to load image"
                  src={`api/${story.file}`}
                  width={500}
                  height={undefined}
                />
              ) : null}

              {isVideoFile(story.file) ? (
                <video
                  src={`api/${story.file}`}
                  controls={false}
                  muted={true}
                  className="embla__slide__img"
                  width={500}
                  height={undefined}
                ></video>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
