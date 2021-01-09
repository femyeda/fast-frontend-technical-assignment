/**
 * Rocket Animation Source https://codepen.io/eva_trostlos/pen/akQoLN
 */
import * as styles from "./checkout.module.css";
import classnames from "classnames";

const FastCheckout = ({ isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-white opacity-50"></div>
        </div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          class="inline-block align-bottom bg-background rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className={styles["checkout"]}>
            <h1 className="py-6 font-normal text-4xl text-center text-white">
              Sending movies to your inbox fast.
            </h1>
            <div className={styles["rocket"]}>
              <div className={styles["rocket-body"]}>
                <div className={styles["body"]}></div>
                <div
                  className={classnames(styles["fin"], styles["fin-left"])}
                ></div>
                <div
                  className={classnames(styles["fin"], styles["fin-right"])}
                ></div>
                <div className={styles["window"]}></div>
              </div>
              <div className={styles["exhaust-flame"]}></div>
              <ul className={styles["exhaust-fumes"]}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <ul className={styles["star"]}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastCheckout;
