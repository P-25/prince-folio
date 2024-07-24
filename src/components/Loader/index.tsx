import { Html } from "@react-three/drei";
import styles from "./loader.module.css"; // Import custom CSS for the keyframes

const Loader: React.FC = () => {
  return (
    <Html>
      <div className="flex items-center">
        <span
          className={`${styles.bar} ${styles.bar1} inline-block w-1 h-5 bg-white bg-opacity-50 rounded-lg`}
        />
        <span
          className={`${styles.bar} ${styles.bar2} inline-block w-1 h-9 mx-1.5 bg-white bg-opacity-50 rounded-lg`}
        />
        <span
          className={`${styles.bar} ${styles.bar3} inline-block w-1 h-5 bg-white bg-opacity-50 rounded-lg`}
        />
      </div>
    </Html>
  );
};

export default Loader;
