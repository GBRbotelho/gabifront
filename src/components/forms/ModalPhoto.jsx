import React, { useEffect } from "react";
import Photo1 from "../../assets/profiles/1.svg";
import Photo2 from "../../assets/profiles/2.svg";
import Photo3 from "../../assets/profiles/3.svg";
import Photo4 from "../../assets/profiles/4.svg";
import Photo5 from "../../assets/profiles/5.svg";
import Photo6 from "../../assets/profiles/6.svg";
import Photo7 from "../../assets/profiles/7.svg";
import Photo8 from "../../assets/profiles/8.svg";
import Photo9 from "../../assets/profiles/9.svg";
import Photo10 from "../../assets/profiles/10.svg";
import Photo11 from "../../assets/profiles/11.svg";
import Photo12 from "../../assets/profiles/12.svg";
import Photo13 from "../../assets/profiles/13.svg";
import Photo14 from "../../assets/profiles/14.svg";
import Photo15 from "../../assets/profiles/15.svg";
import Photo16 from "../../assets/profiles/16.svg";
import Photo17 from "../../assets/profiles/17.svg";
import Photo18 from "../../assets/profiles/18.svg";
import Photo19 from "../../assets/profiles/19.svg";
import Photo20 from "../../assets/profiles/20.svg";
import Photo21 from "../../assets/profiles/21.svg";
import Photo22 from "../../assets/profiles/22.svg";
import Photo23 from "../../assets/profiles/23.svg";
import Photo24 from "../../assets/profiles/24.svg";

const avatarImages = [
  Photo1,
  Photo2,
  Photo3,
  Photo4,
  Photo5,
  Photo6,
  Photo7,
  Photo8,
  Photo9,
  Photo10,
  Photo11,
  Photo12,
  Photo13,
  Photo14,
  Photo15,
  Photo16,
  Photo17,
  Photo18,
  Photo19,
  Photo20,
  Photo21,
  Photo22,
  Photo23,
  Photo24,
  // Adicione outras fotos conforme necessário
];

export default function ModalPhoto({ setModal }) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center bg-black/50 justify-center"
      style={{ zIndex: 100 }}
    >
      <div className="absolute bg-white p-4 w-96 rounded shadow-md">
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-2xl font-semibold">Avatares:</h2>
        </div>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
          {avatarImages.map((photo, index) => (
            <div
              key={index}
              className="cursor-pointer scale-90 transition-transform hover:scale-125"
            >
              <img src={photo} alt={`Avatar ${index + 1}`} />
            </div>
          ))}
        </div>
        <div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setModal(false);
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
