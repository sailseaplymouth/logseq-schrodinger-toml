import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import "./tailwind.css";
import { getBlocksInPage } from "./utils";

const App: React.FC = () => {
  const [noteName, setNoteName] = useState("");
  const [hugoFileName, setHugoFileName] = useState("");
  const [originalDate, setOriginalDate] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [mappedtagsValues, setMappedtagsValues] = useState([{ tags: "value" }]);

  //create a function to handle change of inputs
  const handletagsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index
  ) => {
    const { name, value } = event.target;

    let targettedValues = [...mappedtagsValues];
    targettedValues[index].tags = value;
    setMappedtagsValues(targettedValues);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "noteName") {
      setNoteName(value);
    } else if (name === "hugoFileName") {
      setHugoFileName(value);
    } else if (name === "originalDate") {
      setOriginalDate(value);
    } else if (name === "updatedDate") {
      setUpdatedDate(value);
    }
  };

  const createNewtags = () => {
    setMappedtagsValues([...mappedtagsValues, { tags: "value" }]);
  };
  const deletetags = (index: number) => {
    let targettedValues = [...mappedtagsValues];
    targettedValues.splice(index, 1);
    setMappedtagsValues(targettedValues);
  };
  return (
    <div>
      <div className="overlay">
        <div className="flex justify-center w-screen">
          <div className="smartblock-inserter ">
            <h1 className="full-width text-left text-2xl font-bold">
              Hugo Export
            </h1>
            <br></br>
            <div className="">
              <div className="grid justify-between grid-cols-2 gap-">
                <div className="grid justify-between gap-2 px-2">
                  <p>Note Name</p>
                  <input
                    name="noteName"
                    type="text"
                    className="text-black rounded-md"
                    value={noteName}
                    onChange={handleChange}
                  />
                  <p>Hugo File Name</p>
                  <input
                    name="hugoFileName"
                    type="text"
                    className="text-black rounded-md"
                    value={hugoFileName}
                    onChange={handleChange}
                  />
                  <p>Original Date</p>
                  <input
                    name="originalDate"
                    type="date"
                    className="text-black rounded-md"
                    value={originalDate}
                    onChange={handleChange}
                  />
                  <p>Updated Post Date</p>
                  <input
                    name="updatedDate"
                    type="date"
                    className="text-black rounded-md"
                    value={updatedDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid justify-items-end gap-4 grid-cols-1 place-items-auto">
                  <div>
                    <div className="flex justify-between pb-2">
                      <p className="inline-block pr-40">tagss</p>
                      <div className="px-2">
                        <button
                          onClick={createNewtags}
                          className="bg-white text-black font-bold p-2 rounded-sm h-max"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {mappedtagsValues.map((val, index) => {
                      return (
                        <div className="flex justify-between pb-2">
                          <input
                            name={index.toString()}
                            type="text"
                            className="text-black rounded-md"
                            value={mappedtagsValues[index].tags}
                            onChange={(e) => handletagsChange(e, index)}
                          ></input>
                          <div className="px-2">
                            <button
                              onClick={() => {
                                deletetags(index);
                              }}
                              className="bg-white text-black font-bold pr-2 rounded-sm h-max px-3"
                            >
                              -
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className=" border-light-300 border-2 w-3/12 hover:bg-black p-3 px-5 rounded-lg"
                onClick={async () => {
                  getBlocksInPage(
                    { "page": await (await logseq.Editor.getCurrentPage()).name},
                    true,
                    true,
                    mappedtagsValues,
                    [{"updatedDate": updatedDate}, {"originalDate":originalDate}],
                    [{noteName: noteName}, [{"hugoFileName" :hugoFileName}]]
                  );
                }}
              >
                Convert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;