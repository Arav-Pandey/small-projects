import { FcRuler } from "react-icons/fc";
import { FaTemperatureLow } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoMdSpeedometer } from "react-icons/io";
import HomeLogo from "./HomeLogo";

export default function UnitConverter() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Unit Converter</h1>
      <HomeLogo />
      <nav>
        <ul>
          <li>
            <a
              href="/length"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <FcRuler size={30} />
                <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                  Length Converter
                </span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/temperature"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <FaTemperatureLow size={30} fill="white" />
                <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                  Temperature Converter
                </span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/weight"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <GiWeightLiftingUp size={30} fill="white" />
                <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                  Weight Converter
                </span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/money"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <FaMoneyCheckDollar size={30} fill="white" />
                <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                  Money Converter
                </span>
              </div>
            </a>
          </li>
          <li>
            <a
              href="/speed"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <IoMdSpeedometer size={30} fill="white" />
                <span style={{ fontSize: "18px", marginLeft: "5px" }}>
                  Speed Converter
                </span>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
