"use client";

import styles from "./BackgroundVideo.module.scss";

export default function BackgroundVideo() {
    return (
        <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.backgroundVideo}
        >
            <source src="/videos/background_video_webm.webm" type="video/webm" />
        </video>
    );
}
