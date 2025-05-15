"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const TowerDetailForm = ({ onTowerSubmit, onMountSubmit }) => {
  const [showTowerForm, setShowTowerForm] = useState(true);
  const [showMountForm, setShowMountForm] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  // Tower Form
  const {
    register: registerTower,
    handleSubmit: handleTowerSubmit,
    reset: resetTower,
    formState: { errors: towerErrors },
  } = useForm();

  // Mount Form
  const {
    register: registerMount,
    handleSubmit: handleMountSubmit,
    watch,
    reset: resetMount,
    formState: { errors: mountErrors },
  } = useForm();

  const mountTypeFields = {
    Platform: [
      { field: "subType", label: "Sub Type" },
      { field: "noofHandrails", label: "No of Handrails" },
      { field: "handrailSpacing", label: "Handrail Spacing" },
      { field: "faceWidth", label: "Face Width" },
      { field: "height", label: "Height" },
      { field: "kicker", label: "Kicker" },
      { field: "mountAzimuth", label: "Mount Azimuth" },
    ],
    "Sector Mount": [
      { field: "boomType", label: "Boom Type" },
      { field: "noofHandrails", label: "No of Handrails" },
      { field: "handrailSpacing", label: "Handrail Spacing" },
      { field: "faceWidth", label: "Face Width" },
      { field: "height", label: "Height" },
      { field: "standoff", label: "Standoff" },
      { field: "mountAzimuth", label: "Mount Azimuth" },
      { field: "location", label: "Location" },
    ],
    "3 Sector": [
      { field: "boomType", label: "Boom Type" },
      { field: "noofHandrails", label: "No of Handrails" },
      { field: "handrailSpacing", label: "Handrail Spacing" },
      { field: "faceWidth", label: "Face Width" },
      { field: "height", label: "Height" },
      { field: "standoff", label: "Standoff" },
      { field: "mountAzimuth", label: "Mount Azimuth" },
      { field: "location", label: "Location" },
    ],
    TArm: [
      { field: "noofHandrails", label: "No of Handrails" },
      { field: "handrailSpacing", label: "Handrail Spacing" },
      { field: "faceWidth", label: "Face Width" },
      { field: "standoff", label: "Standoff" },
      { field: "faceRotation", label: "Face Rotation" },
      { field: "mountAzimuth", label: "Mount Azimuth" },
      { field: "location", label: "Location" },
    ],
    "3TArm": [
      { field: "noofHandrails", label: "No of Handrails" },
      { field: "handrailSpacing", label: "Handrail Spacing" },
      { field: "faceWidth", label: "Face Width" },
      { field: "standoff", label: "Standoff" },
      { field: "faceRotation", label: "Face Rotation" },
      { field: "mountAzimuth", label: "Mount Azimuth" },
      { field: "location", label: "Location" },
    ],
  };

  const selectedMountType = watch("mountType");
  const enabledFields = mountTypeFields[selectedMountType] || [];

  const handleTowerFormSubmit = (data) => {
    console.log("Tower Data:", data);
    if (onTowerSubmit) {
      onTowerSubmit(data);
    }
    setShowTowerForm(false);
    setShowMountForm(true);
  };

  const handleMountFormSubmit = (data) => {
    console.log("Mount Data:", data);
    if (onMountSubmit) {
      onMountSubmit(data);
    }
  };

  const handleBackClick = () => {
    setShowMountForm(false);
    setShowTowerForm(true);
  };

  // Options for dynamic dropdowns
  const subtypeOptions = ["3 Sided", "4 Sided", "Circular"];
  const boomTypeOptions = ["V-Boom", "Standard"];
  const locationOptions = [
    "Leg A",
    "Leg B",
    "Leg C",
    "Face A",
    "Face B",
    "Face C",
  ];

  return (
    <div className="container min-vh-100 mt-4">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 text-dark fw-bold">
          Create Tower & Mount
        </h2>

        {/* Tower Details Form */}
        {showTowerForm && (
          <form
            onSubmit={handleTowerSubmit(handleTowerFormSubmit)}
            className="mt-3 p-3 border rounded"
          >
            <div
              className="mb-3 px-3 py-2 bg-primary text-white rounded"
              style={{ display: "inline-block" }}
            >
              <h5 className="mb-0">Tower Details</h5>
            </div>

            <div className="row">
              {/* Your original fields stay intact */}
              <div className="col-md-3 mb-3">
                <label htmlFor="towerType" className="form-label fw-bold">
                  Tower Type
                </label>
                <select
                  id="towerType"
                  {...registerTower("towerType", {
                    required: "*Tower Type is required",
                  })}
                  className={`form-select ${
                    towerErrors.towerType ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select Tower Type</option>
                  <option value="Monopole">Monopole</option>
                  <option value="3-Sided">3-Sided</option>
                  <option value="4-Sided">4-Sided</option>
                </select>
                {towerErrors.towerType && (
                  <div className="invalid-feedback">
                    {towerErrors.towerType?.message}
                  </div>
                )}
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="width" className="form-label fw-bold">
                  Width (in inches)
                </label>
                <input
                  type="number"
                  id="width"
                  {...registerTower("width", {
                    required: "*Width is required",
                    min: {
                      value: 0.1,
                      message: "*Width must be greater than 0",
                    },
                  })}
                  className={`form-control ${
                    towerErrors.width ? "is-invalid" : ""
                  }`}
                />
                {towerErrors.width && (
                  <div className="invalid-feedback">
                    {towerErrors.width?.message}
                  </div>
                )}
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="collarDepth" className="form-label fw-bold">
                  Collar Depth (in inches)
                </label>
                <input
                  type="number"
                  id="collarDepth"
                  {...registerTower("collarDepth", {
                    required: "*Collar Depth is required",
                    min: {
                      value: 1,
                      message: "*Collar Depth must be greater than 1",
                    },
                  })}
                  className={`form-control ${
                    towerErrors.collarDepth ? "is-invalid" : ""
                  }`}
                />
                {towerErrors.collarDepth && (
                  <div className="invalid-feedback">
                    {towerErrors.collarDepth?.message}
                  </div>
                )}
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="collarHeight" className="form-label fw-bold">
                  Collar Height (in inches)
                </label>
                <input
                  type="number"
                  id="collarHeight"
                  {...registerTower("collarHeight", {
                    required: "*Collar Height is required",
                    min: {
                      value: 1,
                      message: "*Collar Height must be greater than 1",
                    },
                  })}
                  className={`form-control ${
                    towerErrors.collarHeight ? "is-invalid" : ""
                  }`}
                />
                {towerErrors.collarHeight && (
                  <div className="invalid-feedback">
                    {towerErrors.collarHeight?.message}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100 mt-3">
              Submit Tower Details
            </button>
          </form>
        )}

        {/* Mount Details Form */}
        {showMountForm && (
          <form
            onSubmit={handleMountSubmit(handleMountFormSubmit)}
            className="mt-4 p-3 border rounded"
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="badge bg-info text-dark fs-5 px-3 py-2 rounded">
                Mount Details
              </span>
              <button
                type="button"
                onClick={handleBackClick}
                className="btn btn-info text-white fw-bold rounded-pill px-4 py-2 shadow-sm"
                style={{ transition: "all 0.3s ease" }}
              >
                ← Back to Tower Details
              </button>
            </div>

            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="mountType" className="form-label fw-bold">
                  Mount Type
                </label>
                <select
                  id="mountType"
                  {...registerMount("mountType", {
                    required: "*Mount Type is required",
                  })}
                  className={`form-select ${
                    mountErrors.mountType ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Select Mount Type</option>
                  <option value="Platform">Platform</option>
                  <option value="Sector Mount">Sector Mount</option>
                  <option value="3 Sector">3 Sector</option>
                  <option value="TArm">TArm</option>
                  <option value="3TArm">3TArm</option>
                </select>
                {mountErrors.mountType && (
                  <div className="invalid-feedback">
                    {mountErrors.mountType?.message}
                  </div>
                )}
              </div>
            </div>

            {enabledFields.length > 0 && (
              <div className="row">
                {enabledFields.map((fieldOption) => {
                  if (
                    fieldOption.field === "subType" &&
                    selectedMountType === "Platform"
                  ) {
                    return (
                      <div key={fieldOption.field} className="col-md-3 mb-3">
                        <label className="form-label fw-bold">Sub Type</label>
                        <select
                          {...registerMount(fieldOption.field)}
                          className="form-select"
                        >
                          <option value="">Select Sub Type</option>
                          {subtypeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  if (
                    fieldOption.field === "boomType" &&
                    selectedMountType === "Sector Mount"
                  ) {
                    return (
                      <div key={fieldOption.field} className="col-md-3 mb-3">
                        <label className="form-label fw-bold">Boom Type</label>
                        <select
                          {...registerMount(fieldOption.field)}
                          className="form-select"
                        >
                          <option value="">Select Boom Type</option>
                          {boomTypeOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }
                  if (fieldOption.field === "location") {
                    return (
                      <div key={fieldOption.field} className="col-md-3 mb-3">
                        <label className="form-label fw-bold">Location</label>
                        <select
                          {...registerMount(fieldOption.field)}
                          className="form-select"
                        >
                          <option value="">Select Location</option>
                          {locationOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  return (
                    <div key={fieldOption.field} className="col-md-3 mb-3">
                      <label className="form-label fw-bold">
                        {fieldOption.label}
                      </label>
                      <input
                        type="text"
                        {...registerMount(fieldOption.field)}
                        className="form-control"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            <button type="submit" className="btn btn-success w-100 mt-3">
              Submit Mount Details
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TowerDetailForm;
