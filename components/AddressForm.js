import React from "react";

function AddressForm({
  addressData,
  address,
  onChange,
  regexValidation,
  isValid,
  isEdit,
}) {
  return (
    <form onSubmit={addressData}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-floating mb-4">
            <input
              type="text"
              value={address.street}
              name="street"
              id="addressstreet"
              className="form-control"
              placeholder="Street"
              onChange={(e) => {
                onChange(e);
                const regex = /^([ a-zA-Z,/.-]+)$/;
                regexValidation(e, regex);
              }}
              maxLength="100"
              required
            />
            <label className="form-label text-muted" htmlFor="addressstreet">
              Street
            </label>
            <div className="invalid-feedback">{isValid.street}</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating mb-4">
            <input
              type="text"
              value={address.landMark}
              name="landMark"
              id="addresslandMark"
              className="form-control"
              placeholder="Land Mark"
              onChange={(e) => {
                onChange(e);
                const regex = /^([ a-zA-Z,/.-]+)$/;
                regexValidation(e, regex);
              }}
              maxLength="100"
              required
            />
            <label className="form-label text-muted" htmlFor="addresslandMark">
              Land Mark
            </label>
            <div className="invalid-feedback">{isValid.landMark}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="form-floating mb-4">
            <input
              type="text"
              value={address.city}
              name="city"
              id="addresscity"
              className="form-control"
              placeholder="City"
              onChange={(e) => {
                onChange(e);
                const regex = /^([ a-zA-Z,/.-]+)$/;
                regexValidation(e, regex);
              }}
              maxLength="20"
              required
            />
            <label className="form-label text-muted" htmlFor="addresscity">
              City
            </label>
            <div className="invalid-feedback">{isValid.city}</div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="form-floating">
            <input
              type="text"
              value={address.district}
              name="district"
              id="addressdistrict"
              className="form-control"
              placeholder="District"
              onChange={(e) => {
                onChange(e);
                const regex = /^([ a-zA-Z,/.-]+)$/;
                regexValidation(e, regex);
              }}
              maxLength="20"
              required
            />
            <label className="form-label text-muted" htmlFor="addressdistrict">
              District
            </label>
            <div className="invalid-feedback">{isValid.district}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-floating mb-4">
            <input
              type="text"
              value={address.state}
              name="state"
              id="addressstate"
              className="form-control"
              placeholder="State"
              onChange={(e) => {
                onChange(e);
                const regex = /^([ a-zA-Z,/.-]+)$/;
                regexValidation(e, regex);
              }}
              maxLength="20"
              required
            />
            <label className="form-label text-muted" htmlFor="addressstate">
              State
            </label>
            <div className="invalid-feedback">{isValid.state}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="form-floating mb-4">
            <input
              type="text"
              value={address.country}
              name="country"
              id="addresscountry"
              className="form-control"
              placeholder="Country"
              onChange={(e) => {
                onChange(e);
                const regex = /^([ a-zA-Z,/.-]+)$/;
                regexValidation(e, regex);
              }}
              maxLength="20"
              required
            />
            <label className="form-label text-muted" htmlFor="addresscountry">
              Country
            </label>
            <div className="invalid-feedback">{isValid.country}</div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="form-floating">
            <input
              type="text"
              value={address.pinCode}
              name="pinCode"
              id="addresspinCode"
              className="form-control"
              placeholder="Pin Code"
              onChange={(e) => {
                onChange(e);
                const regex = /^([0-9]+)$/;
                regexValidation(e, regex);
              }}
              maxLength="10"
              minLength="6"
              required
            />
            <label className="form-label text-muted" htmlFor="addresspinCode">
              Pin Code
            </label>
            <div className="invalid-feedback">{isValid.pinCode}</div>
          </div>
        </div>
      </div>
      <div id="addressfill" className="text-danger text-center mb-1"></div>
      <button type="submit" className="btn btn-warning btn-lg container mb-3">
        {isEdit ? "Update Address" : "Add Address"}
      </button>
    </form>
  );
}

export default AddressForm;
