import React, { createRef } from "react";

class PrepTime extends React.Component {
  state = {
    priceInputValue: "1",
    priceInput: {
      0: "tock",
      1: "ticktock",
      2: "ticktocktick",
      
    },
    priceOutput: {
      plan1: {
        0: ["$", "0-100",],
        1: ["$", "100-200", ],
        2: ["$", "200 and up", ],
       
      },
      
    }
  };

  slider = createRef();
  sliderValue = createRef();

  componentDidMount() {
    this.slider.current.setAttribute("min", 0);
    this.slider.current.setAttribute(
      "max",
      Object.keys(this.state.priceInput).length - 1
    );
    this.thumbSize = parseInt(
      window
        .getComputedStyle(this.sliderValue.current)
        .getPropertyValue("--thumb-size"),
      10
    );
    this.handleSliderValuePosition(this.slider.current);
  }

  handlePricingSlide = e => {
    this.setState({ priceInputValue: e.target.value });
    this.handleSliderValuePosition(e.target);
    this.props.setPrepTime(e.target.value)
  };

  handleSliderValuePosition = input => {
    const multiplier = input.value / input.max;
    const thumbOffset = this.thumbSize * multiplier;
    const priceInputOffset =
      (this.thumbSize - this.sliderValue.current.clientWidth) / 2;
    this.sliderValue.current.style.left =
      input.clientWidth * multiplier - thumbOffset + priceInputOffset + "px";
  };

  getPricingData = (obj, pos) => {
    return pos !== undefined
      ? obj[this.state.priceInputValue][pos]
      : obj[this.state.priceInputValue];
  };

  render() {
    return (
      <div className="pricing">
        <div className="pricing-slider center-content">
          <label className="form-slider">
            <span>Time</span>
            <input
              type="range"
              ref={this.slider}
              defaultValue={this.state.priceInputValue}
              onChange={this.handlePricingSlide}
            />
          </label>
          <div ref={this.sliderValue} className="pricing-slider-value">
            {this.getPricingData(this.state.priceInput)}
          </div>
        </div>

        <div className="pricing-items">
          <div className="pricing-item">
            <div className="pricing-item-inner">
              <div className="pricing-item-content">
                <div className="pricing-item-header center-content">
                  
                  <div className="pricing-item-price">
                    <span className="pricing-item-price-currency">
                      {this.getPricingData(this.state.priceOutput.plan1, 0)}
                    </span>
                    <span className="pricing-item-price-amount">
                      {this.getPricingData(this.state.priceOutput.plan1, 1)}
                    </span>
                    {this.getPricingData(this.state.priceOutput.plan1, 2)}
                  </div>
                </div>
                
              </div>
              <div className="pricing-item-cta">
                
              </div>
            </div>
          </div>

          
           
          
        </div>
      </div>
    );
  }
}

export default PrepTime;
