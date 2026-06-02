import React from "react";

import modalImg1 from "../../assets/images/property_details/modal-img-1.png";
import modalImg2 from "../../assets/images/property_details/modal-img-2.png";
import modalImg3 from "../../assets/images/property_details/modal-img-3.png";
import modalImg4 from "../../assets/images/property_details/modal-img-4.png";
import modalImg5 from "../../assets/images/property_details/modal-img-5.png";

interface ModalPopupProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalPopup = ({
  openModal,
  setOpenModal,
}: ModalPopupProps) => {
  const images = [
    modalImg1,
    modalImg2,
    modalImg3,
    modalImg4,
    modalImg5,
    modalImg1,
    modalImg2,
    modalImg3,
  ];

  const toggleModal = (value: boolean) => {
    setOpenModal(value);
  };

  const selectModalImage = (image: string) => {
    console.log(image);
  };

  if (!openModal) return null;

  return (
    <div
      id="galleryModal"
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center opacity-100 transition-opacity duration-300 ease-out"
    >
      <button
        onClick={() => toggleModal(false)}
        className="absolute top-4 right-4 md:top-8 md:right-8 text-gray-400 hover:text-white transition text-3xl p-2 z-50"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      <div className="w-full max-w-6xl px-4 h-full flex flex-col justify-center">
        <h2 className="text-white text-2xl font-bold mb-6">
          All Property Photos (70)
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[75vh] pb-4 pr-2 custom-scrollbar">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              onClick={() => selectModalImage(image)}
              className="rounded-xl w-full h-40 md:h-52 object-cover cursor-pointer hover:opacity-80 transition duration-300"
              alt={`Property ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalPopup;