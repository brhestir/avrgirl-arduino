"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const avrgirl_arduino_1 = __importDefault(require("./avrgirl-arduino"));
require("./style.css");
const ArduinoUno_svg_1 = __importDefault(require("./img/ArduinoUno.svg"));
const gear4_svg_1 = __importDefault(require("./img/gear4.svg"));
function App() {
    const boardChoices = [
        "micro",
        "uno",
        "mega"
    ];
    const fileInput = (0, react_1.useRef)(null);
    const [board, updateBoard] = (0, react_1.useState)(boardChoices[0]);
    const [fileName, updateFileName] = (0, react_1.useState)("");
    const [uploading, updateUploading] = (0, react_1.useState)(false);
    const handleSubmit = e => {
        e.preventDefault();
        updateUploading(true);
        const reader = new FileReader();
        reader.readAsArrayBuffer(fileInput.current.files[0]);
        reader.onload = event => {
            const filecontents = event.target.result;
            const avrgirl = new avrgirl_arduino_1.default({
                board: board,
                debug: true
            });
            avrgirl.flash(filecontents, error => {
                if (error) {
                    console.error(error);
                }
                else {
                    console.info("flash successful");
                }
                updateUploading(false);
            });
        };
    };
    const BoardOptions = boardChoices.map((board, i) => <option value={board} key={i}>{board}</option>);
    return (<div className="main">
      <div className="wrapper">
        <div className="bot">
          <h1>Upload-o-matic</h1>
          <p>Choose a program to upload to an arduino</p>

          <form id="uploadForm" onSubmit={handleSubmit}>
            <label>
              Board:
              <select id="boardType" value={board} onChange={event => updateBoard(event.target.value)}>
                {BoardOptions}   
              </select>
            </label>

            <label>
              Program:
              <div className="fileButtonWrapper">
                <button id="fileButton" type="button" aria-controls="fileInput" onClick={() => fileInput.current.click()}>
                  Choose file
                </button>
                <input id="fileInput" tabIndex="-1" type="file" ref={fileInput} onChange={() => updateFileName(fileInput.current.files[0].name)}/>
                <span id="fileName">
                  {fileName ? fileName : "no file chosen"}
                </span>
              </div>
            </label>

            <button type="submit" id="uploadBtn">
              Upload!
            </button>
          </form>
        </div>

        <div className="board">
          <img src={ArduinoUno_svg_1.default} alt="arduino board"/>
        </div>
        <div id="pipe"></div>
        <div id="progress"></div>
        <div id="gear">
          <img src={gear4_svg_1.default} alt="gear icon" className={uploading ? "spinning" : null}/>
        </div>
      </div>
    </div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map