import React from "react";
import styles from "../styles/Loader.module.css";
import Lottie from "react-lottie-player";

import loadingAnim from "../public/loadingAnim.json";

const Loader = ({ props }: any) => {
  console.log(props);

  return (
    <div className={styles.loading}>
      <Lottie
        className={styles.anim}
        loop
        animationData={loadingAnim}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default Loader;
