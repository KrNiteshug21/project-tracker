import ButtonAnimation from "@/Anim/ButtonAnimation";
import React from "react";

const SuccessModal = ({ modalObj, clickFunction }) => {
  return (
    <section>
      <div className="top-1/2 left-1/2 z-50 fixed flex justify-center items-center bg-black/50 w-full h-full -translate-x-1/2 -translate-y-1/2">
        <div className="text-right space-y-4 bg-white p-8 rounded-lg">
          <h2 className="font-semibold text-2xl text-center text-slate-900 underline underline-offset-2 unde">
            {modalObj.header}
          </h2>
          <p className="text-center text-lg text-slate-600">{modalObj.msg}</p>
          <ButtonAnimation
            type="button"
            text={"Ok"}
            clickFunction={clickFunction}
            className="text-right bg-blue-600 hover:bg-blue-900 mt-4 px-4 py-2 rounded-lg text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default SuccessModal;
