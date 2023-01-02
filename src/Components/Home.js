import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { RiPlantFill } from "react-icons/ri";
import { CircularProgressbar } from "react-circular-progressbar";
import { TiWeatherDownpour } from "react-icons/ti";
import "react-circular-progressbar/dist/styles.css";
import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
} from "firebase/database";
import poff from "../img/wo.png";
import poon from "../img/won.png";
import bg from "../img/b3.png";

function Home() {
  const percentage = 66;
  const db = getDatabase();
  const [datanya, setdatanya] = useState({});
  const [valuee, setvalue] = useState(false);

  useEffect(() => {
    const starCountRef = ref(db, "Sensor/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setdatanya(data);
      // updateStarCount(postElement, data);
    });
  }, []);

  const presbut = () => {
    setvalue((s) => !valuee);
    const updates = {};
    updates["/Sensor/PompaNyala"] = valuee;
    return update(ref(db), updates);
  };

  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // return an CSS hsl color string
    return "hsl(" + c + ", 150%, 50%)";
  };
  console.log(datanya.KelembapanTanah);

  return (
    <div className="relative h-full">
      <Navbar />
      <img
        src={bg}
        alt=""
        className="bgnya absolute top-0 h-[120vh] md:h-[100vh] "
      />
      <div className="homee  absolute top-0   ">
        <div className=" w- full h-[90vh] ">
          <div className=" mt-14 w-full h-full md:justify-around items-center md:flex-row-reverse md:flex space-y-10 ">
            <div className="flex justify-center  md:mt-0">
              <div className="bg-white w-[300px] h-72 p-3 flex justify-center rounded-xl">
                <div className=" flex flex-col items-center space-y-3 ">
                  <h3 className=" font-semibold text-2xl ">Suhu Tanaman</h3>
                  <RiPlantFill className="text-green-500 text-4xl" />
                  <div className="h-full ">
                    <div style={{ width: 150, height: 150 }}>
                      <CircularProgressbar
                        circleRatio={0.7}
                        styles={{
                          trail: {
                            strokeLinecap: "butt",
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center",
                          },
                          path: {
                            strokeLinecap: "butt",
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center",
                            stroke: calcColor(datanya.KelembapanTanah, 0, 100),
                          },
                          text: {
                            fill: "#000",
                          },
                        }}
                        value={datanya.KelembapanTanah}
                        maxValue={100}
                        text={`${datanya.KelembapanTanah}%`}
                        strokeWidth={8}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  justify-center md:mb-0">
              <div className=" w-[300px] h-72 p-3 flex justify-center flex-col items-center  rounded-xl  ">
                <div className="pl-4 ">
                  <img
                    src={datanya.PompaNyala ? poon : poff}
                    alt=""
                    className="w-20 h-20"
                  />
                </div>
                <div className="flex mt-14 space-x-10 mb-8">
                  <div
                    className={`w-8 h-8  rounded-full bg-red-400 border-4 border-white   ${
                      datanya.PompaNyala === true
                        ? ""
                        : "outline outline-red-400  outline-4"
                    }`}
                  ></div>
                  <div
                    className={`w-8 h-8  rounded-full bg-green-400 border-4 border-white   ${
                      datanya.PompaNyala === true
                        ? "outline outline-green-400  outline-4"
                        : ""
                    }`}
                  ></div>
                </div>
                {datanya.PompaNyala ? (
                  <button
                    onClick={presbut}
                    className={`mt-4 bg-green-400 px-7 py-3 outline outline-white outline-2  font-body font-extrabold rounded-lg text-white`}
                  >
                    Pump On
                  </button>
                ) : (
                  <button
                    onClick={presbut}
                    className={`mt-4 bg-red-400 px-7 py-3 outline outline-white outline-2  font-body font-extrabold rounded-lg text-white`}
                  >
                    Pump Off
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-center  md:mt-0 mt-20  ">
              <div className="bg-white w-[300px] h-72 p-3 flex justify-center rounded-xl">
                <div className=" flex flex-col items-center space-y-3 ">
                  <h3 className=" font-semibold text-2xl ">Suhu Udara</h3>
                  <TiWeatherDownpour className="text-blue-500 text-4xl" />

                  <div className="h-full ">
                    <div style={{ width: 150, height: 150 }}>
                      <CircularProgressbar
                        circleRatio={0.7}
                        styles={{
                          trail: {
                            strokeLinecap: "butt",
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center",
                          },
                          path: {
                            strokeLinecap: "butt",
                            transform: "rotate(-126deg)",
                            transformOrigin: "center center",
                            stroke: calcColor(datanya.Suhu, 0, 100),
                          },
                          text: {
                            fill: "#000",
                          },
                        }}
                        value={datanya.Suhu}
                        maxValue={100}
                        text={`${datanya.Suhu}%`}
                        strokeWidth={8}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
