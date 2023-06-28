import { isImageFile, isVideoFile } from '@/utils/video_or_image'
import Image from 'next/image'
import React, { useState, useCallback } from 'react'

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`

type PropType = {
    fileSrc: string
  inView: boolean
  index: number
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { fileSrc, inView, index } = props
  const [hasLoaded, setHasLoaded] = useState(false)

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true)
  }, [inView, setHasLoaded])

  return (
    <div className="embla__slide">
      <div
        className={'embla__lazy-load'.concat(
          hasLoaded ? ' embla__lazy-load--has-loaded' : '',
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
                  src={inView ? fileSrc : PLACEHOLDER_SRC}
                  onLoad={setLoaded}
                  width={500}
                  height={500}
                  placeholder="blur"
                  loading="lazy"
                  blurDataURL={'public/images/blurDataURL.png'}
                />
              ) : null}

              {isVideoFile(fileSrc) ? (
                <video
                src={inView ? fileSrc : PLACEHOLDER_SRC}
                  controls={true}
                  onLoad={setLoaded}
                  muted={false}
                  className="embla__slide__img embla__lazy-load__img loading-container rounded"
                  width={500}
                  height={undefined}
                  
                ></video>
              ) : null}
      </div>
    </div>
  )
}
