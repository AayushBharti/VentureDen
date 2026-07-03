"use client";

import { useRef } from "react";

/**
 * The "incredible" highlight word with a decorative hover-reveal video.
 *
 * The video is a purely decorative hover effect, so it uses `preload="none"`
 * and only starts loading/playing on hover intent — instead of `autoPlay`,
 * which forced every visitor to download the full ~328KB clip on page load
 * even though it stays hidden until hover.
 */
export function IncredibleHighlight() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: decorative hover-only video; nothing essential is lost without the pointer interaction
    <span
      className="group/incredible relative bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      onMouseEnter={() => {
        videoRef.current?.play().catch(() => {
          // Ignore autoplay-policy / interrupted-play rejections.
        });
      }}
    >
      <span>incredible</span>
      <video
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 rounded-2xl opacity-0 shadow-xl transition duration-500 group-hover/incredible:opacity-100"
        loop
        muted
        playsInline
        preload="none"
        ref={videoRef}
        src="/gif-incredible.mp4"
        tabIndex={-1}
      />
    </span>
  );
}
