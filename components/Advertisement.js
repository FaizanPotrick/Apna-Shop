import React from "react";
import Router from "next/router";
import { useContext } from "react";
import Context from "./Context";

function Advertisement() {
  const context = useContext(Context);
  const { data, images } = context;
  return (
    <div className="position-relative">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {images.map((e, i) => {
            return (
              <div
                className={`carousel-item ${i === 0 ? "active" : ""}`}
                key={e}
              >
                <img src={e} className="w-100" style={{ height: "92vh" }} />
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bg-dark rounded"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bg-dark rounded"></span>
        </button>
        <div
          className="w-100 position-absolute "
          style={{ zIndex: 2, bottom: "2vh" }}
        >
          <div className="row mx-4 justify-content-center">
            {data.map((e) => {
              return (
                <div
                  className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                  key={e.CategoryName}
                >
                  <h2
                    className="text-light rounded py-4 shadow my-2 text-center"
                    style={{
                      textShadow:
                        "-2px 0 black, 0 2px black, 2px 0 black, 0 -1px black",
                      backgroundImage: `url(${e.CategoryImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      Router.push(`/${e.CategoryName}`);
                    }}
                  >
                    {e.CategoryName}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advertisement;
