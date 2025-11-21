'use client';

import React, { memo } from 'react';
import styles from './BackgroundVideo.module.scss';

const BackgroundVideo = () => {
    return (
        <video
            className={styles.backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
        >
            <source src="/videos/background_video_webm.webm" type="video/webm" />
            <source src="/videos/background_video_mp4.mp4" type="video/mp4" />
        </video>
    );
};

export default memo(BackgroundVideo);
